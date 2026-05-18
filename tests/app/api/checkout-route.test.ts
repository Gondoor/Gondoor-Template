import {
  WhopApiError,
  WhopConfigurationError,
} from "@/lib/whop/client";

const createCheckoutSession = jest.fn();

jest.mock("@/lib/whop/client", () => {
  const actual = jest.requireActual("@/lib/whop/client");
  return {
    ...actual,
    getWhopClient: () => ({
      createCheckoutSession: (...args: unknown[]) =>
        createCheckoutSession(...args),
    }),
  };
});

jest.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number; headers?: HeadersInit }) => ({
      body,
      status: init?.status ?? 200,
      headers: init?.headers,
    }),
  },
}));

import { POST } from "@/app/api/checkout/route";

function createRequest(body: unknown, headers: Record<string, string> = {}): never {
  return {
    url: headers["x-forwarded-host"]
      ? `https://${headers["x-forwarded-host"]}/api/checkout`
      : "https://tenant.example.com/api/checkout",
    headers: {
      get: (name: string) => headers[name.toLowerCase()] ?? null,
    },
    json: async () => body,
  } as never;
}

describe("POST /api/checkout", () => {
  beforeEach(() => {
    createCheckoutSession.mockReset();
  });

  it("returns 400 when body is missing productId", async () => {
    const response = await POST(createRequest({}));
    expect(response.status).toBe(400);
    expect(createCheckoutSession).not.toHaveBeenCalled();
  });

  it("returns 400 on malformed JSON", async () => {
    const badRequest = {
      url: "https://tenant.example.com/api/checkout",
      headers: { get: () => null },
      json: async () => {
        throw new Error("bad json");
      },
    } as never;
    const response = await POST(badRequest);
    expect(response.status).toBe(400);
  });

  it("forwards productId and metadata, returns session URL", async () => {
    createCheckoutSession.mockResolvedValue({
      url: "https://whop.com/checkout/sess_abc",
      sessionId: "sess_abc",
    });

    const response = await POST(
      createRequest(
        { productId: "prod_xyz", metadata: { campaign: "spring" } },
        { "x-forwarded-host": "tenant.example.com", "x-forwarded-proto": "https" }
      )
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      url: "https://whop.com/checkout/sess_abc",
      sessionId: "sess_abc",
    });
    expect(createCheckoutSession).toHaveBeenCalledWith({
      productId: "prod_xyz",
      planId: undefined,
      metadata: { campaign: "spring" },
      successUrl:
        "https://tenant.example.com/checkout/success?session_id={CHECKOUT_SESSION_ID}",
      cancelUrl: "https://tenant.example.com/checkout/cancel",
    });
  });

  it("includes locale prefix in URLs when detected from referer", async () => {
    createCheckoutSession.mockResolvedValue({
      url: "https://whop.com/checkout/sess_de",
      sessionId: "sess_de",
    });
    await POST(
      createRequest(
        { productId: "prod_xyz" },
        {
          "x-forwarded-host": "tenant.example.com",
          "x-forwarded-proto": "https",
          referer: "https://tenant.example.com/de/products/some-product",
        }
      )
    );
    expect(createCheckoutSession).toHaveBeenCalledWith(
      expect.objectContaining({
        successUrl:
          "https://tenant.example.com/de/checkout/success?session_id={CHECKOUT_SESSION_ID}",
        cancelUrl: "https://tenant.example.com/de/checkout/cancel",
      })
    );
  });

  it("returns 500 when Whop is not configured", async () => {
    createCheckoutSession.mockRejectedValue(
      new WhopConfigurationError("missing key")
    );
    const response = await POST(
      createRequest({ productId: "prod_xyz" })
    );
    expect(response.status).toBe(500);
  });

  it("returns 502 when Whop API errors", async () => {
    createCheckoutSession.mockRejectedValue(
      new WhopApiError(502, { error: "upstream" })
    );
    const response = await POST(
      createRequest({ productId: "prod_xyz" })
    );
    expect(response.status).toBe(502);
  });
});
