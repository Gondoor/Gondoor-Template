import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const testMode = request.nextUrl.searchParams.get('gondoor_test');
  if (testMode === 'true' || testMode === 'false') {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete('gondoor_test');
    const response = NextResponse.redirect(cleanUrl, 307);

    if (testMode === 'true') {
      response.cookies.set('gondoor_test', 'true', {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 14400,
        path: '/',
      });
    } else {
      response.cookies.delete('gondoor_test');
    }

    return response;
  }

  return intlMiddleware(request);
}

export const runtime = 'experimental-edge';

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
