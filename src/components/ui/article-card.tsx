import { Calendar, Clock, Eye, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

export interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime?: number;
  viewCount?: number;
  likeCount?: number;
  category: {
    name: string;
    slug: string;
    color?: string;
  };
  tags?: Array<{
    name: string;
    slug: string;
  }>;
  featuredImage?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  author?: {
    name: string;
    avatar?: string;
  };
  slug: string;
  isPremium?: boolean;
  isNew?: boolean;
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  //   id,
  title,
  excerpt,
  publishedAt,
  readTime,
  viewCount,
  likeCount,
  category,
  tags = [],
  featuredImage,
  author,
  slug,
  isPremium = false,
  isNew = false,
  className = '',
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCount = (count: number) => {
    if (count < 1000) return count.toString();
    if (count < 10000) return `${(count / 1000).toFixed(1)}k`;
    return `${Math.floor(count / 1000)}k`;
  };

  return (
    <Card
      className={`group overflow-hidden hover-lift glass border-border/50 hover:border-primary/30 transition-all duration-500 animate-fade-in relative ${className}`}
    >
      {/* Premium Badge */}
      {isPremium && (
        <div className="absolute top-3 left-3 z-20">
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium shadow-smooth"
          >
            ✨ Premium
          </Badge>
        </div>
      )}

      {/* New Badge */}
      {isNew && (
        <div className="absolute top-3 right-3 z-20">
          <Badge
            variant="destructive"
            className="bg-gradient-to-r from-red-500 to-pink-500 font-medium shadow-smooth animate-pulse"
          >
            🆕 New
          </Badge>
        </div>
      )}

      {/* Featured Image */}
      <CardHeader className="p-0 relative overflow-hidden">
        <Link href={`/articles/${slug}`} className="block relative group">
          <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted relative overflow-hidden">
            {featuredImage ? (
              <Image
                src={featuredImage.url}
                alt={featuredImage.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                <div className="text-4xl opacity-50">📝</div>
              </div>
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Category Badge Overlay */}
            <div className="absolute bottom-3 left-3">
              <Badge
                variant="secondary"
                className="glass text-xs font-medium shadow-smooth"
                style={{
                  backgroundColor: category.color
                    ? `${category.color}20`
                    : undefined,
                  borderColor: category.color
                    ? `${category.color}50`
                    : undefined,
                }}
              >
                {category.name}
              </Badge>
            </div>
          </div>
        </Link>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-6 space-y-4">
        {/* Title */}
        <Link href={`/articles/${slug}`} className="block group">
          <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {excerpt}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map(tag => (
              <Link
                key={tag.slug}
                href={`/tags/${tag.slug}`}
                className="inline-block"
              >
                <Badge
                  variant="outline"
                  className="text-xs hover:bg-primary/10 hover:border-primary/30 transition-colors duration-300"
                >
                  #{tag.name}
                </Badge>
              </Link>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      {/* Footer */}
      <CardFooter className="px-6 pb-6 pt-0 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          {/* Published Date */}
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(publishedAt)}</span>
          </div>

          {/* Read Time */}
          {readTime && (
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{readTime}分</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {/* View Count */}
          {viewCount !== undefined && (
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{formatCount(viewCount)}</span>
            </div>
          )}

          {/* Like Count */}
          {likeCount !== undefined && (
            <div className="flex items-center space-x-1">
              <Heart className="w-3 h-3" />
              <span>{formatCount(likeCount)}</span>
            </div>
          )}

          {/* Author */}
          {author && (
            <div className="flex items-center space-x-2">
              {author.avatar ? (
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={16}
                  height={16}
                  className="rounded-full"
                />
              ) : (
                <div className="w-4 h-4 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </div>
              )}
              <span className="truncate">{author.name}</span>
            </div>
          )}
        </div>
      </CardFooter>

      {/* Interactive Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </Card>
  );
};

export default ArticleCard;
