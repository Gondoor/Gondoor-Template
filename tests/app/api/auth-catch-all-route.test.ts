/**
 * @jest-environment node
 */

// better-auth ships ESM-only dist bundles that Jest's CommonJS runtime cannot
// parse, so the package boundary is mocked here.
const authHandler = jest.fn();
const toNextJsHandler = jest.fn((handler: unknown) => ({
  GET: jest.fn(),
  POST: jest.fn(),
  __handler: handler,
}));

jest.mock("better-auth/next-js", () => ({ toNextJsHandler }));
jest.mock("@/lib/auth", () => ({ auth: { handler: authHandler } }));

describe("app/api/auth/[...all]/route", () => {
  it("exports GET and POST handlers derived from the Better Auth handler", async () => {
    const route = await import("@/app/api/auth/[...all]/route");

    expect(typeof route.GET).toBe("function");
    expect(typeof route.POST).toBe("function");
    expect(toNextJsHandler).toHaveBeenCalledTimes(1);
    expect(toNextJsHandler).toHaveBeenCalledWith(authHandler);
  });

  it("does not opt into the edge runtime (OpenNext owns the runtime)", async () => {
    const route: Record<string, unknown> = await import(
      "@/app/api/auth/[...all]/route"
    );

    expect(route.runtime).toBeUndefined();
  });
});
