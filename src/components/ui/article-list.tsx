import {
  Loader2,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Grid,
  List,
  Eye,
  Heart,
  Calendar,
} from 'lucide-react';
import React from 'react';

import { ArticleCard, type ArticleCardProps } from './article-card';
import { Badge } from './badge';
import { Button } from './button';
import { Separator } from './separator';

export interface ArticleListProps {
  articles: ArticleCardProps[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  loadMoreText?: string;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  emptyStateIcon?: React.ReactNode;
  className?: string;
  // フィルタリング・ソート
  selectedCategory?: string;
  selectedTag?: string;
  sortBy?: 'publishedAt' | 'viewCount' | 'likeCount' | 'title';
  sortOrder?: 'asc' | 'desc';
  onCategoryChange?: (category: string | undefined) => void;
  onTagChange?: (tag: string | undefined) => void;
  onSortChange?: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  // 表示設定
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  columns?: 1 | 2 | 3 | 4;
  showFilters?: boolean;
  showStats?: boolean;
  title?: string;
  subtitle?: string;
}

export const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  isLoading = false,
  hasMore = false,
  onLoadMore,
  loadMoreText = 'さらに読み込む',
  emptyStateTitle = '記事が見つかりません',
  emptyStateDescription = '条件を変更して再度お試しください',
  emptyStateIcon = <Search className="w-12 h-12 opacity-50" />,
  className = '',
  selectedCategory,
  selectedTag,
  sortBy = 'publishedAt',
  sortOrder = 'desc',
  onCategoryChange,
  onTagChange,
  onSortChange,
  viewMode = 'grid',
  onViewModeChange,
  columns = 3,
  showFilters = true,
  showStats = true,
  title,
  subtitle,
}) => {
  // 統計情報の計算
  const totalArticles = articles.length;
  const totalViews = articles.reduce(
    (sum, article) => sum + (article.viewCount || 0),
    0
  );
  const totalLikes = articles.reduce(
    (sum, article) => sum + (article.likeCount || 0),
    0
  );
  const categories = Array.from(
    new Set(articles.map(article => article.category.name))
  );
  //   const allTags = Array.from(new Set(articles.flatMap(article => article.tags?.map(tag => tag.name) || [])))

  // 数値フォーマット
  const formatCount = (count: number): string => {
    if (count < 1000) return count.toString();
    if (count < 10000) return `${(count / 1000).toFixed(1)}k`;
    return `${Math.floor(count / 1000)}k`;
  };

  // グリッドクラス
  const getGridCols = () => {
    switch (columns) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 3:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  // ソートアイコン
  const SortIcon = sortOrder === 'asc' ? SortAsc : SortDesc;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* ヘッダー */}
      {(title || subtitle) && (
        <div className="space-y-2">
          {title && (
            <h2 className="text-2xl font-bold tracking-tight gradient-text">
              {title}
            </h2>
          )}
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
      )}

      {/* 統計情報 */}
      {showStats && totalArticles > 0 && (
        <div className="flex flex-wrap gap-4 p-4 rounded-lg glass border border-border/50">
          <div className="flex items-center gap-2 text-sm">
            <div className="p-1.5 rounded-md bg-primary/10">
              <Search className="w-4 h-4 text-primary" />
            </div>
            <span className="font-medium">{totalArticles}件</span>
            <span className="text-muted-foreground">の記事</span>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center gap-2 text-sm">
            <div className="p-1.5 rounded-md bg-blue-500/10">
              <Eye className="w-4 h-4 text-blue-500" />
            </div>
            <span className="font-medium">{formatCount(totalViews)}</span>
            <span className="text-muted-foreground">総閲覧数</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="p-1.5 rounded-md bg-red-500/10">
              <Heart className="w-4 h-4 text-red-500" />
            </div>
            <span className="font-medium">{formatCount(totalLikes)}</span>
            <span className="text-muted-foreground">総いいね</span>
          </div>
        </div>
      )}

      {/* フィルター・ソート */}
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg glass border border-border/50">
          {/* カテゴリフィルター */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!selectedCategory ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange?.(undefined)}
              className="h-8"
            >
              すべて
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => onCategoryChange?.(category)}
                className="h-8"
              >
                {category}
              </Button>
            ))}
          </div>

          <Separator orientation="vertical" className="hidden sm:block h-8" />

          {/* ソート */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Button
              variant={sortBy === 'publishedAt' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSortChange?.('publishedAt', sortOrder)}
              className="h-8 gap-1"
            >
              <Calendar className="w-3 h-3" />
              日付
              {sortBy === 'publishedAt' && <SortIcon className="w-3 h-3" />}
            </Button>
            <Button
              variant={sortBy === 'viewCount' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSortChange?.('viewCount', sortOrder)}
              className="h-8 gap-1"
            >
              <Eye className="w-3 h-3" />
              閲覧数
              {sortBy === 'viewCount' && <SortIcon className="w-3 h-3" />}
            </Button>
            <Button
              variant={sortBy === 'likeCount' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSortChange?.('likeCount', sortOrder)}
              className="h-8 gap-1"
            >
              <Heart className="w-3 h-3" />
              いいね
              {sortBy === 'likeCount' && <SortIcon className="w-3 h-3" />}
            </Button>
          </div>

          <Separator orientation="vertical" className="hidden sm:block h-8" />

          {/* 表示モード */}
          {onViewModeChange && (
            <div className="flex items-center gap-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onViewModeChange('grid')}
                className="h-8 px-2"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onViewModeChange('list')}
                className="h-8 px-2"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* 選択されたフィルター表示 */}
      {(selectedCategory || selectedTag) && (
        <div className="flex flex-wrap gap-2">
          {selectedCategory && (
            <Badge
              variant="secondary"
              className="gap-1 hover:bg-destructive hover:text-destructive-foreground cursor-pointer transition-colors"
              onClick={() => onCategoryChange?.(undefined)}
            >
              カテゴリ: {selectedCategory}
              <span className="ml-1 hover:bg-destructive-foreground/20 rounded-full px-1">
                ×
              </span>
            </Badge>
          )}
          {selectedTag && (
            <Badge
              variant="secondary"
              className="gap-1 hover:bg-destructive hover:text-destructive-foreground cursor-pointer transition-colors"
              onClick={() => onTagChange?.(undefined)}
            >
              タグ: {selectedTag}
              <span className="ml-1 hover:bg-destructive-foreground/20 rounded-full px-1">
                ×
              </span>
            </Badge>
          )}
        </div>
      )}

      {/* 記事一覧 */}
      {articles.length === 0 && !isLoading ? (
        // 空状態
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
          {emptyStateIcon}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{emptyStateTitle}</h3>
            <p className="text-muted-foreground max-w-md">
              {emptyStateDescription}
            </p>
          </div>
          {(selectedCategory || selectedTag) && (
            <Button
              variant="outline"
              onClick={() => {
                onCategoryChange?.(undefined);
                onTagChange?.(undefined);
              }}
              className="mt-4"
            >
              フィルターをリセット
            </Button>
          )}
        </div>
      ) : (
        <>
          {/* グリッドまたはリスト表示 */}
          <div
            className={`
            ${viewMode === 'grid' ? `grid gap-6 ${getGridCols()}` : 'space-y-4'}
          `}
          >
            {articles.map((article, index) => (
              <div
                key={article.id}
                className={`animate-fade-in animate-delay-${Math.min(index * 100, 500)}`}
                style={{ animationDelay: `${Math.min(index * 100, 500)}ms` }}
              >
                <ArticleCard
                  {...article}
                  className={viewMode === 'list' ? 'flex-row max-h-64' : ''}
                />
              </div>
            ))}
          </div>

          {/* ローディング状態 */}
          {isLoading && (
            <div className="flex justify-center py-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>読み込み中...</span>
              </div>
            </div>
          )}

          {/* さらに読み込むボタン */}
          {hasMore && !isLoading && (
            <div className="flex justify-center pt-8">
              <Button
                onClick={onLoadMore}
                variant="outline"
                size="lg"
                className="hover-lift glass shadow-smooth hover:shadow-glow transition-all duration-300"
              >
                {loadMoreText}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ArticleList;
