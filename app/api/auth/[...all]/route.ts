import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/lib/auth";

// Better Auth catch-all handler. Keep in sync with the seeder constants in
// gondoor-mono: apps/backend/src/engineering-agent/execution/e2b-auth-wiring-seeders.ts
//
// Do NOT add `export const runtime = "edge"` — OpenNext handles the runtime.
export const { GET, POST } = toNextJsHandler(auth.handler);
