/**
 * 記事関連ユーティリティ関数
 * microCMSデータとコンポーネント間の型変換を提供
 */

import type { ArticleCardProps } from '@/components/ui/article-card';
import type { Article } from '@/types/microcms';

/**
 * 記事データをArticleCardProps用に変換
 */
export const articleToCardData = (article: Article): ArticleCardProps => {
  return {
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    publishedAt: article.publishedAt || article.createdAt,
    readTime: article.readTime || calculateReadTime(article.content),
    viewCount: article.viewCount || 0,
    likeCount: article.likeCount || 0,
    category: {
      name: article.category.name,
      slug: article.category.slug,
      color: article.category.color,
    },
    tags:
      article.tags?.map(tag => ({
        name: tag.name,
        slug: tag.slug,
      })) || [],
    featuredImage: article.featuredImage
      ? {
          url: article.featuredImage.url,
          alt: article.title,
          width: article.featuredImage.width || 800,
          height: article.featuredImage.height || 450,
        }
      : undefined,
    author: article.author
      ? {
          name: article.author.name,
          avatar: article.author.avatar?.url,
        }
      : undefined,
    slug: article.slug,
    isPremium: article.isPremium || false,
    isNew:
      article.isNew || isNewArticle(article.publishedAt || article.createdAt),
  };
};

/**
 * 記事配列をArticleCardProps配列に変換
 */
export const articlesToCardData = (articles: Article[]): ArticleCardProps[] => {
  return articles.map(articleToCardData);
};

/**
 * 記事が新着かどうかを判定（7日以内）
 */
export const isNewArticle = (publishedAt: string): boolean => {
  const now = new Date();
  const published = new Date(publishedAt);
  const diffInDays = Math.floor(
    (now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24)
  );

  return diffInDays <= 7;
};

/**
 * 読了時間を計算（日本語対応）
 */
export const calculateReadTime = (content: string): number => {
  // HTMLタグを除去
  const textContent = content.replace(/<[^>]*>/g, '');

  // 日本語文字数をカウント（ひらがな、カタカナ、漢字）
  const japaneseChars = (
    textContent.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g) || []
  ).length;

  // 英数字・記号の単語数をカウント
  const englishWords = (textContent.match(/[a-zA-Z0-9]+/g) || []).length;

  // 日本語: 400-500文字/分、英語: 200-250単語/分
  const japaneseReadingSpeed = 450;
  const englishReadingSpeed = 225;

  const japaneseTime = japaneseChars / japaneseReadingSpeed;
  const englishTime = englishWords / englishReadingSpeed;

  const totalMinutes = japaneseTime + englishTime;

  // 最低1分、最大で小数点切り上げ
  return Math.max(1, Math.ceil(totalMinutes));
};

/**
 * 記事の抜粋を生成
 */
export const generateExcerpt = (
  content: string,
  length: number = 160
): string => {
  // HTMLタグを除去
  const textContent = content.replace(/<[^>]*>/g, '');

  // 改行・余分な空白を除去
  const cleanText = textContent.replace(/\s+/g, ' ').trim();

  if (cleanText.length <= length) {
    return cleanText;
  }

  // 指定長さで切り詰めて、単語の途中で切れないように調整
  const truncated = cleanText.substring(0, length);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  if (lastSpaceIndex > length * 0.8) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }

  return truncated + '...';
};

/**
 * 日付をフォーマット
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * 相対日付をフォーマット（○分前、○時間前など）
 */
export const formatRelativeDate = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return '1分未満前';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}分前`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}時間前`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}日前`;
  }

  if (diffInDays < 30) {
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}週間前`;
  }

  if (diffInDays < 365) {
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths}ヶ月前`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}年前`;
};

/**
 * 数値をフォーマット（1.2k、12k形式）
 */
export const formatCount = (count: number): string => {
  if (count < 1000) {
    return count.toString();
  }

  if (count < 10000) {
    return `${(count / 1000).toFixed(1)}k`;
  }

  return `${Math.floor(count / 1000)}k`;
};

/**
 * SEO用のメタデータを生成
 */
export const generateSEOMetadata = (article: Article) => {
  const title = article.seo?.title || article.title;
  const description = article.seo?.description || article.excerpt;
  const keywords = article.seo?.keywords || [
    article.category.name,
    ...(article.tags?.map(tag => tag.name) || []),
  ];

  const ogImage = article.seo?.ogImage?.url || article.featuredImage?.url;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: article.publishedAt || article.createdAt,
      modifiedTime: article.updatedAt,
      authors: article.author
        ? [
            {
              name: article.author.name,
              avatar: article.author.avatar?.url,
            },
          ]
        : undefined,
      tags: article.tags?.map(tag => tag.name) || [],
      images: ogImage
        ? [
            {
              url: ogImage,
              width:
                article.seo?.ogImage?.width ||
                article.featuredImage?.width ||
                1200,
              height:
                article.seo?.ogImage?.height ||
                article.featuredImage?.height ||
                630,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
};

/**
 * 構造化データ（JSON-LD）を生成
 */
export const generateArticleJsonLd = (article: Article) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage ? [article.featuredImage.url] : [],
    datePublished: article.publishedAt || article.createdAt,
    dateModified: article.updatedAt,
    author: article.author
      ? {
          '@type': 'Person',
          name: article.author.name,
          url: article.author.avatar?.url,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'SEO Media',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/articles/${article.slug}`,
    },
    articleSection: article.category.name,
    keywords: article.tags?.map(tag => tag.name).join(',') || '',
    wordCount: calculateWordCount(article.content),
    timeRequired: `PT${calculateReadTime(article.content)}M`,
  };
};

/**
 * 文字数をカウント
 */
const calculateWordCount = (content: string): number => {
  const textContent = content.replace(/<[^>]*>/g, '');
  return textContent.length;
};

/**
 * パンくずリスト用データを生成
 */
export const generateBreadcrumbs = (article: Article) => {
  return [
    { name: 'ホーム', href: '/' },
    { name: '記事一覧', href: '/articles' },
    {
      name: article.category.name,
      href: `/categories/${article.category.slug}`,
    },
    { name: article.title, href: `/articles/${article.slug}` },
  ];
};

/**
 * 関連記事のスコアを計算
 */
export const calculateRelatedScore = (
  baseArticle: Article,
  compareArticle: Article
): number => {
  let score = 0;

  // 同じカテゴリなら+10点
  if (baseArticle.category.id === compareArticle.category.id) {
    score += 10;
  }

  // 共通タグ1つにつき+3点
  const baseTags = baseArticle.tags?.map(tag => tag.id) || [];
  const compareTags = compareArticle.tags?.map(tag => tag.id) || [];
  const commonTags = baseTags.filter(tag => compareTags.includes(tag));
  score += commonTags.length * 3;

  // 同じ作者なら+5点
  if (baseArticle.author?.id === compareArticle.author?.id) {
    score += 5;
  }

  // 公開日が近いほど+1〜3点
  const baseDate = new Date(baseArticle.publishedAt || baseArticle.createdAt);
  const compareDate = new Date(
    compareArticle.publishedAt || compareArticle.createdAt
  );
  const diffInDays = Math.abs(
    (baseDate.getTime() - compareDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays <= 7) score += 3;
  else if (diffInDays <= 30) score += 2;
  else if (diffInDays <= 90) score += 1;

  return score;
};

/**
 * 記事のステータスを取得
 */
export const getArticleStatus = (
  article: Article
): 'published' | 'draft' | 'scheduled' => {
  if (!article.isPublished) return 'draft';

  const now = new Date();
  const publishedAt = new Date(article.publishedAt || article.createdAt);

  if (publishedAt > now) return 'scheduled';

  return 'published';
};

/**
 * 記事のタグを文字列として取得
 */
export const getArticleTagsString = (article: Article): string => {
  return article.tags?.map(tag => tag.name).join(', ') || '';
};

/**
 * 記事URLを生成
 */
export const getArticleUrl = (slug: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return `${baseUrl}/articles/${slug}`;
};

/**
 * カテゴリURLを生成
 */
export const getCategoryUrl = (slug: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return `${baseUrl}/categories/${slug}`;
};

/**
 * タグURLを生成
 */
export const getTagUrl = (slug: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return `${baseUrl}/tags/${slug}`;
};

/**
 * 記事の検索スコアを計算
 */
export const calculateSearchScore = (
  article: Article,
  query: string
): number => {
  const searchQuery = query.toLowerCase();
  let score = 0;

  // タイトルでの一致
  if (article.title.toLowerCase().includes(searchQuery)) {
    score += 10;
  }

  // 抜粋での一致
  if (article.excerpt.toLowerCase().includes(searchQuery)) {
    score += 5;
  }

  // タグでの一致
  const tagMatches =
    article.tags?.filter(tag => tag.name.toLowerCase().includes(searchQuery))
      .length || 0;
  score += tagMatches * 3;

  // カテゴリでの一致
  if (article.category.id.toLowerCase().includes(searchQuery)) {
    score += 7;
  }

  // 作者名での一致
  if (article.author?.id?.toLowerCase().includes(searchQuery)) {
    score += 4;
  }

  return score;
};

/**
 * 記事をグループ化（カテゴリ別）
 */
export const groupArticlesByCategory = (
  articles: Article[]
): Record<string, Article[]> => {
  return articles.reduce(
    (groups, article) => {
      const categoryName = article.category.name;

      if (!groups[categoryName]) {
        groups[categoryName] = [];
      }

      groups[categoryName].push(article);
      return groups;
    },
    {} as Record<string, Article[]>
  );
};

/**
 * 記事をグループ化（月別）
 */
export const groupArticlesByMonth = (
  articles: Article[]
): Record<string, Article[]> => {
  return articles.reduce(
    (groups, article) => {
      const date = new Date(article.publishedAt || article.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!groups[monthKey]) {
        groups[monthKey] = [];
      }

      groups[monthKey].push(article);
      return groups;
    },
    {} as Record<string, Article[]>
  );
};

/**
 * 記事の統計情報を計算
 */
export const calculateArticleStats = (articles: Article[]) => {
  const totalArticles = articles.length;
  const totalViews = articles.reduce(
    (sum, article) => sum + (article.viewCount || 0),
    0
  );
  const totalLikes = articles.reduce(
    (sum, article) => sum + (article.likeCount || 0),
    0
  );
  const totalReadTime = articles.reduce(
    (sum, article) => sum + (article.readTime || 0),
    0
  );

  const categories = Array.from(
    new Set(articles.map(article => article.category.name))
  );
  const tags = Array.from(
    new Set(
      articles.flatMap(article => article.tags?.map(tag => tag.name) || [])
    )
  );
  const authors = Array.from(
    new Set(articles.map(article => article.author?.name).filter(Boolean))
  );

  const averageViews =
    totalArticles > 0 ? Math.round(totalViews / totalArticles) : 0;
  const averageLikes =
    totalArticles > 0 ? Math.round(totalLikes / totalArticles) : 0;
  const averageReadTime =
    totalArticles > 0 ? Math.round(totalReadTime / totalArticles) : 0;

  return {
    totalArticles,
    totalViews,
    totalLikes,
    totalReadTime,
    averageViews,
    averageLikes,
    averageReadTime,
    categories: categories.length,
    tags: tags.length,
    authors: authors.length,
    categoryList: categories,
    tagList: tags,
    authorList: authors,
  };
};

/**
 * 記事のソート関数
 */
export const sortArticles = (
  articles: Article[],
  sortBy: 'publishedAt' | 'viewCount' | 'likeCount' | 'title' = 'publishedAt',
  order: 'asc' | 'desc' = 'desc'
): Article[] => {
  return [...articles].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'publishedAt':
        const dateA = new Date(a.publishedAt || a.createdAt).getTime();
        const dateB = new Date(b.publishedAt || b.createdAt).getTime();
        comparison = dateA - dateB;
        break;

      case 'viewCount':
        comparison = (a.viewCount || 0) - (b.viewCount || 0);
        break;

      case 'likeCount':
        comparison = (a.likeCount || 0) - (b.likeCount || 0);
        break;

      case 'title':
        comparison = a.title.localeCompare(b.title, 'ja');
        break;

      default:
        comparison = 0;
    }

    return order === 'desc' ? -comparison : comparison;
  });
};

/**
 * 記事をフィルタリング
 */
export const filterArticles = (
  articles: Article[],
  filters: {
    category?: string;
    tags?: string[];
    author?: string;
    isPremium?: boolean;
    isNew?: boolean;
    query?: string;
  }
): Article[] => {
  return articles.filter(article => {
    // カテゴリフィルター
    if (filters.category && article.category.slug !== filters.category) {
      return false;
    }

    // タグフィルター
    if (filters.tags && filters.tags.length > 0) {
      const articleTags = article.tags?.map(tag => tag.slug) || [];
      const hasMatchingTag = filters.tags.some(tag =>
        articleTags.includes(tag)
      );
      if (!hasMatchingTag) return false;
    }

    // 著者フィルター
    if (filters.author && article.author?.name !== filters.author) {
      return false;
    }

    // プレミアムフィルター
    if (
      filters.isPremium !== undefined &&
      article.isPremium !== filters.isPremium
    ) {
      return false;
    }

    // 新着フィルター
    if (filters.isNew !== undefined) {
      const isNew = isNewArticle(article.publishedAt || article.createdAt);
      if (isNew !== filters.isNew) return false;
    }

    // 検索クエリフィルター
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const searchTarget = [
        article.title,
        article.excerpt,
        article.category.name,
        ...(article.tags?.map(tag => tag.name) || []),
        article.author?.name || '',
      ]
        .join(' ')
        .toLowerCase();

      if (!searchTarget.includes(query)) return false;
    }

    return true;
  });
};
