import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-[var(--landing-muted,#666)]">404</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-4 text-base text-[var(--landing-muted,#666)]">
        We couldn&apos;t find what you&apos;re looking for on Onboarding Skip Labs Local. Head back to the homepage to explore.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-[var(--primary,#0EA5E9)] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:opacity-90"
      >
        Back to home
      </Link>
    </main>
  );
}
