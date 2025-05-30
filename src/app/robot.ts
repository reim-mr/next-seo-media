import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/articles/',
          '/categories/',
          '/tags/',
          '/search',
          '/about',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
          '*.json',
          '/search?*', // 検索結果ページのパラメータ付きURL
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/articles/',
          '/categories/',
          '/tags/',
          '/search',
          '/about',
        ],
        disallow: ['/api/', '/admin/', '/_next/', '/private/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/articles/',
          '/categories/',
          '/tags/',
          '/search',
          '/about',
        ],
        disallow: ['/api/', '/admin/', '/_next/', '/private/'],
        crawlDelay: 2,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
