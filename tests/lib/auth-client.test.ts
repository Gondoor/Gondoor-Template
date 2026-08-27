// better-auth/react ships an ESM-only dist bundle that Jest's CommonJS runtime
// cannot parse, so the package boundary is mocked. The assertion below covers
// what this repo owns: lib/auth-client.ts exports a client built by
// createAuthClient() with no custom configuration.
const createAuthClient = jest.fn(() => ({
  signIn: { email: jest.fn() },
  signUp: { email: jest.fn() },
  signOut: jest.fn(),
  useSession: jest.fn(),
}));

jest.mock("better-auth/react", () => ({ createAuthClient }));

describe("lib/auth-client", () => {
  it("exports a Better Auth React client created with runtime defaults", async () => {
    const { authClient } = await import("@/lib/auth-client");

    expect(createAuthClient).toHaveBeenCalledTimes(1);
    expect(createAuthClient).toHaveBeenCalledWith();
    expect(typeof authClient.signUp.email).toBe("function");
    expect(typeof authClient.signIn.email).toBe("function");
    expect(typeof authClient.signOut).toBe("function");
    expect(typeof authClient.useSession).toBe("function");
  });
});
