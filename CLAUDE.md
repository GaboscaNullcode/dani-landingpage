# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos de Desarrollo

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo
pnpm dev

# Build de producción
pnpm build

# Iniciar servidor de producción
pnpm start

# Linting
pnpm lint
```

## Stack Tecnológico

- **Framework**: Next.js 16 con App Router
- **React**: 19.x
- **Estilos**: Tailwind CSS 4 (usando `@tailwindcss/postcss`)
- **Animaciones**: Motion (Framer Motion)
- **Iconos**: Lucide React
- **Lenguaje**: TypeScript (modo estricto)
- **Package Manager**: pnpm

## Arquitectura

El proyecto usa la estructura de App Router de Next.js:

- `src/app/` - Rutas y páginas de la aplicación
  - `layout.tsx` - Layout raíz con configuración de fuentes (Geist Sans y Geist Mono)
  - `page.tsx` - Página principal
  - `globals.css` - Estilos globales y configuración de temas Tailwind

## Configuración de Estilos

### Tailwind CSS 4
- Usa la nueva sintaxis `@import "tailwindcss"` en lugar de directivas
- Variables CSS personalizadas definidas en `globals.css` para temas claro/oscuro
- Configuración inline con `@theme` para colores y fuentes

### Prettier
- Configurado con `prettier-plugin-tailwindcss` para ordenar automáticamente clases de Tailwind
- Single quotes, trailing commas en ES5

## Path Aliases

```typescript
@/* -> ./src/*
```
