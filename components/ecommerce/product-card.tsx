import Image from "next/image";
import Link from "next/link";
import type { TenantProduct } from "@/types/product";
import { CheckoutButton } from "@/components/ecommerce/checkout-button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatProductPrice } from "@/lib/whop/format";

interface ProductCardProps {
  product: TenantProduct;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const href = `/products/${product.slug}`;
  return (
    <Card className={cn("group/product-card flex flex-col", className)}>
      {product.image ? (
        <Link
          href={href}
          aria-label={product.name}
          className="relative block aspect-[4/3] w-full overflow-hidden bg-muted"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition group-hover/product-card:scale-[1.02]"
          />
        </Link>
      ) : (
        <div
          aria-hidden
          className="aspect-[4/3] w-full bg-gradient-to-br from-muted to-muted-foreground/10"
        />
      )}
      <div className="flex flex-1 flex-col gap-3 px-4 pb-4">
        <div className="flex flex-col gap-1">
          <Link
            href={href}
            className="text-base font-medium tracking-tight hover:underline"
          >
            {product.name}
          </Link>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>
        </div>
        <div className="mt-auto flex flex-col gap-3">
          <p className="text-lg font-semibold tabular-nums">
            {formatProductPrice(product)}
          </p>
          <CheckoutButton tenantProductId={product.id} label="Buy now" />
        </div>
      </div>
    </Card>
  );
}
