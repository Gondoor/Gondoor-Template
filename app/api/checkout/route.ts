import { NextResponse } from "next/server";
import { z } from "zod";
import { WhopClient, WhopApiError } from "@/lib/whop/client";

const RequestSchema = z.object({
  productId: z.string().min(1),
  planId: z.string().min(1).optional(),
  metadata: z.record(z.string(), z.string()).optional(),
  locale: z.string().min(1).optional(),
});

export async function POST(request: Request) {
  let parsed: z.infer<typeof RequestSchema>;
  try {
    const json = (await request.json()) as unknown;
    parsed = RequestSchema.parse(json);
  } catch (error) {
    const message = error instanceof z.ZodError ? error.message : "Invalid request body";
    return NextResponse.json({ error: message }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  const origin = request.headers.get("origin") ?? new URL(request.url).origin;
  const locale = resolveLocale(parsed.locale, request.headers.get("referer"));
  const successUrl = `${origin}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${origin}/${locale}/checkout/cancel`;

  try {
    const client = new WhopClient();
    const session = await client.createCheckoutSession({
      productId: parsed.productId,
      planId: parsed.planId,
      successUrl,
      cancelUrl,
      metadata: parsed.metadata,
    });
    return NextResponse.json(
      { url: session.url, sessionId: session.sessionId },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed";
    const status = error instanceof WhopApiError ? error.status : 500;
    console.error("[/api/checkout] failed", error);
    return NextResponse.json(
      { error: message },
      { status, headers: { "Cache-Control": "no-store" } },
    );
  }
}

function resolveLocale(explicit: string | undefined, referer: string | null): string {
  if (explicit) return explicit;
  if (referer && URL.canParse(referer)) {
    const url = new URL(referer);
    const segment = url.pathname.split("/").filter(Boolean)[0];
    if (segment && /^[a-z]{2}(-[A-Z]{2})?$/.test(segment)) return segment;
  }
  return "en";
}
