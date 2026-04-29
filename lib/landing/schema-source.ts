import { LANDING_SCHEMA_SOURCE } from "@/lib/landing/seed/landing-schema.generated"
import { parseLandingSchema, type LandingSchemaV1 } from "@/lib/landing/schema"

let cachedSchema: LandingSchemaV1 | null = null

export function getLandingSchema(): LandingSchemaV1 {
  if (cachedSchema) {
    return cachedSchema
  }

  cachedSchema = parseLandingSchema(LANDING_SCHEMA_SOURCE)
  return cachedSchema
}
