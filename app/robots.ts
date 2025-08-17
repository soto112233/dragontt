import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isStaging = process.env.NEXT_PUBLIC_STAGING === 'true';
  return isStaging
    ? { rules: { userAgent: '*', disallow: '/' } }
    : { rules: { userAgent: '*', allow: '/' }, sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml` };
}
