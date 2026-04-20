import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteConfig } from "@/lib/db/schema";
import { enforceWebsiteAnalyticsCollectorUrl } from "@/lib/website-analytics";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const secret = req.headers.get("x-gondoor-secret");
  if (secret !== process.env.GONDOOR_INTERNAL_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as unknown;
  const generatedHtml = extractGeneratedHtml(body);
  if (generatedHtml === null) {
    return NextResponse.json(
      { error: "Invalid payload: generatedHtml must be a string" },
      { status: 400 }
    );
  }

  const canonicalHtml = enforceWebsiteAnalyticsCollectorUrl(generatedHtml);
  await db
    .update(siteConfig)
    .set({ generatedHtml: canonicalHtml })
    .where(eq(siteConfig.id, "default"));
  return NextResponse.json({ ok: true });
}

function extractGeneratedHtml(value: unknown): string | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const generatedHtml = (value as { generatedHtml?: unknown }).generatedHtml;
  return typeof generatedHtml === "string" ? generatedHtml : null;
}
