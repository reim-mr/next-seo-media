import { NextResponse } from 'next/server';

import { getArticlesForRSS } from '@/lib/microcms';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  try {
    const articles = await getArticlesForRSS(20); // 最新20件

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SEO Media</title>
    <description>フロントエンド開発、バックエンド、デザインに関する最新記事をお届けします</description>
    <link>${baseUrl}</link>
    <language>ja</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <generator>Next.js</generator>
    <webMaster>contact@seomedia.example.com (SEO Media)</webMaster>
    <managingEditor>contact@seomedia.example.com (SEO Media)</managingEditor>
    <copyright>© ${new Date().getFullYear()} SEO Media. All rights reserved.</copyright>
    <category>Technology</category>
    <category>Web Development</category>
    <category>Design</category>
    
    ${articles
      .map(
        article => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <description><![CDATA[${article.excerpt}]]></description>
      <link>${baseUrl}/articles/${article.slug}</link>
      <guid isPermaLink="true">${baseUrl}/articles/${article.slug}</guid>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <category><![CDATA[${article.category.name}]]></category>
      ${article.author ? `<author>contact@seomedia.example.com (${article.author.name})</author>` : ''}
      <source url="${baseUrl}/feed.xml">SEO Media</source>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 's-maxage=86400, stale-while-revalidate', // 24時間キャッシュ
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);

    // エラー時の最小限のRSSフィード
    const errorRssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>SEO Media</title>
    <description>フロントエンド開発、バックエンド、デザインに関する最新記事をお届けします</description>
    <link>${baseUrl}</link>
    <language>ja</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  </channel>
</rss>`;

    return new NextResponse(errorRssXml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}
