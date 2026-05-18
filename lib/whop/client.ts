import type { TenantProduct, ProductBillingPeriod } from "@/types/product";

export class WhopApiError extends Error {
  readonly status: number;
  readonly body: string;

  constructor(message: string, status: number, body: string) {
    super(message);
    this.name = "WhopApiError";
    this.status = status;
    this.body = body;
  }
}

export interface CreateCheckoutSessionInput {
  productId: string;
  planId?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export interface CreateCheckoutSessionResult {
  sessionId: string;
  url: string;
}

interface WhopRawProduct {
  id?: string;
  slug?: string;
  name?: string;
  description?: string;
  image_url?: string | null;
  price?: number;
  price_cents?: number;
  currency?: string;
  billing_period?: string | null;
  checkout_url?: string | null;
}

interface WhopApiClientOptions {
  apiKey?: string;
  baseUrl?: string;
  fetchImpl?: typeof fetch;
}

export class WhopClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly fetchImpl: typeof fetch;

  constructor(options: WhopApiClientOptions = {}) {
    this.apiKey = options.apiKey ?? process.env.WHOP_API_KEY ?? "";
    this.baseUrl = (options.baseUrl ?? process.env.WHOP_API_BASE ?? "https://api.whop.com").replace(
      /\/+$/,
      "",
    );
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  async getProduct(productId: string): Promise<TenantProduct> {
    const raw = await this.request<WhopRawProduct>(`/api/v5/me/products/${encodeURIComponent(productId)}`);
    return this.normalizeProduct(raw);
  }

  async listProducts(): Promise<TenantProduct[]> {
    const raw = await this.request<{ data?: WhopRawProduct[] } | WhopRawProduct[]>(
      "/api/v5/me/products",
    );
    const items: WhopRawProduct[] = Array.isArray(raw) ? raw : (raw.data ?? []);
    return items.map((item) => this.normalizeProduct(item));
  }

  async createCheckoutSession(input: CreateCheckoutSessionInput): Promise<CreateCheckoutSessionResult> {
    const body = {
      product_id: input.productId,
      plan_id: input.planId,
      success_url: input.successUrl,
      cancel_url: input.cancelUrl,
      metadata: input.metadata,
    };

    const raw = await this.request<{ id?: string; session_id?: string; url?: string; checkout_url?: string }>(
      "/api/v5/me/checkout/sessions",
      { method: "POST", body: JSON.stringify(body) },
    );

    const sessionId = raw.id ?? raw.session_id ?? "";
    const url = raw.url ?? raw.checkout_url ?? "";
    if (!url) {
      throw new WhopApiError("Whop returned no checkout URL", 500, JSON.stringify(raw));
    }
    return { sessionId, url };
  }

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    if (!this.apiKey) {
      throw new WhopApiError("WHOP_API_KEY is not configured", 500, "missing-api-key");
    }
    const response = await this.fetchImpl(`${this.baseUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.apiKey}`,
        ...(init.headers ?? {}),
      },
      cache: "no-store",
    });

    const text = await response.text();
    if (!response.ok) {
      throw new WhopApiError(
        `Whop API ${init.method ?? "GET"} ${path} failed with ${response.status}`,
        response.status,
        text,
      );
    }
    return text ? (JSON.parse(text) as T) : ({} as T);
  }

  private normalizeProduct(raw: WhopRawProduct): TenantProduct {
    const priceCents =
      typeof raw.price_cents === "number"
        ? raw.price_cents
        : typeof raw.price === "number"
          ? Math.round(raw.price * 100)
          : 0;
    return {
      id: raw.id ?? "",
      slug: raw.slug ?? raw.id ?? "",
      whopProductId: raw.id ?? null,
      name: raw.name ?? "Untitled product",
      description: raw.description ?? "",
      image: raw.image_url ?? null,
      priceCents,
      currency: (raw.currency ?? "USD").toUpperCase(),
      billingPeriod: this.normalizeBillingPeriod(raw.billing_period ?? null),
      checkoutUrl: raw.checkout_url ?? null,
    };
  }

  private normalizeBillingPeriod(raw: string | null): ProductBillingPeriod {
    if (!raw) return "one-time";
    const normalized = raw.toLowerCase();
    if (normalized.includes("month")) return "monthly";
    if (normalized.includes("year") || normalized.includes("annual")) return "yearly";
    if (normalized.includes("week")) return "weekly";
    return "one-time";
  }
}
