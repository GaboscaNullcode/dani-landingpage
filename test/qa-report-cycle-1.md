# QA Strike Team - Ciclo 1

**Fecha**: 2026-03-02
**Proyecto**: landing-dani (remotecondani.com)
**Estado**: EN PROGRESO

---

## Expertos y Dominios

| Experto | Dominio | Estado |
|---------|---------|--------|
| Ingeniero QA Pesimista | Rutas negativas, unhappy paths | **COMPLETADO** |
| El Decimo Hombre | Escenarios ignorados, contra-consenso | **COMPLETADO** |
| Teorico del Caos | Concurrencia, race conditions | **COMPLETADO** |
| Murphy's Law | Casos limite, datos nulos, timeouts | **COMPLETADO** |
| Chrome DevTools | UI/UX visual, responsive, consola | **COMPLETADO** |
| Arquitecto | Estructura, patrones, flujo de datos | **COMPLETADO** |
| Supabase Expert | DB, RLS, queries, best practices | **COMPLETADO** |
| Experto en Espanol | Copy, ortografia, gramatica | **COMPLETADO** |

---

## Hallazgos

## Ingeniero QA Pesimista

**Archivos auditados**: 23 API routes, 4 servicios criticos (auth-service, compras-service, tienda-service, brevo), middleware, booking-engine, reservas-service.

### [CRITICO] Open Redirect en auth/callback via parametro `next`
- **Archivo**: `src/app/api/auth/callback/route.ts:7`
- **Problema**: El parametro `next` de la URL se usaba directamente en `NextResponse.redirect()` sin validar que fuera una ruta relativa interna. Un atacante podia construir una URL como `/api/auth/callback?code=...&next=https://evil.com` para redirigir a usuarios post-login a un sitio malicioso (phishing).
- **Solucion**: CORREGIDO. Se agrego validacion que solo permite rutas que empiecen con `/` y no con `//`. Si falla la validacion, redirige a `/mi-cuenta`.

### [CRITICO] Price/Product mismatch en checkout — permite pagar precio incorrecto
- **Archivo**: `src/app/api/checkout/route.ts:10-15`
- **Problema**: No se validaba que el `priceId` enviado correspondiera realmente al `productId`. Un atacante podria enviar un `priceId` de un producto de $5 con el `productId` de un producto de $200. Stripe cobraria $5, pero el webhook crearia la compra del producto de $200.
- **Solucion**: CORREGIDO. Se agrego validacion cruzada que verifica el `priceId` contra el `stripe_price_id` del producto, su precio de descuento, y sus planes de pago (child products).

### [ALTO] listUsers() sin paginacion en signup y findOrCreateUser — falla con >1000 usuarios
- **Archivo**: `src/app/api/auth/signup/route.ts:24-27` y `src/lib/auth-service.ts:91-92`
- **Problema**: `supabase.auth.admin.listUsers()` sin parametros solo devuelve la primera pagina (~1000 usuarios). Con mas de 1000 usuarios, la busqueda por email no encontraria un usuario existente, permitiendo crear cuentas duplicadas.
- **Solucion**: CORREGIDO.
  - En signup: se elimino la llamada a `listUsers()` y se delega la deteccion de duplicados al error de `createUser()` de Supabase que retorna error si el email ya existe.
  - En findOrCreateUser: se reemplazo `listUsers()` sin filtro por `listUsers({ filter: 'email = "..."', page: 1, perPage: 1 })`.

### [ALTO] Path traversal en upload via parametro `folder`
- **Archivo**: `src/app/api/upload/route.ts:23`
- **Problema**: El parametro `folder` del formulario se usaba directamente en la URL de upload a BunnyCDN. Un usuario podia enviar `folder=../../secret-zone` para subir archivos fuera del directorio esperado en el storage.
- **Solucion**: CORREGIDO. Se sanitiza `folder` reemplazando cualquier caracter que no sea alfanumerico, guion o guion bajo.

### [ALTO] claim-free no valida que el producto sea realmente gratis
- **Archivo**: `src/app/api/claim-free/route.ts:11-13`
- **Problema**: La ruta solo validaba que `productId` existiera, pero no consultaba si el producto tenia `es_gratis = true`. Un usuario autenticado podia "reclamar" cualquier producto de pago como si fuera gratis, creando una compra activa sin pagar.
- **Solucion**: CORREGIDO. Se agrego consulta a la tabla `productos` para verificar que `es_gratis = true` antes de crear la compra.

### [MEDIO] Disponibilidad de reservas acepta fechas pasadas
- **Archivo**: `src/app/api/reservas/disponibilidad/route.ts:19-24`
- **Problema**: No se validaba que la fecha solicitada no estuviera en el pasado. El endpoint generaba slots para cualquier fecha, incluyendo pasadas.
- **Solucion**: CORREGIDO. Se agrego validacion que rechaza fechas anteriores a hoy.

### [MEDIO] Cancelacion de reservas pasadas permitida
- **Archivo**: `src/app/api/reservas/cancelar/route.ts:38-43`
- **Problema**: Un usuario podia cancelar una reserva cuya fecha ya paso, lo que disparaba la eliminacion de la reunion Zoom y evento de Calendar de algo que ya ocurrio.
- **Solucion**: CORREGIDO. Se agrego validacion que impide cancelar reservas pasadas.

### [MEDIO] Webhook Stripe retorna 500 en errores logicos — causa reintentos innecesarios
- **Archivo**: `src/app/api/webhooks/stripe/route.ts:221-224`
- **Problema**: Cuando falla el procesamiento de `checkout.session.completed`, se retorna HTTP 500, lo que hace que Stripe reintente el webhook (hasta 3 dias). Si el error es logico (ej: producto no encontrado), Stripe seguira reintentando inutilmente.
- **Solucion**: RECOMENDACION. Para errores logicos irrecuperables, se deberia retornar 200 con un log de error. Solo retornar 500 para errores transitorios (DB caida, timeout).

### [MEDIO] reservas/crear sin autenticacion de usuario — usa stripeSessionId como token
- **Archivo**: `src/app/api/reservas/crear/route.ts:13-16`
- **Problema**: La ruta no verifica autenticacion. Cualquier persona con un `stripeSessionId` valido (que no es secreto — aparece en la URL de redireccion) puede crear una reserva.
- **Solucion**: RECOMENDACION. El flujo actual depende del redirect post-checkout donde el usuario aun no tiene sesion. Agregar autenticacion romperia el flujo. Se recomienda: (a) verificar que el email de la sesion Stripe coincide con el usuario autenticado si existe, o (b) limitar uso del stripeSessionId a un periodo corto post-pago.

### [MEDIO] Webhook subscription.deleted usa customer ID como distinctId en PostHog
- **Archivo**: `src/app/api/webhooks/stripe/route.ts:237-239`
- **Problema**: Para `customer.subscription.deleted`, se usa `subscription.customer` (que es un customer ID de Stripe, no un email) como `distinctId` de PostHog. Esto genera un evento con un distinct ID inconsistente vs el resto del tracking que usa emails.
- **Solucion**: RECOMENDACION. Obtener el email del customer de Stripe antes de trackear el evento.

### [BAJO] signup tiene longitud minima de password inconsistente con change-password
- **Archivo**: `src/app/api/auth/signup/route.ts:15` vs `src/app/api/auth/change-password/route.ts:21`
- **Problema**: Signup requiere minimo 6 caracteres, change-password requiere minimo 8. Inconsistencia que podria confundir al usuario.
- **Solucion**: RECOMENDACION. Unificar a 8 caracteres minimo en ambos endpoints.

### [BAJO] login no logea el error (catch vacio con solo respuesta generica)
- **Archivo**: `src/app/api/auth/login/route.ts:19`
- **Problema**: El catch de login no logea el error. Si hay un error de Supabase que no es de credenciales, se pierde la informacion de diagnostico.
- **Solucion**: RECOMENDACION. Agregar `console.error` en el catch.

### [BAJO] checkout no valida formato de customerEmail
- **Archivo**: `src/app/api/checkout/route.ts:7-8`
- **Problema**: El `customerEmail` se pasa directamente a Stripe sin validar que sea un email valido. Stripe lo validara, pero resultaria en un error 500 generico en vez de un 400 descriptivo.
- **Solucion**: RECOMENDACION. Agregar validacion basica de formato email antes de pasarlo a Stripe.

### [BAJO] testimonios POST no sanitiza longitud de `rol`
- **Archivo**: `src/app/api/testimonios/route.ts:46`
- **Problema**: Se valida longitud de `texto` (max 1000), pero `rol` no tiene limite de longitud. Podria almacenar strings enormes.
- **Solucion**: RECOMENDACION. Agregar `rol.length > 100` como validacion.

---

**Resumen**: 5 problemas corregidos directamente en codigo, 8 recomendaciones documentadas.
- CRITICO: 2 corregidos (open redirect, price mismatch)
- ALTO: 3 corregidos (listUsers paginacion, path traversal, claim-free sin validar)
- MEDIO: 4 (2 corregidos, 2 recomendaciones)
- BAJO: 4 recomendaciones

---

## Arquitecto

**Archivos auditados**: Todos los tipos en `src/types/`, todos los servicios en `src/lib/*-service.ts`, todos los datos estaticos en `src/data/`, 23 API routes, barrel exports de 11 directorios, middleware, next.config.ts, eslint.config.mjs, 94 componentes "use client", todas las paginas en `src/app/`.

### [ALTO] Componentes de tienda legacy usan datos estaticos con tipo Product incompatible
- **Archivo(s)**: `src/components/tienda/ProductosDestacados.tsx`, `src/components/tienda/ProductosAdicionales.tsx`, `src/components/tienda/RecursosGratuitos.tsx`, `src/components/tienda/ProductCard.tsx`
- **Problema**: Estos 4 componentes importan desde `@/data/tienda-data` que define su propio tipo `Product` con solo 5 categorias (`curso | ebook | masterclass | comunidad | gratis`), sin campos criticos como `isSubscription`, `interval`, `stripePriceId`, `asesoria`, `trustBadges`, etc. La pagina real de tienda (`/tienda`) usa los componentes nuevos (`SeccionProductos`, `SeccionNiveles`, `SeccionServicios`) que consumen datos de Supabase via `tienda-service.ts` con el tipo completo de `@/types/tienda`. Los 4 componentes legacy no se usan en ninguna pagina pero se exportan desde `src/components/tienda/index.ts`, causando confusion sobre cual es la fuente de verdad.
- **Impacto**: Codigo muerto que puede confundir a desarrolladores. Si alguien los reutiliza sin saberlo, renderizarian datos estaticos hardcodeados en vez de datos dinamicos de Supabase.
- **Solucion**: RECOMENDACION. Eliminar los 4 componentes legacy (`ProductosDestacados`, `ProductosAdicionales`, `RecursosGratuitos`, `ProductCard` del barrel) y el archivo `src/data/tienda-data.ts`. O al minimo marcarlos como deprecados.

### [ALTO] Tipo NewsletterSubscribeRequest no incluye origenes que la API acepta
- **Archivo(s)**: `src/types/newsletter.ts:4`, `src/app/api/newsletter/route.ts:36-38`, `src/lib/newsletter-service.ts:13-18`
- **Problema**: `NewsletterSubscribeRequest.source` define solo 4 valores: `'home' | 'newsletter_page' | 'blog' | 'quiz'`. Sin embargo, la API route valida y acepta 2 origenes adicionales (`'recursos_gratuitos'`, `'guia_gratuita'`), y `newsletter-service.ts` ya los incluye en su union type. La API castea el resultado de vuelta al tipo limitado `as 'home' | 'newsletter_page' | 'blog' | 'quiz'`, lo que significa que `recursos_gratuitos` y `guia_gratuita` pasan la validacion pero se castean incorrectamente al escribir en Supabase.
- **Impacto**: Los suscriptores que vienen de `recursos_gratuitos` o `guia_gratuita` se guardan en Supabase con el origen correcto (el service lo permite), pero el tipo de TypeScript miente sobre lo que se esta pasando. Si alguien confía en el tipo, podria romper logica futura.
- **Solucion**: RECOMENDACION. Agregar `'recursos_gratuitos' | 'guia_gratuita'` al tipo `NewsletterSubscribeRequest.source` y al `SuscriptorRecord.origen`.

### [MEDIO] Codigo muerto: 4 componentes en src/components/ nunca importados
- **Archivo(s)**: `src/components/ServicesSection.tsx`, `src/components/ExperienceSection.tsx`, `src/components/HistorySection.tsx`, `src/components/MissionSection.tsx`
- **Problema**: Estos 4 componentes estan exportados en `src/components/index.ts` pero ningun archivo los importa. La pagina `/sobre-mi` usa versiones refactorizadas (`SobreMiHistorySection`, `SobreMiExperienceSection`, `SobreMiMissionSection`). `ServicesSection` no se usa en ningun lugar. Son versiones obsoletas que quedaron tras refactorizacion.
- **Impacto**: Codigo muerto que aumenta bundle innecesariamente (tree-shaking lo excluye del runtime pero no del repo) y confunde a nuevos colaboradores.
- **Solucion**: RECOMENDACION. Eliminar los 4 componentes y sus exports del barrel.

### [MEDIO] Datos estaticos blog-data.ts completamente obsoletos
- **Archivo(s)**: `src/data/blog-data.ts`
- **Problema**: El archivo contiene 12 articulos hardcodeados con su propia interfaz `Article` (distinta de `BlogArticle` en `@/types/blog`). La interfaz tiene campos diferentes (`categoryId` vs `category`, `isPopular` vs no existente en Supabase, sin `content` real excepto 1 articulo). Ningun archivo en `src/app/` importa desde `blog-data.ts` — todas las paginas de blog usan `blog-service.ts`.
- **Impacto**: Archivo 100% muerto. Si alguien lo encuentra, podria creer que son datos reales cuando en realidad son placeholders obsoletos.
- **Solucion**: RECOMENDACION. Eliminar `src/data/blog-data.ts`.

### [MEDIO] Barrel export faltante para componentes de blog
- **Archivo(s)**: `src/components/blog/` (directorio)
- **Problema**: El directorio `src/components/blog/` contiene 9 componentes pero no tiene un archivo `index.ts` de barrel export, a diferencia de todos los otros directorios de componentes (tienda, asesorias, info, newsletter, sobre-mi, masterclass, stages, etc.). Las paginas de blog importan cada componente individualmente con rutas completas.
- **Impacto**: Inconsistencia con el patron del proyecto. No es critico pero rompe la convencion.
- **Solucion**: RECOMENDACION. Crear `src/components/blog/index.ts` con barrel exports, consistente con el resto del proyecto.

### [MEDIO] Barrel export faltante para componentes de mi-cuenta
- **Archivo(s)**: `src/components/mi-cuenta/` (directorio)
- **Problema**: Similar al caso de blog — el directorio `mi-cuenta/` no tiene barrel export. Contiene Dashboard, LoginForm, ResetPasswordForm, ProductCard, ChangePasswordModal, etc.
- **Impacto**: Inconsistencia con el patron del proyecto.
- **Solucion**: RECOMENDACION. Crear `src/components/mi-cuenta/index.ts`.

### [MEDIO] Variables de entorno no documentadas en CLAUDE.md
- **Archivo(s)**: `CLAUDE.md` (ambos), `src/app/api/upload/route.ts`, `src/lib/zoom.ts`
- **Problema**: Las siguientes variables de entorno son usadas en el codigo pero no estan listadas en la seccion "Variables de Entorno" de CLAUDE.md:
  - `BUNNY_STORAGE_API_KEY`, `BUNNY_STORAGE_ZONE_NAME`, `BUNNY_STORAGE_BASE_URL`, `BUNNY_CDN_BASE_URL` (upload de imagenes a BunnyCDN)
  - `ZOOM_ACCOUNT_ID`, `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET` (creacion de reuniones Zoom)
- **Impacto**: Un desarrollador nuevo no sabria que necesita configurar estas variables para que upload de imagenes y reservas de Zoom funcionen.
- **Solucion**: RECOMENDACION. Agregar las 7 variables a la seccion de env vars en CLAUDE.md.

### [MEDIO] API routes no documentadas en CLAUDE.md
- **Archivo(s)**: `CLAUDE.md` (ambos)
- **Problema**: La tabla de rutas en CLAUDE.md no incluye varias API routes que existen:
  - `POST /api/auth/signup` — registro de usuarios
  - `POST /api/auth/forgot-password` — reset de password
  - `GET /api/auth/callback` — callback OAuth
  - `POST /api/claim-free` — reclamar productos gratis
  - `POST /api/testimonios` / `GET /api/testimonios` — gestion de testimonios
  - `POST /api/upload` — upload de imagenes a BunnyCDN
  - `POST /api/stripe/portal` — portal de facturacion Stripe
  - `POST /api/reservas/crear`, `POST /api/reservas/cancelar`, `GET /api/reservas/disponibilidad`, `GET /api/reservas/mis-reservas` — sistema de reservas
  - `GET /api/masterclass/recurso/[recursoId]` — descarga de recursos masterclass
  - `GET /api/programa-contenido/[contenidoId]` — contenido del programa
  - `GET /api/cron/recordatorios` — cron de recordatorios
- **Impacto**: Documentacion incompleta dificulta onboarding.
- **Solucion**: RECOMENDACION. Actualizar la tabla de rutas API en CLAUDE.md.

### [BAJO] Patron de respuesta API inconsistente
- **Archivo(s)**: Multiples API routes
- **Problema**: Las API routes usan formatos de respuesta inconsistentes:
  - Exito: algunas devuelven `{ success: true, ... }` (newsletter), otras `{ user }` (login), otras `{ url }` (checkout), otras `{ ok: true }` (forgot-password)
  - Error: la mayoria usa `{ error: "mensaje" }` pero newsletter usa `{ success: false, message: "..." }`
  - Estas inconsistencias dificultan crear un client-side error handler unificado.
- **Impacto**: Bajo. El frontend ya maneja cada ruta individualmente.
- **Solucion**: RECOMENDACION. Estandarizar gradualmente a un formato uniforme, ej: `{ data?, error?, message? }`.

### [BAJO] Testimonios API usa createServerSupabase() en vez de getCurrentUser()
- **Archivo(s)**: `src/app/api/testimonios/route.ts:6-8`
- **Problema**: La ruta de testimonios obtiene el usuario llamando directamente a `supabase.auth.getUser()` en vez de usar la utilidad centralizada `getCurrentUser()` de `auth-service.ts`. Esto funciona pero rompe el patron de abstraccion.
- **Impacto**: Si la logica de autenticacion cambia (ej: se agregan claims, se cambia la fuente del profile), este endpoint no se actualizaria automaticamente.
- **Solucion**: RECOMENDACION. Usar `getCurrentUser()` para consistencia.

### [BAJO] programa-intensivo-data.ts mezcla tipos y funciones de transformacion en data/
- **Archivo(s)**: `src/data/programa-intensivo-data.ts`
- **Problema**: El archivo define interfaces (`ProgramaContenidoRecord`, `ProgramaVideo`, `ProgramaDownload`) y funciones de transformacion (`transformToVideo`, `transformToDownload`). Segun el patron del proyecto, las interfaces Record/Frontend deberian estar en `src/types/` y las transformaciones en `src/lib/*-service.ts`. Este archivo esta en `src/data/` que es para datos estaticos hardcodeados.
- **Impacto**: Rompe la convencion del patron dual. Otros dominios (blog, tienda, reservas) tienen sus tipos en `src/types/` y transformaciones en `src/lib/`.
- **Solucion**: RECOMENDACION. Mover las interfaces a `src/types/programa-contenido.ts` y las funciones de transformacion a `src/lib/programa-contenido-service.ts`.

---

**Resumen Arquitecto**: 0 corregidos, 11 recomendaciones documentadas.
- ALTO: 2 (tipo Product incompatible en legacy components, tipo newsletter source incompleto)
- MEDIO: 5 (codigo muerto, blog-data obsoleto, barrel exports faltantes x2, env vars y rutas no documentadas)
- BAJO: 4 (patron API inconsistente, testimonios auth pattern, programa-intensivo ubicacion de tipos)

---

## Supabase Expert

**Herramientas utilizadas**: Supabase MCP (list_tables, execute_sql, get_advisors, list_migrations), skill supabase-postgres-best-practices, lectura de 9 archivos *-service.ts.

**Tablas auditadas**: 16 tablas en schema public (blogs, categorias_blog, productos, profiles, compras, suscriptores_newsletter, configuracion_calendario, disponibilidad_semanal, bloqueos_calendario, reservas, programa_contenido, testimonios_masterclass, categorias_producto, tipos_producto, producto_faqs, docs).

**Migraciones**: 17 migraciones aplicadas (desde create_initial_schema hasta add_user_testimonial_fields).

### [CRITICO] Constraint de `origen` en suscriptores_newsletter no coincide con el codigo
- **Tabla/Query**: `suscriptores_newsletter` / `newsletter-service.ts`
- **Problema**: La columna `origen` tiene un CHECK constraint que solo permite 4 valores: `'home'`, `'newsletter_page'`, `'blog'`, `'quiz'`. Sin embargo, el codigo en `src/lib/newsletter-service.ts:16-17` acepta tambien `'recursos_gratuitos'` y `'guia_gratuita'` como valores validos del tipo TypeScript. Si alguna parte del codigo intenta insertar con esos origenes, Supabase rechazara la operacion con un error de CHECK constraint, causando fallo silencioso (el servicio es non-critical fallback).
- **SQL**: `CHECK ((origen = ANY (ARRAY['home'::text, 'newsletter_page'::text, 'blog'::text, 'quiz'::text])))`
- **Solucion**: RECOMENDACION. Agregar `'recursos_gratuitos'` y `'guia_gratuita'` al CHECK constraint:
  ```sql
  ALTER TABLE suscriptores_newsletter DROP CONSTRAINT suscriptores_newsletter_origen_check;
  ALTER TABLE suscriptores_newsletter ADD CONSTRAINT suscriptores_newsletter_origen_check
    CHECK (origen = ANY (ARRAY['home','newsletter_page','blog','quiz','recursos_gratuitos','guia_gratuita']));
  ```

### [ALTO] RLS policy INSERT en suscriptores_newsletter permite insercion irrestricta
- **Tabla/Query**: `suscriptores_newsletter`
- **Problema**: La policy `newsletter_insert_public` permite INSERT con `WITH CHECK (true)` para roles `anon` y `authenticated`. Cualquier usuario anonimo puede insertar filas directamente via la API REST de Supabase sin restriccion. Detectado por el advisor de seguridad de Supabase.
- **Solucion**: RECOMENDACION. Dado que las inserciones se hacen via `getServiceSupabase()` (service_role que bypasea RLS), eliminar la policy de INSERT para anon/authenticated.

### [ALTO] Funciones set_updated_at y handle_new_user sin search_path fijo
- **Tabla/Query**: Funciones `public.set_updated_at` y `public.handle_new_user`
- **Problema**: Ambas funciones no tienen `search_path` configurado (`proconfig` NULL). Esto permite search_path hijacking. `handle_new_user` es especialmente sensible porque se ejecuta como trigger SECURITY DEFINER en `auth.users`. Detectado por advisor de seguridad.
- **Solucion**: RECOMENDACION. Recrear con `SET search_path = ''`:
  ```sql
  CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
  AS $$ BEGIN
    INSERT INTO public.profiles (id, name)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', ''));
    RETURN NEW;
  END; $$;

  CREATE OR REPLACE FUNCTION public.set_updated_at()
  RETURNS trigger LANGUAGE plpgsql SET search_path = ''
  AS $$ BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END; $$;
  ```

### [ALTO] Leaked Password Protection deshabilitada en Supabase Auth
- **Tabla/Query**: Configuracion de Supabase Auth
- **Problema**: La proteccion contra contrasenas filtradas (HaveIBeenPwned) esta deshabilitada. Usuarios pueden usar contrasenas comprometidas. Detectado por advisor de seguridad.
- **Solucion**: RECOMENDACION. Habilitar en dashboard: Authentication > Configuration > Password Strength.

### [MEDIO] Politicas RLS usan `auth.uid()` sin subquery — re-evaluacion por cada fila
- **Tabla/Query**: `profiles`, `compras`, `reservas`, `testimonios_masterclass` (7 policies)
- **Problema**: Las policies usan `auth.uid()` directamente, causando re-evaluacion por fila. Detectado por advisor de performance. Afecta:
  - `profiles.profiles_select_own`, `profiles.profiles_update_own`
  - `compras.compras_select_own`
  - `reservas.Usuario ve sus reservas`
  - `testimonios_masterclass` (3 policies: insert, read, update own)
- **Solucion**: RECOMENDACION. Reemplazar `auth.uid()` con `(select auth.uid())`:
  ```sql
  ALTER POLICY compras_select_own ON compras USING ((select auth.uid()) = usuario);
  -- Repetir para las 7 policies afectadas
  ```

### [MEDIO] 5 Foreign keys sin indice covering
- **Tabla/Query**: `compras.producto`, `productos.categoria`, `productos.nivel`, `productos.producto_padre`, `producto_faqs.producto`
- **Problema**: 5 FKs sin indice. Impacta JOINs y cascading operations. Detectado por advisor de performance.
- **Solucion**: RECOMENDACION.
  ```sql
  CREATE INDEX idx_compras_producto ON compras (producto);
  CREATE INDEX idx_productos_categoria ON productos (categoria);
  CREATE INDEX idx_productos_nivel ON productos (nivel);
  CREATE INDEX idx_productos_producto_padre ON productos (producto_padre);
  CREATE INDEX idx_producto_faqs_producto ON producto_faqs (producto);
  ```

### [MEDIO] Falta indice en compras.stripe_session_id
- **Tabla/Query**: `compras`
- **Problema**: `getCompraByStripeSessionId()` en `compras-service.ts:80` busca por `stripe_session_id` sin indice. Se ejecuta en pagina de exito post-checkout.
- **Solucion**: RECOMENDACION. `CREATE INDEX idx_compras_stripe_session ON compras (stripe_session_id);`

### [MEDIO] Policies redundantes en testimonios_masterclass
- **Tabla/Query**: `testimonios_masterclass`
- **Problema**: Policy publica `Allow public read` (USING true) + policy `Users can read own testimonial` (USING usuario_id = auth.uid()). Para `authenticated`, ambas aplican (OR). La segunda es redundante. Detectado por advisor de performance.
- **Solucion**: RECOMENDACION. Eliminar `Users can read own testimonial` y agregar filtro `activo = true` a la policy publica.

### [MEDIO] Indice idx_compras_subscription reportado como no usado
- **Tabla/Query**: `compras.stripe_subscription_id`
- **Problema**: El indice nunca ha sido usado segun stats. Sin embargo, `cancelCompraBySubscription()` lo necesita en el flujo de webhook de cancelacion de suscripcion.
- **Solucion**: RECOMENDACION. Mantener — el advisor lo marca porque estadisticamente no ha sido utilizado aun. Re-evaluar tras mas tiempo en produccion.

### [BAJO] Queries con select('*') en tienda-service.ts
- **Tabla/Query**: `tienda-service.ts` (multiples queries)
- **Problema**: La mayoria de queries usan `select('*')` sobre `productos` (36 columnas). `getAllProductSlugs` solo necesita `slug`. `getPaymentPlans` ya usa select especifico (buena practica).
- **Solucion**: RECOMENDACION. Usar selects especificos donde sea posible. Prioridad baja (20 rows).

### [BAJO] compras-service.ts usa getServiceSupabase() para todas las operaciones
- **Tabla/Query**: `compras-service.ts`
- **Problema**: Todas las funciones de lectura usan `getServiceSupabase()` (service_role) bypaseando RLS. Funciones como `getUserCompras` y `getCompraForDownload` podrian usar `createServerSupabase()` para aprovechar RLS como defensa adicional.
- **Solucion**: RECOMENDACION. Usar cliente con auth para funciones en contexto de usuario autenticado.

### [OK] Integridad de datos — todo limpio
- **Verificaciones ejecutadas** (todas con 0 problemas):
  - Compras huerfanas sin usuario: 0
  - Compras huerfanas sin producto: 0
  - Profiles sin usuario auth correspondiente: 0
  - stripe_price_id duplicados en productos: 0
  - stripe_session_id vacios en compras: 0
  - Newsletter con origenes invalidos: 0

---

**Resumen Supabase Expert**: 11 hallazgos + 1 verificacion de datos limpia.
- CRITICO: 1 (constraint de origen desalineado con codigo)
- ALTO: 3 (RLS INSERT irrestricta en newsletter, funciones sin search_path, leaked password protection)
- MEDIO: 5 (RLS sin subquery x7 policies, 5 FKs sin indice, falta indice stripe_session_id, policies redundantes, indice no usado)
- BAJO: 2 recomendaciones (select *, service_role excesivo en compras) + 1 verificacion positiva

---

## Murphy's Law

**Archivos auditados**: Todas las funciones de transformacion (`transformProductRecord`, `transformBlogRecord`, `transformToAsesoriaPlan`, `mapCompra`, `profileToUser`), todas las API routes de descarga/PDF, todos los componentes que renderizan precios, blog PostContent (XSS), middleware, checkout flow completo.

### [CRITICO] XSS en contenido del blog — HTML sin sanitizar via dangerouslySetInnerHTML
- **Archivo**: `src/components/blog/PostContent.tsx:34` y `src/app/blog/[slug]/page.tsx:165`
- **Input**: Contenido HTML almacenado en `blogs.contenido` en Supabase, inyectado directamente al DOM
- **Efecto**: Si un administrador/editor inserta `<script>alert('xss')</script>` o `<img onerror="..." src="x">` en el campo `contenido`, el codigo se ejecuta en el navegador de todos los visitantes
- **Solucion**: CORREGIDO. Se instalo `isomorphic-dompurify` y se aplica `DOMPurify.sanitize()` al contenido antes de pasarlo a `PostContent`

### [CRITICO] SSRF en API de descargas y PDF — fetch a URLs arbitrarias desde el servidor
- **Archivo**: `src/app/api/descargas/[compraId]/route.ts:41` y `src/app/api/pdf/[compraId]/route.ts:32`
- **Input**: `download_url` de la tabla `productos` en Supabase, usado directamente en `fetch()` server-side
- **Efecto**: Si la URL en la DB se modifica a `http://169.254.169.254/latest/meta-data/` o cualquier servicio interno, el servidor Next.js haria la peticion, exponiendo datos internos (SSRF)
- **Solucion**: CORREGIDO. Se agrego validacion de URL que solo permite protocolo `https:` y hosts en allowlist (`securenlandco.b-cdn.net`, `remotecondani.b-cdn.net`)

### [CRITICO] Build roto — `listUsers({ filter })` usa parametro inexistente en Supabase SDK
- **Archivo**: `src/lib/auth-service.ts:92-96`
- **Input**: N/A (error de compilacion TypeScript)
- **Efecto**: `pnpm build` falla con `'filter' does not exist in type 'PageParams'`. Rompe el build completamente, impidiendo deploys a produccion
- **Solucion**: CORREGIDO. Se reemplazo `listUsers({ filter })` con loop de paginacion que filtra por email client-side. Tambien se corrigio el retry del race condition handler

### [ALTO] Division por cero en calculo de descuento
- **Archivo**: `src/components/tienda/ProductDetail.tsx:140`
- **Input**: `product.originalPrice = 0`
- **Efecto**: `Math.round((1 - product.price / product.originalPrice) * 100)` produce `NaN` o `Infinity`. Se renderiza "NaN% OFF" en la UI
- **Solucion**: CORREGIDO. Se agrego condicion `product.originalPrice > 0` al guard

### [MEDIO] Contenido de blog vacio produce texto por defecto con titulo interpolado
- **Archivo**: `src/app/blog/[slug]/page.tsx:128-152`
- **Input**: Un blog post con `contenido` vacio o null
- **Efecto**: Se genera contenido por defecto con `${article.title.toLowerCase()}` interpolado en HTML. Mitigado por la correccion de DOMPurify
- **Solucion**: MITIGADO por la correccion de XSS anterior

### [MEDIO] `authUser.email!` — non-null assertion en email de usuario autenticado
- **Archivo**: `src/lib/auth-service.ts:48,76,107,143,162`
- **Input**: Un usuario de Supabase Auth sin email (posible con providers phone-only)
- **Efecto**: Si `authUser.email` es `undefined`, el non-null assertion `!` propaga undefined como string, corrompiendo datos downstream
- **Solucion**: RECOMENDACION. Reemplazar `authUser.email!` con `authUser.email ?? ''` o agregar check explicito

### [MEDIO] `process.env.STRIPE_WEBHOOK_SECRET!` — crash si env var falta
- **Archivo**: `src/app/api/webhooks/stripe/route.ts:39`
- **Input**: Entorno sin `STRIPE_WEBHOOK_SECRET` configurado
- **Efecto**: Error criptico de Stripe SDK en vez de mensaje claro
- **Solucion**: RECOMENDACION. Agregar validacion de env vars criticas al inicio de la aplicacion

### [BAJO] formatPrice con precios negativos muestra formato incorrecto
- **Archivo**: `src/types/tienda.ts:190-212`
- **Input**: `price = -10`
- **Efecto**: `formatPrice(-10)` produce `"-$10.00"` que es visualmente confuso
- **Solucion**: RECOMENDACION. Agregar guard para precios negativos

### [OK] Supabase queries retornan null — servicios manejan correctamente
- **Verificado**: Todos los servicios usan `(data ?? []).map(...)` con try/catch

### [OK] transformProductRecord — campos null manejados correctamente
- **Verificado**: Todos los campos null tienen fallbacks adecuados

### [OK] Dashboard mi-cuenta — estado vacio implementado
- **Verificado**: Empty state con mensaje amigable y boton "Ir a la Tienda"

---

**Resumen Murphy's Law**: 4 problemas corregidos directamente en codigo, 4 recomendaciones, 3 verificados como correctos.
- CRITICO: 3 corregidos (XSS blog, SSRF descargas/PDF, build roto por listUsers filter)
- ALTO: 1 corregido (division por cero en descuento)
- MEDIO: 3 (1 mitigado por correccion XSS, 2 recomendaciones)
- BAJO: 1 recomendacion
- OK: 3 verificaciones positivas (null handling en queries, transforms, empty states)

---

## El Decimo Hombre

**Enfoque**: Argumentar en contra del consenso. Buscar escenarios que nadie esperaria en los flujos de negocio, tecnicos y de reservas.
**Archivos auditados**: webhook Stripe, checkout API, booking-engine, reservas-service, auth-service, compras-service, brevo.ts, middleware, disponibilidad API, reservas/crear API, auth endpoints (login, signup, change-password, forgot-password, callback, me).

### [CRITICO] No se manejan eventos de reembolso de Stripe (charge.refunded)
- **Archivo**: `src/app/api/webhooks/stripe/route.ts:54-264`
- **Escenario**: El webhook solo procesa `checkout.session.completed` y `customer.subscription.deleted`. No hay handler para `charge.refunded`, `charge.dispute.created`, ni `invoice.payment_failed`. Si se hace un reembolso desde el dashboard de Stripe, la compra queda como 'activa' en Supabase y el usuario mantiene acceso al producto indefinidamente. Tampoco se detectan disputas/chargebacks que podrian resultar en penalizaciones de Stripe.
- **Estado**: No manejado
- **Solucion**: Recomendacion — agregar handlers para `charge.refunded` (cambiar estado a 'reembolsada') y `invoice.payment_failed` (notificar/suspender). Requiere configurar estos eventos en el dashboard de Stripe > Webhooks.

### [CRITICO] Compra duplicada del mismo producto — sin constraint de unicidad
- **Archivo**: `src/lib/compras-service.ts:18-38`
- **Escenario**: No hay constraint UNIQUE en la tabla `compras` para la combinacion (usuario, producto) con estado='activa'. Si un usuario compra el mismo producto dos veces via sesiones de Stripe diferentes, se crean dos compras activas. El webhook tiene idempotencia por `stripe_session_id` (linea 78 del webhook), pero dos checkout sessions diferentes para el mismo producto crearian duplicados. Esto podria pasar si el usuario vuelve a la pagina del producto y compra de nuevo.
- **Estado**: Parcialmente manejado (idempotencia por session_id pero no por usuario+producto)
- **Solucion**: Recomendacion — agregar validacion en `createCompra` que verifique si ya existe una compra activa para ese (usuario, producto) antes de insertar. No corregido en codigo para no afectar flujos de pago parcial del Programa Intensivo donde un usuario tiene multiples compras de productos hijos.

### [CRITICO] API de reservas/crear sin autenticacion — stripeSessionId como unico token
- **Archivo**: `src/app/api/reservas/crear/route.ts:13-184`
- **Escenario**: La ruta `POST /api/reservas/crear` valida la sesion de Stripe como "prueba de pago" pero NO verifica que quien hace el request sea el dueno de esa sesion. El `stripeSessionId` aparece en la URL de redireccion post-checkout (`?session_id=cs_xxx`), por lo que no es secreto. Cualquier persona que intercepte o vea esta URL (ej: en logs del navegador, historial compartido, screen sharing) puede crear una reserva a nombre de otro usuario.
- **Estado**: No manejado
- **Solucion**: Recomendacion — Si el usuario esta autenticado, verificar que su email coincida con `session.customer_details.email`. Si no esta autenticado, considerar un token temporal firmado en vez de exponer el session_id. Complejidad: el usuario puede no estar logueado inmediatamente post-checkout.

### [ALTO] Reservas en fechas pasadas y sin respeto a diasAnticipacion — config definida pero no usada
- **Archivo**: `src/lib/reservas-service.ts:42-43,56-134` y `src/lib/booking-engine.ts:48-68`
- **Escenario**: Los parametros `diasAnticipacionMin: 1` y `diasAnticipacionMax: 30` se definen en la config (lineas 42-43) pero NUNCA se usan en la logica de `getAvailableSlots()` ni `createBooking()`. Un usuario podia reservar para el mismo dia (violando el minimo de 1 dia de anticipacion) o para 6 meses en el futuro (violando el maximo de 30 dias).
- **Estado**: No manejado -> CORREGIDO parcialmente
- **Solucion**: CORREGIDO. Se agrego validacion en `getAvailableSlots()` (slots pasados marcados como no disponibles) y en `createBooking()` (rechazo de fechas pasadas). Los parametros `diasAnticipacionMin/Max` aun no se validan en el backend — queda como recomendacion.

### [ALTO] Inconsistencia en longitud minima de contrasena: signup=6 vs change-password=8
- **Archivo**: `src/app/api/auth/signup/route.ts:15` y `src/app/api/auth/change-password/route.ts:21`
- **Escenario**: El endpoint de signup aceptaba contrasenas de 6+ caracteres, mientras que change-password exigia 8+ caracteres. Un usuario podia crear cuenta con contrasena de 6 chars y luego no poder "cambiarla" a la misma contrasena por no cumplir el minimo de 8.
- **Estado**: Parcialmente manejado -> CORREGIDO
- **Solucion**: CORREGIDO. Se unifico el minimo a 8 caracteres en signup (`src/app/api/auth/signup/route.ts:15`).

### [ALTO] Zona horaria del servidor vs usuario en reservas — new Date() sin offset
- **Archivo**: `src/lib/reservas-service.ts:105`, `src/lib/booking-engine.ts:116,141`
- **Escenario**: `new Date('2026-03-15T09:00:00')` sin offset se interpreta como UTC en Node.js (Vercel). Pero el usuario selecciona "9:00 AM" pensando en su zona horaria (ej: America/Lima = UTC-5). Google Calendar FreeBusy retorna ISO con offset Z. La comparacion de overlap puede dar falsos positivos/negativos. El `fechaHora` se guarda en Supabase sin offset explicito, creando ambiguedad permanente.
- **Estado**: Parcialmente manejado (se pasa timezone en config pero no se usa al parsear Date)
- **Solucion**: Recomendacion — construir DateTime con offset correcto usando el timezone del usuario. No corregido por complejidad — requiere refactor del flujo completo de fechas.

### [ALTO] PostHog tracking de cancelacion usaba customer ID en vez de email
- **Archivo**: `src/app/api/webhooks/stripe/route.ts:237-239`
- **Escenario**: En `customer.subscription.deleted`, el `distinctId` para PostHog se asignaba como `subscription.customer` (que es `cus_xxxx` de Stripe), NO el email. Todos los demas eventos usan email como distinctId. Esto rompe el funnel de conversion/retencion en PostHog.
- **Estado**: No manejado -> CORREGIDO
- **Solucion**: CORREGIDO. Se resuelve el email del customer desde Stripe API antes de enviar a PostHog.

### [MEDIO] Producto eliminado de Supabase rompe UX de mi-cuenta
- **Archivo**: `src/lib/compras-service.ts:41-55`, `src/components/mi-cuenta/Dashboard.tsx:424`
- **Escenario**: Si un producto se elimina de la tabla `productos`, las compras existentes mantienen el FK. El JOIN retorna null para productoDetail. En mi-cuenta, el ProductCard renderiza con datos null.
- **Estado**: Parcialmente manejado (optional chaining previene crashes, pero UX es mala)
- **Solucion**: Recomendacion — implementar soft-delete en productos o filtrar compras con productoDetail null en Dashboard.

### [MEDIO] Brevo sin retry — emails de contrasena temporal perdidos durante picos
- **Archivo**: `src/lib/brevo.ts:53-80`
- **Escenario**: `sendEmail()` no tiene retry logic. Si Brevo retorna 429 (rate limit) durante un pico de ventas, los emails se pierden. Critico para contrasenas temporales: el usuario no tiene forma de saber su password excepto via "Forgot password".
- **Estado**: No manejado
- **Solucion**: Recomendacion — agregar retry con backoff para errores 429/5xx, especialmente para emails criticos.

### [MEDIO] Disponibilidad de reservas es publica y sin rate limiting
- **Archivo**: `src/app/api/reservas/disponibilidad/route.ts:1-44`
- **Escenario**: `GET /api/reservas/disponibilidad` no requiere autenticacion ni rate limiting. Un scraper puede enumerar toda la agenda y generar costos en Google Calendar API.
- **Estado**: No manejado
- **Solucion**: Recomendacion — agregar rate limiting via middleware/Vercel WAF.

### [MEDIO] cancelCompraBySubscription no verificaba estado antes de cancelar
- **Archivo**: `src/lib/compras-service.ts:93-124`
- **Escenario**: La funcion cambiaba compras a 'cancelada' sin verificar estado actual. Una compra 'reembolsada' podria sobrescribirse a 'cancelada'.
- **Estado**: No manejado -> CORREGIDO
- **Solucion**: CORREGIDO. Se agrego verificacion de estado 'activa' antes de cancelar.

---

**Resumen El Decimo Hombre**: 4 problemas corregidos, 8 recomendaciones documentadas.
- CRITICO: 3 recomendaciones (reembolsos Stripe, compra duplicada, reservas sin auth)
- ALTO: 4 (3 corregidos: fechas pasadas en booking, password consistency, PostHog distinctId; 1 recomendacion: timezone)
- MEDIO: 4 (1 corregido: cancelCompra estado check; 3 recomendaciones)
- Archivos modificados: `booking-engine.ts`, `reservas-service.ts`, `signup/route.ts`, `webhooks/stripe/route.ts`, `compras-service.ts`


---

## Teorico del Caos

**Archivos auditados**: auth-service.ts, stripe webhook, checkout route, booking-engine.ts, reservas-service.ts, google-calendar.ts, zoom.ts, newsletter route, newsletter-service.ts, brevo.ts, stripe.ts, posthog-server.ts, instrumentation-client.ts, CheckoutButton.tsx, CommunityCheckoutButton.tsx, TimeSlotPicker.tsx, CalendarGrid.tsx, useCheckoutAuth.ts, useNewsletterForm.ts, Navigation.tsx, supabase/server.ts.

### [CRITICO] Race condition en findOrCreateUser -- webhooks simultaneos creaban usuarios duplicados
- **Archivo**: src/lib/auth-service.ts:83-182
- **Condicion**: Dos webhooks de Stripe llegan simultaneamente para el mismo email (ej: compra + suscripcion). Ambos ejecutan listUsers(), no encuentran al usuario, y ambos ejecutan createUser(). El segundo falla con error "already been registered" y la funcion lanzaba una excepcion sin recuperarse.
- **Impacto**: La compra del segundo webhook se perdia completamente. El usuario no recibia el email de bienvenida ni la compra quedaba registrada.
- **Solucion**: CORREGIDO. Se agrego manejo del error de duplicado en createUser(): cuando Supabase retorna error 422 o "already been registered", se hace un retry buscando al usuario recien creado por el request concurrente y se retorna como usuario existente (isNew: false).

### [ALTO] Race condition TOCTOU en booking system -- doble reserva del mismo slot
- **Archivo**: src/lib/booking-engine.ts:65-76
- **Condicion**: Dos usuarios llaman a createBooking() al mismo tiempo para el mismo horario. Ambos ejecutan isSlotAvailable() que retorna true, luego ambos ejecutan createReserva() exitosamente. Resultado: dos reservas para el mismo slot con dos reuniones Zoom y dos eventos de Google Calendar.
- **Impacto**: Doble reserva real que requiere cancelacion manual.
- **Solucion**: RECOMENDACION. Agregar un UNIQUE constraint en Supabase sobre (fecha_hora, estado) donde estado IN (pendiente, confirmada), o usar un advisory lock. Requiere cambio de DB.

### [ALTO] Race condition TOCTOU en Google Calendar -- FreeBusy vs event creation
- **Archivo**: src/lib/booking-engine.ts:65-128 y src/lib/reservas-service.ts:56-133
- **Condicion**: isSlotAvailable() consulta FreeBusy de Google Calendar y reservas en Supabase. Entre esta consulta y la creacion del evento en Google Calendar, otro sistema o persona puede crear un evento manualmente en el mismo horario.
- **Impacto**: Sesiones solapadas en Google Calendar si alguien agenda algo manualmente entre el check y la creacion.
- **Solucion**: RECOMENDACION. Limitacion inherente de la API de Google Calendar. Mitigacion: verificar FreeBusy nuevamente justo antes de crear el evento.

### [MEDIO] Doble click en CheckoutButton crea multiples Stripe sessions
- **Archivo**: src/components/tienda/CheckoutButton.tsx:105-119 y src/components/stages/CommunityCheckoutButton.tsx:96-102
- **Condicion**: Para usuarios autenticados, handleClick() llamaba a goToCheckout() directamente. Un doble-click rapido ejecutaba goToCheckout() dos veces, creando dos sesiones de Stripe.
- **Impacto**: Dos pestanas de Stripe checkout abiertas. El usuario podria pagar en ambas y generar una compra duplicada.
- **Solucion**: CORREGIDO. Se agrego if (loading) return; al inicio de handleClick() en ambos componentes.

### [MEDIO] Stale state en TimeSlotPicker -- respuestas desactualizadas sobrescriben datos correctos
- **Archivo**: src/components/asesorias/TimeSlotPicker.tsx:25-44
- **Condicion**: El usuario selecciona fecha A, se dispara fetch. Antes de que responda, selecciona fecha B, se dispara otro fetch. La respuesta de A llega despues y sobrescribe los slots de B.
- **Impacto**: El usuario ve horarios de la fecha incorrecta y podria reservar un slot no disponible.
- **Solucion**: CORREGIDO. Se agrego patron de cancelacion con variable cancelled en el useEffect.

### [MEDIO] Stale state en CalendarGrid -- cambio rapido de mes causa resultados inconsistentes
- **Archivo**: src/components/asesorias/CalendarGrid.tsx:31-73
- **Condicion**: El usuario navega de enero a febrero rapidamente. Se lanzan ~30 fetches paralelos por mes. Las respuestas de enero pueden llegar despues que las de febrero y sobrescribir availableDates con datos del mes incorrecto.
- **Impacto**: El calendario muestra dias disponibles del mes anterior mezclados con el mes actual.
- **Solucion**: CORREGIDO. Se reestructuro el useEffect con patron de cancelacion cancelled. Se elimino useCallback innecesario.

### [MEDIO] State update despues de unmount en useCheckoutAuth
- **Archivo**: src/hooks/useCheckoutAuth.ts:24-39
- **Condicion**: El componente que usa useCheckoutAuth se desmonta antes de que el fetch a /api/auth/me complete. La respuesta llega y ejecuta setState() en un componente desmontado.
- **Impacto**: Anti-patron que puede causar bugs sutiles en desarrollo.
- **Solucion**: CORREGIDO. Se agrego patron de cancelacion con variable cancelled en el useEffect.

### [MEDIO] Zoom token cache -- requests concurrentes generan multiples OAuth calls
- **Archivo**: src/lib/zoom.ts:20-61
- **Condicion**: Dos bookings se crean simultaneamente. Ambos llaman a getZoomAccessToken(), encuentran que cachedToken es null, y ambos hacen una llamada OAuth a Zoom.
- **Impacto**: Llamadas OAuth innecesarias. Puede causar rate limiting con Zoom.
- **Solucion**: CORREGIDO. Se agrego patron de deduplicacion con pendingTokenRequest -- si ya hay un request en vuelo, los calls concurrentes esperan el mismo resultado.

### [BAJO] Newsletter signup -- duplicado en Supabase por race condition
- **Archivo**: src/lib/newsletter-service.ts:8-61
- **Condicion**: Dos requests de newsletter para el mismo email llegan simultaneamente. Ambos ejecutan SELECT, no encuentran subscriber, y ambos ejecutan INSERT. El segundo falla con error de unique constraint.
- **Impacto**: El usuario veria un error generico en la UI.
- **Solucion**: CORREGIDO. Se reemplazo el patron SELECT-then-INSERT por un upsert atomico con onConflict: email.

### [BAJO] getStripe() lazy init -- no es un problema real
- **Archivo**: src/lib/stripe.ts:1-16
- **Condicion**: Multiples requests simultaneos encuentran _stripe como null y crean multiples instancias.
- **Impacto**: NINGUNO. Node.js es single-threaded y la creacion es sincrona.
- **Solucion**: No requiere cambios.

### [BAJO] Brevo API clients -- misma situacion que getStripe
- **Archivo**: src/lib/brevo.ts:23-46
- **Condicion**: Lazy init sincrona identica a getStripe.
- **Impacto**: NINGUNO.
- **Solucion**: No requiere cambios.

### [BAJO] React.cache() en server components -- funciona correctamente
- **Archivo**: src/lib/supabase/server.ts, src/lib/auth-service.ts, src/lib/compras-service.ts
- **Condicion**: React.cache() es per-request en Server Components. No hay estado compartido entre requests.
- **Impacto**: NINGUNO. Uso correcto.
- **Solucion**: No requiere cambios.

### [BAJO] PostHog server-side -- instancia nueva por uso sin singleton
- **Archivo**: src/lib/posthog-server.ts:1-7
- **Condicion**: getPostHogServer() crea una nueva instancia de PostHog en cada llamada con shutdown() despues.
- **Impacto**: Ineficiencia leve. No hay race condition.
- **Solucion**: RECOMENDACION. Considerar un singleton con flush periodico.

---

**Resumen Teorico del Caos**: 7 problemas corregidos directamente en codigo, 6 analizados sin accion necesaria o con recomendacion.
- CRITICO: 1 corregido (findOrCreateUser race condition)
- ALTO: 2 recomendaciones (booking TOCTOU, Google Calendar TOCTOU -- requieren cambios de DB)
- MEDIO: 5 corregidos (CheckoutButton doble click, TimeSlotPicker stale state, CalendarGrid stale state, useCheckoutAuth post-unmount, Zoom token dedup)
- BAJO: 5 (1 corregido newsletter upsert, 4 analizados sin accion necesaria)

---

## Experto en Espanol

**Archivos auditados**: 30+ archivos incluyendo todos los componentes, paginas, datos estaticos y templates de email.

**Patron dominante**: Tildes/acentos faltantes de forma sistematica, especialmente en la seccion mi-cuenta y en templates de email. Causa probable: desarrollo sin teclado con soporte de acentos espanol.

### [ALTO] Tildes faltantes masivas en email-templates.ts (CORREGIDO)
- **Archivo**: src/lib/email-templates.ts
- **Errores corregidos** (30+):
  - `suscripcion` → `suscripción` (x2)
  - `area` → `área` (x2)
  - `Contrasena` → `Contraseña`, `contrasena` → `contraseña` (x5)
  - `sesion` → `sesión` (x7)
  - `Aqui` → `Aquí`
  - `guias` → `guías`
  - `recibiras` → `recibirás`
  - `Tambien` → `También`
  - `reunion` → `reunión`
  - `esta activa` → `está activa`
  - `Unite` → `Únete`
  - `Duracion` → `Duración` (x2)
  - `estrategicos` → `estratégicos` (x2)
  - `ayudare` → `ayudaré` (x2)
  - `podras` → `podrás`
  - `boton` → `botón`
  - `cambiara` → `cambiará`
  - `encontraras` → `encontrarás`
  - `asesoria` → `asesoría`
  - `dias` → `días`
  - `manana` → `mañana`
  - `maximo` → `máximo`
  - `asi` → `así`
  - `Bienvenida, X!` → `¡Bienvenida, X!` (x3, signos de apertura faltantes)
- **Tipo**: Ortografia - tildes faltantes
- **Impacto**: Emails enviados a usuarios con errores ortograficos visibles

### [ALTO] Tildes faltantes masivas en LoginForm.tsx (CORREGIDO)
- **Archivo**: src/components/mi-cuenta/LoginForm.tsx
- **Errores corregidos** (12):
  - `sesion` → `sesión` (x5: "Iniciar sesion", "inicio de sesion", "Iniciar Sesion", "Volver al inicio de sesion")
  - `conexion` → `conexión` (x1)
  - `Unete` → `Únete` (x1)
  - `contrasena` → `contraseña` (x3: label, placeholder, enlace)
  - `Minimo` → `Mínimo` (x1)
  - `recibiras` → `recibirás` (x1)
- **Tipo**: Ortografia - tildes faltantes

### [ALTO] Tildes faltantes masivas en ChangePasswordModal.tsx (CORREGIDO)
- **Archivo**: src/components/mi-cuenta/ChangePasswordModal.tsx
- **Errores corregidos** (15+):
  - `Contrasena` / `contrasena` → `Contraseña` / `contraseña` (todas las instancias: titulo, labels, placeholders, mensajes de error, boton submit)
  - `contrasenas` → `contraseñas`
  - `conexion` → `conexión`
  - `Minimo` → `Mínimo`
- **Tipo**: Ortografia - tildes faltantes

### [ALTO] Tildes faltantes masivas en ResetPasswordForm.tsx (CORREGIDO)
- **Archivo**: src/components/mi-cuenta/ResetPasswordForm.tsx
- **Errores corregidos** (14+):
  - `contrasena` → `contraseña` (todas las instancias)
  - `Contrasena` → `Contraseña` (titulos y botones)
  - `contrasenas` → `contraseñas`
  - `conexion` → `conexión`
  - `invalido` → `inválido`
  - `sesion` → `sesión`
  - `Minimo` → `Mínimo`
- **Tipo**: Ortografia - tildes faltantes

### [MEDIO] Tildes y puntuacion faltantes en Dashboard.tsx (CORREGIDO)
- **Archivo**: src/components/mi-cuenta/Dashboard.tsx
- **Errores corregidos** (6):
  - `Error de conexion` → `Error de conexión`
  - `Estas segura de que quieres cancelar esta reserva?` → `¿Estás segura de que quieres cancelar esta reserva?`
  - `Cambiar Contrasena` → `Cambiar Contraseña`
  - `Cerrar Sesion` → `Cerrar Sesión`
  - `Mis Asesorias` → `Mis Asesorías`
  - `Aun no tienes productos` → `Aún no tienes productos`
- **Tipo**: Ortografia - tildes faltantes + puntuacion (signo de apertura)

### [MEDIO] Tildes faltantes en TestimonialModal.tsx (CORREGIDO)
- **Archivo**: src/components/mi-cuenta/TestimonialModal.tsx
- **Errores corregidos** (10):
  - `imagenes` → `imágenes`
  - `profesion` → `profesión` (x2: error msg + label)
  - `conexion` → `conexión`
  - `Sera revisado` → `Será revisado`
  - `calificacion` → `calificación`
  - `Cuenta como` → `Cuenta cómo`
  - `Disenadora Grafica` → `Diseñadora Gráfica`
  - `pagina` → `página`
  - `sera revisado` → `será revisado`
  - `Gracias!` → `¡Gracias!`
- **Tipo**: Ortografia - tildes faltantes + ñ faltante

### [MEDIO] Tilde faltante en CTASection.tsx (CORREGIDO)
- **Archivo**: src/components/CTASection.tsx
- **Error corregido**: `¿Estas list@` → `¿Estás list@`
- **Tipo**: Ortografia - tilde faltante en verbo "estar"

### [MEDIO] Tildes faltantes en metadata sobre-mi/page.tsx (CORREGIDO)
- **Archivo**: src/app/sobre-mi/page.tsx
- **Errores corregidos** (4):
  - `Sobre Mi` → `Sobre Mí` (x2: title + OG title)
  - `interprete` → `intérprete` (x2: description + OG description)
- **Tipo**: Ortografia - tildes faltantes en metadata SEO

### [MEDIO] Tildes faltantes en metadata masterclass-gratuita/page.tsx (CORREGIDO)
- **Archivo**: src/app/masterclass-gratuita/page.tsx
- **Errores corregidos** (3):
  - `como iniciar` → `cómo iniciar` (x2: description + OG description)
  - `practico` → `práctico` (x1: description)
- **Tipo**: Ortografia - tildes faltantes en metadata SEO

### [MEDIO] Tildes y puntuacion faltantes en MasterclassHero.tsx (CORREGIDO)
- **Archivo**: src/components/masterclass/MasterclassHero.tsx
- **Errores corregidos** (3):
  - `100% Practico` → `100% Práctico`
  - `Empieza tu camino remoto hoy!` → `¡Empieza tu camino remoto hoy!`
  - `contenido practico` → `contenido práctico`
- **Tipo**: Ortografia - tildes faltantes + signo de apertura

### [BAJO] Signo de exclamacion de apertura faltante en SobreMiHeroSection.tsx (CORREGIDO)
- **Archivo**: src/components/sobre-mi/SobreMiHeroSection.tsx
- **Error corregido**: `Tu Coach de Trabajo Remoto!` → `¡Tu Coach de Trabajo Remoto!`
- **Tipo**: Puntuacion - signo de apertura faltante

### [BAJO] Signo de exclamacion de apertura faltante en IntroSection.tsx (CORREGIDO)
- **Archivo**: src/components/sobre-mi/IntroSection.tsx
- **Error corregido**: `Hola! Soy` → `¡Hola! Soy`
- **Tipo**: Puntuacion - signo de apertura faltante

### Archivos revisados sin errores encontrados
- src/data/faq-data.tsx
- src/data/tienda-data.ts
- src/data/blog-data.ts
- src/data/asesorias-data.ts
- src/data/programa-intensivo-data.ts
- src/components/HeroSection.tsx
- src/components/AboutSection.tsx
- src/components/Footer.tsx
- src/components/Navigation.tsx
- src/components/StagesSection.tsx
- src/components/NewsletterSection.tsx
- src/components/NewsletterFormCard.tsx
- src/components/ServicesSection.tsx
- src/components/BlogPreviewSection.tsx
- src/components/TestimonialsSection.tsx
- src/components/info/InfoHero.tsx
- src/components/info/ContactoSection.tsx
- src/components/tienda/TiendaHero.tsx
- src/components/asesorias/AsesoriaHero.tsx
- src/app/page.tsx, layout.tsx, info/page.tsx, empezar/page.tsx
- src/app/newsletter/page.tsx, tienda/page.tsx, blog/page.tsx
- src/app/asesorias/page.tsx, recursos-gratuitos/page.tsx, servicios/page.tsx

---

**Resumen Experto en Espanol**: 100+ errores corregidos directamente en codigo, 30+ archivos revisados.
- ALTO: 4 archivos criticos corregidos (email-templates.ts, LoginForm.tsx, ChangePasswordModal.tsx, ResetPasswordForm.tsx) — patron sistematico de tildes faltantes
- MEDIO: 6 archivos corregidos (Dashboard.tsx, TestimonialModal.tsx, CTASection.tsx, sobre-mi/page.tsx, masterclass-gratuita/page.tsx, MasterclassHero.tsx)
- BAJO: 2 archivos corregidos (SobreMiHeroSection.tsx, IntroSection.tsx) — signos de apertura faltantes
- Sin errores: 25+ archivos revisados sin problemas

---

## Chrome DevTools Specialist

Auditoria visual completa del sitio remotecondani.com (localhost:3000) usando Chrome DevTools MCP.

**Paginas auditadas**: /, /sobre-mi, /blog, /tienda, /asesorias, /empezar, /info, /newsletter, /recursos-gratuitos, /servicios
**Viewports testeados**: Mobile (375x667), Tablet (768x1024), Desktop (1920x1080)

### [CRITICO] Texto placeholder "AQUI VA EL TEXTO PREVIEW" visible en blog
- **Pagina**: / (home) y /blog
- **Viewport**: todos
- **Screenshot**: test/blog-desktop.png, test/home-desktop-1920.png
- **Problema**: El primer articulo del blog muestra "AQUI VA EL TEXTO PREVIEW" como texto de preview en lugar de un resumen real del contenido. Esto es visible tanto en la seccion de blog de la landing como en la pagina /blog. El articulo afectado es "Viajar y trabajar: lo que aprendi intentando ser nomada digital".
- **Solucion**: Actualizar el campo `preview_text` del articulo en la tabla `blogs` de Supabase.

### [CRITICO] Secciones de /asesorias con enorme espacio vacio — planes de pricing no visibles
- **Pagina**: /asesorias
- **Viewport**: desktop y mobile
- **Screenshot**: test/asesorias-desktop.png, test/asesorias-mobile-375.png
- **Problema**: Entre el hero section (con boton "VER OPCIONES") y las cards de politicas al fondo, hay un enorme espacio vacio donde deberian estar los planes de pricing. La seccion de planes parece no renderizarse o tener contenido invisible. Esto es critico porque es la pagina de conversion principal para asesorias.
- **Solucion**: Investigar el componente de planes de asesoria. Posiblemente los datos de Supabase no estan cargando, hay un error silencioso en el fetch, o las animaciones de scroll-reveal no se activan correctamente.

### [CRITICO] Cards de servicios no visibles en /servicios mobile
- **Pagina**: /servicios
- **Viewport**: mobile (375x667)
- **Screenshot**: test/servicios-mobile-375.png
- **Problema**: Las tres cards de servicios (Consultoria, Asesoria, Programa Intensivo) que son visibles en desktop no aparecen en mobile. Solo se ve el subtitulo y un enorme espacio vacio donde deberian estar las cards. En desktop (test/servicios-desktop.png) las cards si son visibles.
- **Solucion**: Revisar las CSS responsive de las cards de servicios. Posible problema con animaciones de scroll (motion/framer-motion) que no se activan en mobile viewport, o un breakpoint CSS que oculta las cards incorrectamente.

### [ALTO] Warning persistente de imagen logo sin aspect ratio en TODAS las paginas
- **Pagina**: Todas las paginas del sitio
- **Viewport**: todos
- **Problema**: Console warning en cada pagina: `Image with src "/images/logos/logo-blanco-small.png" has either width or height modified, but not the other. If you use CSS to change the size of your image, also include the styles 'width: "auto"' or 'height: "auto"' to maintain the aspect ratio.`
- **Solucion**: En el componente de Header/Navbar y Footer donde se usa el logo, agregar `style={{ width: 'auto' }}` o `style={{ height: 'auto' }}` al componente `<Image>` de Next.js.

### [ALTO] Imagenes del blog sin prop `sizes` y LCP sin `loading="eager"`
- **Pagina**: /blog
- **Viewport**: desktop
- **Problema**: Dos warnings de Next.js Image optimization:
  1. Imagen con `fill` pero sin prop `sizes` — impacta el rendimiento al no poder optimizar el tamano de imagen servida.
  2. Imagen detectada como LCP sin `loading="eager"` — la imagen se carga lazy por defecto, retrasando la metrica LCP.
- **Solucion**: Agregar prop `sizes` a las imagenes de blog con fill (ej: `sizes="(max-width: 768px) 100vw, 50vw"`), y `loading="eager"` y `priority` a la imagen del articulo destacado.

### [ALTO] Forced reflows causados por PostHog recorder y TestimonialCard
- **Pagina**: / (home)
- **Viewport**: desktop
- **Problema**: El performance trace detecto forced reflows (26ms total) causados por:
  1. `posthog-recorder.js` (26ms) — El session recorder de PostHog fuerza reflows al leer propiedades geometricas del DOM.
  2. `TestimonialCard.useEffect` (6ms) — El componente de testimonios lee dimensiones del DOM en useEffect causando layout thrashing.
  3. `framer-motion measureScroll` (3ms) — Motion mide scroll positions sincronamente.
- **Solucion**: Para TestimonialCard, considerar usar ResizeObserver o requestAnimationFrame en lugar de leer offsetWidth/offsetHeight directamente en useEffect. Para PostHog, evaluar si el session recorder es necesario en produccion.

### [ALTO] Contenido de /recursos-gratuitos casi vacio — secciones sin contenido
- **Pagina**: /recursos-gratuitos
- **Viewport**: desktop y mobile
- **Screenshot**: test/recursos-gratuitos-desktop.png, test/recursos-gratuitos-mobile-375.png
- **Problema**: La pagina muestra 4 iconos de categorias (Masterclass, Blog, Comunidad, Newsletter) pero solo la seccion de Masterclass tiene contenido visible. Las secciones de Blog, Comunidad y Newsletter aparecen como espacios vacios enormes. Esto da una mala impresion al usuario.
- **Solucion**: Verificar que las secciones de cada categoria renderizan contenido. Si el contenido depende de datos de Supabase, puede haber un error de fetch silencioso. Si las secciones aun no tienen contenido real, considerar ocultarlas temporalmente.

### [ALTO] Doble llamada a /api/auth/me en /recursos-gratuitos
- **Pagina**: /recursos-gratuitos
- **Viewport**: todos
- **Problema**: La pagina hace DOS peticiones GET a `/api/auth/me`, ambas retornando 401 para usuarios no autenticados. Esto es una llamada duplicada innecesaria que genera 2 errores en consola y latencia extra. En /asesorias se hace 1 llamada.
- **Solucion**: Verificar que el hook de autenticacion (probablemente `useCheckoutAuth` u otro hook custom) no se monte dos veces. Puede ser un issue de React StrictMode en dev, pero tambien indica falta de deduplicacion en el cliente.

### [ALTO] API /api/auth/me retorna 401 generando error de consola para usuarios no autenticados
- **Pagina**: /asesorias, /recursos-gratuitos
- **Viewport**: todos
- **Problema**: `Failed to load resource: the server responded with a status of 401 (Unauthorized)` aparece en consola. El endpoint retorna 401 para usuarios no autenticados, lo cual genera ruido en la consola del browser y puede alarmar a desarrolladores.
- **Solucion**: El endpoint deberia retornar 200 con `{ user: null }` para usuarios no autenticados, o el fetch del cliente deberia usar `credentials: 'same-origin'` y manejar el 401 sin loguearlo como error.

### [MEDIO] Warning de contenedor sin posicion no-estatica en /sobre-mi
- **Pagina**: /sobre-mi
- **Viewport**: desktop
- **Problema**: Console warning: `Please ensure that the container has a non-static position, like 'relative', 'fixed', or 'absolute' to ensure scroll offset is calculated correctly.` Proviene del sistema de scroll-based animations de Motion.
- **Solucion**: Agregar `className="relative"` (Tailwind) al contenedor padre que usa scroll-based animations en la pagina sobre-mi.

### [MEDIO] Espacio excesivo en /tienda — solo 1 producto visible
- **Pagina**: /tienda
- **Viewport**: desktop
- **Screenshot**: test/tienda-desktop.png
- **Problema**: La tienda solo muestra 1 producto ("Ruta Remota Paso a Paso") con un enorme espacio vacio debajo hasta el footer. El layout no se adapta al poco contenido.
- **Solucion**: Si solo hay 1 producto disponible, ajustar el layout para no dejar tanto espacio vacio. Considerar un min-height adaptivo, contenido complementario ("Proximamente"), o un CTA hacia asesorias.

### [MEDIO] Popup de Masterclass gratuita obstruye contenido en mobile
- **Pagina**: Todas las paginas
- **Viewport**: mobile especialmente
- **Screenshot**: test/servicios-mobile-375.png
- **Problema**: El popup flotante de "Masterclass de 2 horas" aparece en la esquina inferior izquierda de todas las paginas. En mobile obstruye parcialmente el contenido principal y compite con el boton flotante de WhatsApp. Tiene un boton "Cerrar" pero re-aparece en cada navegacion.
- **Solucion**: Considerar hacer el popup menos intrusivo en mobile (mas pequeno o como un banner slim), y respetar el cierre del usuario usando localStorage/sessionStorage para no mostrarlo de nuevo en la sesion.

### [BAJO] LCP image hero con Cache-Control "must-revalidate"
- **Pagina**: / (home)
- **Viewport**: desktop
- **Problema**: La imagen LCP (dani-blazer-hero.png) tiene header `Cache-Control: public, max-age=0, must-revalidate`. Esto significa que cada visita revalida la imagen con el servidor. En dev es normal, pero en produccion (Vercel) deberia verificarse que las imagenes optimizadas de Next.js tengan un TTL de cache adecuado.
- **Solucion**: Verificar la config de `next.config.ts` para `images.minimumCacheTTL` y asegurarse de que en produccion las imagenes tengan cache headers apropiados.

### [BAJO] Texto "Ruta Remote conDani" — falta espacio visual
- **Pagina**: / (home)
- **Viewport**: todos
- **Problema**: El heading H2 "Ruta Remote conDani" tiene un line break que visualmente hace que "con" y "Dani" parezcan una sola palabra "conDani". En el DOM el texto tiene un newline entre "con" y "Dani" pero sin espacio explicito.
- **Solucion**: Agregar un espacio explicito o usar `{' '}` en JSX antes de "Dani" para que el line break no junte las palabras.

### [BAJO] Heading CTA "enmodo remoto" — falta espacio
- **Pagina**: / (home)
- **Viewport**: todos
- **Problema**: El heading H2 del CTA final dice "para vivir enmodo remoto?" donde "en" y "modo" estan unidos como "enmodo".
- **Solucion**: Agregar un espacio entre "en" y "modo" en el componente CTA del home.

---

### Performance Summary (Landing Page /)

| Metrica | Valor | Estado |
|---------|-------|--------|
| LCP | 934ms | Aceptable (< 2.5s) |
| CLS | 0.00 | Excelente |
| TTFB | 795ms | Alto (dev server, esperado) |
| Forced Reflows | 26ms | Medio |

**Elemento LCP**: Imagen hero `dani-blazer-hero.png` (IMG, 640px)
**Breakdown LCP**: TTFB 85.1% | Load delay 6.9% | Load duration 0.5% | Render delay 7.5%

### Accesibilidad

- **Skip-to-content**: FUNCIONA. El primer Tab focus va al link "Saltar al contenido principal" que apunta a `#main-content`.
- **Tab navigation**: Los elementos interactivos (links del nav, botones, formularios) son alcanzables por teclado en orden logico.
- **prefers-reduced-motion**: Documentado como implementado (desactiva animaciones).

### Consola por Pagina

| Pagina | Errors | Warnings |
|--------|--------|----------|
| / | 0 | 1 (logo aspect ratio) |
| /sobre-mi | 0 | 2 (container position + logo) |
| /blog | 0 | 3 (logo + image sizes + LCP eager) |
| /tienda | 0 | 1 (logo) |
| /asesorias | 1 (401 auth) | 1 (logo) |
| /empezar | 0 | 1 (logo) |
| /info | 0 | 1 (logo) |
| /newsletter | 0 | 0 (limpio) |
| /recursos-gratuitos | 2 (401 auth x2) | 1 (logo) |
| /servicios | 0 | 1 (logo) |

### Screenshots Generados

**Desktop (1920x1080)**: home-desktop-1920.png, sobre-mi-desktop.png, blog-desktop.png, tienda-desktop.png, asesorias-desktop.png, empezar-desktop.png, info-desktop.png, newsletter-desktop.png, recursos-gratuitos-desktop.png, servicios-desktop.png

**Mobile (375x667)**: home-mobile-375.png, sobre-mi-mobile-375.png, blog-mobile-375.png, tienda-mobile-375.png, asesorias-mobile-375.png, empezar-mobile-375.png, info-mobile-375.png, newsletter-mobile-375.png, recursos-gratuitos-mobile-375.png, servicios-mobile-375.png

**Tablet (768x1024)**: home-tablet-768.png

**Performance trace**: perf-trace-home.json

---

**Resumen Chrome DevTools Specialist**: 15 hallazgos totales — 3 CRITICOS, 6 ALTOS, 3 MEDIOS, 3 BAJOS.
- CRITICOS: placeholder de blog visible, planes de asesorias no renderizan, cards de servicios invisibles en mobile
- ALTOS: logo warning global, imagenes blog sin optimizar, forced reflows, recursos-gratuitos vacio, auth 401 duplicado, auth 401 como error
- MEDIOS: container position en sobre-mi, tienda con espacio excesivo, popup masterclass intrusivo en mobile
- BAJOS: cache LCP, "conDani" sin espacio, "enmodo" sin espacio
