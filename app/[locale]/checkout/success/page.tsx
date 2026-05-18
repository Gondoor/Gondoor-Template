import Link from "next/link";
import { CheckCircle2Icon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";

export const metadata = {
  title: "Thanks for your order",
  description: "Your order has been received.",
};

interface RouteParams {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: RouteParams) {
  const { session_id: sessionId } = await searchParams;

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 px-6 py-20 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary">
        <CheckCircle2Icon className="size-8" aria-hidden />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          Thanks for your order!
        </h1>
        <p className="text-muted-foreground">
          We received your payment and started processing your order. A
          confirmation should arrive in your inbox shortly.
        </p>
      </div>
      {sessionId ? (
        <p className="rounded-md border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
          Reference: <span className="font-mono">{sessionId}</span>
        </p>
      ) : null}
      <Link href="/" className={buttonVariants({ variant: "default" })}>
        Back to home
      </Link>
    </section>
  );
}
