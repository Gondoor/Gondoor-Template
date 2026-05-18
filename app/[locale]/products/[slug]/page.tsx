import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CheckoutButton } from "@/components/ecommerce/checkout-button";
import { formatPrice } from "@/lib/ecommerce/format-price";
import { fetchProductBySlug } from "@/lib/ecommerce/products";

export const dynamic = "force-dynamic";

interface ProductDetailParams {
  locale: string;
  slug: string;
}

interface ProductDetailPageProps {
  params: Promise<ProductDetailParams>;
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) {
    return { title: "Product not found" };
  }
  return {
    title: product.name,
    description: product.description.slice(0, 160) || product.name,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl px-6 py-16 text-slate-900">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
                No image
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6">
            <header className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
              <p className="text-2xl font-semibold text-slate-900">
                {formatPrice(product.priceCents, product.currency, product.billingPeriod)}
              </p>
            </header>
            {product.description ? (
              <p className="whitespace-pre-line text-base text-slate-700">{product.description}</p>
            ) : null}
            <div className="mt-auto pt-4">
              <CheckoutButton productId={product.id} label="Buy now" className="w-full sm:w-auto" />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
