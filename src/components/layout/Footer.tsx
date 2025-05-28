import Link from 'next/link';

import { Separator } from '@/components/ui/separator';

interface FooterProps {
  siteName?: string;
  year?: number;
}

export const Footer: React.FC<FooterProps> = ({
  siteName = 'SEO Media',
  year = new Date().getFullYear(),
}) => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Site Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded text-sm font-bold">
                S
              </div>
              <span className="font-bold">{siteName}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AIを活用したSEOメディアテンプレート。高品質なコンテンツを効率的に作成・管理できます。
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">ナビゲーション</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/articles"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  記事一覧
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  カテゴリ
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  検索
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* AI Features */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">AI機能</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/ai/generate"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  記事生成
                </Link>
              </li>
              <li>
                <Link
                  href="/ai/optimize"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  SEO最適化
                </Link>
              </li>
              <li>
                <Link
                  href="/ai/settings"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  AI設定
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">サイト情報</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  利用規約
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  サイトマップ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {year} {siteName}. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Built with Next.js + AI</span>
            <Separator orientation="vertical" className="h-4" />
            <Link
              href="https://github.com"
              className="hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
