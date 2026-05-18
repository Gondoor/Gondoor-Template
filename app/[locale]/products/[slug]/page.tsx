import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getWhopClient, WhopConfigurationError } from "@/lib/whop/client";
import { CheckoutButton } from "@/components/ecommerce/checkout-button";
import { formatProductPrice } from "@/lib/whop/format";
import type { TenantProduct } from "@/types/product";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const product = await findProductBySlug(slug);
  if (!product) {
    return { title: "Product not found" };
  }
  return {
    title: product.name,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductDetailPage({ params }: RouteParams) {
  const { slug } = await params;
  const product = await findProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-5xl px-6 py-12 md:px-10 md:py-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div
              aria-hidden
              className="size-full bg-gradient-to-br from-muted to-muted-foreground/10"
            />
          )}
        </div>

        <div className="flex flex-col gap-6">
          <header className="flex flex-col gap-3">
            <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold tabular-nums">
              {formatProductPrice(product)}
            </p>
          </header>

          <p className="text-base/relaxed text-muted-foreground">
            {product.description}
          </p>

          <dl className="grid grid-cols-2 gap-3 rounded-lg border border-border bg-card p-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Billing</dt>
              <dd className="font-medium capitalize">
                {product.billingPeriod === "one-time"
                  ? "One-time"
                  : product.billingPeriod}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Currency</dt>
              <dd className="font-medium uppercase">{product.currency}</dd>
            </div>
          </dl>

          <div className="mt-auto">
            <CheckoutButton productId={product.id} label="Buy now" />
          </div>
        </div>
      </div>
    </article>
  );
}

async function findProductBySlug(
  slug: string
): Promise<TenantProduct | null> {
  try {
    const client = getWhopClient();
    const direct = await client.getProduct(slug).catch(() => null);
    if (direct && (direct.slug === slug || direct.id === slug)) {
      return direct;
    }
    const list = await client.listProducts({ limit: 100 });
    return list.products.find((p) => p.slug === slug || p.id === slug) ?? null;
  } catch (error) {
    if (error instanceof WhopConfigurationError) {
      return null;
    }
    throw error;
  }
}
