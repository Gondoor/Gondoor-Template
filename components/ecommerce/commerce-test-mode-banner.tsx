export function CommerceTestModeBanner() {
  return (
    <aside
      aria-label="Test mode"
      className="border-b border-border bg-muted px-4 py-3 text-sm text-foreground"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3">
        <p>Test mode is active. Payments use the Whop sandbox.</p>
        <a
          className="font-medium underline underline-offset-4 hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
          href="?gondoor_test=false"
        >
          Exit test mode
        </a>
      </div>
    </aside>
  );
}
