import { Search as SearchIcon, TrendingUp, Clock } from 'lucide-react';
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

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = params.query as string;

  if (query) {
    return {
      title: `"${query}" の検索結果 | SEO Media`,
      description: `"${query}" に関する記事の検索結果です。`,
    };
  }

  return {
    title: '記事検索 | SEO Media',
    description:
      'お探しの記事を検索できます。キーワード、カテゴリ、タグから絞り込み検索が可能です。',
  };
}

// 検索結果コンポーネント
async function SearchResults({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const query = params.query as string;
  const category = params.category as string;
  const tags = Array.isArray(params.tags)
    ? params.tags
    : params.tags
      ? [params.tags]
      : undefined;
  const dateRange = params.dateRange as
    | 'today'
    | 'week'
    | 'month'
    | 'year'
    | 'all';
  const sortBy =
    (params.sortBy as
      | 'publishedAt'
      | 'viewCount'
      | 'likeCount'
      | 'relevance') || 'relevance';
  const sortOrder = (params.sortOrder as 'asc' | 'desc') || 'desc';
  const page = parseInt(params.page as string) || 1;

  // 検索クエリがない場合
  if (!query && !category && !tags?.length) {
    const [categories, allTags] = await Promise.all([
      getCategories(),
      getTags(),
    ]);

    return (
      <div className="space-y-8">
        {/* 検索フォーム */}
        <div className="glass p-6 rounded-lg border border-border/50">
          <SearchForm
            action="/search"
            placeholder="記事を検索..."
            showFilters={true}
            showSuggestions={true}
            suggestions={[
              { query: 'Next.js', type: 'query', count: 42 },
              { query: 'React', type: 'query', count: 38 },
              { query: 'TypeScript', type: 'query', count: 156 },
            ]}
            recentSearches={['React Hooks', 'Next.js App Router', 'TypeScript']}
            trendingTags={allTags.slice(0, 6).map(tag => tag.name)}
            categories={categories.map(cat => cat.name)}
          />
        </div>

        {/* 初期状態 */}
        <div className="text-center py-16">
          <SearchIcon className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-4 gradient-text">記事を検索</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            キーワードを入力して、お探しの記事を見つけましょう。
            カテゴリやタグからも検索できます。
          </p>
        </div>

        {/* 推奨コンテンツ */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* 人気カテゴリ */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 gradient-text">
                <TrendingUp className="w-5 h-5" />
                人気カテゴリ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categories.slice(0, 5).map(category => (
                <Link
                  key={category.id}
                  href={`/search?category=${category.name}`}
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

          {/* トレンドタグ */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 gradient-text">
                <Clock className="w-5 h-5" />
                トレンドタグ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 10).map(tag => (
                  <Link key={tag.id} href={`/search?tags=${tag.name}`}>
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
        </div>
      </div>
    );
  }

  // 検索実行
  try {
    const { articles, pagination, totalCount } = await getArticles({
      query,
      category,
      tags,
      dateRange,
      sortBy: sortBy === 'relevance' ? 'publishedAt' : sortBy,
      sortOrder,
      page,
      limit: 12,
    });

    const [categories, allTags] = await Promise.all([
      getCategories(),
      getTags(),
    ]);

    const articleCards = articlesToCardData(articles);

    return (
      <div className="space-y-8">
        {/* 検索フォーム */}
        <div className="glass p-6 rounded-lg border border-border/50">
          <SearchForm
            action="/search"
            placeholder="記事を検索..."
            initialQuery={query}
            showFilters={true}
            showSuggestions={true}
            suggestions={[
              { query: 'Next.js', type: 'query', count: 42 },
              { query: 'React', type: 'query', count: 38 },
              { query: 'TypeScript', type: 'query', count: 156 },
            ]}
            recentSearches={['React Hooks', 'Next.js App Router', 'TypeScript']}
            trendingTags={allTags.slice(0, 6).map(tag => tag.name)}
            categories={categories.map(cat => cat.name)}
            initialFilters={{
              category,
              tags,
              dateRange: dateRange || 'all',
              //   sortBy: sortBy || 'relevance',
            }}
          />
        </div>

        {/* 検索結果 */}
        {totalCount > 0 ? (
          <>
            <ArticleList
              articles={articleCards}
              title={
                query
                  ? `"${query}" の検索結果`
                  : category
                    ? `カテゴリ: ${category}`
                    : tags?.length
                      ? `タグ: ${tags.join(', ')}`
                      : '検索結果'
              }
              subtitle={`${totalCount}件の記事が見つかりました`}
              showFilters={false}
              showStats={true}
              columns={3}
            />

            {/* ページネーション */}
            {pagination.pages > 1 && (
              <div className="flex justify-center space-x-2">
                {pagination.hasPrev && (
                  <Button variant="outline" asChild>
                    <Link
                      href={`/search?${new URLSearchParams({
                        ...params,
                        page: String(pagination.current - 1),
                      }).toString()}`}
                    >
                      前のページ
                    </Link>
                  </Button>
                )}

                <div className="flex items-center space-x-1">
                  {Array.from(
                    { length: Math.min(5, pagination.pages) },
                    (_, i) => {
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
                            href={`/search?${new URLSearchParams({
                              ...params,
                              page: String(pageNum),
                            }).toString()}`}
                          >
                            {pageNum}
                          </Link>
                        </Button>
                      );
                    }
                  )}
                </div>

                {pagination.hasNext && (
                  <Button variant="outline" asChild>
                    <Link
                      href={`/search?${new URLSearchParams({
                        ...params,
                        page: String(pagination.current + 1),
                      }).toString()}`}
                    >
                      次のページ
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </>
        ) : (
          // 検索結果なし
          <div className="text-center py-16">
            <SearchIcon className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-4">
              検索結果が見つかりませんでした
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              {query && `"${query}" に一致する記事は見つかりませんでした。`}
              別のキーワードで検索してみてください。
            </p>
            <div className="space-y-4">
              <Button asChild>
                <Link href="/search">新しい検索</Link>
              </Button>
              <div className="flex justify-center">
                <Button variant="outline" asChild>
                  <Link href="/articles">すべての記事を見る</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('検索中にエラーが発生しました:', error);
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">
          検索中にエラーが発生しました
        </h2>
        <p className="text-muted-foreground mb-6">
          一時的な問題が発生している可能性があります。しばらく経ってから再度お試しください。
        </p>
        <Button asChild>
          <Link href="/search">検索ページに戻る</Link>
        </Button>
      </div>
    );
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* ヒーローセクション */}
      <section className="mesh-bg border-b border-border/50">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            記事検索
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            キーワード、カテゴリ、タグから
            <br className="hidden md:block" />
            お探しの記事を見つけましょう
          </p>
        </div>
      </section>

      {/* メインコンテンツ */}
      <div className="container mx-auto px-4 py-12">
        <Suspense
          fallback={
            <div className="space-y-6">
              <div className="h-32 bg-muted animate-pulse rounded-lg" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-64 bg-muted animate-pulse rounded-lg"
                  />
                ))}
              </div>
            </div>
          }
        >
          <SearchResults searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
