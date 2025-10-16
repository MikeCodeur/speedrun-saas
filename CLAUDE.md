# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application using the App Router, TypeScript, React 19, and Tailwind CSS v4. It's bootstrapped with `create-next-app` and configured with Turbopack for faster development builds.

## Common Commands

### Development

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Build production bundle with Turbopack
npm run start    # Start production server
npm run lint     # Run ESLint
```

The dev server runs on `http://localhost:3000`.

## Architecture

### Directory Structure

- `src/app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with font configuration and metadata
  - `page.tsx` - Home page
  - `globals.css` - Global styles with Tailwind and CSS variables
  - Route-based folders (e.g., `about/`) for additional pages

### Styling Architecture

- **Tailwind CSS v4** with `@theme inline` for custom design tokens
- CSS variables for theming in `globals.css`:
  - `--background` and `--foreground` for main colors
  - Automatic dark mode via `@media (prefers-color-scheme: dark)`
  - Font variables: `--font-geist-sans` and `--font-geist-mono`
- Prefer Tailwind utility classes over custom CSS
- Use `var(--background)` and `var(--foreground)` for theme-aware colors
- Hex colors acceptable for specific design needs (gradients, decorative elements)

### Font Management

- Fonts loaded via `next/font` in `layout.tsx`
- Geist Sans and Geist Mono fonts with CSS variable injection
- Always use `antialiased` class on body

### TypeScript Configuration

- Path alias: `@/*` maps to `./src/*`
- Strict mode enabled
- Module resolution: `bundler`

### ESLint Configuration

- Extends `next/core-web-vitals` and `next/typescript`
- Uses flat config format with FlatCompat for compatibility
- Ignores: `node_modules/`, `.next/`, `out/`, `build/`, `next-env.d.ts`

## Development Guidelines

### Tailwind Usage (from Cursor rules)

- Use Tailwind utilities directly in `className` (no CSS-in-JS)
- Leverage theme variables for consistency across light/dark modes
- Ensure sufficient contrast in dark mode
- Maintain keyboard accessibility with visible focus states
- Use standard utilities (spacing, grids, typography, hover/focus states) before custom styles
- Prefer `max-w-*` and `px-*` containers for responsive layouts
- Limit expensive effects (shadows, blur) on mobile

### Navigation

- Use `next/link` for internal navigation
- External links can use `<a>` with appropriate `rel` and `target` attributes

### Accessibility

- Maintain keyboard navigation support
- Use appropriate ARIA roles
- Ensure sufficient color contrast in both light and dark modes
- Keep focus states visible using Tailwind state utilities
