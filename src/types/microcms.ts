/**
 * microCMS API型定義
 * microCMSのスキーマに基づいた型定義を提供
 */

// microCMS共通型
export interface MicroCMSDate {
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
}

export interface MicroCMSContent extends MicroCMSDate {
  id: string;
}

// カテゴリ型
export interface Category extends MicroCMSContent {
  name: string;
  slug: string;
  description?: string;
  color?: string;
  order?: number;
}

// タグ型
export interface Tag extends MicroCMSContent {
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

// 著者型
export interface Author extends MicroCMSContent {
  name: string;
  slug: string;
  bio?: string;
  avatar?: {
    url: string;
    width?: number;
    height?: number;
  };
  social?: {
    twitter?: string;
    github?: string;
    website?: string;
  };
}

// 記事型
export interface Article extends MicroCMSContent {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: {
    url: string;
    width?: number;
    height?: number;
  };
  category: Category;
  tags?: Tag[];
  author?: Author;
  readTime?: number;
  viewCount?: number;
  likeCount?: number;
  isPublished: boolean;
  isPremium?: boolean;
  isNew?: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: {
      url: string;
      width?: number;
      height?: number;
    };
  };
}

// microCMS APIレスポンス型
export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

export type MicroCMSObjectResponse<T extends object> = T & MicroCMSDate;

// API クエリパラメータ型
// depthNumber型をimportして使用
import type { MicroCMSQueries as SDKMicroCMSQueries } from 'microcms-js-sdk';

// microcms-js-sdkのMicroCMSQueriesを継承
export type MicroCMSQueries = SDKMicroCMSQueries;

// 検索パラメータ型
export interface SearchParams {
  query?: string;
  category?: string;
  tags?: string[];
  author?: string;
  dateRange?: 'today' | 'week' | 'month' | 'year' | 'all';
  sortBy?: 'publishedAt' | 'viewCount' | 'likeCount' | 'title';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// ページネーション型
export interface Pagination {
  current: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
  limit: number;
}

// API エラー型
export interface MicroCMSApiError {
  message: string;
  status: number;
  statusText: string;
}

// レスポンス型（ページネーション付き）
export interface ArticlesResponse {
  articles: Article[];
  pagination: Pagination;
  totalCount: number;
}

// 記事詳細レスポンス型
export interface ArticleDetailResponse {
  article: Article;
  relatedArticles?: Article[];
  popularArticles?: Article[];
}

// カテゴリ別記事レスポンス型
export interface CategoryArticlesResponse extends ArticlesResponse {
  category: Category;
}

// タグ別記事レスポンス型
export interface TagArticlesResponse extends ArticlesResponse {
  tag: Tag;
}

// サイトマップ用記事型
export interface SitemapArticle {
  slug: string;
  publishedAt: string;
  updatedAt: string;
}

// RSS用記事型
export interface RSSArticle {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  author?: {
    name: string;
  };
  category: {
    name: string;
  };
}

// ArticleCard コンポーネント用の型変換
export type ArticleCardData = Pick<
  Article,
  | 'id'
  | 'title'
  | 'excerpt'
  | 'publishedAt'
  | 'readTime'
  | 'viewCount'
  | 'likeCount'
  | 'category'
  | 'tags'
  | 'featuredImage'
  | 'author'
  | 'slug'
  | 'isPremium'
  | 'isNew'
>;

// 型変換ユーティリティ関数の型
export interface TypeConverters {
  articleToCardData: (article: Article) => ArticleCardData;
  articlesToCardData: (articles: Article[]) => ArticleCardData[];
  formatDate: (dateString: string) => string;
  calculateReadTime: (content: string) => number;
  generateExcerpt: (content: string, length?: number) => string;
}
