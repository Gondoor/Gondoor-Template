import { render } from "@testing-library/react"
import LandingPage from "@/app/[locale]/page"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

describe("landing deterministic render parity", () => {
  it("renders header, landing sections, and footer deterministically", () => {
    const { container } = render(
      <>
        <SiteHeader />
        <LandingPage />
        <SiteFooter />
      </>,
    )

    expect(container.firstChild).toMatchSnapshot()
    expect(container.children).toHaveLength(3)
  })
})
