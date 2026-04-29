import { z } from "zod"

const linkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
})

const headerSchema = z.object({
  brand: linkSchema,
  navigation: z.array(linkSchema),
  cta: linkSchema.optional(),
})

const footerSchema = z.object({
  blurb: z.string().min(1),
  columns: z.array(
    z.object({
      title: z.string().min(1),
      links: z.array(linkSchema),
    }),
  ),
  legal: z.string().min(1),
})

const designTokensSchema = z.object({
  background: z.string().min(1),
  foreground: z.string().min(1),
  mutedBackground: z.string().min(1),
  mutedForeground: z.string().min(1),
  accent: z.string().min(1),
  accentForeground: z.string().min(1),
  border: z.string().min(1),
  heroGradientFrom: z.string().min(1),
  heroGradientTo: z.string().min(1),
  maxWidth: z.string().min(1),
  radius: z.string().min(1),
  sectionGap: z.string().min(1),
})

const heroSectionSchema = z.object({
  type: z.literal("hero"),
  id: z.string().min(1),
  eyebrow: z.string().min(1).optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  primaryCta: linkSchema,
  secondaryCta: linkSchema.optional(),
})

const featureGridSectionSchema = z.object({
  type: z.literal("feature-grid"),
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1).optional(),
  features: z.array(
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
    }),
  ),
})

const ctaBandSectionSchema = z.object({
  type: z.literal("cta-band"),
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  primaryCta: linkSchema,
  secondaryCta: linkSchema.optional(),
})

export const landingSectionSchema = z.discriminatedUnion("type", [
  heroSectionSchema,
  featureGridSectionSchema,
  ctaBandSectionSchema,
])

export const landingSchemaV1 = z.object({
  version: z.literal("v1"),
  header: headerSchema,
  footer: footerSchema,
  tokens: designTokensSchema,
  sections: z.array(landingSectionSchema),
})

export type LandingSchemaV1 = z.infer<typeof landingSchemaV1>
export type LandingHeaderSchema = z.infer<typeof headerSchema>
export type LandingFooterSchema = z.infer<typeof footerSchema>
export type LandingDesignTokens = z.infer<typeof designTokensSchema>
export type LandingSection = z.infer<typeof landingSectionSchema>

export function parseLandingSchema(input: unknown): LandingSchemaV1 {
  const parsed = landingSchemaV1.safeParse(input)
  if (parsed.success) {
    return parsed.data
  }

  const issues = parsed.error.issues
    .map((issue) => `${issue.path.join(".") || "<root>"}: ${issue.message}`)
    .join("; ")

  throw new Error(`Invalid landing schema: ${issues}`)
}
