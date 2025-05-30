import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Search, User, Tag, Folder } from 'lucide-react';

import { SearchForm } from './search-form';

const meta: Meta<typeof SearchForm> = {
  title: 'UI/SearchForm',
  component: SearchForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Next.js v15のFormコンポーネントを使用した検索フォーム。URLパラメータとして検索条件を送信します。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    action: {
      control: 'text',
      description: '検索結果ページのパス',
      defaultValue: '/search',
    },
    showFilters: {
      control: 'boolean',
      description: '詳細フィルターを表示するか',
    },
    showSuggestions: {
      control: 'boolean',
      description: '検索候補を表示するか',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的な検索フォーム
export const Default: Story = {
  args: {
    action: '/search',
    placeholder: '記事を検索...',
    showFilters: true,
    showSuggestions: true,
    categories: [
      'フロントエンド',
      'バックエンド',
      'デザイン',
      'マーケティング',
    ],
    recentSearches: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    trendingTags: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind',
      'AI',
      'Web開発',
    ],
    suggestions: [
      {
        query: 'Next.js 15の新機能',
        type: 'query',
        count: 42,
        icon: <Search className="w-3 h-3" />,
      },
      {
        query: 'React Server Components',
        type: 'query',
        count: 38,
        icon: <Search className="w-3 h-3" />,
      },
      {
        query: 'TypeScript',
        type: 'tag',
        count: 156,
        icon: <Tag className="w-3 h-3" />,
      },
      {
        query: 'フロントエンド',
        type: 'category',
        count: 89,
        icon: <Folder className="w-3 h-3" />,
      },
      {
        query: '山田太郎',
        type: 'author',
        count: 23,
        icon: <User className="w-3 h-3" />,
      },
    ],
  },
};

// シンプル版（フィルターなし）
export const Simple: Story = {
  args: {
    action: '/search',
    placeholder: 'キーワードを入力...',
    showFilters: false,
    showSuggestions: false,
  },
};

// 候補表示あり
export const WithSuggestions: Story = {
  args: {
    action: '/search',
    placeholder: '記事を検索...',
    showFilters: false,
    showSuggestions: true,
    recentSearches: ['AI', 'Web開発', 'デザイン'],
    trendingTags: ['React', 'Next.js', 'TypeScript'],
    suggestions: [
      {
        query: '最新のWeb技術トレンド',
        type: 'query',
        count: 124,
      },
      {
        query: 'AI',
        type: 'tag',
        count: 89,
      },
    ],
  },
};

// 初期値設定
export const WithInitialValues: Story = {
  args: {
    action: '/search',
    initialQuery: 'Next.js',
    initialFilters: {
      category: 'フロントエンド',
      dateRange: 'month',
      sortBy: 'popularity',
    },
    categories: ['フロントエンド', 'バックエンド', 'デザイン'],
    showFilters: true,
  },
};

// フィルターのみ
export const FiltersOnly: Story = {
  args: {
    action: '/search',
    showFilters: true,
    showSuggestions: false,
    categories: ['技術', 'ビジネス', 'デザイン', 'マーケティング', 'キャリア'],
  },
};

// カスタムアクション
export const CustomAction: Story = {
  args: {
    action: '/blog/search',
    placeholder: 'ブログ記事を検索...',
    showFilters: true,
    categories: ['技術ブログ', 'チュートリアル', 'ニュース'],
  },
};

// 多数の候補
export const ManySuggestions: Story = {
  args: {
    action: '/search',
    showSuggestions: true,
    recentSearches: [
      'React Hooks',
      'Next.js App Router',
      'TypeScript 型定義',
      'Tailwind CSS',
      'Storybook',
      'Jest',
      'ESLint',
    ],
    trendingTags: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'CSS',
      'HTML',
      'Node.js',
      'GraphQL',
      'API',
      'データベース',
    ],
    suggestions: [
      { query: 'React 19の新機能', type: 'query', count: 234 },
      { query: 'Next.js パフォーマンス最適化', type: 'query', count: 189 },
      { query: 'TypeScript tips', type: 'query', count: 156 },
      { query: 'Web開発', type: 'tag', count: 445 },
      { query: 'フロントエンド', type: 'category', count: 234 },
      { query: '田中花子', type: 'author', count: 67 },
    ],
  },
};

// レスポンシブテスト用
export const ResponsiveTest: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// 検索結果ページ風のレイアウト
export const SearchResultsLayout: Story = {
  render: args => (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">記事検索</h1>
        <p className="text-muted-foreground">お探しの記事を見つけましょう</p>
      </div>
      <SearchForm {...args} />
      <div className="border-t pt-6">
        <p className="text-sm text-muted-foreground text-center">
          検索結果がここに表示されます
        </p>
      </div>
    </div>
  ),
  args: Default.args,
  parameters: {
    layout: 'fullscreen',
  },
};
