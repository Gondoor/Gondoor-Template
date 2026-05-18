"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2Icon, MinusIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { useCart, type CartItem } from "@/lib/cart/use-cart";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ShoppingCartIcon } from "lucide-react";
import { formatPriceCents } from "@/lib/whop/format";

export function CartView() {
  const items = useCart((state) => state.items);
  const updateQuantity = useCart((state) => state.updateQuantity);
  const removeItem = useCart((state) => state.removeItem);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex h-32 items-center justify-center text-muted-foreground"
      >
        <Spinner />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ShoppingCartIcon />
          </EmptyMedia>
          <EmptyTitle>Your cart is empty</EmptyTitle>
          <EmptyDescription>
            Browse the catalog to add something to your cart.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link href="/products" className="text-sm font-medium underline-offset-2 hover:underline">
            Go to products
          </Link>
        </EmptyContent>
      </Empty>
    );
  }

  const currency = items[0]?.currency ?? "USD";
  const subtotalCents = items.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0
  );

  return (
    <div className="flex flex-col gap-6">
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <CartRow
            key={item.productId}
            item={item}
            onIncrement={() =>
              updateQuantity(item.productId, item.quantity + 1)
            }
            onDecrement={() =>
              updateQuantity(item.productId, item.quantity - 1)
            }
            onRemove={() => removeItem(item.productId)}
          />
        ))}
      </ul>

      <div className="flex items-center justify-between border-t border-border pt-4 text-base font-semibold">
        <span>Subtotal</span>
        <span className="tabular-nums">
          {formatPriceCents(subtotalCents, currency)}
        </span>
      </div>

      <CheckoutCtaRow items={items} />
    </div>
  );
}

interface CartRowProps {
  item: CartItem;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

function CartRow({ item, onIncrement, onDecrement, onRemove }: CartRowProps) {
  return (
    <li className="flex items-center gap-4 rounded-lg border border-border bg-card p-3">
      <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-muted">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <Link
          href={`/products/${item.slug}`}
          className="text-sm font-medium hover:underline"
        >
          {item.name}
        </Link>
        <p className="text-sm text-muted-foreground tabular-nums">
          {formatPriceCents(item.priceCents, item.currency)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Decrease quantity"
          onClick={onDecrement}
        >
          <MinusIcon />
        </Button>
        <span
          aria-label={`Quantity: ${item.quantity}`}
          className="min-w-6 text-center text-sm tabular-nums"
        >
          {item.quantity}
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Increase quantity"
          onClick={onIncrement}
        >
          <PlusIcon />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={`Remove ${item.name}`}
          onClick={onRemove}
        >
          <Trash2Icon />
        </Button>
      </div>
    </li>
  );
}

interface CheckoutCtaRowProps {
  items: CartItem[];
}

function CheckoutCtaRow({ items }: CheckoutCtaRowProps) {
  const [isPending, startTransition] = useTransition();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleCheckout = () => {
    const first = items[0];
    if (!first) return;
    startTransition(async () => {
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: first.productId,
            metadata: { cart_quantity: String(first.quantity) },
          }),
        });
        if (!response.ok) {
          const body = (await response.json().catch(() => ({}))) as {
            error?: string;
          };
          throw new Error(body.error ?? `Checkout failed (${response.status})`);
        }
        const data = (await response.json()) as { url?: string };
        if (!data.url) throw new Error("Checkout response missing redirect URL");
        setIsRedirecting(true);
        window.location.href = data.url;
      } catch (e) {
        const message =
          e instanceof Error ? e.message : "Something went wrong";
        toast.error("Checkout error", { description: message });
      }
    });
  };

  const busy = isPending || isRedirecting;
  return (
    <Button
      type="button"
      onClick={handleCheckout}
      disabled={busy}
      aria-busy={busy}
      className="w-full"
    >
      {busy ? (
        <>
          <Spinner className="mr-2" />
          <span>Redirecting…</span>
        </>
      ) : (
        "Proceed to checkout"
      )}
    </Button>
  );
}
