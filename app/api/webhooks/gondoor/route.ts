import { NextResponse, type NextRequest } from "next/server";
import { verifyWebhookSignature } from "@/lib/whop/verify-signature";

const HANDLED_EVENTS = new Set([
  "product.created",
  "product.updated",
  "order.completed",
]);

export async function POST(request: NextRequest): Promise<NextResponse> {
  const secret = process.env.WHOP_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Webhook secret is not configured" },
      { status: 500 }
    );
  }

  const signature = request.headers.get("x-gondoor-signature");
  const rawBody = await request.text();

  if (!signature || !verifyWebhookSignature(rawBody, signature, secret)) {
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 401 }
    );
  }

  let payload: { type?: unknown; data?: unknown } = {};
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  const eventType = typeof payload.type === "string" ? payload.type : null;
  if (!eventType || !HANDLED_EVENTS.has(eventType)) {
    return NextResponse.json(
      { received: true, handled: false, eventType },
      { status: 200 }
    );
  }

  console.log(
    "[webhook:gondoor]",
    JSON.stringify({
      eventType,
      receivedAt: new Date().toISOString(),
      payload: payload.data ?? null,
    })
  );

  return NextResponse.json(
    { received: true, handled: true, eventType },
    { status: 200 }
  );
}
