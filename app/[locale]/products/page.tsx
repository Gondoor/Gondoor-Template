import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ProductCard } from "@/components/ecommerce/product-card";
import { fetchAllProducts } from "@/lib/ecommerce/products";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop",
  description: "Browse our products and complete checkout securely.",
};

export default async function ProductsPage() {
  const products = await fetchAllProducts();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-6 py-16 text-slate-900">
        <header className="mb-10 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Shop</h1>
          <p className="text-base text-slate-600">
            Browse our catalog. Checkout is powered by Whop.
          </p>
        </header>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-8 py-16 text-center text-slate-600">
            <p className="text-lg font-medium">No products available yet</p>
            <p className="mt-1 text-sm">
              Products will appear here once they have been provisioned in Whop.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
