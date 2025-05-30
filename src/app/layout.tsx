import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_JP, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'SEO Media - フロントエンド開発・デザイン・技術情報メディア',
    template: '%s | SEO Media',
  },
  description:
    'フロントエンド開発、バックエンド技術、UI/UXデザインに関する最新情報をお届けする技術メディアです。実践的なチュートリアル、最新トレンド、ベストプラクティスを発信しています。',
  keywords: [
    'フロントエンド',
    'バックエンド',
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'CSS',
    'UI/UX',
    'デザイン',
    'Web開発',
    '技術ブログ',
    'プログラミング',
    'チュートリアル',
  ],
  authors: [
    {
      name: 'SEO Media編集部',
      url: baseUrl,
    },
  ],
  creator: 'SEO Media',
  publisher: 'SEO Media',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: baseUrl,
    title: 'SEO Media - フロントエンド開発・デザイン・技術情報メディア',
    description:
      'フロントエンド開発、バックエンド技術、UI/UXデザインに関する最新情報をお届けする技術メディアです。',
    siteName: 'SEO Media',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'SEO Media - 技術情報メディア',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Media - フロントエンド開発・デザイン・技術情報メディア',
    description:
      'フロントエンド開発、バックエンド技術、UI/UXデザインに関する最新情報をお届けする技術メディアです。',
    images: [`${baseUrl}/og-image.jpg`],
    creator: '@seomedia',
    site: '@seomedia',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#000000' },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: baseUrl,
    languages: {
      'ja-JP': baseUrl,
    },
    types: {
      'application/rss+xml': `${baseUrl}/feed.xml`,
    },
  },
  category: 'technology',
  classification: 'Technology Blog',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code',
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SEO Media',
  },
  applicationName: 'SEO Media',
  generator: 'Next.js',
  bookmarks: [`${baseUrl}/articles`],
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'format-detection': 'telephone=no',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${notoSansJP.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />

        {/* Additional SEO Tags */}
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="language" content="Japanese" />
        <meta name="coverage" content="worldwide" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta
          name="subject"
          content="Web Development, Frontend, Backend, Design"
        />
        <meta name="copyright" content="SEO Media" />
        <meta name="designer" content="SEO Media" />
        <meta name="owner" content="SEO Media" />
        <meta name="url" content={baseUrl} />
        <meta name="identifier-URL" content={baseUrl} />
        <meta name="directory" content="submission" />
        <meta name="pagename" content="SEO Media" />
        <meta
          name="category"
          content="Technology, Web Development, Programming"
        />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="subtitle" content="技術情報メディア" />

        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'SEO Media',
              description:
                'フロントエンド開発、バックエンド技術、UI/UXデザインに関する最新情報をお届けする技術メディア',
              url: baseUrl,
              logo: `${baseUrl}/logo.png`,
              sameAs: [
                'https://twitter.com/seomedia',
                'https://github.com/seomedia',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                availableLanguage: 'Japanese',
              },
            }),
          }}
        />

        {/* Structured Data for Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'SEO Media',
              description:
                'フロントエンド開発、バックエンド技術、UI/UXデザインに関する最新情報をお届けする技術メディア',
              url: baseUrl,
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${baseUrl}/search?query={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
              publisher: {
                '@type': 'Organization',
                name: 'SEO Media',
                logo: {
                  '@type': 'ImageObject',
                  url: `${baseUrl}/logo.png`,
                },
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
