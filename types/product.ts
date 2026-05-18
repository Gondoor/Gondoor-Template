export type ProductBillingPeriod = "one-time" | "monthly" | "yearly" | "weekly";

export interface TenantProduct {
  id: string;
  slug: string;
  whopProductId: string | null;
  name: string;
  description: string;
  image: string | null;
  priceCents: number;
  currency: string;
  billingPeriod: ProductBillingPeriod;
  checkoutUrl: string | null;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  priceCents: number;
  currency: string;
  quantity: number;
}
