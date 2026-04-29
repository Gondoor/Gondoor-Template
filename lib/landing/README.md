# Landing Schema Provisioning

## Backend write target

Provisioning should overwrite a single module:

- `lib/landing/seed/landing-schema.generated.ts`

Keep `LANDING_SCHEMA_SOURCE` export name unchanged.

## Renderer flow

- `schema.ts`: v1 zod contract (`header`, `footer`, `sections`, `tokens`).
- `schema-source.ts`: deterministic parse-and-cache loader.
- `components/landing/section-registry.tsx`: section `type` to typed component map.
- `app/[locale]/page.tsx`: schema-driven section rendering.
- `components/layout/site-header.tsx` + `site-footer.tsx`: schema-driven layout chrome.

## Adding a new section type safely

1. Add a new discriminated union member in `lib/landing/schema.ts`.
2. Implement a typed component in `components/landing/sections/`.
3. Register it in `components/landing/section-registry.tsx`.
4. Add/update `tests/landing/` parser + rendering tests.
