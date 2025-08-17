import { NextRequest, NextResponse } from 'next/server';

// Proteger solo cuando estamos en staging
export function middleware(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_STAGING !== 'true') return NextResponse.next();

  const basicAuth = req.headers.get('authorization');
  if (basicAuth) {
    const [, base64] = basicAuth.split(' ');
    const [user, pass] = atob(base64).split(':');
    if (user === process.env.BASIC_AUTH_USER && pass === process.env.BASIC_AUTH_PASS) {
      return NextResponse.next();
    }
  }
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Protected"' }
  });
}

// No bloquear assets y robots
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)']
};
