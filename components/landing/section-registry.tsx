import { CtaBandSection } from "@/components/landing/sections/cta-band-section"
import { FeatureGridSection } from "@/components/landing/sections/feature-grid-section"
import { HeroSection } from "@/components/landing/sections/hero-section"
import type { LandingSection } from "@/lib/landing/schema"

type SectionRendererMap = {
  [K in LandingSection["type"]]: (props: {
    section: Extract<LandingSection, { type: K }>
  }) => React.JSX.Element
}

export const landingSectionRegistry: SectionRendererMap = {
  hero: HeroSection,
  "feature-grid": FeatureGridSection,
  "cta-band": CtaBandSection,
}

export function renderLandingSection(section: LandingSection): React.JSX.Element {
  const Component = landingSectionRegistry[section.type] as (props: {
    section: LandingSection
  }) => React.JSX.Element

  return <Component key={section.id} section={section} />
}
