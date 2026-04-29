import { buttonVariants } from "@/components/ui/button-variants"
import type { LandingSection } from "@/lib/landing/schema"

type CtaBandSectionSchema = Extract<LandingSection, { type: "cta-band" }>

export function CtaBandSection({ section }: { section: CtaBandSectionSchema }) {
  return (
    <section
      id={section.id}
      className="rounded-[var(--landing-radius)] border border-[var(--landing-border)] bg-[var(--landing-accent)] px-6 py-10 text-[var(--landing-accent-foreground)] md:px-10"
    >
      <h2 className="text-3xl font-semibold tracking-tight">{section.title}</h2>
      <p className="mt-3 max-w-2xl text-sm opacity-90 md:text-base">{section.description}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a className={buttonVariants({ variant: "secondary" })} href={section.primaryCta.href}>
          {section.primaryCta.label}
        </a>
        {section.secondaryCta ? (
          <a className={buttonVariants({ variant: "outline" })} href={section.secondaryCta.href}>
            {section.secondaryCta.label}
          </a>
        ) : null}
      </div>
    </section>
  )
}
