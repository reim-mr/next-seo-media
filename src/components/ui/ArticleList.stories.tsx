import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { ArticleCardProps } from './article-card';
import { ArticleList } from './article-list';

// サンプル記事データ
const sampleArticles: ArticleCardProps[] = [
  {
    id: '1',
    title: 'Next.js 15の新機能について詳しく解説',
    excerpt:
      'Next.js 15では多くの新機能が追加されました。App Routerの改善、TurboPack、新しい画像最適化機能について解説します。',
    publishedAt: '2025-05-30T10:00:00Z',
    readTime: 8,
    viewCount: 2400,
    likeCount: 89,
    category: { name: 'フロントエンド', slug: 'frontend', color: '#3B82F6' },
    tags: [
      { name: 'Next.js', slug: 'nextjs' },
      { name: 'React', slug: 'react' },
      { name: 'TypeScript', slug: 'typescript' },
    ],
    featuredImage: {
      url: 'https://via.placeholder.com/800x450/3B82F6/white?text=Next.js',
      alt: 'Next.js 15',
      width: 800,
      height: 450,
    },
    author: { name: '山田太郎', avatar: 'https://via.placeholder.com/100x100' },
    slug: 'nextjs-15-features',
    isNew: true,
  },
  {
    id: '2',
    title: 'React Server Componentsの実践ガイド',
    excerpt:
      'React Server Componentsを実際のプロジェクトでどう活用するか、パフォーマンス向上のポイントを含めて解説します。',
    publishedAt: '2025-05-28T14:30:00Z',
    readTime: 12,
    viewCount: 3200,
    likeCount: 124,
    category: { name: 'React', slug: 'react', color: '#61DAFB' },
    tags: [
      { name: 'React', slug: 'react' },
      { name: 'Server Components', slug: 'server-components' },
      { name: 'パフォーマンス', slug: 'performance' },
    ],
    featuredImage: {
      url: 'https://via.placeholder.com/800x450/61DAFB/black?text=React',
      alt: 'React Server Components',
      width: 800,
      height: 450,
    },
    author: { name: '佐藤花子', avatar: 'https://via.placeholder.com/100x100' },
    slug: 'react-server-components-guide',
    isPremium: true,
  },
  {
    id: '3',
    title: 'TypeScriptの型安全性を最大限活用する方法',
    excerpt:
      'TypeScriptの強力な型システムを使って、より安全で保守性の高いコードを書くためのベストプラクティスを紹介します。',
    publishedAt: '2025-05-25T09:15:00Z',
    readTime: 10,
    viewCount: 1800,
    likeCount: 67,
    category: { name: 'TypeScript', slug: 'typescript', color: '#3178C6' },
    tags: [
      { name: 'TypeScript', slug: 'typescript' },
      { name: '型安全', slug: 'type-safety' },
      { name: 'ベストプラクティス', slug: 'best-practices' },
    ],
    featuredImage: {
      url: 'https://via.placeholder.com/800x450/3178C6/white?text=TypeScript',
      alt: 'TypeScript',
      width: 800,
      height: 450,
    },
    author: { name: '田中一郎', avatar: 'https://via.placeholder.com/100x100' },
    slug: 'typescript-type-safety',
  },
  {
    id: '4',
    title: 'CSS Grid Layout完全ガイド',
    excerpt:
      'CSS Grid Layoutの基本から応用まで、実践的な例と共に詳しく解説します。',
    publishedAt: '2025-05-22T16:45:00Z',
    readTime: 6,
    viewCount: 1200,
    likeCount: 45,
    category: { name: 'CSS', slug: 'css', color: '#1572B6' },
    tags: [
      { name: 'CSS', slug: 'css' },
      { name: 'Grid', slug: 'grid' },
      { name: 'レイアウト', slug: 'layout' },
    ],
    author: { name: '鈴木美咲', avatar: 'https://via.placeholder.com/100x100' },
    slug: 'css-grid-complete-guide',
  },
  {
    id: '5',
    title: 'Webパフォーマンス最適化の実践テクニック',
    excerpt:
      'Webサイトの表示速度を向上させるための具体的な手法を、測定方法と共に解説します。',
    publishedAt: '2025-05-20T11:30:00Z',
    readTime: 15,
    viewCount: 4500,
    likeCount: 198,
    category: { name: 'パフォーマンス', slug: 'performance', color: '#FF6B35' },
    tags: [
      { name: 'パフォーマンス', slug: 'performance' },
      { name: '最適化', slug: 'optimization' },
      { name: 'Core Web Vitals', slug: 'core-web-vitals' },
    ],
    featuredImage: {
      url: 'https://via.placeholder.com/800x450/FF6B35/white?text=Performance',
      alt: 'Web Performance',
      width: 800,
      height: 450,
    },
    author: { name: '高橋健太', avatar: 'https://via.placeholder.com/100x100' },
    slug: 'web-performance-optimization',
    isPremium: true,
  },
  {
    id: '6',
    title: 'Vue.js 3 Composition APIの使い方',
    excerpt:
      'Vue.js 3で導入されたComposition APIの基本的な使い方と、従来のOptions APIとの比較を行います。',
    publishedAt: '2025-05-18T13:20:00Z',
    readTime: 9,
    viewCount: 2100,
    likeCount: 78,
    category: { name: 'Vue.js', slug: 'vuejs', color: '#4FC08D' },
    tags: [
      { name: 'Vue.js', slug: 'vuejs' },
      { name: 'Composition API', slug: 'composition-api' },
      { name: 'JavaScript', slug: 'javascript' },
    ],
    featuredImage: {
      url: 'https://via.placeholder.com/800x450/4FC08D/white?text=Vue.js',
      alt: 'Vue.js 3',
      width: 800,
      height: 450,
    },
    author: {
      name: '中村さくら',
      avatar: 'https://via.placeholder.com/100x100',
    },
    slug: 'vuejs-composition-api',
  },
];

const meta: Meta<typeof ArticleList> = {
  title: 'UI/ArticleList',
  component: ArticleList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的な記事一覧
export const Default: Story = {
  args: {
    articles: sampleArticles,
    title: '最新記事',
    subtitle: 'フロントエンド開発に関する最新の記事をお届けします',
    showFilters: true,
    showStats: true,
    columns: 3,
  },
};

// 2カラム表示
export const TwoColumns: Story = {
  args: {
    ...Default.args,
    columns: 2,
    title: '人気記事',
  },
};

// 4カラム表示
export const FourColumns: Story = {
  args: {
    ...Default.args,
    columns: 4,
    title: '全記事一覧',
  },
};

// フィルター非表示
export const NoFilters: Story = {
  args: {
    ...Default.args,
    showFilters: false,
    showStats: false,
    title: 'シンプル記事一覧',
  },
};

// ローディング状態
export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
};

// 空状態
export const Empty: Story = {
  args: {
    articles: [],
    title: '検索結果',
    subtitle: '検索条件に一致する記事が見つかりませんでした',
    emptyStateTitle: '記事が見つかりません',
    emptyStateDescription: '別のキーワードで検索してみてください',
  },
};

// さらに読み込み可能
export const HasMore: Story = {
  args: {
    ...Default.args,
    hasMore: true,
    onLoadMore: () => {},
  },
};

// カテゴリフィルター適用
export const WithCategoryFilter: Story = {
  args: {
    ...Default.args,
    selectedCategory: 'フロントエンド',
    articles: sampleArticles.filter(
      article => article.category.name === 'フロントエンド'
    ),
    title: 'フロントエンド記事',
  },
};

// 少ない記事数
export const FewArticles: Story = {
  args: {
    articles: sampleArticles.slice(0, 2),
    title: '注目記事',
    columns: 2,
  },
};

// 1記事のみ
export const SingleArticle: Story = {
  args: {
    articles: [sampleArticles[0]],
    title: '最新記事',
    columns: 1,
  },
};

// リストビュー（実装予定）
export const ListView: Story = {
  args: {
    ...Default.args,
    viewMode: 'list' as const,
    title: 'リスト表示',
  },
};

// 統計情報の強調
export const HighStats: Story = {
  args: {
    articles: sampleArticles.map(article => ({
      ...article,
      viewCount: (article.viewCount || 0) * 10,
      likeCount: (article.likeCount || 0) * 5,
    })),
    title: '人気記事ランキング',
    subtitle: '今月最も読まれた記事です',
  },
};
