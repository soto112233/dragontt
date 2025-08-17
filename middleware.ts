import { NextRequest, NextResponse } from 'next/server';

/**
 * Basic Auth SOLO si NEXT_PUBLIC_STAGING === 'true'.
 * Evita decodificaciones; compara el header tal cual con un valor esperado.
 */
export function middleware(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_STAGING !== 'true') return NextResponse.next();

  const user = process.env.BASIC_AUTH_USER || '';
  const pass = process.env.BASIC_AUTH_PASS || '';

  // Si faltan credenciales -> no romper, pedir auth igualmente
  if (!user || !pass) {
    return new NextResponse('Set BASIC_AUTH_USER & BASIC_AUTH_PASS in Vercel', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Protected"' },
    });
  }

  const expected = 'Basic ' + btoa(`${user}:${pass}`);
  const received = req.headers.get('authorization') || '';

  if (received === expected) return NextResponse.next();

  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Protected"' },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
