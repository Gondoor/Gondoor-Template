import { NextResponse } from "next/server";
import crypto from "node:crypto";

const KNOWN_EVENT_TYPES = new Set([
  "product.created",
  "product.updated",
  "product.archived",
  "order.completed",
  "order.refunded",
]);

export async function POST(request: Request) {
  const secret = process.env.WHOP_WEBHOOK_SECRET ?? "";
  if (!secret) {
    console.error("[/api/webhooks/gondoor] WHOP_WEBHOOK_SECRET is not configured");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  const signature = request.headers.get("x-gondoor-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  const rawBody = await request.text();
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");

  if (!safeEqual(signature, expected)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: { event_type?: string; type?: string };
  try {
    payload = JSON.parse(rawBody) as { event_type?: string; type?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const eventType = payload.event_type ?? payload.type ?? "unknown";
  if (!KNOWN_EVENT_TYPES.has(eventType)) {
    console.warn(`[/api/webhooks/gondoor] received unknown event_type: ${eventType}`);
  } else {
    console.log(`[/api/webhooks/gondoor] received ${eventType}`);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}
