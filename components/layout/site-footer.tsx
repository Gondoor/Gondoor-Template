import { getLandingSchema } from "@/lib/landing/schema-source"
import type { LandingFooterSchema } from "@/lib/landing/schema"

type SiteFooterProps = {
  footer?: LandingFooterSchema
}

export function SiteFooter({ footer }: SiteFooterProps) {
  const resolvedFooter = footer ?? getLandingSchema().footer

  return (
    <footer className="border-t border-[var(--landing-border,var(--border))] bg-[var(--landing-background,var(--background))]">
      <div className="mx-auto grid w-full max-w-[var(--landing-max-width,1120px)] gap-8 px-6 py-10 md:grid-cols-[1.25fr_2fr] md:px-10">
        <div className="space-y-3">
          <p className="text-sm text-[var(--landing-muted-foreground,var(--muted-foreground))]">{resolvedFooter.blurb}</p>
          <p className="text-xs text-[var(--landing-muted-foreground,var(--muted-foreground))]">{resolvedFooter.legal}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {resolvedFooter.columns.map((column) => (
            <div key={column.title} className="space-y-2">
              <h2 className="text-sm font-semibold">{column.title}</h2>
              <ul className="space-y-1">
                {column.links.map((link) => (
                  <li key={`${column.title}:${link.label}:${link.href}`}>
                    <a className="text-sm text-[var(--landing-muted-foreground,var(--muted-foreground))]" href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
