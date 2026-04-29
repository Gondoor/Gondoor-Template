import type { CSSProperties, ReactNode } from "react"
import type { LandingDesignTokens } from "@/lib/landing/schema"

type LandingStylesProps = {
  tokens: LandingDesignTokens
  children: ReactNode
}

function getLandingStyleVariables(tokens: LandingDesignTokens): CSSProperties {
  return {
    "--landing-background": tokens.background,
    "--landing-foreground": tokens.foreground,
    "--landing-muted-background": tokens.mutedBackground,
    "--landing-muted-foreground": tokens.mutedForeground,
    "--landing-accent": tokens.accent,
    "--landing-accent-foreground": tokens.accentForeground,
    "--landing-border": tokens.border,
    "--landing-hero-gradient-from": tokens.heroGradientFrom,
    "--landing-hero-gradient-to": tokens.heroGradientTo,
    "--landing-max-width": tokens.maxWidth,
    "--landing-radius": tokens.radius,
    "--landing-section-gap": tokens.sectionGap,
  } as CSSProperties
}

export function LandingStyles({ tokens, children }: LandingStylesProps) {
  return (
    <div
      data-landing-root="v1"
      style={getLandingStyleVariables(tokens)}
      className="bg-[var(--landing-background)] text-[var(--landing-foreground)]"
    >
      {children}
    </div>
  )
}
