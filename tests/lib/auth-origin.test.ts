import {
  resolveBetterAuthBaseURL,
  resolveStaticTrustedOrigins,
  resolveTrustedOrigins,
} from "@/lib/auth-origin";

function requestWithHeaders(url: string, headers: Record<string, string>) {
  const normalizedHeaders = new Map(
    Object.entries(headers).map(([name, value]) => [name.toLowerCase(), value]),
  );

  return {
    url,
    headers: {
      get: (name: string) => normalizedHeaders.get(name.toLowerCase()) ?? null,
    },
  };
}

describe("auth origin helpers", () => {
  it("uses the tenant public URL as the Better Auth base URL", () => {
    expect(
      resolveBetterAuthBaseURL({
        BETTER_AUTH_URL: "https://shiftpilot-10.gondoor.app",
        NEXT_PUBLIC_APP_URL: "https://fallback.gondoor.app",
      }),
    ).toBe("https://shiftpilot-10.gondoor.app");
  });

  it("deduplicates provisioned trusted origins", () => {
    expect(
      resolveStaticTrustedOrigins({
        BETTER_AUTH_TRUSTED_ORIGINS:
          "https://shiftpilot-10.gondoor.app, shiftpilot-10.vince-ae0.workers.dev",
        BETTER_AUTH_URL: "https://shiftpilot-10.gondoor.app/",
        NEXT_PUBLIC_APP_URL: "https://shiftpilot-10.gondoor.app",
      }),
    ).toEqual([
      "https://shiftpilot-10.gondoor.app",
      "https://shiftpilot-10.vince-ae0.workers.dev",
    ]);
  });

  it("trusts request origin only when it matches the request host", () => {
    const request = requestWithHeaders(
      "https://internal.worker/api/auth/sign-up/email",
      {
        host: "shiftpilot-10.gondoor.app",
        origin: "https://shiftpilot-10.gondoor.app",
      },
    );

    expect(resolveTrustedOrigins(request)).toContain(
      "https://shiftpilot-10.gondoor.app",
    );
  });

  it("rejects cross-origin request origins", () => {
    const request = requestWithHeaders(
      "https://shiftpilot-10.gondoor.app/api/auth/sign-up/email",
      {
        host: "shiftpilot-10.gondoor.app",
        origin: "https://evil.example",
      },
    );

    expect(resolveTrustedOrigins(request)).not.toContain(
      "https://evil.example",
    );
  });
});
