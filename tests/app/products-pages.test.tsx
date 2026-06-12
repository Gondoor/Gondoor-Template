import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: { readonly children: ReactNode; readonly href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

jest.mock("@/components/layout/site-header", () => ({
  SiteHeader: () => <header data-testid="site-header" />,
}));

jest.mock("@/components/layout/site-footer", () => ({
  SiteFooter: () => <footer data-testid="site-footer" />,
}));

const API_BASE = "https://api.gondoor.test";
const API_KEY = "gdr_test_key";

const originalEnv = {
  GONDOOR_API_BASE: process.env.GONDOOR_API_BASE,
  GONDOOR_API_KEY: process.env.GONDOOR_API_KEY,
};

const product = {
  id: "f0f970f6-5f6a-4f36-9e28-c9a5d5d1888e",
  slug: "monthly-sip-box",
  name: "Monthly Sip Box",
  description: "Seasonal drinks delivered monthly.",
  priceCents: 2000,
  currency: "usd",
  billingPeriod: "monthly",
  imageUrl: null,
};

interface JsonMockResponse {
  readonly ok: boolean;
  readonly status: number;
  readonly json: () => Promise<unknown>;
  readonly text: () => Promise<string>;
}

const fetchMock = jest.fn<Promise<JsonMockResponse>, Parameters<typeof fetch>>();

function restoreOriginalEnv(): void {
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
}

function applyProductEnv(): void {
  process.env.GONDOOR_API_BASE = API_BASE;
  process.env.GONDOOR_API_KEY = API_KEY;
}

function jsonResponse(body: unknown, init?: ResponseInit): JsonMockResponse {
  const status = init?.status ?? 200;
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
  };
}

async function renderProductsPage(): Promise<void> {
  jest.resetModules();
  applyProductEnv();
  const ProductsPage = (await import("@/app/[locale]/products/page")).default;
  render(await ProductsPage());
}

async function renderProductDetailPage(slug: string): Promise<void> {
  jest.resetModules();
  applyProductEnv();
  const ProductDetailPage = (await import("@/app/[locale]/products/[slug]/page")).default;
  render(await ProductDetailPage({ params: Promise.resolve({ locale: "en", slug }) }));
}

describe("tenant product pages", () => {
  beforeEach(() => {
    fetchMock.mockReset().mockResolvedValue(jsonResponse({ data: [product] }));
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    restoreOriginalEnv();
  });

  it("renders catalog products from the Gondoor data envelope", async () => {
    await renderProductsPage();

    expect(fetchMock).toHaveBeenCalledWith(`${API_BASE}/v1/tenant-commerce/products`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
      cache: "no-store",
    });
    expect(screen.getByRole("heading", { name: product.name })).toBeInTheDocument();
    expect(screen.queryByText("No products available yet")).not.toBeInTheDocument();
  });

  it("renders product detail from the Gondoor data envelope", async () => {
    await renderProductDetailPage(product.slug);

    expect(screen.getByRole("heading", { name: product.name })).toBeInTheDocument();
    expect(screen.getByDisplayValue(product.id)).toBeInTheDocument();
  });

  it("does not render catalog products from a products envelope", async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ products: [product] }));

    await renderProductsPage();

    expect(screen.getByText("No products available yet")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: product.name })).not.toBeInTheDocument();
  });

  it("does not render catalog products from a top-level array", async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse([product]));

    await renderProductsPage();

    expect(screen.getByText("No products available yet")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: product.name })).not.toBeInTheDocument();
  });

  it("does not render product detail from a products envelope", async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ products: [product] }));

    await expect(renderProductDetailPage(product.slug)).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("does not render product detail from a top-level array", async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse([product]));

    await expect(renderProductDetailPage(product.slug)).rejects.toThrow("NEXT_NOT_FOUND");
  });
});
