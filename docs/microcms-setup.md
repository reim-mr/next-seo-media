# microCMS セットアップガイド

## 1. API作成

microCMS管理画面で以下のAPIを作成してください：

### articles (記事) - リスト形式

```
エンドポイント: articles
APIの種類: リスト形式
```

#### フィールド設定:

| フィールドID    | 表示名           | 種類                 | 必須 | 説明                |
| --------------- | ---------------- | -------------------- | ---- | ------------------- |
| `title`         | タイトル         | テキストフィールド   | ✓    | 記事のタイトル      |
| `slug`          | スラッグ         | テキストフィールド   | ✓    | URL用のスラッグ     |
| `excerpt`       | 抜粋             | テキストエリア       | ✓    | 記事の概要          |
| `content`       | 本文             | リッチエディタ       | ✓    | 記事の本文          |
| `featuredImage` | アイキャッチ画像 | 画像                 | -    | 記事のアイキャッチ  |
| `category`      | カテゴリ         | コンテンツ参照       | ✓    | categoriesAPIを参照 |
| `tags`          | タグ             | コンテンツ参照(複数) | -    | tagsAPIを参照       |
| `authorName`    | 著者名           | テキストフィールド   | -    | 著者の名前          |
| `authorAvatar`  | 著者アバター     | 画像                 | -    | 著者のアバター画像  |
| `readTime`      | 読了時間         | 数値                 | -    | 分単位              |
| `viewCount`     | 閲覧数           | 数値                 | -    | デフォルト: 0       |
| `likeCount`     | いいね数         | 数値                 | -    | デフォルト: 0       |
| `isPublished`   | 公開状態         | 真偽値               | ✓    | デフォルト: true    |
| `isPremium`     | プレミアム記事   | 真偽値               | -    | デフォルト: false   |
| `isNew`         | 新着記事         | 真偽値               | -    | デフォルト: false   |
| `seo`           | SEO設定          | オブジェクト         | -    | 下記参照            |

#### SEOオブジェクトの設定:

| フィールドID  | 表示名      | 種類                     | 必須 |
| ------------- | ----------- | ------------------------ | ---- |
| `title`       | SEOタイトル | テキストフィールド       | -    |
| `description` | SEO説明文   | テキストエリア           | -    |
| `keywords`    | キーワード  | テキストフィールド(複数) | -    |
| `ogImage`     | OG画像      | 画像                     | -    |

### categories (カテゴリ) - リスト形式

```
エンドポイント: categories
APIの種類: リスト形式
```

#### フィールド設定:

| フィールドID  | 表示名     | 種類               | 必須 | 説明               |
| ------------- | ---------- | ------------------ | ---- | ------------------ |
| `name`        | カテゴリ名 | テキストフィールド | ✓    | カテゴリの表示名   |
| `slug`        | スラッグ   | テキストフィールド | ✓    | URL用のスラッグ    |
| `description` | 説明       | テキストエリア     | -    | カテゴリの説明     |
| `color`       | カラー     | テキストフィールド | -    | 16進数カラーコード |
| `order`       | 並び順     | 数値               | -    | 表示順序           |

### tags (タグ) - リスト形式

```
エンドポイント: tags
APIの種類: リスト形式
```

#### フィールド設定:

| フィールドID  | 表示名   | 種類               | 必須 | 説明               |
| ------------- | -------- | ------------------ | ---- | ------------------ |
| `name`        | タグ名   | テキストフィールド | ✓    | タグの表示名       |
| `slug`        | スラッグ | テキストフィールド | ✓    | URL用のスラッグ    |
| `description` | 説明     | テキストエリア     | -    | タグの説明         |
| `color`       | カラー   | テキストフィールド | -    | 16進数カラーコード |

## 2. API権限設定

### API設定 > 権限

- **GET**: 許可 (公開データの取得用)
- **POST/PUT/DELETE**: 必要に応じて設定

### CORS設定

開発用として以下を追加:

- `http://localhost:3000`
- `http://localhost:6006` (Storybook用)

## 3. 環境変数設定

`.env.local`ファイルを作成:

```env
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 4. サンプルデータ作成

### カテゴリサンプル:

1. **フロントエンド**

   - slug: `frontend`
   - color: `#3B82F6`
   - order: 1

2. **バックエンド**

   - slug: `backend`
   - color: `#10B981`
   - order: 2

3. **デザイン**
   - slug: `design`
   - color: `#F59E0B`
   - order: 3

### タグサンプル:

- React (slug: `react`)
- Next.js (slug: `nextjs`)
- TypeScript (slug: `typescript`)
- JavaScript (slug: `javascript`)
- CSS (slug: `css`)

### 著者サンプル:

- 名前: 山田太郎
- slug: `yamada-taro`
- bio: フロントエンド開発者

### 記事サンプル:

1. **Next.js 15の新機能について**
   - slug: `nextjs-15-features`
   - category: フロントエンド
   - tags: Next.js, React, TypeScript
   - isPublished: true

## 5. 動作確認

以下のエンドポイントでデータが取得できることを確認:

```bash
# カテゴリ一覧
curl "https://your-service-domain.microcms.io/api/v1/categories" -H "X-MICROCMS-API-KEY: your-api-key"

# 記事一覧
curl "https://your-service-domain.microcms.io/api/v1/articles" -H "X-MICROCMS-API-KEY: your-api-key"
```

## 6. 次のステップ

1. サンプルデータの作成
2. 記事詳細ページの実装
3. 記事一覧ページの実装
4. 検索機能の実装

データが準備できたら、実際のページ実装に進みましょう！
