import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface HeaderProps {
  siteName?: string;
}

export const Header: React.FC<HeaderProps> = ({ siteName = 'SEO Media' }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo / Site Name */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-md font-bold">
            S
          </div>
          <span className="hidden font-bold sm:inline-block">{siteName}</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/articles"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            記事
          </Link>
          <Link
            href="/categories"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            カテゴリ
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            About
          </Link>
        </nav>

        {/* Spacer */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Search Button */}
          <Button variant="outline" size="sm">
            検索
          </Button>

          {/* Theme Toggle Placeholder */}
          <Button variant="ghost" size="sm">
            🌙
          </Button>

          {/* AI Generate Button */}
          <Button size="sm">AI生成</Button>
        </div>
      </div>
      <Separator />
    </header>
  );
};

export default Header;
