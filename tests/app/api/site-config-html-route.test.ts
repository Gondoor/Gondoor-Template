const whereMock = jest.fn();
const setMock = jest.fn();
const updateMock = jest.fn();

jest.mock("@/lib/db", () => ({
  db: {
    update: (...args: unknown[]) => updateMock(...args),
  },
}));

jest.mock("drizzle-orm", () => ({
  eq: (...args: unknown[]) => ["eq", ...args],
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number }) => ({
      body,
      status: init?.status ?? 200,
    }),
  },
}));

import { POST } from "@/app/api/site-config/html/route";
import { NON_PRODUCTION_WEBSITE_ANALYTICS_COLLECTOR_URL } from "@/lib/website-analytics";

function createRequestStub(secret: string | null, body: unknown): never {
  return {
    headers: {
      get: (name: string) => (name === "x-gondoor-secret" ? secret : null),
    },
    json: async () => body,
  } as never;
}

describe("POST /api/site-config/html", () => {
  const originalSecret = process.env.GONDOOR_INTERNAL_SECRET;

  beforeEach(() => {
    whereMock.mockReset().mockResolvedValue(undefined);
    setMock.mockReset().mockReturnValue({ where: whereMock });
    updateMock.mockReset().mockReturnValue({ set: setMock });
    process.env.GONDOOR_INTERNAL_SECRET = "test-secret";
  });

  afterAll(() => {
    if (originalSecret === undefined) {
      delete process.env.GONDOOR_INTERNAL_SECRET;
    } else {
      process.env.GONDOOR_INTERNAL_SECRET = originalSecret;
    }
  });

  it("returns 401 when secret header is invalid", async () => {
    const response = await POST(
      createRequestStub(null, { generatedHtml: "<html></html>" })
    );

    expect(response.status).toBe(401);
    expect(updateMock).not.toHaveBeenCalled();
  });

  it("returns 400 when generatedHtml is missing or invalid", async () => {
    const response = await POST(createRequestStub("test-secret", { generatedHtml: 42 }));

    expect(response.status).toBe(400);
    expect(updateMock).not.toHaveBeenCalled();
  });

  it("persists canonicalized html when payload is valid", async () => {
    const response = await POST(
      createRequestStub("test-secret", {
        generatedHtml:
          '<script>const COLLECT_URL = "/api/v1/public/website-analytics/collect";</script>',
      })
    );

    expect(response.status).toBe(200);
    expect(updateMock).toHaveBeenCalledTimes(1);
    expect(setMock).toHaveBeenCalledWith({
      generatedHtml:
        `<script>const COLLECT_URL = "${NON_PRODUCTION_WEBSITE_ANALYTICS_COLLECTOR_URL}";</script>`,
    });
  });
});
