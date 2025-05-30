import { TrendingUp, BookOpen, Tags } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

import ArticleList from '@/components/ui/article-list';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SearchForm from '@/components/ui/search-form';
import { articlesToCardData } from '@/lib/article-utils';
import { getArticles, getCategories, getTags } from '@/lib/microcms';

interface ArticlesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title: '記事一覧 | SEO Media',
  description:
    'フロントエンド開発、バックエンド、デザインに関する最新記事をお届けします。',
  openGraph: {
    title: '記事一覧 | SEO Media',
    description:
      'フロントエンド開発、バックエンド、デザインに関する最新記事をお届けします。',
    type: 'website',
  },
};

// ローディングコンポーネント
function ArticleListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="glass border border-border/50 rounded-lg overflow-hidden">
              <div className="aspect-video bg-muted" />
              <div className="p-6 space-y-4">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded" />
                  <div className="h-3 bg-muted rounded w-5/6" />
                </div>
                <div className="flex gap-2">
                  <div className="h-6 bg-muted rounded w-16" />
                  <div className="h-6 bg-muted rounded w-20" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// サイドバーコンポーネント
async function Sidebar() {
  try {
    const [categories, tags] = await Promise.all([getCategories(), getTags()]);

    return (
      <aside className="space-y-6">
        {/* カテゴリ */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 gradient-text">
              <BookOpen className="w-5 h-5" />
              カテゴリ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {categories.map(category => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color || '#6B7280' }}
                  />
                  <span className="font-medium group-hover:text-primary transition-colors">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* 人気タグ */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 gradient-text">
              <Tags className="w-5 h-5" />
              人気タグ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 10).map(tag => (
                <Link key={tag.id} href={`/tags/${tag.slug}`}>
                  <Badge
                    variant="outline"
                    className="hover:bg-primary/10 hover:border-primary/30 transition-colors duration-300"
                  >
                    #{tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 統計情報 */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 gradient-text">
              <TrendingUp className="w-5 h-5" />
              サイト統計
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">記事数</span>
              <span className="font-bold">
                {categories.length > 0 ? '50+' : '-'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">カテゴリ</span>
              <span className="font-bold">{categories.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">タグ</span>
              <span className="font-bold">{tags.length}</span>
            </div>
          </CardContent>
        </Card>
      </aside>
    );
  } catch (error: unknown) {
    console.error('サイドバー情報を読み込めませんでした', error);
    return (
      <aside className="space-y-6">
        <Card className="glass border-border/50">
          <CardContent className="p-6">
            <p className="text-muted-foreground text-center">
              サイドバー情報を読み込めませんでした
            </p>
          </CardContent>
        </Card>
      </aside>
    );
  }
}

// メインコンテンツコンポーネント
async function ArticlesContent({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  // クエリパラメータを解析
  const page = parseInt(params.page as string) || 1;
  const category = params.category as string;
  const tags = Array.isArray(params.tags)
    ? params.tags
    : params.tags
      ? [params.tags]
      : undefined;
  const sortBy =
    (params.sortBy as 'publishedAt' | 'viewCount' | 'likeCount') ||
    'publishedAt';
  const sortOrder = (params.sortOrder as 'asc' | 'desc') || 'desc';
  const query = params.query as string;

  try {
    const { articles, pagination, totalCount } = await getArticles({
      page,
      limit: 12,
      category,
      tags,
      sortBy,
      sortOrder,
      query,
    });

    const [categories, allTags] = await Promise.all([
      getCategories(),
      getTags(),
    ]);

    const articleCards = articlesToCardData(articles);

    // 検索候補データ
    const suggestions = [
      { query: 'Next.js', type: 'query' as const, count: 42 },
      { query: 'React', type: 'query' as const, count: 38 },
      { query: 'TypeScript', type: 'query' as const, count: 156 },
    ];

    const recentSearches = ['React Hooks', 'Next.js App Router', 'TypeScript'];
    const trendingTags = allTags.slice(0, 6).map(tag => tag.name);

    return (
      <div className="space-y-8">
        {/* 検索フォーム */}
        <div className="glass p-6 rounded-lg border border-border/50">
          <SearchForm
            action="/articles"
            placeholder="記事を検索..."
            initialQuery={query}
            showFilters={true}
            showSuggestions={true}
            suggestions={suggestions}
            recentSearches={recentSearches}
            trendingTags={trendingTags}
            categories={categories.map(cat => cat.name)}
            initialFilters={{
              category,
              tags,
              //   sortBy,
              //   sortOrder,
              dateRange: 'all',
            }}
          />
        </div>

        {/* 記事一覧 */}
        <ArticleList
          articles={articleCards}
          title={
            query
              ? `"${query}" の検索結果`
              : category
                ? `カテゴリ: ${category}`
                : '全記事一覧'
          }
          subtitle={
            query
              ? `${totalCount}件の記事が見つかりました`
              : `最新の記事をお届けします（全${totalCount}件）`
          }
          showFilters={false}
          showStats={true}
          columns={3}
          hasMore={pagination.hasNext}
          onLoadMore={() => {
            // クライアントサイドで実装予定
            // console.log('Load more articles')
          }}
        />

        {/* ページネーション */}
        {pagination.pages > 1 && (
          <div className="flex justify-center space-x-2">
            {pagination.hasPrev && (
              <Button variant="outline" asChild>
                <Link
                  href={`/articles?page=${pagination.current - 1}${category ? `&category=${category}` : ''}${query ? `&query=${query}` : ''}`}
                >
                  前のページ
                </Link>
              </Button>
            )}

            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === pagination.current;

                return (
                  <Button
                    key={pageNum}
                    variant={isActive ? 'default' : 'outline'}
                    size="sm"
                    asChild
                  >
                    <Link
                      href={`/articles?page=${pageNum}${category ? `&category=${category}` : ''}${query ? `&query=${query}` : ''}`}
                    >
                      {pageNum}
                    </Link>
                  </Button>
                );
              })}
            </div>

            {pagination.hasNext && (
              <Button variant="outline" asChild>
                <Link
                  href={`/articles?page=${pagination.current + 1}${category ? `&category=${category}` : ''}${query ? `&query=${query}` : ''}`}
                >
                  次のページ
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    );
  } catch (error: unknown) {
    console.error('記事一覧を読み込めませんでした', error);
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">記事を読み込めませんでした</h2>
        <p className="text-muted-foreground mb-6">
          一時的な問題が発生している可能性があります。しばらく経ってから再度お試しください。
        </p>
        <Button asChild>
          <Link href="/">ホームに戻る</Link>
        </Button>
      </div>
    );
  }
}

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* ヒーローセクション */}
      <section className="mesh-bg border-b border-border/50">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            記事一覧
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            フロントエンド開発、バックエンド、デザインに関する
            <br className="hidden md:block" />
            最新記事をお届けします
          </p>
        </div>
      </section>

      {/* メインコンテンツ */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* メインコンテンツ */}
          <main className="lg:col-span-3">
            <Suspense fallback={<ArticleListSkeleton />}>
              <ArticlesContent searchParams={searchParams} />
            </Suspense>
          </main>

          {/* サイドバー */}
          <Suspense
            fallback={
              <div className="space-y-6">
                <div className="h-40 bg-muted animate-pulse rounded-lg" />
                <div className="h-32 bg-muted animate-pulse rounded-lg" />
              </div>
            }
          >
            <Sidebar />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
