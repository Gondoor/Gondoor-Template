import { CartView } from "@/components/ecommerce/cart-view";

export const metadata = {
  title: "Cart",
  description: "Review the items in your cart before checkout.",
};

export default function CartPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-12 md:px-10 md:py-16">
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          Your cart
        </h1>
        <p className="text-muted-foreground">
          Review your items before continuing to checkout.
        </p>
      </header>
      <CartView />
    </section>
  );
}
