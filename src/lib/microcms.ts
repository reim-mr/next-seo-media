/**
 * microCMS APIクライアント
 * 記事、カテゴリ、タグの取得・検索機能を提供
 */

import { createClient } from 'microcms-js-sdk';

import type {
  Article,
  Category,
  Tag,
  // Author,
  MicroCMSListResponse,
  MicroCMSQueries,
  SearchParams,
  ArticlesResponse,
  ArticleDetailResponse,
  CategoryArticlesResponse,
  TagArticlesResponse,
  Pagination,
  SitemapArticle,
  RSSArticle,
} from '@/types/microcms';

// 環境変数チェック
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}
if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

// microCMSクライアント初期化
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// デフォルト設定
const DEFAULT_LIMIT = 10;
const DEFAULT_FIELDS =
  'id,title,slug,excerpt,publishedAt,readTime,viewCount,likeCount,category,tags,featuredImage,author,isPremium,isNew';

/**
 * ページネーション計算
 */
const calculatePagination = (
  offset: number,
  limit: number,
  totalCount: number
): Pagination => {
  const current = Math.floor(offset / limit) + 1;
  const pages = Math.ceil(totalCount / limit);

  return {
    current,
    total: totalCount,
    pages,
    hasNext: current < pages,
    hasPrev: current > 1,
    limit,
  };
};

/**
 * 検索パラメータをmicroCMSクエリに変換
 */
const buildMicroCMSQuery = (params: SearchParams): MicroCMSQueries => {
  const query: MicroCMSQueries = {
    limit: params.limit || DEFAULT_LIMIT,
    offset: ((params.page || 1) - 1) * (params.limit || DEFAULT_LIMIT),
    fields: DEFAULT_FIELDS,
    filters: '[]',
  };

  // フィルター構築
  const filters: string[] = [];

  // 公開記事のみ
  filters.push('isPublished[equals]true');

  // カテゴリフィルター
  if (params.category) {
    filters.push(`category[contains]${params.category}`);
  }

  // タグフィルター
  if (params.tags && params.tags.length > 0) {
    const tagFilters = params.tags
      .map(tag => `tags[contains]${tag}`)
      .join('[or]');
    filters.push(`(${tagFilters})`);
  }

  // 日付範囲フィルター
  if (params.dateRange && params.dateRange !== 'all') {
    const now = new Date();
    let startDate: Date;

    switch (params.dateRange) {
      case 'today':
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'year':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        startDate = new Date(0);
    }

    filters.push(`publishedAt[greater_than]${startDate.toISOString()}`);
  }

  query.filters = filters.join('[and]');

  // 検索クエリ
  if (params.query) {
    query.q = params.query;
  }

  // ソート順
  if (params.sortBy && params.sortOrder) {
    const order = params.sortOrder === 'desc' ? '-' : '';
    query.orders = `${order}${params.sortBy}`;
  } else {
    query.orders = '-publishedAt'; // デフォルトは公開日降順
  }

  return query;
};

/**
 * 記事一覧取得
 */
export const getArticles = async (
  params: SearchParams = {}
): Promise<ArticlesResponse> => {
  const query = buildMicroCMSQuery(params);

  const response: MicroCMSListResponse<Article> = await client.get({
    endpoint: 'articles',
    queries: query,
  });

  const pagination = calculatePagination(
    query.offset || 0,
    query.limit || DEFAULT_LIMIT,
    response.totalCount
  );

  return {
    articles: response.contents,
    pagination,
    totalCount: response.totalCount,
  };
};

/**
 * 記事詳細取得
 */
export const getArticle = async (
  slug: string,
  draftKey?: string
): Promise<ArticleDetailResponse> => {
  const queries: MicroCMSQueries = {
    filters: `slug[equals]${slug}`,
  };

  if (draftKey) {
    queries.draftKey = draftKey;
  }

  const response: MicroCMSListResponse<Article> = await client.get({
    endpoint: 'articles',
    queries,
  });

  if (response.contents.length === 0) {
    throw new Error('Article not found');
  }

  const article = response.contents[0];

  // 関連記事取得（同じカテゴリの記事を3件）
  const relatedResponse: MicroCMSListResponse<Article> = await client.get({
    endpoint: 'articles',
    queries: {
      filters: `category[equals]${article.category.id}[and]id[not_equals]${article.id}[and]isPublished[equals]true`,
      limit: 3,
      fields: DEFAULT_FIELDS,
      orders: '-publishedAt',
    },
  });

  // 人気記事取得（閲覧数上位3件）
  const popularResponse: MicroCMSListResponse<Article> = await client.get({
    endpoint: 'articles',
    queries: {
      filters: `id[not_equals]${article.id}[and]isPublished[equals]true`,
      limit: 3,
      fields: DEFAULT_FIELDS,
      orders: '-viewCount',
    },
  });

  return {
    article,
    relatedArticles: relatedResponse.contents,
    popularArticles: popularResponse.contents,
  };
};

/**
 * カテゴリ別記事取得
 */
export const getArticlesByCategory = async (
  categorySlug: string,
  params: SearchParams = {}
): Promise<CategoryArticlesResponse> => {
  // カテゴリ情報取得
  const categoryResponse: MicroCMSListResponse<Category> = await client.get({
    endpoint: 'categories',
    queries: { filters: `slug[equals]${categorySlug}` },
  });

  if (categoryResponse.contents.length === 0) {
    throw new Error('Category not found');
  }

  const category = categoryResponse.contents[0];

  // カテゴリパラメータを追加
  const searchParams = { ...params, category: category.id };
  const articlesResponse = await getArticles(searchParams);

  return {
    ...articlesResponse,
    category,
  };
};

/**
 * タグ別記事取得
 */
export const getArticlesByTag = async (
  tagSlug: string,
  params: SearchParams = {}
): Promise<TagArticlesResponse> => {
  // タグ情報取得
  const tagResponse: MicroCMSListResponse<Tag> = await client.get({
    endpoint: 'tags',
    queries: { filters: `slug[equals]${tagSlug}` },
  });

  if (tagResponse.contents.length === 0) {
    throw new Error('Tag not found');
  }

  const tag = tagResponse.contents[0];

  // タグパラメータを追加
  const searchParams = { ...params, tags: [tag.id] };
  const articlesResponse = await getArticles(searchParams);

  return {
    ...articlesResponse,
    tag,
  };
};

/**
 * カテゴリ一覧取得
 */
export const getCategories = async (): Promise<Category[]> => {
  const response: MicroCMSListResponse<Category> = await client.get({
    endpoint: 'categories',
    queries: {
      orders: 'order',
      limit: 100,
    },
  });

  return response.contents;
};

/**
 * タグ一覧取得
 */
export const getTags = async (): Promise<Tag[]> => {
  const response: MicroCMSListResponse<Tag> = await client.get({
    endpoint: 'tags',
    queries: {
      orders: 'name',
      limit: 100,
    },
  });

  return response.contents;
};

/**
 * 人気記事取得
 */
export const getPopularArticles = async (
  limit: number = 5
): Promise<Article[]> => {
  const response: MicroCMSListResponse<Article> = await client.get({
    endpoint: 'articles',
    queries: {
      filters: 'isPublished[equals]true',
      orders: '-viewCount',
      limit,
      fields: DEFAULT_FIELDS,
    },
  });

  return response.contents;
};

/**
 * 最新記事取得
 */
export const getLatestArticles = async (
  limit: number = 5
): Promise<Article[]> => {
  const response: MicroCMSListResponse<Article> = await client.get({
    endpoint: 'articles',
    queries: {
      filters: 'isPublished[equals]true',
      orders: '-publishedAt',
      limit,
      fields: DEFAULT_FIELDS,
    },
  });

  return response.contents;
};

/**
 * サイトマップ用記事一覧取得
 */
export const getArticlesForSitemap = async (): Promise<SitemapArticle[]> => {
  const response: MicroCMSListResponse<Article> = await client.get({
    endpoint: 'articles',
    queries: {
      filters: 'isPublished[equals]true',
      fields: 'slug,publishedAt,updatedAt',
      limit: 1000,
      orders: '-publishedAt',
    },
  });

  return response.contents.map(article => ({
    slug: article.slug,
    publishedAt: article.publishedAt || article.createdAt,
    updatedAt: article.updatedAt,
  }));
};

/**
 * RSS用記事一覧取得
 */
export const getArticlesForRSS = async (
  limit: number = 50
): Promise<RSSArticle[]> => {
  const response: MicroCMSListResponse<Article> = await client.get({
    endpoint: 'articles',
    queries: {
      filters: 'isPublished[equals]true',
      fields: 'title,slug,excerpt,publishedAt,author,category',
      limit,
      orders: '-publishedAt',
    },
  });

  return response.contents.map(article => ({
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    publishedAt: article.publishedAt || article.createdAt,
    author: article.author,
    category: article.category,
  }));
};

/**
 * 記事の閲覧数増加（クライアントサイド用）
 */
export const incrementViewCount = async (articleId: string): Promise<void> => {
  // 実際の実装では、別のAPIエンドポイントやanalytics serviceを使用
  // ここでは簡単な例として示す
  try {
    // 閲覧数更新のロジック
    console.log(`Incrementing view count for article: ${articleId}`);
  } catch (error) {
    console.error('Failed to increment view count:', error);
  }
};
