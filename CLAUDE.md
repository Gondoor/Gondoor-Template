# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start development server (localhost:3000)
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

> **Package manager**: This project uses `pnpm`, not `npm` or `yarn`.

## Architecture

This is a **Next.js 16 App Router** project using **React 19** and **TypeScript 5** in strict mode.

- `app/` — All routes and layouts. Uses the Next.js App Router convention (`layout.tsx`, `page.tsx`).
- `app/globals.css` — Global styles; Tailwind CSS v4 is configured here with CSS variables for light/dark theming.
- Path alias `@/*` resolves to the project root (e.g., `@/app/...`, `@/components/...`).

**Styling**: Tailwind CSS v4 via PostCSS — class-based utility styling with theme variables in `globals.css`.

**Linting**: ESLint v9 flat config (`eslint.config.mjs`) extending `next/core-web-vitals` and `next/typescript`.

**No test framework** is configured.
