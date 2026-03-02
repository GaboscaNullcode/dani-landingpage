# Guia de Imagenes de Productos

Cada producto tiene **3 variantes de imagen** optimizadas para los distintos lugares donde se muestran en la web. Solo la imagen principal es obligatoria; las otras dos son opcionales y si no se suben, se usa la principal como fallback.

---

## Resumen rapido

| Imagen | Campo en Supabase | Ratio | Tamano recomendado | Donde se usa |
|--------|-------------------|-------|--------------------|--------------|
| Principal (portrait) | `imagen_url` | 3:4 | **900 x 1200 px** | Cards de la tienda |
| Hero (landscape) | `imagen_hero_url` | 4:3 | **1200 x 900 px** | Pagina de detalle del producto |
| Banner (widescreen) | `imagen_banner_url` | 16:9 | **960 x 540 px** | Dashboard de mi-cuenta |

---

## Detalle por variante

### 1. Imagen Principal (`imagen_url`)

- **Ratio**: 3:4 (vertical/portrait)
- **Tamano**: 900 x 1200 px
- **Donde aparece**:
  - Cards de productos en la tienda (`/tienda`)
  - Card de producto destacado
  - Thumbnails compactos
- **Tips**:
  - Es la imagen principal y **obligatoria**
  - Si no subes las otras variantes, esta se usa en todos los contextos
  - Centra el contenido importante (texto, logos, caras) en el area central

### 2. Imagen Hero (`imagen_hero_url`)

- **Ratio**: 4:3 (horizontal/landscape)
- **Tamano**: 1200 x 900 px
- **Donde aparece**:
  - Pagina de detalle del producto (`/tienda/[slug]`)
  - Se muestra grande al lado de la informacion del producto
- **Tips**:
  - Ideal para mostrar el producto de forma mas amplia y visual
  - Usa esta variante para evitar que la imagen portrait se recorte en landscape
  - Si no se sube, se usa `imagen_url` como fallback

### 3. Imagen Banner (`imagen_banner_url`)

- **Ratio**: 16:9 (widescreen)
- **Tamano**: 960 x 540 px
- **Donde aparece**:
  - Dashboard del usuario (`/mi-cuenta`)
  - Cards de productos comprados, bloqueados y gratuitos
- **Tips**:
  - El formato es panoramico, similar a un thumbnail de YouTube
  - Evita poner texto importante en los bordes superior e inferior (se pueden recortar)
  - Si no se sube, se usa `imagen_url` como fallback

---

## Formato y optimizacion

- **Formato recomendado**: JPG o WebP
- **Calidad**: 80-90% (buen balance entre calidad y peso)
- **Peso maximo sugerido**: 200 KB por imagen
- **Subir a**: BunnyCDN (`remotecondani.b-cdn.net`) y pegar la URL en el campo correspondiente de Supabase

---

## Ejemplo visual

```
imagen_url (3:4)          imagen_hero_url (4:3)       imagen_banner_url (16:9)
 ┌─────────┐              ┌───────────────┐           ┌─────────────────────┐
 │         │              │               │           │                     │
 │         │              │               │           │                     │
 │  900 x  │              │  1200 x 900   │           │    960 x 540        │
 │  1200   │              │               │           │                     │
 │         │              │               │           └─────────────────────┘
 │         │              └───────────────┘
 └─────────┘
 Cards tienda             Pagina detalle              Dashboard mi-cuenta
```
