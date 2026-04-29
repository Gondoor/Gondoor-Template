import { LANDING_SCHEMA_SOURCE } from "@/lib/landing/seed/landing-schema.generated"
import { parseLandingSchema } from "@/lib/landing/schema"

const landingSchemaSourceObject = LANDING_SCHEMA_SOURCE as Record<string, unknown>

describe("landing schema contract v1", () => {
  it("parses the generated landing schema source", () => {
    const schema = parseLandingSchema(LANDING_SCHEMA_SOURCE)

    expect(schema.version).toBe("v1")
    expect(schema.sections.length).toBeGreaterThan(0)
    expect(schema.header.brand.label.length).toBeGreaterThan(0)
    expect(schema.footer.columns.length).toBeGreaterThan(0)
  })

  it("rejects unknown section types", () => {
    expect(() =>
      parseLandingSchema({
        ...landingSchemaSourceObject,
        sections: [{ type: "unknown-section" }],
      }),
    ).toThrow("Invalid landing schema")
  })

  it("rejects malformed design tokens", () => {
    expect(() =>
      parseLandingSchema({
        ...landingSchemaSourceObject,
        tokens: {
          ...((LANDING_SCHEMA_SOURCE as { tokens: Record<string, unknown> }).tokens ?? {}),
          background: 42,
        },
      }),
    ).toThrow("Invalid landing schema")
  })
})
