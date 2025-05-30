/**
 * microCMS API接続テストスクリプト
 * 設定が正しくできているかテストします
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const testMicroCMS = async () => {
  const domain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;

  if (!domain || !apiKey) {
    console.error('❌ 環境変数が設定されていません');
    console.log(
      'MICROCMS_SERVICE_DOMAIN:',
      domain ? '✅ 設定済み' : '❌ 未設定'
    );
    console.log('MICROCMS_API_KEY:', apiKey ? '✅ 設定済み' : '❌ 未設定');
    return;
  }

  console.log('🚀 microCMS API接続テスト開始...\n');

  const baseUrl = `https://${domain}.microcms.io/api/v1`;
  const headers = {
    'X-MICROCMS-API-KEY': apiKey,
    'Content-Type': 'application/json',
  };

  try {
    // カテゴリ取得テスト
    console.log('📁 カテゴリ一覧取得テスト...');
    const categoriesRes = await fetch(`${baseUrl}/categories`, { headers });
    const categories = await categoriesRes.json();

    if (categoriesRes.ok) {
      console.log(
        '✅ カテゴリ取得成功:',
        categories.contents?.length || 0,
        '件'
      );
      categories.contents?.forEach(cat =>
        console.log(`  - ${cat.name} (${cat.slug})`)
      );
    } else {
      console.log('❌ カテゴリ取得失敗:', categories);
    }

    console.log('');

    // タグ取得テスト
    console.log('🏷️ タグ一覧取得テスト...');
    const tagsRes = await fetch(`${baseUrl}/tags`, { headers });
    const tags = await tagsRes.json();

    if (tagsRes.ok) {
      console.log('✅ タグ取得成功:', tags.contents?.length || 0, '件');
      tags.contents?.forEach(tag =>
        console.log(`  - ${tag.name} (${tag.slug})`)
      );
    } else {
      console.log('❌ タグ取得失敗:', tags);
    }

    console.log('');

    // 記事取得テスト
    console.log('📝 記事一覧取得テスト...');
    const articlesRes = await fetch(`${baseUrl}/articles?limit=5`, { headers });
    const articles = await articlesRes.json();

    if (articlesRes.ok) {
      console.log('✅ 記事取得成功:', articles.contents?.length || 0, '件');
      articles.contents?.forEach(article =>
        console.log(`  - ${article.title} (${article.slug})`)
      );
    } else {
      console.log('❌ 記事取得失敗:', articles);
    }

    console.log('\n🎉 microCMS接続テスト完了!');
  } catch (error) {
    console.error('❌ API接続エラー:', error.message);
  }
};

testMicroCMS();
