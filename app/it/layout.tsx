import '../globals.css';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" dir="ltr">
      <head>
        {process.env.NEXT_PUBLIC_STAGING === 'true' && (
          <meta name="robots" content="noindex,nofollow" />
        )}
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
