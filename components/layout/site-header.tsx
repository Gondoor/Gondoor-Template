import { buttonVariants } from "@/components/ui/button-variants"
import { getLandingSchema } from "@/lib/landing/schema-source"
import type { LandingHeaderSchema } from "@/lib/landing/schema"

type SiteHeaderProps = {
  header?: LandingHeaderSchema
}

export function SiteHeader({ header }: SiteHeaderProps) {
  const resolvedHeader = header ?? getLandingSchema().header

  return (
    <header className="border-b border-[var(--landing-border,var(--border))] bg-[var(--landing-background,var(--background))]">
      <div className="mx-auto flex w-full max-w-[var(--landing-max-width,1120px)] items-center justify-between gap-6 px-6 py-4 md:px-10">
        <a className="text-base font-semibold tracking-tight" href={resolvedHeader.brand.href}>
          {resolvedHeader.brand.label}
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {resolvedHeader.navigation.map((item) => (
            <a key={`${item.label}:${item.href}`} className="text-sm text-[var(--landing-muted-foreground,var(--muted-foreground))]" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        {resolvedHeader.cta ? (
          <a className={buttonVariants({ variant: "outline", size: "sm" })} href={resolvedHeader.cta.href}>
            {resolvedHeader.cta.label}
          </a>
        ) : null}
      </div>
    </header>
  )
}
