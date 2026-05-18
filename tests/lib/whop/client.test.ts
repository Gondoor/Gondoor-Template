/**
 * @jest-environment node
 */
import { WhopClient, WhopApiError } from "@/lib/whop/client";

describe("WhopClient", () => {
  describe("createCheckoutSession", () => {
    it("posts to /api/v5/me/checkout/sessions with bearer auth and returns url + sessionId", async () => {
      const fetchMock = jest.fn(async () =>
        new Response(
          JSON.stringify({ id: "sess_123", url: "https://whop.com/checkout/abc" }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        ),
      );

      const client = new WhopClient({
        apiKey: "key-test",
        baseUrl: "https://api.whop.com",
        fetchImpl: fetchMock as unknown as typeof fetch,
      });

      const result = await client.createCheckoutSession({
        productId: "prod_1",
        successUrl: "https://tenant.example.com/checkout/success",
        cancelUrl: "https://tenant.example.com/checkout/cancel",
        metadata: { source: "test" },
      });

      expect(result).toEqual({ sessionId: "sess_123", url: "https://whop.com/checkout/abc" });
      expect(fetchMock).toHaveBeenCalledTimes(1);
      const callArgs = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
      const [url, init] = callArgs;
      expect(url).toBe("https://api.whop.com/api/v5/me/checkout/sessions");
      expect(init.method).toBe("POST");
      const headers = init.headers as Record<string, string>;
      expect(headers.Authorization).toBe("Bearer key-test");
      expect(headers["Content-Type"]).toBe("application/json");
      const body = JSON.parse(init.body as string) as Record<string, unknown>;
      expect(body.product_id).toBe("prod_1");
      expect(body.metadata).toEqual({ source: "test" });
    });

    it("throws WhopApiError when the API returns a non-2xx status", async () => {
      const fetchMock = jest.fn(async () =>
        new Response(JSON.stringify({ error: "Bad product" }), { status: 400 }),
      );

      const client = new WhopClient({
        apiKey: "key-test",
        fetchImpl: fetchMock as unknown as typeof fetch,
      });

      await expect(
        client.createCheckoutSession({
          productId: "missing",
          successUrl: "https://tenant.example.com/success",
          cancelUrl: "https://tenant.example.com/cancel",
        }),
      ).rejects.toBeInstanceOf(WhopApiError);
    });

    it("throws when no API key is configured", async () => {
      const client = new WhopClient({ apiKey: "", fetchImpl: jest.fn() as unknown as typeof fetch });
      await expect(
        client.createCheckoutSession({
          productId: "prod_1",
          successUrl: "https://tenant.example.com/success",
          cancelUrl: "https://tenant.example.com/cancel",
        }),
      ).rejects.toThrow(/WHOP_API_KEY/);
    });
  });

  describe("listProducts", () => {
    it("normalizes raw products and derives billingPeriod from billing_period strings", async () => {
      const fetchMock = jest.fn(async () =>
        new Response(
          JSON.stringify({
            data: [
              {
                id: "prod_a",
                slug: "alpha",
                name: "Alpha",
                description: "First",
                image_url: "https://cdn.test/a.png",
                price_cents: 4900,
                currency: "usd",
                billing_period: "monthly",
                checkout_url: "https://whop.com/checkout/a",
              },
              {
                id: "prod_b",
                name: "Beta",
                price: 199,
                billing_period: null,
              },
            ],
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        ),
      );

      const client = new WhopClient({
        apiKey: "k",
        fetchImpl: fetchMock as unknown as typeof fetch,
      });
      const products = await client.listProducts();

      expect(products).toHaveLength(2);
      expect(products[0].billingPeriod).toBe("monthly");
      expect(products[0].priceCents).toBe(4900);
      expect(products[0].currency).toBe("USD");
      expect(products[1].billingPeriod).toBe("one-time");
      expect(products[1].priceCents).toBe(19900);
      expect(products[1].slug).toBe("prod_b");
    });
  });
});
