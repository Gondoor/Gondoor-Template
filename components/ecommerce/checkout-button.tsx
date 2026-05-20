"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface CheckoutButtonProps {
  tenantProductId: string;
  quantity?: number;
  label?: string;
  className?: string;
}

export function CheckoutButton({
  tenantProductId,
  quantity = 1,
  label = "Buy now",
  className,
}: CheckoutButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const busy = isPending || isRedirecting;

  const handleClick = () => {
    setError(null);
    startTransition(async () => {
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tenantProductId, quantity }),
        });
        if (!response.ok) {
          const body = (await response.json().catch(() => ({}))) as {
            error?: string;
          };
          throw new Error(body.error ?? `Checkout failed (${response.status})`);
        }
        const data = (await response.json()) as { url?: string };
        if (!data.url) {
          throw new Error("Checkout response missing redirect URL");
        }
        setIsRedirecting(true);
        window.location.href = data.url;
      } catch (e) {
        const message =
          e instanceof Error ? e.message : "Something went wrong";
        setError(message);
        toast.error("Checkout error", { description: message });
      }
    });
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Button
        type="button"
        onClick={handleClick}
        disabled={busy}
        aria-busy={busy}
        aria-disabled={busy}
        className="w-full"
      >
        {busy ? (
          <>
            <Spinner className="mr-2" />
            <span>Redirecting…</span>
          </>
        ) : (
          label
        )}
      </Button>
      {error ? (
        <div
          role="alert"
          className="flex items-center justify-between gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive"
        >
          <span>{error}</span>
          <button
            type="button"
            onClick={handleClick}
            className="font-medium underline-offset-2 hover:underline"
          >
            Retry
          </button>
        </div>
      ) : null}
    </div>
  );
}
