import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteConfig } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const secret = req.headers.get("x-gondoor-secret");
  if (secret !== process.env.GONDOOR_INTERNAL_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as { generatedHtml: string };
  await db
    .update(siteConfig)
    .set({ generatedHtml: body.generatedHtml })
    .where(eq(siteConfig.id, "default"));
  return NextResponse.json({ ok: true });
}
