import { Inter, Noto_Sans_JP, JetBrains_Mono } from 'next/font/google';

// Primary font - Inter (モダンで読みやすい)
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Japanese font - Noto Sans JP (日本語サポート)
export const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
  weight: ['300', '400', '500', '700'],
});

// Monospace font - JetBrains Mono (コード表示用)
export const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

// フォントクラス名の組み合わせ
export const fontVariables = `${inter.variable} ${notoSansJP.variable} ${jetBrainsMono.variable}`;
