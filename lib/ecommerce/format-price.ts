import type { ProductBillingPeriod } from "@/types/product";

const SUFFIX: Record<ProductBillingPeriod, string> = {
  "one-time": "",
  monthly: "/mo",
  yearly: "/yr",
  weekly: "/wk",
};

export function formatPrice(
  priceCents: number,
  currency: string,
  billingPeriod: ProductBillingPeriod,
): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: (currency || "USD").toUpperCase(),
    minimumFractionDigits: priceCents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
  const formatted = formatter.format(priceCents / 100);
  const suffix = SUFFIX[billingPeriod] ?? "";
  return `${formatted}${suffix}`;
}
