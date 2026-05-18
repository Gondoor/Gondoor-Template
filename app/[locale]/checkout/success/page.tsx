import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const dynamic = "force-dynamic";

interface CheckoutSuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export const metadata = {
  title: "Order confirmed",
  description: "Thank you for your order.",
};

export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  const { session_id: sessionId } = await searchParams;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl px-6 py-24 text-center text-slate-900">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">Success</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">Thanks for your order!</h1>
        <p className="mt-4 text-base text-slate-600">
          We&apos;ve received your payment and you&apos;ll get a confirmation email shortly.
        </p>
        {sessionId ? (
          <p className="mt-2 text-xs text-slate-500">
            Reference: <code className="rounded bg-slate-100 px-2 py-1">{sessionId}</code>
          </p>
        ) : null}
        <Link
          href="/"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-[var(--landing-primary,#0EA5E9)] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:opacity-90"
        >
          Back to home
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
