"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CheckoutButtonProps {
  productId: string;
  planId?: string;
  label?: string;
  className?: string;
  metadata?: Record<string, string>;
}

export function CheckoutButton({
  productId,
  planId,
  label = "Buy now",
  className,
  metadata,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, planId, metadata }),
      });
      if (!response.ok) {
        const body = await response.text();
        throw new Error(body || `Checkout request failed (${response.status})`);
      }
      const data = (await response.json()) as { url?: string };
      if (!data.url) {
        throw new Error("No checkout URL returned");
      }
      window.location.href = data.url;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Checkout failed. Please try again.";
      toast.error(message);
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      aria-busy={loading}
      aria-disabled={loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-[var(--landing-primary,#0EA5E9)] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
      {loading ? "Redirecting…" : label}
    </button>
  );
}
