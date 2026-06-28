import { sendTenantSaasTransactionalEmail } from "@/lib/saas/email";

const fetchMock = jest.fn<ReturnType<typeof fetch>, Parameters<typeof fetch>>();
const originalFetch = global.fetch;

const originalEnv = {
  GONDOOR_API_BASE: process.env.GONDOOR_API_BASE,
  GONDOOR_TENANT_ID: process.env.GONDOOR_TENANT_ID,
  GONDOOR_SAAS_APP_API_KEY: process.env.GONDOOR_SAAS_APP_API_KEY,
  GONDOOR_SAAS_MODE: process.env.GONDOOR_SAAS_MODE,
};

function restoreOriginalEnv(): void {
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
}

function jsonResponse(body: unknown, init?: ResponseInit): Response {
  const status = init?.status ?? 200;
  return {
    ok: status >= 200 && status < 300,
    status,
    text: async () => JSON.stringify(body),
  } as Response;
}

describe("tenant SaaS transactional email proxy", () => {
  beforeEach(() => {
    process.env.GONDOOR_API_BASE = "https://api.gondoor.test/";
    process.env.GONDOOR_TENANT_ID = "tenant-1";
    process.env.GONDOOR_SAAS_APP_API_KEY = "gdr_test_email";
    process.env.GONDOOR_SAAS_MODE = "test";
    fetchMock.mockReset();
    fetchMock.mockResolvedValue(
      jsonResponse({
        tenantId: "tenant-1",
        messageId: "msg-1",
        status: "sent",
      }),
    );
    global.fetch = fetchMock;
  });

  afterEach(() => {
    restoreOriginalEnv();
    global.fetch = originalFetch;
    jest.resetModules();
  });

  it("sends email verification through the Gondoor tenant SaaS email proxy", async () => {
    await sendTenantSaasTransactionalEmail({
      template: "email_verification",
      to: "driver@example.com",
      templateData: {
        productName: "ShiftPilot",
        verificationUrl:
          "https://shiftpilot-10.gondoor.app/api/auth/verify-email?token=abc",
      },
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe(
      "https://api.gondoor.test/v1/tenant-saas/email/send",
    );
    expect(init?.headers).toMatchObject({
      Authorization: "Bearer gdr_test_email",
      "x-gondoor-company-id": "tenant-1",
      "x-gondoor-saas-mode": "test",
    });
    expect(JSON.parse(String(init?.body))).toEqual({
      tenantId: "tenant-1",
      template: "email_verification",
      to: "driver@example.com",
      templateData: {
        productName: "ShiftPilot",
        verificationUrl:
          "https://shiftpilot-10.gondoor.app/api/auth/verify-email?token=abc",
      },
    });
  });

  it("fails closed when tenant SaaS email credentials are missing", async () => {
    delete process.env.GONDOOR_SAAS_APP_API_KEY;

    await expect(
      sendTenantSaasTransactionalEmail({
        template: "password_reset",
        to: "driver@example.com",
        templateData: {
          productName: "ShiftPilot",
          resetUrl: "https://shiftpilot-10.gondoor.app/reset",
        },
      }),
    ).rejects.toMatchObject({ status: 503 });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
