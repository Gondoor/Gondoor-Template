import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

export const dynamic = 'force-dynamic';

interface ProductListing {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  priceCents: number;
  currency: string;
  billingPeriod: string | null;
  imageUrl: string | null;
}

const GONDOOR_API_BASE = process.env.GONDOOR_API_BASE ?? '';
const GONDOOR_API_KEY = process.env.GONDOOR_API_KEY ?? '';

async function fetchProductBySlug(slug: string): Promise<ProductListing | null> {
  if (!GONDOOR_API_BASE || !GONDOOR_API_KEY) return null;
  try {
    const response = await fetch(`${GONDOOR_API_BASE.replace(/\/+$/, '')}/v1/tenant-commerce/products`, {
      headers: { Authorization: `Bearer ${GONDOOR_API_KEY}` },
      cache: 'no-store',
    });
    if (!response.ok) return null;
    const json = (await response.json()) as { data?: ProductListing[] };
    const products = Array.isArray(json.data) ? json.data : [];
    return products.find((p) => p.slug === slug) ?? null;
  } catch {
    return null;
  }
}

function formatPrice(priceCents: number, currency: string, billingPeriod: string | null): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: (currency || 'USD').toUpperCase(),
    minimumFractionDigits: priceCents % 100 === 0 ? 0 : 2,
  });
  const base = formatter.format(priceCents / 100);
  if (billingPeriod === 'monthly') return base + '/mo';
  if (billingPeriod === 'yearly') return base + '/yr';
  if (billingPeriod === 'weekly') return base + '/wk';
  return base;
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) return { title: 'Product not found' };
  return {
    title: product.name + ' — Your Brand',
    description: product.description?.slice(0, 160) || product.name,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl px-6 py-16 text-slate-900">
        <Link
          href="/products"
          className="text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          ← Back to shop
        </Link>
        <article className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
            {product.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
                No image
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6">
            <header className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
              <p className="text-2xl font-semibold">
                {formatPrice(product.priceCents, product.currency, product.billingPeriod)}
              </p>
            </header>
            {product.description ? (
              <p className="whitespace-pre-line text-base text-slate-700">{product.description}</p>
            ) : null}
            <form action="/api/checkout" method="POST" className="mt-auto">
              <input type="hidden" name="tenantProductId" value={product.id} />
              <input type="hidden" name="quantity" value="1" />
              <button
                type="submit"
                className="w-full rounded-full bg-[var(--primary,#0EA5E9)] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:opacity-90 sm:w-auto"
              >
                Buy now
              </button>
            </form>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
