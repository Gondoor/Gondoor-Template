import { buttonVariants } from "@/components/ui/button-variants"

describe("landing CTA button classes", () => {
  it("button variants keep outline and ghost text readable before interaction", () => {
    const classLists = [
      buttonVariants({ variant: "outline" }),
      buttonVariants({ variant: "ghost" }),
    ] as const

    for (const classList of classLists) {
      expect(classList.split(/\s+/)).toContain("text-foreground")
    }
  })
})
