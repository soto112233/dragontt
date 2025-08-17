import './globals.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  const isStaging = process.env.NEXT_PUBLIC_STAGING === 'true';

  return (
    <html lang="es">
      <head>
        {isStaging && <meta name="robots" content="noindex,nofollow" />}
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
