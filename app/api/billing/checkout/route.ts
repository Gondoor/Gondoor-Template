import { NextResponse } from "next/server";
import { z } from "zod";
import {
  createTenantSaasCheckout,
  getTenantSaasBillingUser,
  TenantSaasBillingError,
} from "@/lib/saas/billing";

const checkoutRequestSchema = z.object({
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

export async function POST(request: Request) {
  const user = await getTenantSaasBillingUser();
  if (!user) {
    return jsonError("Sign in to manage subscriptions.", 401);
  }

  const parsed = await parseCheckoutRequest(request);
  if (!parsed.success) {
    return jsonError("Checkout URLs must be valid URLs.", 400);
  }

  const successUrl = parsed.data.successUrl ?? routeUrl(request, "/billing?checkout=success");
  const cancelUrl = parsed.data.cancelUrl ?? routeUrl(request, "/billing?checkout=cancel");

  try {
    const checkout = await createTenantSaasCheckout({ user, successUrl, cancelUrl });
    const accept = request.headers.get("accept") ?? "";
    if (accept.includes("text/html")) {
      return NextResponse.redirect(checkout.checkoutUrl, { status: 303 });
    }
    return NextResponse.json(
      { url: checkout.checkoutUrl },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    if (error instanceof TenantSaasBillingError) {
      return jsonError(error.message, error.status);
    }
    throw error;
  }
}

async function parseCheckoutRequest(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return checkoutRequestSchema.safeParse({});
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      body = {};
    } else {
      throw error;
    }
  }
  return checkoutRequestSchema.safeParse(body);
}

function routeUrl(request: Request, path: string): string {
  return new URL(path, request.url).toString();
}

function jsonError(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}
