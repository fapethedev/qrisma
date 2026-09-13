import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/studio', '/login', '/register'],
        disallow: ['/api/', '/dashboard/', '/s/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
