import { db } from "@/lib/db";
import { siteConfig } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { SiteConfig } from "./site-config.types";

export async function getSiteConfig(): Promise<SiteConfig | null> {
  try {
    const rows = await db
      .select()
      .from(siteConfig)
      .where(eq(siteConfig.id, "default"))
      .limit(1);
    if (!rows[0]) return null;
    return JSON.parse(rows[0].config) as SiteConfig;
  } catch {
    return null;
  }
}
