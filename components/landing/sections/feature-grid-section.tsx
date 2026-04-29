import type { LandingSection } from "@/lib/landing/schema"

type FeatureGridSectionSchema = Extract<LandingSection, { type: "feature-grid" }>

export function FeatureGridSection({ section }: { section: FeatureGridSectionSchema }) {
  return (
    <section id={section.id} className="space-y-5">
      <div className="max-w-2xl space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight">{section.title}</h2>
        {section.description ? <p className="text-[var(--landing-muted-foreground)]">{section.description}</p> : null}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {section.features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-[var(--landing-radius)] border border-[var(--landing-border)] bg-[var(--landing-muted-background)] p-5"
          >
            <h3 className="text-lg font-medium">{feature.title}</h3>
            <p className="mt-2 text-sm text-[var(--landing-muted-foreground)]">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
