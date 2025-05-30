'use client';

import {
  Search,
  X,
  Filter,
  Sparkles,
  Clock,
  TrendingUp,
  Hash,
} from 'lucide-react';
import Form from 'next/form';
import React, { useState } from 'react';
import { useFormStatus } from 'react-dom';

import { Badge } from './badge';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Input } from './input';

export interface SearchFormProps {
  // Next.js Form用のaction (URLパス)
  action?: string;
  placeholder?: string;
  initialQuery?: string;
  showFilters?: boolean;
  showSuggestions?: boolean;
  suggestions?: SearchSuggestion[];
  recentSearches?: string[];
  trendingTags?: string[];
  categories?: string[];
  className?: string;
  // フィルター初期値
  initialFilters?: SearchFilters;
}

export interface SearchFilters {
  category?: string;
  tags?: string[];
  dateRange?: 'today' | 'week' | 'month' | 'year' | 'all';
  sortBy?: 'relevance' | 'date' | 'popularity';
}

export interface SearchSuggestion {
  query: string;
  type: 'query' | 'tag' | 'category' | 'author';
  count?: number;
  icon?: React.ReactNode;
}

// フォーム送信ボタン（useFormStatus使用）
const SubmitButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="sm"
      disabled={pending}
      className="h-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
    >
      {pending ? (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        children
      )}
    </Button>
  );
};

export const SearchForm: React.FC<SearchFormProps> = ({
  action = '/search', // デフォルトで/searchページに遷移
  placeholder = '記事を検索...',
  initialQuery = '',
  showFilters = true,
  showSuggestions = true,
  suggestions = [],
  recentSearches = [],
  trendingTags = [],
  categories = [],
  className = '',
  initialFilters = {
    dateRange: 'all',
    sortBy: 'relevance',
  },
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // クイック検索（候補クリック等）
  const handleQuickSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  // フィルタークリア
  const clearFilters = () => {
    const clearedFilters: SearchFilters = {
      dateRange: 'all',
      sortBy: 'relevance',
    };
    setFilters(clearedFilters);
  };

  // クエリクリア
  const clearQuery = () => {
    setQuery('');
    setIsFocused(false);
  };

  // カテゴリ選択
  const handleCategorySelect = (category: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === category ? undefined : category,
    }));
  };

  // タグ選択
  const handleTagToggle = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags?.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...(prev.tags || []), tag],
    }));
  };

  const hasActiveFilters =
    filters.category ||
    filters.tags?.length ||
    filters.dateRange !== 'all' ||
    filters.sortBy !== 'relevance';

  return (
    <div className={`space-y-4 ${className}`}>
      {/* メイン検索フォーム */}
      <div className="relative">
        <Form action={action} className="relative">
          <div
            className={`
            relative flex items-center transition-all duration-300 
            ${isFocused ? 'ring-2 ring-primary/50' : ''}
          `}
          >
            <Search
              className={`
              absolute left-3 w-4 h-4 transition-colors duration-300
              ${isFocused ? 'text-primary' : 'text-muted-foreground'}
            `}
            />

            <Input
              name="query"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder={placeholder}
              className="pl-10 pr-24 h-12 text-base glass border-border/50 focus:border-primary/50 transition-all duration-300"
            />

            {/* フィルター用のhidden inputs */}
            {filters.category && (
              <input type="hidden" name="category" value={filters.category} />
            )}
            {filters.tags?.map((tag, index) => (
              <input key={index} type="hidden" name="tags" value={tag} />
            ))}
            {filters.dateRange !== 'all' && (
              <input type="hidden" name="dateRange" value={filters.dateRange} />
            )}
            {filters.sortBy !== 'relevance' && (
              <input type="hidden" name="sortBy" value={filters.sortBy} />
            )}

            <div className="absolute right-2 flex items-center gap-1">
              {query && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearQuery}
                  className="h-8 w-8 p-0 hover:bg-muted"
                >
                  <X className="w-3 h-3" />
                </Button>
              )}

              <SubmitButton>
                <Search className="w-3 h-3" />
              </SubmitButton>
            </div>
          </div>
        </Form>

        {/* 検索候補・履歴 */}
        {showSuggestions && isFocused && (
          <Card className="absolute top-full mt-2 w-full z-50 glass border border-border/50 shadow-smooth">
            <CardContent className="p-4 space-y-4">
              {/* 最近の検索 */}
              {recentSearches.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    最近の検索
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.slice(0, 5).map((search, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleQuickSearch(search)}
                        className="h-7 text-xs hover:bg-primary/10"
                      >
                        {search}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* トレンドタグ */}
              {trendingTags.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <TrendingUp className="w-3 h-3" />
                    トレンドタグ
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingTags.slice(0, 6).map((tag, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickSearch(`#${tag}`)}
                        className="h-7 text-xs border-primary/20 hover:bg-primary/10"
                      >
                        <Hash className="w-3 h-3 mr-1" />
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* 検索候補 */}
              {suggestions.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <Sparkles className="w-3 h-3" />
                    候補
                  </div>
                  <div className="space-y-1">
                    {suggestions.slice(0, 5).map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        onClick={() => handleQuickSearch(suggestion.query)}
                        className="w-full justify-start h-8 text-sm hover:bg-primary/5"
                      >
                        {suggestion.icon || <Search className="w-3 h-3 mr-2" />}
                        <span className="flex-1 text-left">
                          {suggestion.query}
                        </span>
                        {suggestion.count && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {suggestion.count}
                          </Badge>
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* フィルター */}
      {showFilters && (
        <div className="space-y-3">
          {/* フィルター切り替えボタン */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="h-8 gap-2"
            >
              <Filter className="w-3 h-3" />
              詳細フィルター
              <div
                className={`transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`}
              >
                ▼
              </div>
            </Button>

            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="h-8 gap-1 text-xs"
              >
                <X className="w-3 h-3" />
                クリア
              </Button>
            )}
          </div>

          {/* 詳細フィルター */}
          {showAdvanced && (
            <Card className="glass border-border/50">
              <CardContent className="p-4 space-y-4">
                {/* カテゴリ */}
                {categories.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">カテゴリ</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(category => (
                        <Button
                          key={category}
                          variant={
                            filters.category === category
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          onClick={() => handleCategorySelect(category)}
                          className="h-8"
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 期間 */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">期間</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: 'today', label: '今日' },
                        { value: 'week', label: '1週間' },
                        { value: 'month', label: '1ヶ月' },
                        { value: 'year', label: '1年' },
                        { value: 'all', label: 'すべて' },
                      ].map(option => (
                        <Button
                          key={option.value}
                          variant={
                            filters.dateRange === option.value
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          onClick={() =>
                            setFilters(prev => ({
                              ...prev,
                              dateRange:
                                option.value as SearchFilters['dateRange'],
                            }))
                          }
                          className="h-8"
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* 並び順 */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">並び順</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: 'relevance', label: '関連度' },
                        { value: 'date', label: '新着順' },
                        { value: 'popularity', label: '人気順' },
                      ].map(option => (
                        <Button
                          key={option.value}
                          variant={
                            filters.sortBy === option.value
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          onClick={() =>
                            setFilters(prev => ({
                              ...prev,
                              sortBy: option.value as SearchFilters['sortBy'],
                            }))
                          }
                          className="h-8"
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* アクティブフィルター表示 */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <Badge variant="secondary" className="gap-1">
                  カテゴリ: {filters.category}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setFilters(prev => ({ ...prev, category: undefined }))
                    }
                    className="h-4 w-4 p-0 hover:bg-destructive/20"
                  >
                    <X className="w-2 h-2" />
                  </Button>
                </Badge>
              )}

              {filters.tags?.map(tag => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  #{tag}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTagToggle(tag)}
                    className="h-4 w-4 p-0 hover:bg-destructive/20"
                  >
                    <X className="w-2 h-2" />
                  </Button>
                </Badge>
              ))}

              {filters.dateRange !== 'all' && (
                <Badge variant="secondary">
                  期間:{' '}
                  {filters.dateRange === 'today'
                    ? '今日'
                    : filters.dateRange === 'week'
                      ? '1週間'
                      : filters.dateRange === 'month'
                        ? '1ヶ月'
                        : filters.dateRange === 'year'
                          ? '1年'
                          : 'すべて'}
                </Badge>
              )}

              {filters.sortBy !== 'relevance' && (
                <Badge variant="secondary">
                  並び順:{' '}
                  {filters.sortBy === 'date'
                    ? '新着順'
                    : filters.sortBy === 'popularity'
                      ? '人気順'
                      : '関連度'}
                </Badge>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
