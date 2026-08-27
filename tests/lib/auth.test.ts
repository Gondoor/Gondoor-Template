/**
 * @jest-environment node
 */

// better-auth ships ESM-only dist bundles that Jest's CommonJS runtime cannot
// parse, so the package boundary is mocked here. The assertions below cover the
// part this repo owns: the exact configuration lib/auth.ts hands to betterAuth().
type BetterAuthOptions = {
  baseURL?: string;
  secret?: string;
  trustedOrigins?: unknown;
  database?: unknown;
  emailAndPassword?: { enabled?: boolean; requireEmailVerification?: boolean };
  emailVerification?: unknown;
};

const betterAuth = jest.fn((options: BetterAuthOptions) => ({
  options,
  handler: jest.fn(),
}));
const drizzleAdapter = jest.fn((db: unknown, config: unknown) => ({
  __adapter: "drizzle",
  db,
  config,
}));

jest.mock("better-auth", () => ({ betterAuth }));
jest.mock("better-auth/adapters/drizzle", () => ({ drizzleAdapter }));

const ORIGINAL_ENV = process.env;

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
  process.env = {
    ...ORIGINAL_ENV,
    BETTER_AUTH_URL: "https://tenant.example.test",
    DATABASE_URL: "postgres://user:password@db.example.test/tenant",
  };
});

afterEach(() => {
  process.env = ORIGINAL_ENV;
});

async function loadAuthOptions(): Promise<BetterAuthOptions> {
  const { auth } = await import("@/lib/auth");
  expect(betterAuth).toHaveBeenCalledTimes(1);
  return (auth as unknown as { options: BetterAuthOptions }).options;
}

describe("lib/auth", () => {
  it("exports a Better Auth instance carrying a request handler", async () => {
    const { auth } = await import("@/lib/auth");

    expect(auth).toBeDefined();
    expect(typeof auth.handler).toBe("function");
  });

  it("enables email + password without requiring email verification", async () => {
    const options = await loadAuthOptions();

    expect(options.emailAndPassword?.enabled).toBe(true);
    expect(options.emailAndPassword?.requireEmailVerification).toBe(false);
    expect(options.emailVerification).toBeUndefined();
  });

  it("resolves trusted origins per request instead of pinning them at import time", async () => {
    const options = await loadAuthOptions();
    const { resolveTrustedOrigins } = await import("@/lib/auth-origin");

    expect(options.trustedOrigins).toBe(resolveTrustedOrigins);
    expect(options.baseURL).toBe("https://tenant.example.test");
  });

  it("does not pin a secret in source — Better Auth reads it from the environment", async () => {
    const options = await loadAuthOptions();

    expect(options.secret).toBeUndefined();
  });

  it("stores sessions and users through the Drizzle pg adapter", async () => {
    await loadAuthOptions();

    expect(drizzleAdapter).toHaveBeenCalledTimes(1);
    const [, adapterConfig] = drizzleAdapter.mock.calls[0] as [
      unknown,
      { provider: string; schema: Record<string, unknown> },
    ];
    expect(adapterConfig.provider).toBe("pg");
    expect(Object.keys(adapterConfig.schema)).toEqual(
      expect.arrayContaining(["user", "session", "account", "verification"]),
    );
  });
});
