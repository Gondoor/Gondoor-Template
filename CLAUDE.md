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

# Database
pnpm drizzle-kit push       # Push schema changes to Neon (no migration file)
pnpm drizzle-kit generate   # Generate SQL migration files
pnpm drizzle-kit studio     # Open Drizzle Studio (DB browser)

# shadcn/ui
pnpm dlx shadcn@latest add <component>
```

> **Package manager**: This project uses `pnpm`, not `npm` or `yarn`.

## Environment Variables

Required in `.env.local`:

```
DATABASE_URL=              # Neon connection string
NEXT_PUBLIC_APP_URL=       # e.g. http://localhost:3000
BETTER_AUTH_SECRET=        # openssl rand -base64 32
```

## Architecture

**Gondoor Template** is a **Next.js 16 App Router** project using **React 19** and **TypeScript 5** in strict mode, organized with a **feature-based architecture**.

### Directory Structure

```
app/
  layout.tsx                # Root layout — ThemeProvider, TooltipProvider, Toaster, fonts
  globals.css               # Global styles + Tailwind CSS v4 theme variables
  [locale]/                 # All user-facing routes live here (next-intl)
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
                            # Installed: accordion, alert, alert-dialog, aspect-ratio,
                            # avatar, badge, breadcrumb, button, calendar, card, carousel,
                            # chart, checkbox, collapsible, combobox, command, context-menu,
                            # dialog, direction, drawer, dropdown-menu, empty, field,
                            # hover-card, input, input-group, input-otp, item, kbd, label,
                            # menubar, native-select, navigation-menu, pagination, popover,
                            # progress, radio-group, resizable, scroll-area, select,
                            # separator, sheet, sidebar, skeleton, slider, sonner, spinner,
                            # switch, table, tabs, textarea, toggle, toggle-group, tooltip
hooks/
  use-mobile.ts             # Detects mobile viewport (installed by sidebar component)

lib/
  auth.ts                   # Better Auth server config (betterAuth())
  auth-client.ts            # Better Auth client (signIn, signUp, signOut, useSession)
  db/
    index.ts                # Drizzle + Neon client
    schema.ts               # All table definitions (including Better Auth tables)
    migrations/             # Generated SQL migrations
  stores/
    app-store.ts            # Global Zustand store

i18n/
  routing.ts                # Locale list and default locale
  request.ts                # Per-request next-intl config

messages/
  en.json                   # English strings

middleware.ts               # next-intl locale routing middleware
drizzle.config.ts           # Drizzle Kit config
```

### Feature-Based Rules

- **Encapsulate by feature**: All code related to a feature lives inside `features/[feature-name]/`. Routes in `app/[locale]/` are thin — they import and compose from `features/`.
- **Public API via index.ts**: Cross-feature imports must go through `features/[feature-name]/index.ts`. Never import directly from internal feature files in another feature.
- **Shared code in `components/` or `lib/`**: Only extract to shared directories when used by 2+ features.
- **`components/ui/`** holds shadcn/ui primitives — do not edit these directly. All components are pre-installed; add new ones with `pnpm dlx shadcn@latest add <component>`.

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

- Client: `neon()` from `@neondatabase/serverless` → passed to `drizzle()` in `lib/db/index.ts`
- Schema: `lib/db/schema.ts` — already includes all four Better Auth tables (`user`, `session`, `account`, `verification`)
- Add new tables to `lib/db/schema.ts` and run `pnpm drizzle-kit push`

### Auth (Better Auth)

- Server: `lib/auth.ts` — add plugins and providers here
- Client: `lib/auth-client.ts` — use `signIn`, `signUp`, `signOut`, `useSession` in client components
- API: `app/api/auth/[...all]/route.ts` — do not modify; proxies all auth requests
- Schema is already defined in `lib/db/schema.ts` — no need to run `better-auth generate`

### i18n (next-intl)

- Add locales to `i18n/routing.ts` and create a matching `messages/[locale].json`
- Server components: `const t = await getTranslations("namespace")`
- Client components: `const t = useTranslations("namespace")`
- Navigation (Link, redirect, useRouter): import from `@/i18n/routing` not `next/navigation`

### shadcn/ui Notes

- `TooltipProvider` is already in the root layout — `<Tooltip>` works anywhere without an additional provider.
- `toast` component is deprecated — use `sonner` (`import { toast } from "sonner"`).
- `data-table`, `date-picker`, and `typography` are patterns documented on shadcn/ui but not CLI-installable — build them from `table` + `calendar` + `popover` primitives.

### Styling

Tailwind CSS v4 via PostCSS. Theme variables (colors, radius) defined in `app/globals.css`. Dark mode via `next-themes` (`ThemeProvider` in root layout, `attribute="class"`).

### Testing

Jest 30 with `jest-environment-jsdom`, `@testing-library/react`, `@testing-library/jest-dom`. Config in `jest.config.ts`, setup in `jest.setup.ts`. Uses `next/jest` transformer.
