import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const whop = request.nextUrl.searchParams.get('whop');
  if (whop === 'test_mode') {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete('whop');
    const response = NextResponse.redirect(cleanUrl, 307);
    response.cookies.set('gondoor-mode', 'test', {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 14400,
      path: '/',
    });
    return response;
  }
  return intlMiddleware(request);
}

export const runtime = 'experimental-edge';

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
