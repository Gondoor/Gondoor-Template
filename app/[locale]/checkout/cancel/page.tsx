import Link from "next/link";
import { XCircleIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";

export const metadata = {
  title: "Order cancelled",
  description: "Your order was cancelled before payment was completed.",
};

export default function CheckoutCancelPage() {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 px-6 py-20 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <XCircleIcon className="size-8" aria-hidden />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          Order cancelled
        </h1>
        <p className="text-muted-foreground">
          No charge was made. You can return to the catalog whenever you are
          ready.
        </p>
      </div>
      <div className="flex gap-3">
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Back to home
        </Link>
        <Link
          href="/products"
          className={buttonVariants({ variant: "default" })}
        >
          Browse products
        </Link>
      </div>
    </section>
  );
}
