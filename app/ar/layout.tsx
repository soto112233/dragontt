import '../globals.css';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {process.env.NEXT_PUBLIC_STAGING === 'true' && (
          <meta name="robots" content="noindex,nofollow" />
        )}
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
