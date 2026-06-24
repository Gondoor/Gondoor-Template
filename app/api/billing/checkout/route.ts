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

type CheckoutRequest = z.infer<typeof checkoutRequestSchema>;

type CheckoutRequestParseResult =
  | { readonly success: true; readonly data: CheckoutRequest }
  | { readonly success: false };

type CheckoutReturnUrls = {
  readonly successUrl: string;
  readonly cancelUrl: string;
};

export async function POST(request: Request) {
  const user = await getTenantSaasBillingUser();
  if (!user) {
    return jsonError("Sign in to manage subscriptions.", 401);
  }

  const parsed = await parseCheckoutRequest(request);
  if (!parsed.success) {
    return jsonError("Checkout URLs must be valid URLs.", 400);
  }

  const returnUrls = resolveCheckoutReturnUrls(request, parsed.data);
  if (!returnUrls) {
    return jsonError("Checkout URLs must stay on this site.", 400);
  }

  try {
    const checkout = await createTenantSaasCheckout({
      user,
      successUrl: returnUrls.successUrl,
      cancelUrl: returnUrls.cancelUrl,
    });
    const accept = request.headers.get("accept") ?? "";
    if (accept.includes("text/html")) {
      const response = NextResponse.redirect(checkout.checkoutUrl, { status: 303 });
      response.headers.set("Cache-Control", "no-store");
      return response;
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

async function parseCheckoutRequest(request: Request): Promise<CheckoutRequestParseResult> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return checkoutRequestSchema.safeParse({});
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      return { success: false };
    } else {
      throw error;
    }
  }
  return checkoutRequestSchema.safeParse(body);
}

function resolveCheckoutReturnUrls(
  request: Request,
  input: CheckoutRequest,
): CheckoutReturnUrls | null {
  const successUrl = resolveSameOriginUrl(request, input.successUrl, "/?billing=success");
  const cancelUrl = resolveSameOriginUrl(request, input.cancelUrl, "/?billing=cancel");
  if (!successUrl || !cancelUrl) return null;
  return { successUrl, cancelUrl };
}

function resolveSameOriginUrl(
  request: Request,
  rawUrl: string | undefined,
  fallbackPath: string,
): string | null {
  if (!rawUrl) return routeUrl(request, fallbackPath);
  const url = new URL(rawUrl);
  if (url.origin !== new URL(request.url).origin) return null;
  return url.toString();
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
