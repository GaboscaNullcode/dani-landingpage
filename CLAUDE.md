# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install        # Install dependencies
pnpm dev            # Development server (localhost:3000)
pnpm build          # Production build
pnpm lint           # ESLint (flat config, no --fix flag needed separately)
```

No test runner is configured. Validate changes with `pnpm build` (TypeScript + ESLint errors will surface).

## Stack

Next.js 16 (App Router) + React 19 + Tailwind CSS 4 + TypeScript strict + PocketBase + Stripe + Brevo. Package manager: **pnpm**.

Deployed on **Vercel**. Domain: `remotecondani.com`.

## Architecture

### Data flow: dual source pattern

The project has **two data sources** that coexist:

1. **PocketBase (primary, dynamic)** — Services in `src/lib/*-service.ts` fetch from PocketBase collections (`productos`, `blogs`, `users`, `compras`) using `React.cache()` for request deduplication. Used in Server Components.
2. **Static data (fallback)** — `src/data/*.ts` files contain hardcoded product/blog/FAQ data. Some pages still reference these directly. When modifying product logic, check both `src/data/tienda-data.ts` and `src/lib/tienda-service.ts`.

### Type system: dual model pattern

Each domain has two interfaces in `src/types/`:
- `*Record` — mirrors the PocketBase collection schema (snake_case fields)
- Clean frontend model (camelCase) — used by components

Transform functions in `src/lib/*-service.ts` convert between them (e.g., `transformProductRecord`).

### Payment flow (Stripe)

1. Client calls `POST /api/checkout` with `priceId` + `productId`
2. API creates a Stripe Checkout Session (detects subscription vs one-time via `price.recurring`)
3. Stripe webhook `POST /api/webhooks/stripe` handles `checkout.session.completed`:
   - Creates/finds user in PocketBase via `findOrCreateUser`
   - Records purchase in `compras` collection
   - Sends transactional emails via Brevo (welcome, purchase confirmation, community invite)
4. `customer.subscription.deleted` cancels the purchase record

Stripe client is lazy-initialized (`getStripe()`) to prevent build-time crashes on Vercel.

### Auth flow

- PocketBase handles user authentication
- `POST /api/auth/login` authenticates and sets `pb_auth` HttpOnly cookie
- Middleware (`src/middleware.ts`) protects `/mi-cuenta/*` routes by checking the cookie
- `auth-service.ts` uses admin auth for server-side user creation (requires `POCKETBASE_ADMIN_EMAIL` + `POCKETBASE_ADMIN_PASSWORD` env vars)

### Email (Brevo)

- `src/lib/brevo.ts` — transactional emails (purchase, welcome, community) + newsletter contact management
- `src/lib/email-templates.ts` — HTML email templates
- Newsletter signup: `POST /api/newsletter` → adds contact to Brevo list + sends welcome email

### Route structure

- `/` — Landing page (Server Component, section-based)
- `/tienda`, `/tienda/[slug]` — Shop (products from PocketBase)
- `/tienda/exito` — Post-checkout success page
- `/blog`, `/blog/[slug]` — Blog (articles from PocketBase)
- `/asesorias` — Consulting/coaching page
- `/sobre-mi` — About page
- `/info` — FAQ + contact
- `/newsletter` — Newsletter signup
- `/empezar` — Getting started funnel
- `/mi-cuenta` — Protected dashboard (login + purchases)

### Component organization

- `src/components/` — Shared/homepage components with barrel `index.ts`
- `src/components/{section}/` — Page-specific components (e.g., `blog/`, `tienda/`, `asesorias/`, `mi-cuenta/`) with their own barrel exports
- `src/components/ui/` — Reusable UI primitives

## Key conventions

- **Animations**: import from `motion/react` (NOT `framer-motion`). The package is `motion` v12+.
- **Tailwind 4**: uses `@import "tailwindcss"` and `@theme inline` in `globals.css`. No `tailwind.config` file.
- **Custom colors**: `bg-coral`, `text-pink`, `bg-lavender`, `bg-cream`, `bg-peach`, `text-mint`, `bg-sunshine`, etc. Defined via CSS vars in `:root` + exposed through `@theme inline`.
- **Fonts**: `font-headline` (Fraunces, serif) and `font-sans` (DM Sans). Loaded via `next/font/google` in `layout.tsx`.
- **CSS utility classes**: `globals.css` defines many custom utilities — `.btn-primary`, `.btn-secondary`, `.card-playful`, `.gradient-text`, `.prose-custom` (blog content), `.container-custom`, animation classes (`.animate-float`, `.animate-blob`, etc.). Check these before creating new ones.
- **Smooth scrolling**: Lenis library is available for smooth scroll behavior.
- **Icons**: `lucide-react` (tree-shaken via `optimizePackageImports` in `next.config.ts`).
- **Path alias**: `@/*` → `./src/*`
- **PocketBase singleton**: use `getPocketBase()` for server-side, `createPocketBase()` for client-side.
- **Image domains**: Unsplash, PocketBase server, and BunnyCDN are allowlisted in `next.config.ts`.
- **Accessibility**: Skip-to-content link in root layout, `prefers-reduced-motion` media query disables all animations.

## Environment variables

Required in `.env.local`:
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_DOMAIN`
- `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `BREVO_SENDER_NAME`, `BREVO_NEWSLETTER_LIST_ID`
- `POCKETBASE_ADMIN_EMAIL`, `POCKETBASE_ADMIN_PASSWORD`
- `NEWSLETTER_GUIDE_URL`
