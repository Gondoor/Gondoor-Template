import { buttonVariants } from "@/components/ui/button-variants"
import type { LandingSection } from "@/lib/landing/schema"

type HeroSectionSchema = Extract<LandingSection, { type: "hero" }>

export function HeroSection({ section }: { section: HeroSectionSchema }) {
  return (
    <section id={section.id} className="rounded-[var(--landing-radius)] border border-[var(--landing-border)] bg-gradient-to-b from-[var(--landing-hero-gradient-from)] to-[var(--landing-hero-gradient-to)] px-6 py-14 md:px-10 md:py-20">
      {section.eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--landing-muted-foreground)]">{section.eyebrow}</p>
      ) : null}
      <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">{section.title}</h1>
      <p className="mt-5 max-w-2xl text-base text-[var(--landing-muted-foreground)] md:text-lg">{section.description}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a className={buttonVariants({ variant: "default" })} href={section.primaryCta.href}>
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
