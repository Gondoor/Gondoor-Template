import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import {
  resolveBetterAuthBaseURL,
  resolveTrustedOrigins,
} from "@/lib/auth-origin";
import { getLandingSchema } from "@/lib/landing/schema-source";
import { sendTenantSaasTransactionalEmail } from "@/lib/saas/email";

const productName = getLandingSchema().header.brand.label;

export const auth = betterAuth({
  baseURL: resolveBetterAuthBaseURL(),
  trustedOrigins: resolveTrustedOrigins,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      await sendTenantSaasTransactionalEmail({
        template: "password_reset",
        to: user.email,
        templateData: {
          productName,
          resetUrl: url,
        },
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendTenantSaasTransactionalEmail({
        template: "email_verification",
        to: user.email,
        templateData: {
          productName,
          userName: user.name || user.email,
          verificationUrl: url,
        },
      });
    },
  },
});
