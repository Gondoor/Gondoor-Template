import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata = {
  title: "Checkout cancelled",
  description: "Your checkout was cancelled. No charge was made.",
};

export default function CheckoutCancelPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl px-6 py-24 text-center text-slate-900">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Cancelled
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">Checkout cancelled</h1>
        <p className="mt-4 text-base text-slate-600">
          No charge was made. You can return to the shop whenever you&apos;re ready.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Back to shop
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[var(--landing-primary,#0EA5E9)] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            Back to home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
