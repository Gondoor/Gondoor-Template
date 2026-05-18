import type { BillingPeriod, TenantProduct } from "@/types/product";

const formatterCache = new Map<string, Intl.NumberFormat>();

function getFormatter(currency: string): Intl.NumberFormat {
  const key = currency.toUpperCase();
  const existing = formatterCache.get(key);
  if (existing) return existing;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: key,
    minimumFractionDigits: 2,
  });
  formatterCache.set(key, formatter);
  return formatter;
}

export function formatPriceCents(priceCents: number, currency: string): string {
  return getFormatter(currency).format(priceCents / 100);
}

const SUFFIXES: Record<BillingPeriod, string> = {
  "one-time": "",
  monthly: "/mo",
  yearly: "/yr",
};

export function formatProductPrice(
  product: Pick<TenantProduct, "priceCents" | "currency" | "billingPeriod">
): string {
  const base = formatPriceCents(product.priceCents, product.currency);
  return `${base}${SUFFIXES[product.billingPeriod] ?? ""}`;
}
