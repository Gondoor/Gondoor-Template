import { createHmac } from "node:crypto";
import { POST } from "@/app/api/webhooks/gondoor/route";
import { verifyWebhookSignature } from "@/lib/whop/verify-signature";

jest.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number }) => ({
      body,
      status: init?.status ?? 200,
    }),
  },
}));

function sign(body: string, secret: string): string {
  return createHmac("sha256", secret).update(body).digest("hex");
}

function createRequestStub(
  body: string,
  signature: string | null
): never {
  return {
    headers: {
      get: (name: string) => {
        if (name.toLowerCase() === "x-gondoor-signature") return signature;
        return null;
      },
    },
    text: async () => body,
  } as never;
}

describe("verifyWebhookSignature", () => {
  it("returns true when signature matches HMAC-SHA256 of body using secret", () => {
    const body = '{"type":"product.created"}';
    const secret = "shhh";
    const signature = sign(body, secret);
    expect(verifyWebhookSignature(body, signature, secret)).toBe(true);
  });

  it("returns false when signature does not match", () => {
    expect(
      verifyWebhookSignature('{"type":"order.completed"}', "deadbeef", "shhh")
    ).toBe(false);
  });

  it("returns false when signatures have different lengths", () => {
    expect(verifyWebhookSignature("body", "short", "secret")).toBe(false);
  });
});

describe("POST /api/webhooks/gondoor", () => {
  const originalSecret = process.env.WHOP_WEBHOOK_SECRET;

  beforeEach(() => {
    process.env.WHOP_WEBHOOK_SECRET = "test-secret";
  });

  afterAll(() => {
    if (originalSecret === undefined) {
      delete process.env.WHOP_WEBHOOK_SECRET;
    } else {
      process.env.WHOP_WEBHOOK_SECRET = originalSecret;
    }
  });

  it("returns 500 when WHOP_WEBHOOK_SECRET is not configured", async () => {
    delete process.env.WHOP_WEBHOOK_SECRET;
    const response = await POST(createRequestStub("{}", "anything"));
    expect(response.status).toBe(500);
  });

  it("returns 401 when signature is missing", async () => {
    const response = await POST(createRequestStub('{"type":"order.completed"}', null));
    expect(response.status).toBe(401);
  });

  it("returns 401 when signature does not match", async () => {
    const body = '{"type":"order.completed"}';
    const response = await POST(createRequestStub(body, "bad-signature"));
    expect(response.status).toBe(401);
  });

  it("returns 200 and acknowledges handled event types", async () => {
    const body = JSON.stringify({
      type: "order.completed",
      data: { orderId: "ord_1" },
    });
    const signature = sign(body, "test-secret");
    const response = await POST(createRequestStub(body, signature));
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      received: true,
      handled: true,
      eventType: "order.completed",
    });
  });

  it("returns 200 but marks unhandled event types as not handled", async () => {
    const body = JSON.stringify({ type: "unknown.event" });
    const signature = sign(body, "test-secret");
    const response = await POST(createRequestStub(body, signature));
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ handled: false });
  });

  it("returns 400 on malformed JSON even when signature is valid", async () => {
    const body = "not-json";
    const signature = sign(body, "test-secret");
    const response = await POST(createRequestStub(body, signature));
    expect(response.status).toBe(400);
  });
});
