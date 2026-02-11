# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Ver el CLAUDE.md raíz (`../CLAUDE.md`) para la documentación completa del proyecto. Este archivo es un resumen para cuando se trabaja directamente desde esta carpeta.

## Comandos

```bash
pnpm install        # Instalar dependencias
pnpm dev            # Servidor de desarrollo
pnpm build          # Build de producción
pnpm lint           # Linting
```

## Stack

Next.js 16 (App Router) + React 19 + Tailwind CSS 4 + TypeScript estricto + PocketBase + Stripe + Brevo. Package manager: pnpm.

## Notas clave

- Animaciones: importar desde `motion/react` (no `framer-motion`)
- Tailwind 4: usa `@import "tailwindcss"` y `@theme inline` en `globals.css`
- Colores custom: `bg-coral`, `text-pink`, `bg-lavender`, etc. (definidos via CSS vars + `@theme inline`)
- Fuentes: `font-headline` (Fraunces) y `font-sans` (DM Sans)
- Datos dinámicos: servicios en `src/lib/` consumen PocketBase directamente desde Server Components
- Tipos duales: `*Record` (PocketBase) y modelo limpio (frontend) en `src/types/`
- Componentes por sección: subcarpetas en `components/` con barrel `index.ts`
- Path alias: `@/*` → `./src/*`
