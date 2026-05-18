/**
 * @jest-environment node
 */
import crypto from "node:crypto";
import { POST } from "@/app/api/webhooks/gondoor/route";

const SECRET = "test-webhook-secret";

function sign(body: string): string {
  return crypto.createHmac("sha256", SECRET).update(body).digest("hex");
}

function makeRequest(body: string, signature: string | null): Request {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (signature !== null) headers["X-Gondoor-Signature"] = signature;
  return new Request("http://localhost/api/webhooks/gondoor", {
    method: "POST",
    headers,
    body,
  });
}

describe("/api/webhooks/gondoor", () => {
  const originalSecret = process.env.WHOP_WEBHOOK_SECRET;

  beforeAll(() => {
    process.env.WHOP_WEBHOOK_SECRET = SECRET;
  });

  afterAll(() => {
    if (originalSecret === undefined) {
      delete process.env.WHOP_WEBHOOK_SECRET;
    } else {
      process.env.WHOP_WEBHOOK_SECRET = originalSecret;
    }
  });

  it("returns 200 when signature is valid", async () => {
    const payload = JSON.stringify({ event_type: "product.created", id: "prod_1" });
    const response = await POST(makeRequest(payload, sign(payload)));
    expect(response.status).toBe(200);
    const json = (await response.json()) as { ok: boolean };
    expect(json.ok).toBe(true);
  });

  it("returns 401 when the signature header is missing", async () => {
    const payload = JSON.stringify({ event_type: "order.completed" });
    const response = await POST(makeRequest(payload, null));
    expect(response.status).toBe(401);
  });

  it("returns 401 when the signature does not match the body", async () => {
    const payload = JSON.stringify({ event_type: "order.completed" });
    const response = await POST(makeRequest(payload, "deadbeef"));
    expect(response.status).toBe(401);
  });

  it("returns 400 when the body is not valid JSON", async () => {
    const payload = "not json {";
    const response = await POST(makeRequest(payload, sign(payload)));
    expect(response.status).toBe(400);
  });
});
