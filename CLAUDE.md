# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start development server (localhost:3000)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm test         # Run Jest tests
pnpm test:watch   # Run Jest in watch mode
```

> **Package manager**: This project uses `pnpm`, not `npm` or `yarn`.

## Architecture

This is a **Next.js 16 App Router** project using **React 19** and **TypeScript 5** in strict mode, organized with a **feature-based architecture**.

### Directory Structure

```
app/                        # Next.js App Router (routes only)
  layout.tsx                # Root layout
  page.tsx                  # Root page (composes feature components)
  globals.css               # Global styles + Tailwind CSS v4 theme variables
  (features)/               # Route groups per feature (optional)
    [feature-name]/
      page.tsx
      layout.tsx

features/                   # Feature modules (primary business logic)
  [feature-name]/
    components/             # UI components scoped to this feature
    hooks/                  # Custom hooks scoped to this feature
    actions/                # Server actions scoped to this feature
    types.ts                # TypeScript types for this feature
    index.ts                # Public API — only export what other features need

components/                 # Shared/global UI components
  ui/                       # shadcn/ui primitives (do not edit directly)

lib/                        # Shared utilities and helpers
  utils.ts

public/                     # Static assets
```

### Feature-Based Rules

- **Encapsulate by feature**: All code related to a feature lives inside `features/[feature-name]/`. Routes in `app/` are thin — they import and compose from `features/`.
- **Public API via index.ts**: Cross-feature imports must go through `features/[feature-name]/index.ts`. Never import directly from internal feature files in another feature.
- **No cross-feature internal imports**: `features/auth/components/Button` must not be imported by `features/dashboard`. Use `features/auth/index.ts` as the boundary.
- **Shared code in `components/` or `lib/`**: Only extract to shared directories when used by 2+ features.
- **`components/ui/`** holds shadcn/ui primitives — do not edit these directly.

### Path Aliases

- `@/*` resolves to the project root (e.g., `@/features/...`, `@/components/...`, `@/lib/...`).

### Styling

Tailwind CSS v4 via PostCSS — class-based utility styling with theme variables in `app/globals.css`.

### Linting

ESLint v9 flat config (`eslint.config.mjs`) extending `next/core-web-vitals` and `next/typescript`.

### Testing

Jest 30 with `jest-environment-jsdom`, `@testing-library/react`, and `@testing-library/jest-dom`. Config in `jest.config.ts`, global setup in `jest.setup.ts`. Uses `next/jest` transformer — no extra Babel/SWC config needed.

### Key Libraries

| Library | Purpose |
|---|---|
| `zod` | Schema validation — use with `@hookform/resolvers/zod` for form validation |
| `react-hook-form` + `@hookform/resolvers` | Form state management; pair with `zodResolver` |
| `motion` | Animations (`import { motion } from "motion/react"`) |
| `next-intl` | i18n — requires middleware + `i18n/routing.ts` setup |
| `sonner` | Toast notifications — use `components/ui/sonner.tsx` (Toaster) in root layout |
| `zustand` | Global client state — create stores in `lib/stores/` or `features/[feature]/store.ts` |
| `better-auth` | Authentication — configure in `lib/auth.ts` (server) and `lib/auth-client.ts` (client) |
| `drizzle-orm` + `@neondatabase/serverless` | ORM + Neon Postgres; define schema in `lib/db/schema.ts` |
| `drizzle-kit` | CLI for migrations (`pnpm drizzle-kit push`, `pnpm drizzle-kit generate`) |

### Database (Drizzle + Neon)

Connect via `@neondatabase/serverless` and pass to `drizzle()`. Store the client in `lib/db/index.ts`. Define tables in `lib/db/schema.ts`. Configure `drizzle.config.ts` at the project root with your `DATABASE_URL`.

### Auth (Better Auth)

- Server config: `lib/auth.ts` — instantiate `betterAuth()` with Drizzle adapter and desired plugins
- Client config: `lib/auth-client.ts` — instantiate `createAuthClient()` for use in client components
- API route: `app/api/auth/[...all]/route.ts` — proxy to `auth.handler`
- Better Auth uses its own schema; run `pnpm dlx better-auth generate` then `pnpm drizzle-kit push` to sync tables

### i18n (next-intl)

- Routing config: `i18n/routing.ts` — define locales and default locale
- Middleware: `middleware.ts` — wrap with `createMiddleware` from next-intl
- Messages: `messages/[locale].json`
- All routes go inside `app/[locale]/` route group
