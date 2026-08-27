"use client";

import { createAuthClient } from "better-auth/react";

// Canonical Better Auth browser client. Keep in sync with the seeder constants
// in gondoor-mono:
// apps/backend/src/engineering-agent/execution/e2b-auth-wiring-seeders.ts
//
// Use `authClient.signIn.email`, `authClient.signUp.email`,
// `authClient.signOut`, and `authClient.useSession` from client components.
export const authClient = createAuthClient();
