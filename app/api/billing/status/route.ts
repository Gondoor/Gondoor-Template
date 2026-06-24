import { NextResponse } from "next/server";
import {
  getTenantSaasBillingStatus,
  getTenantSaasBillingUser,
  TenantSaasBillingError,
} from "@/lib/saas/billing";

export async function POST() {
  const user = await getTenantSaasBillingUser();
  if (!user) {
    return jsonError("Sign in to manage subscriptions.", 401);
  }

  try {
    const status = await getTenantSaasBillingStatus(user);
    return NextResponse.json(status, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
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
