import { formatProductPrice, formatPriceCents } from "@/lib/whop/format";

describe("formatPriceCents", () => {
  it("formats USD cents with locale-aware grouping", () => {
    expect(formatPriceCents(1234567, "USD")).toBe("$12,345.67");
  });

  it("handles non-USD currencies", () => {
    expect(formatPriceCents(2500, "EUR")).toMatch(/€/);
  });
});

describe("formatProductPrice", () => {
  it("renders one-time without a suffix", () => {
    expect(
      formatProductPrice({
        priceCents: 2999,
        currency: "USD",
        billingPeriod: "one-time",
      })
    ).toBe("$29.99");
  });

  it("renders monthly with /mo", () => {
    expect(
      formatProductPrice({
        priceCents: 999,
        currency: "USD",
        billingPeriod: "monthly",
      })
    ).toBe("$9.99/mo");
  });

  it("renders yearly with /yr", () => {
    expect(
      formatProductPrice({
        priceCents: 9900,
        currency: "USD",
        billingPeriod: "yearly",
      })
    ).toBe("$99.00/yr");
  });
});
