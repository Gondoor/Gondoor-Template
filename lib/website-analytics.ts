export const WEBSITE_ANALYTICS_COLLECTOR_PATH =
  "/api/v1/public/website-analytics/collect";

export const PRODUCTION_WEBSITE_ANALYTICS_COLLECTOR_URL =
  "https://api.gondoor.xyz/api/v1/public/website-analytics/collect";
export const NON_PRODUCTION_WEBSITE_ANALYTICS_COLLECTOR_URL =
  "http://localhost:3001/api/v1/public/website-analytics/collect";

const RELATIVE_COLLECTOR_PATTERN =
  /(^|[^A-Za-z0-9+.-])\/api\/v1\/public\/website-analytics\/collect/g;
const ESCAPED_RELATIVE_COLLECTOR_PATTERN =
  /(^|[^A-Za-z0-9+.-])\\\/api\\\/v1\\\/public\\\/website-analytics\\\/collect/g;

function escapeSlashes(value: string): string {
  return value.replaceAll("/", "\\/");
}

export function getWebsiteAnalyticsCollectorUrl(): string {
  return process.env.NODE_ENV === "production"
    ? PRODUCTION_WEBSITE_ANALYTICS_COLLECTOR_URL
    : NON_PRODUCTION_WEBSITE_ANALYTICS_COLLECTOR_URL;
}

export function enforceWebsiteAnalyticsCollectorUrl(
  html: string,
  collectorUrl = getWebsiteAnalyticsCollectorUrl()
): string {
  const escapedCollectorUrl = escapeSlashes(collectorUrl);
  return html
    .replaceAll(RELATIVE_COLLECTOR_PATTERN, `$1${collectorUrl}`)
    .replaceAll(
      ESCAPED_RELATIVE_COLLECTOR_PATTERN,
      `$1${escapedCollectorUrl}`
    );
}
