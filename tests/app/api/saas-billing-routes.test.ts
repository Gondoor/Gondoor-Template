export {};

const mockGetSession = jest.fn();
const fetchMock = jest.fn<ReturnType<typeof fetch>, Parameters<typeof fetch>>();

jest.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number; headers?: HeadersInit }) => ({
      body,
      status: init?.status ?? 200,
      headers: init?.headers,
    }),
    redirect: (url: string | URL, init?: { status?: number }) => ({
      status: init?.status ?? 307,
      url: String(url),
    }),
  },
}));

jest.mock("next/headers", () => ({
  headers: jest.fn(async () => new Headers({ cookie: "better-auth.session=abc" })),
}));

jest.mock("@/lib/auth", () => ({
  auth: {
    api: {
      getSession: mockGetSession,
    },
  },
}));

const API_BASE = "https://api.gondoor.test";
const API_KEY = "gdr_test_saas_key";
const TENANT_ID = "61fdf61c-2f4a-4855-be3d-395bb738b493";
const USER_ID = "app-user-1";
const CUSTOMER_EMAIL = "buyer@example.com";
const CHECKOUT_URL = "https://whop.com/checkout/saas_123";
const MANAGE_URL = "https://whop.com/hub/memberships/mem_123";

const originalEnv = {
  GONDOOR_API_BASE: process.env.GONDOOR_API_BASE,
  GONDOOR_TENANT_ID: process.env.GONDOOR_TENANT_ID,
  GONDOOR_SAAS_APP_API_KEY: process.env.GONDOOR_SAAS_APP_API_KEY,
  GONDOOR_SAAS_MODE: process.env.GONDOOR_SAAS_MODE,
};

interface MockRouteResponse {
  body?: unknown;
  status: number;
  headers?: HeadersInit;
  url?: string;
}

type SaasEnvOverrides = {
  GONDOOR_API_BASE?: string;
  GONDOOR_TENANT_ID?: string;
  GONDOOR_SAAS_APP_API_KEY?: string;
  GONDOOR_SAAS_MODE?: string;
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

function applySaasEnv(overrides: SaasEnvOverrides = {}): void {
  process.env.GONDOOR_API_BASE = API_BASE;
  process.env.GONDOOR_TENANT_ID = TENANT_ID;
  process.env.GONDOOR_SAAS_APP_API_KEY = API_KEY;
  delete process.env.GONDOOR_SAAS_MODE;

  for (const [key, value] of Object.entries(overrides)) {
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
}

function createJsonRequest(
  body: unknown,
  headers: Record<string, string> = {},
): Request {
  const normalizedHeaders = new Map(
    Object.entries({
      "content-type": "application/json",
      ...headers,
    }).map(([key, value]) => [key.toLowerCase(), value]),
  );

  return {
    url: "https://tenant.example.com/api/billing/checkout",
    headers: {
      get: (name: string) => normalizedHeaders.get(name.toLowerCase()) ?? null,
    },
    json: async () => body,
  } as Request;
}

function jsonResponse(body: unknown, init?: ResponseInit): Response {
  const status = init?.status ?? 200;
  return {
    ok: status >= 200 && status < 300,
    status,
    text: async () => JSON.stringify(body),
  } as Response;
}

function authenticatedSession() {
  return {
    user: {
      id: USER_ID,
      email: CUSTOMER_EMAIL,
      name: "Buyer",
    },
  };
}

describe("tenant SaaS billing API routes", () => {
  beforeEach(() => {
    applySaasEnv();
    mockGetSession.mockResolvedValue(authenticatedSession());
    fetchMock.mockReset();
    fetchMock.mockResolvedValue(
      jsonResponse({ tenantId: TENANT_ID, checkoutUrl: CHECKOUT_URL }),
    );
    global.fetch = fetchMock;
  });

  afterEach(() => {
    restoreOriginalEnv();
    jest.resetModules();
  });

  it("returns 401 before config checks when no user is signed in", async () => {
    mockGetSession.mockResolvedValueOnce(null);
    delete process.env.GONDOOR_SAAS_APP_API_KEY;
    const routeModule = await import("@/app/api/billing/checkout/route");

    const response = (await routeModule.POST(createJsonRequest({}))) as MockRouteResponse;

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: "Sign in to manage subscriptions." });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts the checkout request through the tenant-saas backend proxy", async () => {
    process.env.GONDOOR_SAAS_MODE = "test";
    const routeModule = await import("@/app/api/billing/checkout/route");

    const response = (await routeModule.POST(
      createJsonRequest({
        successUrl: "https://tenant.example.com/billing?checkout=done",
        cancelUrl: "https://tenant.example.com/billing?checkout=cancel",
      }),
    )) as MockRouteResponse;

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ url: CHECKOUT_URL });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe("https://api.gondoor.test/v1/tenant-saas/billing/checkout");
    expect(init?.headers).toMatchObject({
      Authorization: `Bearer ${API_KEY}`,
      "x-gondoor-company-id": TENANT_ID,
      "x-gondoor-saas-mode": "test",
    });
    expect(JSON.parse(String(init?.body))).toEqual({
      tenantId: TENANT_ID,
      appUserId: USER_ID,
      customerEmail: CUSTOMER_EMAIL,
      successUrl: "https://tenant.example.com/billing?checkout=done",
      cancelUrl: "https://tenant.example.com/billing?checkout=cancel",
    });
  });

  it("defaults checkout return URLs from the request origin", async () => {
    const routeModule = await import("@/app/api/billing/checkout/route");

    await routeModule.POST(createJsonRequest({}));

    const [, init] = fetchMock.mock.calls[0];
    expect(JSON.parse(String(init?.body))).toMatchObject({
      successUrl: "https://tenant.example.com/billing?checkout=success",
      cancelUrl: "https://tenant.example.com/billing?checkout=cancel",
    });
  });

  it("returns 503 for signed-in users when SaaS billing env is missing", async () => {
    delete process.env.GONDOOR_SAAS_APP_API_KEY;
    const routeModule = await import("@/app/api/billing/checkout/route");

    const response = (await routeModule.POST(createJsonRequest({}))) as MockRouteResponse;

    expect(response.status).toBe(503);
    expect(response.body).toEqual({ error: "Subscription billing is unavailable." });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts status lookup with the signed-in app user id", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        tenantId: TENANT_ID,
        status: "active",
        planId: "plan_saas",
        currentPeriodEnd: "2026-07-01T00:00:00.000Z",
        manageUrl: MANAGE_URL,
        cancelAtPeriodEnd: false,
      }),
    );
    const routeModule = await import("@/app/api/billing/status/route");

    const response = (await routeModule.POST()) as MockRouteResponse;

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe("https://api.gondoor.test/v1/tenant-saas/billing/status");
    expect(JSON.parse(String(init?.body))).toEqual({
      tenantId: TENANT_ID,
      appUserId: USER_ID,
    });
  });

  it("redirects HTML manage requests to the hosted billing URL", async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ tenantId: TENANT_ID, manageUrl: MANAGE_URL }));
    const routeModule = await import("@/app/api/billing/manage/route");

    const response = (await routeModule.POST(
      createJsonRequest({}, { accept: "text/html" }),
    )) as MockRouteResponse;

    expect(response.status).toBe(303);
    expect(response.url).toBe(MANAGE_URL);
  });
});
