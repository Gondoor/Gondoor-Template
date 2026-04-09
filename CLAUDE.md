# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Cloudflare Pages: Edge Runtime Required

This template deploys to Cloudflare Pages via `@cloudflare/next-on-pages`, which **rejects any non-static route that does not export `runtime = 'edge'`**. Whenever you add a new `page.tsx`, `layout.tsx`, `route.ts`, `not-found.tsx`, or the root `middleware.ts`, you MUST add at the top (after imports):

```ts
export const runtime = "edge";
```

This applies to every file under `app/` that renders dynamically (the `ƒ` symbol in `next build` output) and to `middleware.ts`. Skip only if the route is fully static (`export const dynamic = 'force-static'`). Omitting this will break Cloudflare Pages builds with: `The following routes were not configured to run with the Edge Runtime`.

**Important — do NOT use `proxy.ts`:** Next.js 16 introduced `proxy.ts` as the new convention to replace `middleware.ts`, but `proxy.ts` is forced to Node.js runtime and forbids `export const runtime = 'edge'`. This is incompatible with `@cloudflare/next-on-pages`. We deliberately use the deprecated `middleware.ts` filename to keep edge runtime support. The deprecation warning during build is expected — ignore it. If a future Next.js version removes `middleware.ts`, the template must migrate to `@opennextjs/cloudflare`.


## Diagnostic Error Boundaries: DO NOT REMOVE

`app/error.tsx` and `app/global-error.tsx` are diagnostic boundaries that the
Gondor backend depends on to surface runtime errors from the deployed Cloudflare
Pages worker. Without them, the deployed site falls through to Next.js's
generic `__next_error__` template which has no useful info in the response
body, making remote debugging nearly impossible.

These files render the actual error message and stack trace as part of the
page HTML. The Gondor backend captures this body during post-deploy
verification and stores it in `engineering_tasks.error_payload` so operators
can read the exception in the dashboard task detail modal.

If you remove these files, every future Build MVP runtime crash becomes a
black box. The maintenance cost of keeping them is zero — they're pure
display components with no dependencies. Leave them alone unless you're
adding richer diagnostic features (e.g. Sentry integration, error reporting
service).

Both files MUST export `runtime = 'edge'` like every other non-static route
in this template (see Cloudflare Pages: Edge Runtime Required section above).


## Template Stack

- **Next.js 16** (App Router) — React 19, TypeScript 5 strict
- **Drizzle ORM + Neon** — Postgres via `@neondatabase/serverless`
- **Tailwind CSS v4** — PostCSS, CSS variable theming
- **shadcn/ui** — all components pre-installed + zod + react-hook-form + sonner
- **next-intl** — i18n with `[locale]` routing
- **Jest** — unit/component testing
- **Better Auth** — email/password auth with Drizzle adapter
- **Zustand** — global client state

## Commands

```bash
pnpm dev          # Start development server (localhost:3000)
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm typecheck    # Run tsc --noEmit
pnpm test         # Run Jest
pnpm test:watch   # Run Jest in watch mode
pnpm check        # lint + typecheck + test + build (run before committing)

# Database
pnpm drizzle-kit push       # Push schema to Neon (no migration file)
pnpm drizzle-kit generate   # Generate SQL migration files
pnpm drizzle-kit studio     # Open Drizzle Studio

# shadcn/ui
pnpm dlx shadcn@latest add <component>
```

> **Package manager**: This project uses `pnpm`. Never use `npm` or `yarn`.

> **Before every code change**: run `pnpm check` to ensure lint, types, tests, and build all pass.

## Environment Variables

Required in `.env.local`:

```
DATABASE_URL=              # Neon connection string
NEXT_PUBLIC_APP_URL=       # e.g. http://localhost:3000
BETTER_AUTH_SECRET=        # openssl rand -base64 32
```

## Architecture

**Gondoor Template** is organized with a **feature-based architecture**. Routes are thin — all business logic lives in `features/`.

### Directory Structure

```
app/
  layout.tsx                # Root layout — ThemeProvider, TooltipProvider, Toaster, fonts
  globals.css               # Global styles + Tailwind CSS v4 theme variables
  [locale]/                 # All user-facing routes (next-intl)
    layout.tsx              # NextIntlClientProvider wrapper
    page.tsx                # Landing page
  api/
    auth/[...all]/route.ts  # Better Auth catch-all handler

features/                   # Feature modules (primary business logic)
  [feature-name]/
    components/             # UI components scoped to this feature
    hooks/                  # Custom hooks scoped to this feature
    actions/                # Server actions scoped to this feature
    types.ts                # TypeScript types for this feature
    index.ts                # Public API — only export what other features need

components/
  ui/                       # shadcn/ui primitives — do not edit directly
                            # Pre-installed: accordion, alert, alert-dialog, aspect-ratio,
                            # avatar, badge, breadcrumb, button, calendar, card, carousel,
                            # chart, checkbox, collapsible, combobox, command, context-menu,
                            # dialog, direction, drawer, dropdown-menu, empty, field,
                            # hover-card, input, input-group, input-otp, item, kbd, label,
                            # menubar, native-select, navigation-menu, pagination, popover,
                            # progress, radio-group, resizable, scroll-area, select,
                            # separator, sheet, sidebar, skeleton, slider, sonner, spinner,
                            # switch, table, tabs, textarea, toggle, toggle-group, tooltip

hooks/
  use-mobile.ts             # Mobile viewport detection

lib/
  auth.ts                   # Better Auth server config (betterAuth())
  auth-client.ts            # Better Auth client (signIn, signUp, signOut, useSession)
  db/
    index.ts                # Drizzle + Neon client
    schema.ts               # All table definitions (includes Better Auth tables)
    migrations/             # Generated SQL migrations
  stores/
    app-store.ts            # Global Zustand store
  utils.ts                  # cn() class utility

i18n/
  routing.ts                # Locale list and default locale
  request.ts                # Per-request next-intl config

messages/
  en.json                   # English strings

tests/                      # All test files — mirrors source structure by feature
  lib/
    utils.test.ts
  features/
    [feature-name]/         # Add a folder per feature matching features/

proxy.ts                    # next-intl locale routing (renamed from middleware.ts — Next.js 16 uses "proxy" convention)
drizzle.config.ts           # Drizzle Kit config
jest.config.ts              # Jest config (testMatch: tests/**/*.test.{ts,tsx})
```

### Feature-Based Rules

- **Encapsulate by feature**: All code related to a feature lives inside `features/[feature-name]/`. Routes in `app/[locale]/` are thin — they import and compose from `features/`.
- **Public API via index.ts**: Cross-feature imports must go through `features/[feature-name]/index.ts`. Never import directly from internal feature files in another feature.
- **Shared code in `components/` or `lib/`**: Only extract to shared directories when used by 2+ features.
- **`components/ui/`** holds shadcn/ui primitives — do not edit these directly.

### Path Aliases

`@/*` resolves to the project root (e.g., `@/features/...`, `@/components/...`, `@/lib/...`).

### Key Libraries

| Library | Usage |
|---|---|
| `zod` | Schema validation — pair with `zodResolver` from `@hookform/resolvers/zod` |
| `react-hook-form` | Form state — `useForm<z.infer<typeof schema>>()` |
| `motion` | Animations — `import { motion } from "motion/react"` |
| `sonner` | Toasts — `import { toast } from "sonner"` |
| `zustand` | Global client state — stores in `lib/stores/` or `features/[x]/store.ts` |
| `better-auth` | Auth — server: `lib/auth.ts`, client: `lib/auth-client.ts` |
| `drizzle-orm` | ORM — schema in `lib/db/schema.ts`, client in `lib/db/index.ts` |
| `next-intl` | i18n — strings in `messages/[locale].json`, used via `getTranslations` (server) or `useTranslations` (client) |

### Database (Drizzle + Neon)

- Client: `neon()` from `@neondatabase/serverless` → `drizzle()` in `lib/db/index.ts`
- Schema: `lib/db/schema.ts` — includes all four Better Auth tables (`user`, `session`, `account`, `verification`)
- Add new tables to `lib/db/schema.ts` and run `pnpm drizzle-kit push`

### Auth (Better Auth)

- Server: `lib/auth.ts` — add plugins and providers here
- Client: `lib/auth-client.ts` — use `signIn`, `signUp`, `signOut`, `useSession` in client components
- API: `app/api/auth/[...all]/route.ts` — do not modify
- Schema already defined in `lib/db/schema.ts` — no need to run `better-auth generate`

### i18n (next-intl)

- Add locales to `i18n/routing.ts` and create a matching `messages/[locale].json`
- Server components: `const t = await getTranslations("namespace")`
- Client components: `const t = useTranslations("namespace")`
- Navigation (`Link`, `redirect`, `useRouter`): import from `@/i18n/routing`, not `next/navigation`

### shadcn/ui Notes

- `TooltipProvider` is already in root layout — `<Tooltip>` works anywhere without an extra provider.
- `toast` is deprecated — use `sonner` (`import { toast } from "sonner"`).
- `data-table`, `date-picker`, `typography` are patterns (not CLI-installable) — compose from `table` + `calendar` + `popover` primitives.

### Git Hooks (Husky)

- **pre-commit** — runs `lint-staged`: ESLint `--fix` on staged `*.{ts,tsx,js,mjs,cjs}` files
- **pre-push** — runs `pnpm check` (lint + typecheck + test + build)
- Hooks live in `.husky/`. Auto-enabled via `prepare` script on `pnpm install`.

### Testing

Jest 30 + `jest-environment-jsdom` + `@testing-library/react` + `@testing-library/jest-dom`. Config in `jest.config.ts`, setup in `jest.setup.ts`. All test files live under `tests/`, mirroring the feature structure:

- `tests/lib/` — shared utility tests
- `tests/features/[feature-name]/` — one folder per feature
