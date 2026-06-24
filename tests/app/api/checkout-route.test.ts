export {};

const fetchMock = jest.fn<ReturnType<typeof fetch>, Parameters<typeof fetch>>();
const consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => undefined);

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

const API_BASE = "https://api.gondoor.test";
const API_KEY = "gdr_test_key";
const TENANT_ID = "61fdf61c-2f4a-4855-be3d-395bb738b493";
const TENANT_PRODUCT_ID = "f0f970f6-5f6a-4f36-9e28-c9a5d5d1888e";
const VERIFIER_TENANT_PRODUCT_ID = "00000000-0000-0000-0000-000000000000";
const SETUP_CHECKOUT_URL = "https://checkout.whop.com/setup/chk_123";

const originalEnv = {
  GONDOOR_API_BASE: process.env.GONDOOR_API_BASE,
  GONDOOR_API_KEY: process.env.GONDOOR_API_KEY,
  GONDOOR_TENANT_ID: process.env.GONDOOR_TENANT_ID,
};

interface MockRouteResponse {
  body?: unknown;
  status: number;
  headers?: HeadersInit;
  url?: string;
}

type CheckoutEnvOverrides = {
  GONDOOR_API_BASE?: string;
  GONDOOR_API_KEY?: string;
  GONDOOR_TENANT_ID?: string;
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

function applyCheckoutEnv(overrides: CheckoutEnvOverrides = {}): void {
  process.env.GONDOOR_API_BASE = API_BASE;
  process.env.GONDOOR_API_KEY = API_KEY;
  process.env.GONDOOR_TENANT_ID = TENANT_ID;

  for (const [key, value] of Object.entries(overrides)) {
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
}

async function loadPost(overrides?: CheckoutEnvOverrides) {
  jest.resetModules();
  applyCheckoutEnv(overrides);
  const routeModule = await import("@/app/api/checkout/route");
  return routeModule.POST;
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
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as Response;
}

describe("POST /api/checkout", () => {
  beforeEach(() => {
    fetchMock.mockReset().mockResolvedValue(
      jsonResponse({ setupCheckoutUrl: SETUP_CHECKOUT_URL }, { status: 202 }),
    );
    global.fetch = fetchMock;
  });

  afterEach(() => {
    restoreOriginalEnv();
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
  });

  it("posts the Gondoor tenant-commerce checkout contract upstream", async () => {
    const POST = await loadPost();

    const response = (await POST(
      createJsonRequest({
        tenantProductId: TENANT_PRODUCT_ID,
        quantity: 2,
      }),
    )) as MockRouteResponse;

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe("https://api.gondoor.test/v1/tenant-commerce/checkout");
    expect(init?.method).toBe("POST");
    expect(init?.headers).toMatchObject({
      "Content-Type": "application/json",
      Authorization: "Bearer gdr_test_key",
    });

    const bodyText = String(init?.body);
    expect(bodyText).not.toContain("lines");
    expect(JSON.parse(bodyText)).toEqual({
      tenantId: TENANT_ID,
      tenantProductId: TENANT_PRODUCT_ID,
      cart: {
        items: [
          {
            tenantProductId: TENANT_PRODUCT_ID,
            quantity: 2,
          },
        ],
      },
    });
  });

  it("returns 503 when GONDOOR_TENANT_ID is missing", async () => {
    const POST = await loadPost({ GONDOOR_TENANT_ID: undefined });

    const response = (await POST(
      createJsonRequest({
        tenantProductId: TENANT_PRODUCT_ID,
        quantity: 2,
      }),
    )) as MockRouteResponse;

    expect(response.status).toBe(503);
    expect(response.body).toEqual({
      error: "Checkout is not configured yet for this site.",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 400 when tenantProductId is missing", async () => {
    const POST = await loadPost();

    const response = (await POST(createJsonRequest({ quantity: 2 }))) as MockRouteResponse;

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "tenantProductId is required." });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("preserves upstream 400 for verifier checkout probe", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({ error: "tenantId is required" }, { status: 400 }),
    );
    const POST = await loadPost();

    const response = (await POST(
      createJsonRequest({
        tenantProductId: VERIFIER_TENANT_PRODUCT_ID,
        quantity: 1,
      }),
    )) as MockRouteResponse;

    expect(response.status).toBe(400);
  });

  it("preserves upstream 422 for verifier checkout probe", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({ error: "tenantProductId is invalid" }, { status: 422 }),
    );
    const POST = await loadPost();

    const response = (await POST(
      createJsonRequest({
        tenantProductId: VERIFIER_TENANT_PRODUCT_ID,
        quantity: 1,
      }),
    )) as MockRouteResponse;

    expect(response.status).toBe(422);
  });

  it("returns 502 when upstream checkout returns 500", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({ error: "internal checkout failure" }, { status: 500 }),
    );
    const POST = await loadPost();

    const response = (await POST(
      createJsonRequest({
        tenantProductId: VERIFIER_TENANT_PRODUCT_ID,
        quantity: 1,
      }),
    )) as MockRouteResponse;

    expect(response.status).toBe(502);
  });

  it("returns 502 when upstream checkout is unreachable", async () => {
    fetchMock.mockRejectedValueOnce(new Error("network down"));
    const POST = await loadPost();

    const response = (await POST(
      createJsonRequest({
        tenantProductId: VERIFIER_TENANT_PRODUCT_ID,
        quantity: 1,
      }),
    )) as MockRouteResponse;

    expect(response.status).toBe(502);
  });

  it("redirects HTML accept requests to setupCheckoutUrl", async () => {
    const POST = await loadPost();

    const response = (await POST(
      createJsonRequest(
        {
          tenantProductId: TENANT_PRODUCT_ID,
          quantity: 2,
        },
        { accept: "text/html" },
      ),
    )) as MockRouteResponse;

    expect(response.status).toBe(303);
    expect(response.url).toBe(SETUP_CHECKOUT_URL);
  });
});
