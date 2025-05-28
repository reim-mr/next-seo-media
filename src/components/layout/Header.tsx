import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface HeaderProps {
  siteName?: string;
}

export const Header: React.FC<HeaderProps> = ({ siteName = 'SEO Media' }) => {
  return (
    <header className="sticky top-0 z-50 w-full glass border-b backdrop-blur-xl">
      <div className="container flex h-16 items-center">
        {/* Logo / Site Name */}
        <Link
          href="/"
          className="mr-6 flex items-center space-x-2 interactive group"
        >
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary to-brand-600 text-primary-foreground rounded-lg font-bold shadow-smooth group-hover:shadow-glow transition-all duration-300">
            <span className="gradient-text font-bold">S</span>
          </div>
          <span className="hidden font-bold sm:inline-block bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            {siteName}
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/articles"
            className="relative transition-all duration-300 hover:text-primary group"
          >
            <span className="relative z-10">記事</span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-primary/10 to-brand-500/10 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300 -z-10" />
          </Link>
          <Link
            href="/categories"
            className="relative transition-all duration-300 hover:text-primary group"
          >
            <span className="relative z-10">カテゴリ</span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-primary/10 to-brand-500/10 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300 -z-10" />
          </Link>
          <Link
            href="/about"
            className="relative transition-all duration-300 hover:text-primary group"
          >
            <span className="relative z-10">About</span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-primary/10 to-brand-500/10 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300 -z-10" />
          </Link>
        </nav>

        {/* Spacer */}
        <div className="flex flex-1 items-center justify-end space-x-3">
          {/* Search Button */}
          <Button
            variant="outline"
            size="sm"
            className="hover-lift glass border-border/50 hover:border-primary/50 transition-all duration-300"
          >
            <span className="mr-2">🔍</span>
            検索
          </Button>

          {/* Theme Toggle Placeholder */}
          <Button
            variant="ghost"
            size="sm"
            className="hover-glow transition-all duration-300 relative overflow-hidden group"
          >
            <span className="text-lg transition-transform duration-300 group-hover:scale-110">
              🌙
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-gradient-from/20 to-gradient-to/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>

          {/* AI Generate Button */}
          <Button
            size="sm"
            className="bg-gradient-to-r from-primary to-brand-600 hover:from-primary/90 hover:to-brand-600/90 hover-lift shadow-smooth hover:shadow-glow transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gradient-from/20 to-gradient-to/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-sm">✨</span>
              AI生成
            </span>
          </Button>
        </div>
      </div>
      <Separator className="opacity-50" />
    </header>
  );
};

export default Header;
