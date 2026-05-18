import type { TenantProduct, TenantProductListResult } from "@/types/product";

const DEFAULT_API_BASE = "https://api.whop.com";

export class WhopApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, body: unknown, message?: string) {
    super(
      message ??
        `Whop API request failed with status ${status}: ${stringifyBody(body)}`
    );
    this.name = "WhopApiError";
    this.status = status;
    this.body = body;
  }
}

export class WhopConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WhopConfigurationError";
  }
}

export interface ListProductsOptions {
  limit?: number;
  cursor?: string;
}

export interface CreateCheckoutSessionInput {
  productId: string;
  planId?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export interface CreateCheckoutSessionResult {
  url: string;
  sessionId: string;
}

export interface WhopClientOptions {
  apiKey?: string;
  apiBase?: string;
  fetch?: typeof fetch;
}

export class WhopClient {
  private readonly apiKey: string;
  private readonly apiBase: string;
  private readonly fetchImpl: typeof fetch;

  constructor(options: WhopClientOptions = {}) {
    const apiKey = options.apiKey ?? process.env.WHOP_API_KEY;
    if (!apiKey) {
      throw new WhopConfigurationError(
        "WHOP_API_KEY environment variable is required"
      );
    }
    this.apiKey = apiKey;
    this.apiBase = (options.apiBase ?? process.env.WHOP_API_BASE ?? DEFAULT_API_BASE).replace(
      /\/+$/,
      ""
    );
    this.fetchImpl = options.fetch ?? fetch;
  }

  async getProduct(productId: string): Promise<TenantProduct> {
    if (!productId) {
      throw new WhopConfigurationError("productId is required");
    }
    const raw = await this.request<Record<string, unknown>>(
      `/v5/me/products/${encodeURIComponent(productId)}`
    );
    return mapProduct(raw);
  }

  async listProducts(
    opts: ListProductsOptions = {}
  ): Promise<TenantProductListResult> {
    const params = new URLSearchParams();
    if (opts.limit) params.set("limit", String(opts.limit));
    if (opts.cursor) params.set("cursor", opts.cursor);
    const suffix = params.size > 0 ? `?${params.toString()}` : "";
    const raw = await this.request<Record<string, unknown>>(
      `/v5/me/products${suffix}`
    );

    const rawList = Array.isArray(raw?.data)
      ? raw.data
      : Array.isArray(raw?.products)
        ? raw.products
        : Array.isArray(raw)
          ? raw
          : [];
    const products = (rawList as Record<string, unknown>[]).map(mapProduct);

    const pagination = raw?.pagination;
    let nextCursor: string | undefined;
    if (
      pagination &&
      typeof pagination === "object" &&
      "next_cursor" in pagination &&
      typeof (pagination as Record<string, unknown>).next_cursor === "string"
    ) {
      nextCursor = (pagination as Record<string, string>).next_cursor;
    }

    return { products, nextCursor };
  }

  async createCheckoutSession(
    input: CreateCheckoutSessionInput
  ): Promise<CreateCheckoutSessionResult> {
    if (!input.productId) {
      throw new WhopConfigurationError("productId is required");
    }
    if (!input.successUrl || !input.cancelUrl) {
      throw new WhopConfigurationError(
        "successUrl and cancelUrl are required"
      );
    }

    const raw = await this.request<Record<string, unknown>>(
      "/v5/me/checkout/sessions",
      {
        method: "POST",
        body: JSON.stringify({
          product_id: input.productId,
          plan_id: input.planId,
          success_url: input.successUrl,
          cancel_url: input.cancelUrl,
          metadata: input.metadata,
        }),
      }
    );

    const url =
      typeof raw?.url === "string"
        ? raw.url
        : typeof raw?.checkout_url === "string"
          ? raw.checkout_url
          : null;
    const sessionId =
      typeof raw?.id === "string"
        ? raw.id
        : typeof raw?.session_id === "string"
          ? raw.session_id
          : null;

    if (!url || !sessionId) {
      throw new WhopApiError(
        200,
        raw,
        "Whop checkout session response missing url or id"
      );
    }

    return { url, sessionId };
  }

  private async request<T>(
    path: string,
    init: RequestInit = {}
  ): Promise<T> {
    const url = `${this.apiBase}${path.startsWith("/") ? path : `/${path}`}`;
    const headers = new Headers(init.headers);
    headers.set("Authorization", `Bearer ${this.apiKey}`);
    headers.set("Accept", "application/json");
    if (init.body !== undefined && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const response = await this.fetchImpl(url, { ...init, headers });
    const text = await response.text();
    const body = text.length > 0 ? safeJsonParse(text) : null;

    if (!response.ok) {
      throw new WhopApiError(response.status, body);
    }
    return body as T;
  }
}

function mapProduct(raw: Record<string, unknown>): TenantProduct {
  const id = pickString(raw, "id", "product_id") ?? "";
  const name = pickString(raw, "name", "title") ?? "";
  const description = pickString(raw, "description") ?? "";
  const image =
    pickString(raw, "image", "image_url", "logo_url") ?? undefined;
  const slug = pickString(raw, "slug") ?? slugify(id || name);
  const whopProductId = pickString(raw, "whop_product_id") ?? id;
  const checkoutUrl =
    pickString(raw, "checkout_url", "url") ?? undefined;
  const currency =
    pickString(raw, "currency", "currency_code") ?? "USD";
  const priceCents = pickPriceCents(raw);
  const billingPeriod = pickBillingPeriod(raw);

  return {
    id,
    slug,
    whopProductId,
    name,
    description,
    image,
    priceCents,
    currency: currency.toUpperCase(),
    billingPeriod,
    checkoutUrl,
  };
}

function pickString(
  raw: Record<string, unknown>,
  ...keys: string[]
): string | undefined {
  for (const key of keys) {
    const value = raw[key];
    if (typeof value === "string" && value.length > 0) return value;
  }
  return undefined;
}

function pickPriceCents(raw: Record<string, unknown>): number {
  if (typeof raw.price_cents === "number") return raw.price_cents;
  if (typeof raw.priceCents === "number") return raw.priceCents;
  if (typeof raw.price === "number") return Math.round(raw.price * 100);
  if (typeof raw.initial_price === "number")
    return Math.round(raw.initial_price * 100);
  if (typeof raw.amount === "number") return Math.round(raw.amount * 100);
  return 0;
}

function pickBillingPeriod(
  raw: Record<string, unknown>
): "one-time" | "monthly" | "yearly" {
  const candidate =
    pickString(raw, "billing_period", "billingPeriod", "plan_type", "interval") ??
    "";
  const normalized = candidate.toLowerCase();
  if (normalized.includes("year") || normalized === "annual") return "yearly";
  if (normalized.includes("month")) return "monthly";
  return "one-time";
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function safeJsonParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function stringifyBody(body: unknown): string {
  if (body === null || body === undefined) return "";
  if (typeof body === "string") return body;
  try {
    return JSON.stringify(body);
  } catch {
    return String(body);
  }
}

export function getWhopClient(): WhopClient {
  return new WhopClient();
}
