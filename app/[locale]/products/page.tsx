import { getWhopClient, WhopConfigurationError } from "@/lib/whop/client";
import { ProductCard } from "@/components/ecommerce/product-card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PackageIcon, TriangleAlertIcon } from "lucide-react";
import type { TenantProduct } from "@/types/product";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Products",
  description: "Browse available products.",
};

export default async function ProductsPage() {
  const { products, error } = await loadProducts();

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12 md:px-10 md:py-16">
      <header className="mb-10 flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          Products
        </h1>
        <p className="text-muted-foreground">
          Explore everything available right now.
        </p>
      </header>

      {error ? (
        <Alert variant="destructive">
          <TriangleAlertIcon />
          <AlertTitle>Catalog unavailable</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : products.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <PackageIcon />
            </EmptyMedia>
            <EmptyTitle>No products yet</EmptyTitle>
            <EmptyDescription>
              Once products are provisioned, they will appear here.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent />
        </Empty>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

async function loadProducts(): Promise<{
  products: TenantProduct[];
  error?: string;
}> {
  try {
    const client = getWhopClient();
    const result = await client.listProducts({ limit: 24 });
    return { products: result.products };
  } catch (error) {
    if (error instanceof WhopConfigurationError) {
      return { products: [] };
    }
    const message =
      error instanceof Error ? error.message : "Failed to load products";
    return { products: [], error: message };
  }
}
