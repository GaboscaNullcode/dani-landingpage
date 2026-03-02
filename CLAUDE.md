# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install        # Install dependencies
pnpm dev            # Development server (localhost:3000)
pnpm build          # Production build (also validates TypeScript + ESLint)
pnpm lint           # ESLint (flat config, core-web-vitals + typescript)
pnpm start          # Run production server locally
```

No test runner is configured. Validate changes with `pnpm build`.

## Stack

Next.js 16 (App Router) + React 19 + Tailwind CSS 4 + TypeScript strict + Supabase + Stripe + Brevo + PostHog. Package manager: **pnpm**. Deployed on **Vercel**. Domain: `remotecondani.com`.

## Architecture

### Data flow: dual source pattern

The project has **two data sources** that coexist:

1. **Supabase (primary, dynamic)** — Services in `src/lib/*-service.ts` fetch from Supabase tables using `React.cache()` for request deduplication. Used in Server Components.
2. **Static data (supplementary)** — `src/data/*.ts` files contain hardcoded UI data not stored in Supabase (e.g., FAQ items in `faq-data.tsx`, asesoria content in `asesorias-data.ts`, programa intensivo types in `programa-intensivo-data.ts`). Product and blog data are exclusively from Supabase.

### Type system: dual model pattern

Each domain has two interfaces in `src/types/`:
- `*Record` — mirrors the Supabase table schema (snake_case fields in Spanish: `titulo`, `portada_url`, `es_destacado`)
- Clean frontend model (camelCase) — used by components

Transform functions in `src/lib/*-service.ts` convert between them (e.g., `transformProductRecord`).

### Supabase tables

- `blogs` — titulo, slug, contenido, portada_url, categoria (FK → categorias_blog), preview_text
- `categorias_blog` — nombre, slug, color_acento
- `productos` — nombre, slug, precio, stripe_price_id, imagen_url, categoria, es_destacado, es_gratis, download_url, whatsapp_link
- `profiles` — name, stripe_customer_id (FK → auth.users)
- `compras` — usuario (FK → profiles), producto (FK → productos), stripe_session_id, stripe_subscription_id, estado (activa/cancelada/reembolsada)
- `suscriptores_newsletter` — email, nombre, brevo_contact_id, origen, activo

### Payment flow (Stripe)

1. Client calls `POST /api/checkout` with `priceId` + `productId`
2. API creates a Stripe Checkout Session (detects subscription vs one-time via `price.recurring`)
3. Stripe redirects to `/tienda/exito?session_id=...`
4. Webhook `POST /api/webhooks/stripe` handles `checkout.session.completed`:
   - Creates/finds user in Supabase via `findOrCreateUser`
   - Records purchase in `compras` table via `createCompra`
   - Sends transactional emails via Brevo (welcome if new user, purchase confirmation, or community WhatsApp invite)
   - Tracks purchase event in PostHog
5. `customer.subscription.deleted` cancels the associated purchase record

Stripe client is lazy-initialized (`getStripe()`) to prevent build-time crashes on Vercel.

### Auth flow

- Supabase Auth handles user authentication (cookies `sb-*` via `@supabase/ssr`)
- Middleware (`src/middleware.ts`) protects `/mi-cuenta/*` (except `/mi-cuenta/login` and `/mi-cuenta/reset-password`) and `/masterclass-gratuita`
- API routes: `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`, `POST /api/auth/change-password`, `POST /api/auth/signup`, `POST /api/auth/forgot-password`, `GET /api/auth/callback`
- `auth-service.ts` uses `getServiceSupabase()` (service_role key) for server-side user operations

### Email (Brevo)

- `src/lib/brevo.ts` — transactional emails (purchase, welcome, community) + newsletter contact management
- `src/lib/email-templates.ts` — HTML email templates
- Newsletter signup: `POST /api/newsletter` → adds contact to Brevo list (primary) + saves to Supabase (non-critical backup)

### Analytics (PostHog)

- Client-side: `src/instrumentation-client.ts` initializes PostHog with proxy rewrites (`/ph/*`)
- Server-side: `src/lib/posthog-server.ts` exports `getPostHogServer()`
- `next.config.ts` has rewrites proxying `/ph/static/*` and `/ph/*` to PostHog CDN/API

### Booking system

- `src/lib/booking-engine.ts` — Booking engine for consultations
- `src/lib/reservas-service.ts` — Reservation management (Supabase)
- `src/lib/google-calendar.ts` — Google Calendar integration
- `src/lib/zoom.ts` — Zoom meeting creation

### Route structure

| Route | Description |
|-------|-------------|
| `/` | Landing page (Server Component, section-based) |
| `/sobre-mi` | About page |
| `/blog`, `/blog/[slug]` | Blog (articles from Supabase) |
| `/blog/categoria/[slug]` | Articles by category |
| `/tienda`, `/tienda/[slug]` | Shop (digital products from Supabase) |
| `/tienda/exito` | Post-checkout success page |
| `/asesorias` | Consulting/coaching page |
| `/empezar` | Getting started funnel/quiz |
| `/info` | FAQ + contact |
| `/newsletter` | Newsletter signup |
| `/recursos-gratuitos` | Free resources |
| `/ruta-recomendada` | Recommended path |
| `/servicios` | Services listing |
| `/masterclass-gratuita` | Free masterclass (protected) |
| `/mi-cuenta` | Protected dashboard (login + purchases) |
| `/mi-cuenta/viewer/[compraId]` | Purchase viewer |

Additional API routes:
- `POST /api/checkout` — Create Stripe checkout session
- `POST /api/webhooks/stripe` — Stripe webhook handler
- `POST /api/claim-free` — Claim free product (auth required)
- `GET /api/descargas/[compraId]` — Download purchased content
- `GET /api/pdf/[compraId]` — PDF viewer for purchased content
- `POST /api/stripe/portal` — Stripe billing portal (auth required)
- `GET|POST /api/testimonios` — User testimonial CRUD (auth required)
- `POST /api/upload` — Image upload to BunnyCDN (auth required)
- `GET /api/reservas/disponibilidad` — Booking availability
- `POST /api/reservas/crear` — Create booking
- `POST /api/reservas/cancelar` — Cancel booking
- `GET /api/reservas/mis-reservas` — User's bookings
- `GET /api/masterclass/recurso/[recursoId]` — Masterclass resource download
- `GET /api/programa-contenido/[contenidoId]` — Program content access
- `GET /api/cron/recordatorios` — Cron job for booking reminders

### Component organization

- `src/components/` — Shared/homepage components with barrel `index.ts`
- `src/components/{section}/` — Page-specific components (e.g., `blog/`, `tienda/`, `asesorias/`, `mi-cuenta/`, `info/`, `newsletter/`, `sobre-mi/`) with their own barrel exports
- `src/components/ui/` — Reusable UI primitives
- `src/hooks/` — Custom hooks (`useCheckoutAuth`, `useNewsletterForm`)

## Key conventions

- **Animations**: import from `motion/react` (NOT `framer-motion`). The package is `motion` v12+.
- **Tailwind 4**: uses `@import "tailwindcss"` and `@theme inline` in `globals.css`. No `tailwind.config` file.
- **Custom colors**: `bg-coral`, `text-pink`, `bg-lavender`, `bg-cream`, `bg-peach`, `text-mint`, `bg-sunshine`, `bg-sky`, etc. Defined via CSS vars in `:root` + exposed through `@theme inline`.
- **Fonts**: `font-headline` (Montserrat) and `font-sans` (Inter). Loaded via `next/font/google` in `layout.tsx`.
- **CSS utility classes**: `globals.css` defines many custom utilities — `.btn-primary`, `.btn-secondary`, `.card-playful`, `.card-glass`, `.gradient-text`, `.prose-custom` (blog content), `.container-custom` (max-width 1400px), animation classes (`.animate-float`, `.animate-blob`, etc.). Check these before creating new ones.
- **Icons**: `lucide-react` (tree-shaken via `optimizePackageImports` in `next.config.ts`).
- **Markdown**: parsed with `marked` (blog articles).
- **PDFs**: rendered with `react-pdf`.
- **Smooth scroll**: `lenis` library (NOT CSS `scroll-behavior`). CSS scroll-behavior was intentionally removed because it caused unwanted animated scrolling on Next.js navigation.
- **Path alias**: `@/*` → `./src/*`
- **Supabase**: `createServerSupabase()` for Server Components with auth, `createAnonSupabase()` for public queries, `getServiceSupabase()` for admin operations (bypasses RLS).
- **Image domains**: Unsplash, BunnyCDN (`securenlandco.b-cdn.net`, `remotecondani.b-cdn.net`), and CloudFront are allowlisted in `next.config.ts`.
- **Accessibility**: Skip-to-content link in root layout, `prefers-reduced-motion` media query disables all animations.
- **Prettier**: semicolons, single quotes, trailing commas ES5, tab width 2, `prettier-plugin-tailwindcss` for automatic class sorting.

## Environment variables

Required in `.env.local`:
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_DOMAIN`
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `BREVO_SENDER_NAME`, `BREVO_NEWSLETTER_LIST_ID`
- `NEWSLETTER_GUIDE_URL`
- `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `GOOGLE_SERVICE_ACCOUNT_JSON` (base64-encoded service account credentials)
- `GOOGLE_CALENDAR_ID` (calendar ID for creating events)
- `GOOGLE_CALENDAR_IDS_BUSY` (comma-separated calendar IDs for FreeBusy availability checks)
- `ZOOM_ACCOUNT_ID`, `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET` (Zoom meeting creation for bookings)
- `BUNNY_STORAGE_API_KEY`, `BUNNY_STORAGE_ZONE_NAME`, `BUNNY_STORAGE_BASE_URL`, `BUNNY_CDN_BASE_URL` (BunnyCDN image upload)
