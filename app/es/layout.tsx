import '../globals.css';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" dir="ltr">
      <head>
        {process.env.NEXT_PUBLIC_STAGING === 'true' && (
          <meta name="robots" content="noindex,nofollow" />
        )}
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
