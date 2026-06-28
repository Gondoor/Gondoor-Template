type EnvSource = Readonly<Record<string, string | undefined>>;
type TrustedOriginRequest = {
  readonly url: string;
  readonly headers: {
    get(name: string): string | null;
  };
};

const AUTH_BASE_URL_ENV_KEYS = [
  "BETTER_AUTH_URL",
  "NEXT_PUBLIC_APP_URL",
  "NEXT_PUBLIC_BETTER_AUTH_URL",
] as const;

export function resolveBetterAuthBaseURL(
  env: EnvSource = process.env,
): string | undefined {
  for (const key of AUTH_BASE_URL_ENV_KEYS) {
    const origin = normalizeOrigin(env[key]);
    if (origin) return origin;
  }
  return undefined;
}

export function resolveStaticTrustedOrigins(
  env: EnvSource = process.env,
): string[] {
  return uniqueOrigins([
    ...splitOriginList(env.BETTER_AUTH_TRUSTED_ORIGINS),
    ...AUTH_BASE_URL_ENV_KEYS.map((key) => env[key]),
  ]);
}

export function resolveTrustedOrigins(
  request?: TrustedOriginRequest,
): string[] {
  return uniqueOrigins([
    ...resolveStaticTrustedOrigins(),
    ...resolveRequestSameOrigins(request),
  ]);
}

function resolveRequestSameOrigins(
  request: TrustedOriginRequest | undefined,
): string[] {
  if (!request) return [];

  const requestOrigin = normalizeOrigin(request.url);
  const originHeader = normalizeOrigin(request.headers.get("origin"));
  const hostHeader = normalizeHost(
    request.headers.get("x-forwarded-host") ?? request.headers.get("host"),
  );
  const requestHost = requestOrigin
    ? normalizeHost(new URL(requestOrigin).host)
    : null;
  const sameOriginHeader =
    originHeader &&
    ((hostHeader && normalizeHost(new URL(originHeader).host) === hostHeader) ||
      (requestHost &&
        normalizeHost(new URL(originHeader).host) === requestHost));

  return [requestOrigin, sameOriginHeader ? originHeader : null].filter(
    isString,
  );
}

function splitOriginList(value: string | undefined): string[] {
  return value
    ? value
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean)
    : [];
}

function uniqueOrigins(
  values: readonly (string | undefined | null)[],
): string[] {
  return Array.from(new Set(values.map(normalizeOrigin).filter(isString)));
}

function normalizeOrigin(value: string | undefined | null): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  const candidate = trimmed.includes("://") ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(candidate);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.origin;
  } catch {
    return null;
  }
}

function normalizeHost(value: string | undefined | null): string | null {
  const trimmed = value?.trim().toLowerCase();
  return trimmed || null;
}

function isString(value: string | null | undefined): value is string {
  return typeof value === "string" && value.length > 0;
}
