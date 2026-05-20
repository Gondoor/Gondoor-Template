import Link from 'next/link';
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

async function fetchProducts(): Promise<ProductListing[]> {
  if (!GONDOOR_API_BASE || !GONDOOR_API_KEY) return [];
  try {
    const response = await fetch(`${GONDOOR_API_BASE.replace(/\/+$/, '')}/v1/tenant-commerce/products`, {
      headers: { Authorization: `Bearer ${GONDOOR_API_KEY}` },
      cache: 'no-store',
    });
    if (!response.ok) return [];
    const json = (await response.json()) as { data?: ProductListing[] };
    return Array.isArray(json.data) ? json.data : [];
  } catch {
    return [];
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

export default async function ProductsPage() {
  const products = await fetchProducts();
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-6 py-16 text-slate-900">
        <header className="mb-10 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Shop</h1>
          <p className="text-base text-slate-600">Browse the Your Brand catalog. Checkout is powered by Whop.</p>
        </header>
        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-8 py-16 text-center text-slate-600">
            <p className="text-lg font-medium">No products available yet</p>
            <p className="mt-1 text-sm">Products will appear here once they are provisioned.</p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[var(--primary,#0EA5E9)] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:opacity-90"
            >
              Back to home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm">
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <header className="space-y-1">
                    <h3 className="text-lg font-semibold leading-tight">{product.name}</h3>
                    {product.description ? (
                      <p className="line-clamp-3 text-sm text-slate-600">{product.description}</p>
                    ) : null}
                  </header>
                  <p className="text-xl font-bold">
                    {formatPrice(product.priceCents, product.currency, product.billingPeriod)}
                  </p>
                  <form action="/api/checkout" method="POST" className="mt-auto">
                    <input type="hidden" name="tenantProductId" value={product.id} />
                    <input type="hidden" name="quantity" value="1" />
                    <button
                      type="submit"
                      className="w-full rounded-full bg-[var(--primary,#0EA5E9)] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:opacity-90"
                    >
                      Buy now
                    </button>
                  </form>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
