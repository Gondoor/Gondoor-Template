export type BillingPeriod = "one-time" | "monthly" | "yearly";

export interface TenantProduct {
  id: string;
  slug: string;
  whopProductId: string;
  name: string;
  description: string;
  image?: string;
  priceCents: number;
  currency: string;
  billingPeriod: BillingPeriod;
  checkoutUrl?: string;
}

export interface TenantProductListResult {
  products: TenantProduct[];
  nextCursor?: string;
}
