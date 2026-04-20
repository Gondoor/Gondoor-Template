import {
  NON_PRODUCTION_WEBSITE_ANALYTICS_COLLECTOR_URL,
  PRODUCTION_WEBSITE_ANALYTICS_COLLECTOR_URL,
  WEBSITE_ANALYTICS_COLLECTOR_PATH,
  enforceWebsiteAnalyticsCollectorUrl,
  getWebsiteAnalyticsCollectorUrl,
} from "@/lib/website-analytics";

describe("website analytics collector URL", () => {
  const env = process.env as Record<string, string | undefined>;
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    if (originalNodeEnv === undefined) {
      delete env.NODE_ENV;
    } else {
      env.NODE_ENV = originalNodeEnv;
    }
  });

  it("uses the production collector URL when NODE_ENV=production", () => {
    env.NODE_ENV = "production";

    expect(getWebsiteAnalyticsCollectorUrl()).toBe(
      PRODUCTION_WEBSITE_ANALYTICS_COLLECTOR_URL
    );
  });

  it("uses the local backend collector URL for non-production environments", () => {
    env.NODE_ENV = "test";

    expect(getWebsiteAnalyticsCollectorUrl()).toBe(
      NON_PRODUCTION_WEBSITE_ANALYTICS_COLLECTOR_URL
    );
  });

  it("replaces host-relative collector paths in tracker runtime code", () => {
    env.NODE_ENV = "test";

    const generatedHtml = `
      <script>
        (() => {
          const COLLECT_URL = "${WEBSITE_ANALYTICS_COLLECTOR_PATH}";
          const payload = { event_name: "page_view", source: "gondoor-website-analytics" };
          window.addEventListener("load", () => navigator.sendBeacon(COLLECT_URL, JSON.stringify(payload)));
          const wrappedPushState = history.pushState;
          history.pushState = function (...args) {
            wrappedPushState.apply(this, args);
            fetch("${WEBSITE_ANALYTICS_COLLECTOR_PATH}", { method: "POST", body: JSON.stringify(payload) });
          };
        })();
      </script>
    `;

    const rewrittenHtml = enforceWebsiteAnalyticsCollectorUrl(generatedHtml);

    expect(rewrittenHtml).toContain(
      `const COLLECT_URL = "${NON_PRODUCTION_WEBSITE_ANALYTICS_COLLECTOR_URL}"`
    );
    expect(rewrittenHtml).not.toContain(
      `"${WEBSITE_ANALYTICS_COLLECTOR_PATH}"`
    );
  });

  it("rewrites escaped host-relative collector paths", () => {
    env.NODE_ENV = "production";

    const generatedHtml = `
      <script>
        const payload = "{\\"event_name\\":\\"page_view\\",\\"source\\":\\"gondoor-website-analytics\\"}";
        const COLLECT_URL = "\\/api\\/v1\\/public\\/website-analytics\\/collect";
        navigator.sendBeacon(COLLECT_URL, payload);
      </script>
    `;

    const rewrittenHtml = enforceWebsiteAnalyticsCollectorUrl(generatedHtml);

    expect(rewrittenHtml).toContain(
      "\\/\\/api.gondoor.xyz\\/api\\/v1\\/public\\/website-analytics\\/collect"
    );
    expect(rewrittenHtml).not.toContain(
      'const COLLECT_URL = "\\/api\\/v1\\/public\\/website-analytics\\/collect"'
    );
  });

  it("does not mutate already-absolute collector URLs", () => {
    env.NODE_ENV = "production";

    const generatedHtml = `
      <script>
        const COLLECT_URL = "${PRODUCTION_WEBSITE_ANALYTICS_COLLECTOR_URL}";
        fetch(COLLECT_URL, { method: "POST" });
      </script>
    `;

    expect(enforceWebsiteAnalyticsCollectorUrl(generatedHtml)).toBe(
      generatedHtml
    );
  });
});
