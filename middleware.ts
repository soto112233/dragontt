import { NextRequest, NextResponse } from 'next/server';

/**
 * Protección básica por contraseña SOLO en staging.
 * Tolera que las variables no existan (no rompe).
 */
export function middleware(req: NextRequest) {
  // Si no estamos en staging, no protegemos nada
  if (process.env.NEXT_PUBLIC_STAGING !== 'true') return NextResponse.next();

  const userEnv = process.env.BASIC_AUTH_USER ?? '';
  const passEnv = process.env.BASIC_AUTH_PASS ?? '';

  // Si faltan credenciales en el entorno, NO romper el sitio
  if (!userEnv || !passEnv) {
    // Opcional: muestra cabecera para que sepas que falta config
    return new NextResponse(
      'Staging sin credenciales: define BASIC_AUTH_USER y BASIC_AUTH_PASS en Vercel',
      {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Protected"' }
      }
    );
  }

  const auth = req.headers.get('authorization') || '';

  // Authorization ausente -> pedir credenciales
  if (!auth.startsWith('Basic ')) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Protected"' }
    });
  }

  // Decodificar "Basic base64(user:pass)" sin usar Buffer (Edge Runtime)
  const base64 = auth.split(' ')[1] || '';
  let decoded = '';
  try {
    // atob existe en el Edge runtime; si fallara, capturamos
    decoded = atob(base64);
  } catch {
    return new NextResponse('Bad authorization header', { status: 400 });
  }

  const sep = decoded.indexOf(':');
  const user = sep >= 0 ? decoded.slice(0, sep) : '';
  const pass = sep >= 0 ? decoded.slice(sep + 1) : '';

  if (user === userEnv && pass === passEnv) {
    return NextResponse.next();
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Protected"' }
  });
}

// No proteger assets estáticos ni robots/sitemap
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)']
};
