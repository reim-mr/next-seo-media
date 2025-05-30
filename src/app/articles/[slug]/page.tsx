import { Calendar, Clock, Eye, Heart, ArrowLeft, Share2 } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import ArticleCard from '@/components/ui/article-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  articleToCardData,
  formatDate,
  generateSEOMetadata,
  generateArticleJsonLd,
  generateBreadcrumbs,
} from '@/lib/article-utils';
import { getArticle } from '@/lib/microcms';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// 動的メタデータ生成
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { article } = await getArticle(slug);
    return generateSEOMetadata(article);
  } catch {
    return {
      title: '記事が見つかりません',
      description: '指定された記事は存在しないか、削除された可能性があります。',
    };
  }
}

export default async function ArticlePage({
  params,
  searchParams,
}: ArticlePageProps) {
  const { slug } = await params;
  const { preview } = await searchParams;

  try {
    const {
      article,
      relatedArticles = [],
      popularArticles = [],
    } = await getArticle(
      slug,
      typeof preview === 'string' ? preview : undefined
    );

    const breadcrumbs = generateBreadcrumbs(article);
    const jsonLd = generateArticleJsonLd(article);

    return (
      <>
        {/* 構造化データ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="min-h-screen bg-background">
          <div className="container max-w-4xl mx-auto px-4 py-8">
            {/* パンくずリスト */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.href} className="flex items-center">
                  {index > 0 && <span className="mx-2">/</span>}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-foreground font-medium">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* 戻るボタン */}
            <div className="mb-6">
              <Button variant="ghost" asChild className="gap-2 hover-lift">
                <Link href="/articles">
                  <ArrowLeft className="w-4 h-4" />
                  記事一覧に戻る
                </Link>
              </Button>
            </div>

            {/* 記事ヘッダー */}
            <header className="space-y-6 mb-8">
              {/* カテゴリとバッジ */}
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="secondary"
                  className="glass"
                  style={{
                    backgroundColor: article.category.color
                      ? `${article.category.color}20`
                      : undefined,
                    borderColor: article.category.color
                      ? `${article.category.color}50`
                      : undefined,
                  }}
                >
                  {article.category.name}
                </Badge>

                {article.isPremium && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                    ✨ Premium
                  </Badge>
                )}

                {article.isNew && (
                  <Badge variant="destructive" className="animate-pulse">
                    🆕 New
                  </Badge>
                )}
              </div>

              {/* タイトル */}
              <h1 className="text-3xl md:text-4xl font-bold leading-tight gradient-text">
                {article.title}
              </h1>

              {/* 抜粋 */}
              <p className="text-lg text-muted-foreground leading-relaxed">
                {article.excerpt}
              </p>

              {/* メタ情報 */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {formatDate(article.publishedAt || article.createdAt)}
                  </span>
                </div>

                {article.readTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}分</span>
                  </div>
                )}

                {article.viewCount !== undefined && (
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{article.viewCount.toLocaleString()}</span>
                  </div>
                )}

                {article.likeCount !== undefined && (
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{article.likeCount.toLocaleString()}</span>
                  </div>
                )}

                {article.author && (
                  <div className="flex items-center gap-2">
                    {article.author.avatar ? (
                      <Image
                        src={article.author.avatar.url}
                        alt={article.author.name}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-5 h-5 bg-muted rounded-full flex items-center justify-center">
                        <span className="text-xs">👤</span>
                      </div>
                    )}
                    <span>{article.author.name}</span>
                  </div>
                )}
              </div>

              {/* アクションボタン */}
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2 hover-lift">
                  <Heart className="w-4 h-4" />
                  いいね
                </Button>
                <Button variant="outline" className="gap-2 hover-lift">
                  <Share2 className="w-4 h-4" />
                  シェア
                </Button>
              </div>
            </header>

            {/* アイキャッチ画像 */}
            {article.featuredImage && (
              <div className="relative aspect-video mb-8 rounded-lg overflow-hidden glass">
                <Image
                  src={article.featuredImage.url}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                />
              </div>
            )}

            {/* 記事本文 */}
            <main className="prose prose-lg max-w-none mb-12 glass p-6 md:p-8 rounded-lg border border-border/50">
              <div
                dangerouslySetInnerHTML={{ __html: article.content }}
                className="prose-headings:gradient-text prose-a:text-primary hover:prose-a:text-primary/80 prose-code:glass prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:glass prose-pre:border prose-pre:border-border/50"
              />
            </main>

            {/* タグ */}
            {article.tags && article.tags.length > 0 && (
              <div className="mb-12">
                <h3 className="text-lg font-semibold mb-4">タグ</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
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
              </div>
            )}

            <Separator className="my-12" />

            {/* 関連記事・人気記事 */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* 関連記事 */}
              {relatedArticles.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-6 gradient-text">
                    関連記事
                  </h2>
                  <div className="space-y-4">
                    {relatedArticles.map(relatedArticle => (
                      <ArticleCard
                        key={relatedArticle.id}
                        {...articleToCardData(relatedArticle)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* 人気記事 */}
              {popularArticles.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-6 gradient-text">
                    人気記事
                  </h2>
                  <div className="space-y-4">
                    {popularArticles.map(popularArticle => (
                      <ArticleCard
                        key={popularArticle.id}
                        {...articleToCardData(popularArticle)}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* CTAセクション */}
            <Card className="mt-12 glass border-border/50">
              <CardHeader>
                <CardTitle className="gradient-text">
                  もっと記事を読む
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  他にも役立つ記事をたくさん用意しています。
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild className="hover-lift">
                    <Link href="/articles">記事一覧を見る</Link>
                  </Button>
                  <Button variant="outline" asChild className="hover-lift">
                    <Link href={`/categories/${article.category.slug}`}>
                      {article.category.name}の記事を見る
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  } catch (error: unknown) {
    console.error(error);
    notFound();
  }
}
