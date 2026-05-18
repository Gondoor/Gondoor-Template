/**
 * @jest-environment node
 */
import {
  WhopApiError,
  WhopClient,
  WhopConfigurationError,
} from "@/lib/whop/client";

function jsonResponse(body: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
    ...init,
  });
}

describe("WhopClient", () => {
  describe("constructor", () => {
    it("throws WhopConfigurationError when no API key is provided or in env", () => {
      const oldKey = process.env.WHOP_API_KEY;
      delete process.env.WHOP_API_KEY;
      expect(() => new WhopClient()).toThrow(WhopConfigurationError);
      if (oldKey !== undefined) process.env.WHOP_API_KEY = oldKey;
    });

    it("normalizes a trailing slash on apiBase", () => {
      const fetchMock = jest
        .fn<Promise<Response>, [string | URL | Request, RequestInit | undefined]>()
        .mockResolvedValue(jsonResponse({ data: [] }));
      const client = new WhopClient({
        apiKey: "test",
        apiBase: "https://api.whop.com/",
        fetch: fetchMock as unknown as typeof fetch,
      });
      return client.listProducts().then(() => {
        const calledUrl = fetchMock.mock.calls[0][0];
        expect(String(calledUrl)).toBe("https://api.whop.com/v5/me/products");
      });
    });
  });

  describe("createCheckoutSession", () => {
    it("POSTs to /v5/me/checkout/sessions with bearer auth and snake_case body", async () => {
      const fetchMock = jest
        .fn<Promise<Response>, [string | URL | Request, RequestInit | undefined]>()
        .mockResolvedValue(
          jsonResponse({
            id: "sess_123",
            url: "https://whop.com/checkout/sess_123",
          })
        );
      const client = new WhopClient({
        apiKey: "key_abc",
        apiBase: "https://api.whop.com",
        fetch: fetchMock as unknown as typeof fetch,
      });

      const result = await client.createCheckoutSession({
        productId: "prod_xyz",
        planId: "plan_basic",
        successUrl: "https://tenant.example.com/checkout/success?session_id={CHECKOUT_SESSION_ID}",
        cancelUrl: "https://tenant.example.com/checkout/cancel",
        metadata: { order_id: "order_42" },
      });

      expect(result).toEqual({
        sessionId: "sess_123",
        url: "https://whop.com/checkout/sess_123",
      });

      const [url, init] = fetchMock.mock.calls[0];
      expect(String(url)).toBe("https://api.whop.com/v5/me/checkout/sessions");
      expect(init?.method).toBe("POST");
      const headers = init?.headers as Headers;
      expect(headers.get("Authorization")).toBe("Bearer key_abc");
      expect(headers.get("Content-Type")).toBe("application/json");
      expect(JSON.parse(init?.body as string)).toEqual({
        product_id: "prod_xyz",
        plan_id: "plan_basic",
        success_url:
          "https://tenant.example.com/checkout/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "https://tenant.example.com/checkout/cancel",
        metadata: { order_id: "order_42" },
      });
    });

    it("throws WhopApiError with status + body when API returns non-2xx", async () => {
      const fetchMock = jest
        .fn<Promise<Response>, [string | URL | Request, RequestInit | undefined]>()
        .mockResolvedValue(
          jsonResponse(
            { error: "product not found" },
            { status: 404 }
          )
        );
      const client = new WhopClient({
        apiKey: "key_abc",
        fetch: fetchMock as unknown as typeof fetch,
      });

      await expect(
        client.createCheckoutSession({
          productId: "prod_missing",
          successUrl: "https://tenant.example.com/checkout/success",
          cancelUrl: "https://tenant.example.com/checkout/cancel",
        })
      ).rejects.toMatchObject({
        name: "WhopApiError",
        status: 404,
        body: { error: "product not found" },
      });
    });

    it("throws WhopApiError when response is missing url or sessionId", async () => {
      const fetchMock = jest
        .fn<Promise<Response>, [string | URL | Request, RequestInit | undefined]>()
        .mockResolvedValue(jsonResponse({ id: "sess_123" }));
      const client = new WhopClient({
        apiKey: "key_abc",
        fetch: fetchMock as unknown as typeof fetch,
      });

      await expect(
        client.createCheckoutSession({
          productId: "prod_xyz",
          successUrl: "https://tenant.example.com/checkout/success",
          cancelUrl: "https://tenant.example.com/checkout/cancel",
        })
      ).rejects.toBeInstanceOf(WhopApiError);
    });

    it("rejects when productId is missing", async () => {
      const client = new WhopClient({
        apiKey: "key_abc",
        fetch: jest.fn() as unknown as typeof fetch,
      });
      await expect(
        client.createCheckoutSession({
          productId: "",
          successUrl: "https://tenant.example.com/checkout/success",
          cancelUrl: "https://tenant.example.com/checkout/cancel",
        })
      ).rejects.toBeInstanceOf(WhopConfigurationError);
    });
  });

  describe("listProducts", () => {
    it("maps Whop product payloads into TenantProduct shape", async () => {
      const fetchMock = jest
        .fn<Promise<Response>, [string | URL | Request, RequestInit | undefined]>()
        .mockResolvedValue(
          jsonResponse({
            data: [
              {
                id: "prod_1",
                name: "Gold tier",
                description: "Premium access",
                image_url: "https://images.example.com/gold.png",
                slug: "gold-tier",
                price_cents: 4900,
                currency: "usd",
                plan_type: "monthly",
                checkout_url: "https://whop.com/checkout/preset_gold",
              },
            ],
            pagination: { next_cursor: "cursor_2" },
          })
        );
      const client = new WhopClient({
        apiKey: "key_abc",
        fetch: fetchMock as unknown as typeof fetch,
      });
      const result = await client.listProducts({ limit: 10 });

      expect(result.nextCursor).toBe("cursor_2");
      expect(result.products).toHaveLength(1);
      expect(result.products[0]).toMatchObject({
        id: "prod_1",
        slug: "gold-tier",
        name: "Gold tier",
        description: "Premium access",
        image: "https://images.example.com/gold.png",
        priceCents: 4900,
        currency: "USD",
        billingPeriod: "monthly",
        checkoutUrl: "https://whop.com/checkout/preset_gold",
      });
      expect(String(fetchMock.mock.calls[0][0])).toContain("limit=10");
    });
  });

  describe("getProduct", () => {
    it("hits /v5/me/products/{id} and maps the payload", async () => {
      const fetchMock = jest
        .fn<Promise<Response>, [string | URL | Request, RequestInit | undefined]>()
        .mockResolvedValue(
          jsonResponse({
            id: "prod_2",
            name: "Solo",
            description: "Solo tier",
            price: 19,
            interval: "year",
          })
        );
      const client = new WhopClient({
        apiKey: "key_abc",
        fetch: fetchMock as unknown as typeof fetch,
      });
      const product = await client.getProduct("prod_2");
      expect(product).toMatchObject({
        id: "prod_2",
        name: "Solo",
        priceCents: 1900,
        billingPeriod: "yearly",
      });
      expect(String(fetchMock.mock.calls[0][0])).toBe(
        "https://api.whop.com/v5/me/products/prod_2"
      );
    });
  });
});
