import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import {
  WhopApiError,
  WhopConfigurationError,
  getWhopClient,
} from "@/lib/whop/client";

const checkoutBodySchema = z.object({
  productId: z.string().min(1),
  planId: z.string().min(1).optional(),
  metadata: z.record(z.string(), z.string()).optional(),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  const origin = resolveOrigin(request);
  const locale = resolveLocaleFromReferer(request);

  let parsed: z.infer<typeof checkoutBodySchema>;
  try {
    const body = (await request.json()) as unknown;
    const result = checkoutBodySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: result.error.issues },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }
    parsed = result.data;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  const localePath = locale ? `/${locale}` : "";
  const successUrl = `${origin}${localePath}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${origin}${localePath}/checkout/cancel`;

  try {
    const client = getWhopClient();
    const session = await client.createCheckoutSession({
      productId: parsed.productId,
      planId: parsed.planId,
      successUrl,
      cancelUrl,
      metadata: parsed.metadata,
    });
    return NextResponse.json(session, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    if (error instanceof WhopConfigurationError) {
      return NextResponse.json(
        { error: "Whop is not configured for this tenant" },
        { status: 500, headers: { "Cache-Control": "no-store" } }
      );
    }
    if (error instanceof WhopApiError) {
      return NextResponse.json(
        { error: "Whop checkout failed", status: error.status },
        { status: 502, headers: { "Cache-Control": "no-store" } }
      );
    }
    return NextResponse.json(
      { error: "Unexpected checkout failure" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

function resolveOrigin(request: NextRequest): string {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");
  if (forwardedHost) {
    return `${forwardedProto ?? "https"}://${forwardedHost}`;
  }
  const envOrigin = process.env.NEXT_PUBLIC_APP_URL;
  if (envOrigin) return envOrigin.replace(/\/+$/, "");
  return new URL(request.url).origin;
}

function resolveLocaleFromReferer(request: NextRequest): string | null {
  const referer = request.headers.get("referer");
  if (!referer) return null;
  try {
    const url = new URL(referer);
    const firstSegment = url.pathname.split("/").filter(Boolean)[0];
    if (firstSegment && /^[a-z]{2}(-[A-Z]{2})?$/.test(firstSegment)) {
      return firstSegment;
    }
  } catch {
    return null;
  }
  return null;
}
