import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import {
  resolveBetterAuthBaseURL,
  resolveTrustedOrigins,
} from "@/lib/auth-origin";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

// Canonical Better Auth server configuration for every Gondoor tenant app.
// Keep this file in sync with the hardcoded seeder constants in
// gondoor-mono: apps/backend/src/engineering-agent/execution/e2b-auth-wiring-seeders.ts
//
// Notes:
// - No explicit `secret` — Better Auth reads BETTER_AUTH_SECRET from the env
//   at request time, so a placeholder build-time value is never captured here.
// - `trustedOrigins` is passed as a FUNCTION reference so origins are resolved
//   per request (the deployed worker origin is not known at build time).
// - Email verification is intentionally disabled: signup must be immediately
//   followed by a working sign-in. Add verification only on explicit request.
export const auth = betterAuth({
  baseURL: resolveBetterAuthBaseURL(),
  trustedOrigins: resolveTrustedOrigins,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
});
