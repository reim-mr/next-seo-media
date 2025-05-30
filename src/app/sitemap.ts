import { MetadataRoute } from 'next';

import { getArticlesForSitemap, getCategories, getTags } from '@/lib/microcms';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  try {
    // 静的ページ
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/articles`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/search`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
    ];

    // 記事ページ
    const articles = await getArticlesForSitemap();
    const articlePages: MetadataRoute.Sitemap = articles.map(article => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // カテゴリページ
    const categories = await getCategories();
    const categoryPages: MetadataRoute.Sitemap = categories.map(category => ({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    // タグページ
    const tags = await getTags();
    const tagPages: MetadataRoute.Sitemap = tags.map(tag => ({
      url: `${baseUrl}/tags/${tag.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [...staticPages, ...articlePages, ...categoryPages, ...tagPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);

    // エラー時は最低限の静的ページのみ
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/articles`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
    ];
  }
}
