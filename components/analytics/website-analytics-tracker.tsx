'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const COLLECT_URL = "https://api.gondoor.app/api/v1/public/website-analytics/collect";
const ANALYTICS_DEBUG = process.env.NODE_ENV !== 'production';
const INCLUDE_COMPANY_ID = false;
const COMPANY_ID = "22222222-2222-4222-8222-222222222222";
const COMPANY_SLUG = "onboarding-skip-labs-local";

function randomId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function readStorage(storage: Storage, key: string) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(storage: Storage, key: string, value: string) {
  try {
    storage.setItem(key, value);
  } catch {
    // no-op
  }
}

function getVisitorId() {
  const key = 'gondoor_wa_vid';
  const existing = readStorage(window.localStorage, key);
  if (existing) return existing;
  const generated = randomId();
  writeStorage(window.localStorage, key, generated);
  return generated;
}

function getSessionId() {
  const key = 'gondoor_wa_sid';
  const existing = readStorage(window.sessionStorage, key);
  if (existing) return existing;
  const generated = randomId();
  writeStorage(window.sessionStorage, key, generated);
  return generated;
}

function sendPageView(path: string) {
  if (!shouldCollectAnalytics()) {
    return;
  }

  const payload = {
    eventType: 'page_view',
    ...(INCLUDE_COMPANY_ID && COMPANY_ID ? { companyId: COMPANY_ID } : {}),
    companySlug: COMPANY_SLUG ?? undefined,
    pagePath: path,
    pageUrl: window.location.href,
    referrer: document.referrer || null,
    sessionId: getSessionId(),
    visitorId: getVisitorId(),
    metadata: { source: 'generated_nextjs_foundation_v1' },
  };

  const body = JSON.stringify(payload);
  if (ANALYTICS_DEBUG) {
    console.info('[website-analytics] page_view', { collectUrl: COLLECT_URL, payload });
  }
  try {
    if (canUseBeacon() && navigator.sendBeacon) {
      const sent = navigator.sendBeacon(COLLECT_URL, new Blob([body], { type: 'application/json' }));
      if (ANALYTICS_DEBUG) {
        console.info('[website-analytics] sendBeacon', { sent });
      }
      if (sent) return;
    }
  } catch {
    // no-op
  }

  fetch(COLLECT_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
    keepalive: true,
    mode: 'cors',
    credentials: 'omit',
  }).catch((error) => {
    if (ANALYTICS_DEBUG) {
      console.warn('[website-analytics] fetch failed', error);
    }
  });
}

function canUseBeacon() {
  try {
    return new URL(COLLECT_URL, window.location.href).origin === window.location.origin;
  } catch {
    return false;
  }
}

function shouldCollectAnalytics() {
  try {
    const collectHost = new URL(COLLECT_URL, window.location.href).hostname;
    return !(collectHost === 'api.gondoor.app' && window.location.hostname.endsWith('.workers.dev'));
  } catch {
    return false;
  }
}

export function WebsiteAnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPathRef = useRef<string>('');

  useEffect(() => {
    const query = searchParams?.toString();
    const path = query ? `${pathname}?${query}` : pathname;

    if (!path || previousPathRef.current === path) {
      return;
    }

    previousPathRef.current = path;
    sendPageView(path);
  }, [pathname, searchParams]);

  return null;
}
