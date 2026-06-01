import { NextResponse } from 'next/server';

const GONDOOR_API_BASE = process.env.GONDOOR_API_BASE ?? '';
const GONDOOR_API_KEY = process.env.GONDOOR_API_KEY ?? '';
const GONDOOR_TENANT_ID = process.env.GONDOOR_TENANT_ID ?? '';

interface ParsedCart {
  tenantProductId: string;
  quantity: number;
}

async function parseRequest(request: Request): Promise<ParsedCart | null> {
  const contentType = request.headers.get('content-type') ?? '';
  let tenantProductIdRaw: unknown;
  let quantityRaw: unknown;
  if (contentType.includes('application/json')) {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    tenantProductIdRaw = body.tenantProductId;
    quantityRaw = body.quantity ?? 1;
  } else {
    const form = await request.formData().catch(() => null);
    if (!form) return null;
    tenantProductIdRaw = form.get('tenantProductId');
    quantityRaw = form.get('quantity') ?? 1;
  }
  const tenantProductId = typeof tenantProductIdRaw === 'string' ? tenantProductIdRaw.trim() : '';
  if (!tenantProductId) return null;
  const quantityNum = Number(quantityRaw);
  const quantity = Number.isFinite(quantityNum) && quantityNum > 0 ? Math.floor(quantityNum) : 1;
  return { tenantProductId, quantity };
}

export async function POST(request: Request) {
  if (!GONDOOR_API_BASE || !GONDOOR_API_KEY || !GONDOOR_TENANT_ID) {
    return NextResponse.json(
      { error: 'Checkout is not configured yet for this site.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const parsed = await parseRequest(request);
  if (!parsed) {
    return NextResponse.json(
      { error: 'tenantProductId is required.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const upstream = await fetch(
    `${GONDOOR_API_BASE.replace(/\/+$/, '')}/v1/tenant-commerce/checkout`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GONDOOR_API_KEY}`,
      },
      body: JSON.stringify({
        tenantId: GONDOOR_TENANT_ID,
        tenantProductId: parsed.tenantProductId,
        cart: {
          items: [{ tenantProductId: parsed.tenantProductId, quantity: parsed.quantity }],
        },
      }),
    },
  ).catch(() => null);

  if (!upstream || !upstream.ok) {
    const detail = upstream ? await upstream.text().catch(() => '') : 'upstream unreachable';
    const status = upstream && upstream.status >= 400 && upstream.status < 500 ? upstream.status : 502;
    console.error('[checkout] upstream failed', upstream?.status, detail);
    return NextResponse.json(
      { error: 'Checkout failed. Please try again.' },
      { status, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const upstreamJson = (await upstream.json().catch(() => ({}))) as {
    setupCheckoutUrl?: string;
    purchase_url?: string;
    url?: string;
  };
  const checkoutUrl = upstreamJson.setupCheckoutUrl ?? upstreamJson.purchase_url ?? upstreamJson.url;
  if (!checkoutUrl) {
    return NextResponse.json(
      { error: 'Checkout response was missing a redirect URL.' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const accept = request.headers.get('accept') ?? '';
  if (accept.includes('text/html')) {
    return NextResponse.redirect(checkoutUrl, { status: 303 });
  }
  return NextResponse.json(
    { url: checkoutUrl },
    { status: 200, headers: { 'Cache-Control': 'no-store' } },
  );
}
