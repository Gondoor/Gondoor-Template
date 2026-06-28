import { z } from "zod";

const tenantSaasEmailConfigSchema = z
  .object({
    GONDOOR_API_BASE: z.string().trim().min(1),
    GONDOOR_TENANT_ID: z.string().trim().min(1),
    GONDOOR_SAAS_APP_API_KEY: z.string().trim().min(1),
    GONDOOR_SAAS_MODE: z.preprocess(
      (value) =>
        typeof value === "string" && value.trim() === "" ? undefined : value,
      z.enum(["live", "test"]).optional(),
    ),
  })
  .transform((env) => ({
    apiBase: env.GONDOOR_API_BASE.replace(/\/+$/, ""),
    tenantId: env.GONDOOR_TENANT_ID,
    appApiKey: env.GONDOOR_SAAS_APP_API_KEY,
    mode: env.GONDOOR_SAAS_MODE,
  }));

const tenantSaasEmailResponseSchema = z.object({
  tenantId: z.string(),
  messageId: z.string(),
  status: z.string(),
});

type TenantSaasEmailConfig = z.infer<typeof tenantSaasEmailConfigSchema>;

type TenantSaasEmailTemplate =
  | "email_verification"
  | "password_reset"
  | "welcome"
  | "onboarding"
  | "billing_notice"
  | "account_notice";

export class TenantSaasEmailError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "TenantSaasEmailError";
    this.status = status;
  }
}

export async function sendTenantSaasTransactionalEmail(input: {
  readonly template: TenantSaasEmailTemplate;
  readonly to: string;
  readonly templateData: Readonly<Record<string, string>>;
}): Promise<void> {
  const config = readTenantSaasEmailConfig();
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
    response = await fetch(`${config.apiBase}/v1/tenant-saas/email/send`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({
        tenantId: config.tenantId,
        template: input.template,
        to: input.to,
        templateData: input.templateData,
      }),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new TenantSaasEmailError(
        "Transactional email service is unavailable.",
        502,
      );
    }
    throw error;
  }

  const responseBody = await readResponseJson(response);
  if (!response.ok) {
    const status =
      response.status >= 400 && response.status < 500 ? response.status : 502;
    throw new TenantSaasEmailError(
      "Transactional email request failed.",
      status,
    );
  }

  const parsed = tenantSaasEmailResponseSchema.safeParse(responseBody);
  if (!parsed.success) {
    throw new TenantSaasEmailError(
      "Transactional email response was invalid.",
      502,
    );
  }
}

function readTenantSaasEmailConfig(): TenantSaasEmailConfig {
  const parsed = tenantSaasEmailConfigSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new TenantSaasEmailError("Transactional email is unavailable.", 503);
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
