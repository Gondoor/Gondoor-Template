import { buttonVariants } from "@/components/ui/button-variants"
import { renderLandingSection } from "@/components/landing/section-registry"
import { LandingStyles } from "@/components/layout/landing-styles"
import { getLandingSchema } from "@/lib/landing/schema-source"

export default function LandingPage() {
  const schema = getLandingSchema()
  const serverSafeButtonClass = buttonVariants({ variant: "outline" })

  return (
    <LandingStyles tokens={schema.tokens}>
      <div
        className="mx-auto w-full max-w-[var(--landing-max-width)] px-6 py-14 md:px-10 md:py-16"
        data-server-safe-button-class={serverSafeButtonClass}
      >
        <div className="space-y-[var(--landing-section-gap)]">{schema.sections.map((section) => renderLandingSection(section))}</div>
      </div>
    </LandingStyles>
  )
}
