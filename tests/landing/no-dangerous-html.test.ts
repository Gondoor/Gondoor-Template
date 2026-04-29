import fs from "node:fs"
import path from "node:path"

const FILES = [
  "app/[locale]/page.tsx",
  "components/layout/site-header.tsx",
  "components/layout/site-footer.tsx",
  "components/layout/landing-styles.tsx",
]

describe("landing path avoids dangerouslySetInnerHTML", () => {
  it("does not use dangerouslySetInnerHTML in landing, header, or footer render paths", () => {
    for (const file of FILES) {
      const absolutePath = path.join(process.cwd(), file)
      const source = fs.readFileSync(absolutePath, "utf8")
      expect(source).not.toContain("dangerouslySetInnerHTML")
    }
  })
})
