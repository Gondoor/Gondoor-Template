import { headers } from "next/headers";
import { z } from "zod";
import { auth } from "@/lib/auth";

const tenantSaasBillingConfigSchema = z
  .object({
    GONDOOR_API_BASE: z.string().trim().min(1),
    GONDOOR_TENANT_ID: z.string().trim().min(1),
    GONDOOR_SAAS_APP_API_KEY: z.string().trim().min(1),
    GONDOOR_SAAS_MODE: z.enum(["live", "test"]).optional(),
  })
  .transform((env) => ({
    apiBase: env.GONDOOR_API_BASE.replace(/\/+$/, ""),
    tenantId: env.GONDOOR_TENANT_ID,
    appApiKey: env.GONDOOR_SAAS_APP_API_KEY,
    mode: env.GONDOOR_SAAS_MODE,
  }));

const tenantSaasCheckoutResponseSchema = z.object({
  tenantId: z.string(),
  checkoutUrl: z.string().url(),
});

const tenantSaasBillingStatusSchema = z.object({
  tenantId: z.string(),
  status: z.string(),
  planId: z.string().nullable().optional(),
  currentPeriodEnd: z.string().nullable().optional(),
  manageUrl: z.string().url().nullable().optional(),
  cancelAtPeriodEnd: z.boolean().optional(),
});

const tenantSaasManageResponseSchema = z.object({
  tenantId: z.string(),
  manageUrl: z.string().url(),
});

type TenantSaasBillingConfig = z.infer<typeof tenantSaasBillingConfigSchema>;

type TenantSaasBillingPath =
  | "/v1/tenant-saas/billing/checkout"
  | "/v1/tenant-saas/billing/status"
  | "/v1/tenant-saas/billing/manage";

type TenantSaasBillingUser = {
  readonly appUserId: string;
  readonly customerEmail: string;
};

type TenantSaasBillingLookupRequest = {
  readonly tenantId: string;
  readonly appUserId: string;
};

type TenantSaasCheckoutRequest = TenantSaasBillingLookupRequest & {
  readonly customerEmail: string;
  readonly successUrl: string;
  readonly cancelUrl: string;
};

export type TenantSaasBillingStatus = z.infer<typeof tenantSaasBillingStatusSchema>;

export class TenantSaasBillingError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "TenantSaasBillingError";
    this.status = status;
  }
}

export async function getTenantSaasBillingUser(): Promise<TenantSaasBillingUser | null> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id?.trim();
  const email = session?.user.email?.trim();
  if (!userId || !email) return null;
  return { appUserId: userId, customerEmail: email };
}

export async function createTenantSaasCheckout(input: {
  readonly user: TenantSaasBillingUser;
  readonly successUrl: string;
  readonly cancelUrl: string;
}): Promise<{ readonly tenantId: string; readonly checkoutUrl: string }> {
  const config = readTenantSaasBillingConfig();
  return postTenantSaasBilling(
    config,
    "/v1/tenant-saas/billing/checkout",
    {
      tenantId: config.tenantId,
      appUserId: input.user.appUserId,
      customerEmail: input.user.customerEmail,
      successUrl: input.successUrl,
      cancelUrl: input.cancelUrl,
    },
    tenantSaasCheckoutResponseSchema,
  );
}

export async function getTenantSaasBillingStatus(
  user: TenantSaasBillingUser,
): Promise<TenantSaasBillingStatus> {
  const config = readTenantSaasBillingConfig();
  return postTenantSaasBilling(
    config,
    "/v1/tenant-saas/billing/status",
    {
      tenantId: config.tenantId,
      appUserId: user.appUserId,
    },
    tenantSaasBillingStatusSchema,
  );
}

export async function getTenantSaasManageUrl(
  user: TenantSaasBillingUser,
): Promise<{ readonly tenantId: string; readonly manageUrl: string }> {
  const config = readTenantSaasBillingConfig();
  return postTenantSaasBilling(
    config,
    "/v1/tenant-saas/billing/manage",
    {
      tenantId: config.tenantId,
      appUserId: user.appUserId,
    },
    tenantSaasManageResponseSchema,
  );
}

function readTenantSaasBillingConfig(): TenantSaasBillingConfig {
  const parsed = tenantSaasBillingConfigSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new TenantSaasBillingError("Subscription billing is unavailable.", 503);
  }
  return parsed.data;
}

async function postTenantSaasBilling<TResponse>(
  config: TenantSaasBillingConfig,
  path: TenantSaasBillingPath,
  body: TenantSaasCheckoutRequest | TenantSaasBillingLookupRequest,
  responseSchema: z.ZodType<TResponse>,
): Promise<TResponse> {
  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${config.appApiKey}`,
    "x-gondoor-company-id": config.tenantId,
  };
  if (config.mode) {
    requestHeaders["x-gondoor-saas-mode"] = config.mode;
  }

  let response: Response;
  try {
    response = await fetch(`${config.apiBase}${path}`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(body),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new TenantSaasBillingError("Subscription service is unavailable.", 502);
    }
    throw error;
  }

  const responseBody = await readResponseJson(response);
  if (!response.ok) {
    const status = response.status >= 400 && response.status < 500 ? response.status : 502;
    throw new TenantSaasBillingError("Subscription request failed.", status);
  }

  const parsed = responseSchema.safeParse(responseBody);
  if (!parsed.success) {
    throw new TenantSaasBillingError("Subscription response was invalid.", 502);
  }
  return parsed.data;
}

async function readResponseJson(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch (error) {
    if (error instanceof SyntaxError) return null;
    throw error;
  }
}
