import { WhopClient } from "@/lib/whop/client";
import type { TenantProduct } from "@/types/product";

let cachedClient: WhopClient | null = null;

function getClient(): WhopClient {
  if (!cachedClient) {
    cachedClient = new WhopClient();
  }
  return cachedClient;
}

export async function fetchAllProducts(): Promise<TenantProduct[]> {
  try {
    return await getClient().listProducts();
  } catch (error) {
    console.error("[products] listProducts failed", error);
    return [];
  }
}

export async function fetchProductBySlug(slug: string): Promise<TenantProduct | null> {
  try {
    const products = await getClient().listProducts();
    return products.find((product) => product.slug === slug) ?? null;
  } catch (error) {
    console.error(`[products] fetchProductBySlug(${slug}) failed`, error);
    return null;
  }
}
