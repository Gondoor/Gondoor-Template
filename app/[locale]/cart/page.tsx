"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { useCart } from "@/lib/cart/use-cart";
import { formatPrice } from "@/lib/ecommerce/format-price";

export default function CartPage() {
  const items = useCart((state) => state.items);
  const updateQuantity = useCart((state) => state.updateQuantity);
  const removeItem = useCart((state) => state.removeItem);
  const totalCents = useCart((state) => state.totalCents());
  const currency = items[0]?.currency ?? "USD";

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-6 py-16 text-slate-900">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">Your cart</h1>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-8 py-16 text-center text-slate-600">
            <p className="text-lg font-medium">Your cart is empty</p>
            <p className="mt-1 text-sm">
              Add a product from the{" "}
              <Link href="/products" className="font-semibold text-[var(--landing-primary,#0EA5E9)] hover:underline">
                shop
              </Link>{" "}
              to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
              {items.map((item) => (
                <li key={item.productId} className="flex items-center gap-4 p-4">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-600">
                      {formatPrice(item.priceCents, item.currency, "one-time")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="rounded-full border border-slate-300 p-1 text-slate-700 hover:bg-slate-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="rounded-full border border-slate-300 p-1 text-slate-700 hover:bg-slate-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => removeItem(item.productId)}
                    className="rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4">
              <span className="text-base font-medium text-slate-700">Total</span>
              <span className="text-xl font-bold">{formatPrice(totalCents, currency, "one-time")}</span>
            </div>

            <p className="text-xs text-slate-500">
              Cart is local-only for MVP — checkout will be processed per-line item via Whop.
            </p>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
