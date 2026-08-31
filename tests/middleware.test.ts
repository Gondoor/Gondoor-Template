jest.mock("next-intl/middleware", () => ({
  __esModule: true,
  default: jest.fn(() => jest.fn()),
}));

jest.mock("next/server", () => ({
  NextResponse: {
    redirect: jest.fn((url: URL, status: number) => ({
      url,
      status,
      cookies: {
        delete: jest.fn(),
        set: jest.fn(),
      },
    })),
  },
}));

jest.mock("@/i18n/routing", () => ({
  routing: {
    defaultLocale: "en",
    localePrefix: "as-needed",
    locales: ["en"],
  },
}));

import middleware from "@/middleware";

// These known shapes are defined by the local Jest factories above.
const intlMiddlewareModule: { default: jest.Mock } = jest.requireMock(
  "next-intl/middleware"
) as { default: jest.Mock };
const nextServerModule: {
  NextResponse: { redirect: jest.Mock<MiddlewareResponse, [URL, number]> };
} = jest.requireMock("next/server") as {
  NextResponse: { redirect: jest.Mock<MiddlewareResponse, [URL, number]> };
};
const mockCreateIntlMiddleware = intlMiddlewareModule.default;
// The factory's first call creates the middleware mock used by this module.
const mockIntlMiddleware = mockCreateIntlMiddleware.mock.results[0].value as jest.Mock;
const mockRedirect = nextServerModule.NextResponse.redirect;
const mockIntlResponse = Symbol("intl-response");

type MiddlewareResponse = {
  url: URL;
  status: number;
  cookies: {
    delete: jest.Mock;
    set: jest.Mock;
  };
};

function createRequest(url: string): never {
  const nextUrl = new URL(url);
  return {
    nextUrl: Object.assign(nextUrl, {
      clone: () => new URL(nextUrl),
    }),
  } as never;
}

describe("commerce test mode middleware", () => {
  beforeEach(() => {
    mockIntlMiddleware.mockReset();
    mockIntlMiddleware.mockReturnValue(mockIntlResponse);
    mockRedirect.mockClear();
  });

  it("enables test mode with the exact cookie before a clean redirect", () => {
    const result = middleware(
      createRequest("https://example.com/products?gondoor_test=true")
    );
    const response = mockRedirect.mock.results[0].value;

    expect(result).toBe(response);

    expect(response.status).toBe(307);
    expect(response.url.toString()).toBe("https://example.com/products");
    expect(response.cookies.set).toHaveBeenCalledWith("gondoor_test", "true", {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 14400,
      path: "/",
    });
    expect(response.cookies.delete).not.toHaveBeenCalled();
  });

  it("clears test mode before a clean redirect", () => {
    const result = middleware(
      createRequest("https://example.com/products?gondoor_test=false")
    );
    const response = mockRedirect.mock.results[0].value;

    expect(result).toBe(response);

    expect(response.status).toBe(307);
    expect(response.url.toString()).toBe("https://example.com/products");
    expect(response.cookies.delete).toHaveBeenCalledWith("gondoor_test");
    expect(response.cookies.set).not.toHaveBeenCalled();
  });

  it("preserves unrelated middleware behavior and ignores the legacy query", () => {
    const request = createRequest("https://example.com/products?whop=test_mode");

    expect(middleware(request)).toBe(mockIntlResponse);
    expect(mockIntlMiddleware).toHaveBeenCalledWith(request);
    expect(mockRedirect).not.toHaveBeenCalled();
  });
});
