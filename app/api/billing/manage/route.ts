import { NextResponse } from "next/server";
import {
  getTenantSaasBillingUser,
  getTenantSaasManageUrl,
  TenantSaasBillingError,
} from "@/lib/saas/billing";

export async function POST(request: Request) {
  const user = await getTenantSaasBillingUser();
  if (!user) {
    return jsonError("Sign in to manage subscriptions.", 401);
  }

  try {
    const billing = await getTenantSaasManageUrl(user);
    const accept = request.headers.get("accept") ?? "";
    if (accept.includes("text/html")) {
      return NextResponse.redirect(billing.manageUrl, { status: 303 });
    }
    return NextResponse.json(
      { url: billing.manageUrl },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    if (error instanceof TenantSaasBillingError) {
      return jsonError(error.message, error.status);
    }
    throw error;
  }
}

function jsonError(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}
