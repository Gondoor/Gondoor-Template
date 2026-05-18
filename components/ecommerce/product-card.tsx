import Image from "next/image";
import Link from "next/link";
import { CheckoutButton } from "@/components/ecommerce/checkout-button";
import { formatPrice } from "@/lib/ecommerce/format-price";
import type { TenantProduct } from "@/types/product";

interface ProductCardProps {
  product: TenantProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm">
      <div className="relative aspect-[4/3] w-full bg-slate-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
            No image
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <header className="space-y-1">
          <h3 className="text-lg font-semibold leading-tight text-slate-900">
            <Link href={`/products/${product.slug}`} className="hover:underline">
              {product.name}
            </Link>
          </h3>
          {product.description ? (
            <p className="line-clamp-3 text-sm text-slate-600">{product.description}</p>
          ) : null}
        </header>
        <p className="text-xl font-bold text-slate-900">
          {formatPrice(product.priceCents, product.currency, product.billingPeriod)}
        </p>
        <div className="mt-auto">
          <CheckoutButton productId={product.id} className="w-full" />
        </div>
      </div>
    </article>
  );
}
