import { render, screen } from "@testing-library/react"
import { renderLandingSection } from "@/components/landing/section-registry"
import type { LandingSection } from "@/lib/landing/schema"

describe("landing section registry", () => {
  it("renders a hero section from typed schema", () => {
    const section: LandingSection = {
      type: "hero",
      id: "hero-a",
      eyebrow: "Schema First",
      title: "Deterministic landing",
      description: "Rendered through typed components.",
      primaryCta: { label: "Start", href: "/start" },
      secondaryCta: { label: "Learn", href: "/learn" },
    }

    render(renderLandingSection(section))

    expect(screen.getByRole("heading", { name: "Deterministic landing" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Start" })).toHaveAttribute("href", "/start")
    expect(screen.getByRole("link", { name: "Learn" })).toHaveAttribute("href", "/learn")
  })
})
