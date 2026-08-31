import { cleanup, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

jest.mock("next-intl", () => ({
  NextIntlClientProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

jest.mock("next-intl/server", () => ({
  getMessages: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

jest.mock("@/i18n/routing", () => ({
  routing: {
    defaultLocale: "en",
    localePrefix: "as-needed",
    locales: ["en"],
  },
}));

import LocaleLayout from "@/app/[locale]/layout";

// These known shapes are defined by the local Jest factories above.
const headersModule: { cookies: jest.Mock } = jest.requireMock("next/headers") as {
  cookies: jest.Mock;
};
const nextIntlServerModule: { getMessages: jest.Mock } = jest.requireMock(
  "next-intl/server"
) as { getMessages: jest.Mock };
const navigationModule: { notFound: jest.Mock } = jest.requireMock(
  "next/navigation"
) as { notFound: jest.Mock };
const mockCookies = headersModule.cookies;
const mockGetMessages = nextIntlServerModule.getMessages;
const mockNotFound = navigationModule.notFound;

function cookieStore(value?: string) {
  return {
    get: jest.fn(() => (value ? { value } : undefined)),
  };
}

async function renderLayout(testMode?: string): Promise<void> {
  mockCookies.mockResolvedValue(cookieStore(testMode));
  mockGetMessages.mockResolvedValue({});
  render(
    await LocaleLayout({
      children: <main>Page content</main>,
      params: Promise.resolve({ locale: "en" }),
    })
  );
}

describe("localized layout commerce test mode", () => {
  beforeEach(() => {
    cleanup();
    mockCookies.mockReset();
    mockGetMessages.mockReset();
    mockNotFound.mockReset();
    mockCookies.mockResolvedValue(cookieStore());
    mockGetMessages.mockResolvedValue({});
  });

  it("renders the accessible banner only for the true cookie value", async () => {
    await renderLayout("true");

    expect(screen.getByRole("complementary", { name: "Test mode" })).toHaveTextContent(
      "Test mode is active. Payments use the Whop sandbox."
    );
    expect(screen.getByRole("link", { name: "Exit test mode" })).toHaveAttribute(
      "href",
      "?gondoor_test=false"
    );
  });

  it("does not render the banner when test mode is absent or not true", async () => {
    await renderLayout();
    expect(screen.queryByRole("complementary", { name: "Test mode" })).not.toBeInTheDocument();

    cleanup();
    await renderLayout("false");
    expect(screen.queryByRole("complementary", { name: "Test mode" })).not.toBeInTheDocument();
  });

  it("keeps locale validation intact", async () => {
    render(
      await LocaleLayout({
        children: <main>Page content</main>,
        params: Promise.resolve({ locale: "invalid" }),
      })
    );

    expect(mockNotFound).toHaveBeenCalledTimes(1);
  });
});
