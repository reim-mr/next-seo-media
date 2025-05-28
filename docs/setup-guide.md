# 環境構築手順書

## 前提条件

### 必要なソフトウェア

- **Node.js**: v20.0.0 以上 (推奨: v20 LTS)
- **npm**: v10.0.0 以上
- **Git**: v2.30.0 以上

### 推奨開発環境

- **エディタ**: Visual Studio Code
- **ブラウザ**: Chrome (開発者ツール、Lighthouse使用)

## セットアップ手順

### 1. リポジトリのクローン

```bash
# リポジトリをクローン
git clone https://github.com/reim-mr/next-seo-media.git
cd next-seo-media

# 開発ブランチに切り替え
git checkout develop
```

### 2. 依存関係のインストール

```bash
# Node.jsバージョン確認
node -v  # v20以上であることを確認

# 依存関係インストール
npm install
```

**インストールされる主要パッケージ：**

- `next@15` - Next.js フレームワーク
- `react@19` - React
- `typescript` - TypeScript
- `tailwindcss@4` - Tailwind CSS
- `eslint`, `prettier` - コード品質ツール
- `jest`, `@testing-library/react` - テストツール
- `storybook` - コンポーネント開発ツール
- `husky`, `lint-staged` - Git hooks

### 3. 環境変数の設定

```bash
# 環境変数ファイルを作成
cp .env.example .env.local
```

`.env.local` に必要な値を設定：

```bash
# microCMS設定
MICROCMS_API_KEY=your_api_key_here
NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN=your_domain_here

# サイト情報
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. 開発環境の確認

```bash
# コード品質チェック
npm run lint        # ESLint実行
npm run format      # Prettier実行
npm run type-check  # TypeScript型チェック

# テスト実行
npm run test        # Jest実行

# 開発サーバー起動
npm run dev         # http://localhost:3000

# Storybook起動 (別ターミナル)
npm run storybook   # http://localhost:6006
```

## VSCode設定

### 1. 推奨拡張機能

プロジェクトルートの `.vscode/extensions.json`：

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "chromium.vscode-playwright"
  ]
}
```

### 2. ワークスペース設定

`.vscode/settings.json` は既に設定済み：

- 保存時自動フォーマット
- ESLint自動修正
- Tailwind CSS インテリセンス

## 開発フロー

### 1. 新機能開発の流れ

```bash
# developから新しいfeatureブランチを作成
git checkout develop
git pull origin develop
git checkout -b feature/[機能名]

# 開発作業...

# コミット (Huskyが自動でlint-stagedを実行)
git add .
git commit -m "feat: [機能の説明]"

# プッシュ
git push origin feature/[機能名]

# Pull Request作成 (GitHub Web UI)
```

### 2. コミット前の自動チェック

Huskyにより以下が自動実行：

- ESLint (エラーがあれば自動修正)
- Prettier (コードフォーマット)
- TypeScript型チェック

### 3. テスト駆動開発 (TDD)

```bash
# テストを先に書く
npm run test:watch

# 実装
# テストが通ることを確認
npm run test:coverage
```

## よく使うコマンド

### 開発中

```bash
npm run dev          # 開発サーバー起動
npm run storybook    # Storybook起動
npm run test:watch   # テスト監視モード
```

### コード品質

```bash
npm run lint         # ESLint実行
npm run lint:fix     # ESLint自動修正
npm run format       # Prettier実行
npm run format:check # Prettierチェックのみ
npm run type-check   # TypeScript型チェック
```

### テスト

```bash
npm run test         # 全テスト実行
npm run test:watch   # テスト監視モード
npm run test:coverage # カバレッジ付きテスト
npm run test:ci      # CI用テスト実行
```

### ビルド・デプロイ

```bash
npm run build        # プロダクションビルド
npm run start        # プロダクションサーバー起動
npm run build-storybook # Storybookビルド
```

## トラブルシューティング

### Node.jsバージョンエラー

```bash
# nvmを使用してNode.jsバージョンを切り替え
nvm install 20
nvm use 20
```

### ESLint/Prettierエラー

```bash
# キャッシュクリア
npm run lint -- --clear-cache
rm -rf .eslintcache

# node_modules再インストール
rm -rf node_modules package-lock.json
npm install
```

### Storybook起動エラー

```bash
# Storybookキャッシュクリア
npx storybook@latest upgrade
rm -rf storybook-static
```

### テストエラー

```bash
# Jestキャッシュクリア
npx jest --clearCache
```

### TypeScriptエラー

```bash
# TypeScriptサーバー再起動 (VSCode)
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

## 初回セットアップ完了チェックリスト

- [ ] Node.js v20以上がインストールされている
- [ ] `npm install` が正常完了
- [ ] `.env.local` に環境変数を設定
- [ ] `npm run lint` がエラーなく完了
- [ ] `npm run type-check` がエラーなく完了
- [ ] `npm run test` がすべて成功
- [ ] `npm run dev` でローカルサーバーが起動
- [ ] `npm run storybook` でStorybookが起動
- [ ] VSCode拡張機能がインストール済み
- [ ] Git hooks (Husky) が動作している

## 参考リンク

- [Next.js ドキュメント](https://nextjs.org/docs)
- [Tailwind CSS ドキュメント](https://tailwindcss.com/docs)
- [shadcn/ui ドキュメント](https://ui.shadcn.com/)
- [Jest ドキュメント](https://jestjs.io/docs/getting-started)
- [Storybook ドキュメント](https://storybook.js.org/docs)
- [プロジェクト要件定義書](./requirements.md)
- [開発ガイドライン](./development-guidelines.md)
