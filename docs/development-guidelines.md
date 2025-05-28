# 開発ガイドライン

## 1. ブランチ戦略

### 1.1 Git Flow
```
main (本番環境)
├── develop (開発統合ブランチ)
    ├── feature/article-list (機能開発)
    ├── feature/ai-integration (機能開発)
    ├── feature/seo-optimization (機能開発)
    └── hotfix/critical-bug (緊急修正)
```

### 1.2 ブランチ命名規則
```bash
# 機能開発
feature/[機能名]
例: feature/article-list, feature/ai-integration

# バグ修正
fix/[修正内容]
例: fix/responsive-layout, fix/api-error-handling

# 緊急修正
hotfix/[修正内容]
例: hotfix/security-patch

# ドキュメント
docs/[ドキュメント種類]
例: docs/api-specification, docs/deployment-guide

# リファクタリング
refactor/[対象]
例: refactor/component-structure

# パフォーマンス改善
perf/[改善対象]
例: perf/image-optimization
```

### 1.3 ブランチ運用フロー
1. `develop` から `feature/*` ブランチを作成
2. 機能開発・テスト実装
3. Pull Request 作成
4. コードレビュー（セルフレビュー）
5. `develop` にマージ
6. 統合テスト後、`main` にマージ

## 2. コミット規約

### 2.1 Conventional Commits
```bash
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 2.2 コミットタイプ
- **feat**: 新機能追加
- **fix**: バグ修正
- **docs**: ドキュメント更新
- **style**: コードスタイル変更（機能に影響なし）
- **refactor**: リファクタリング
- **perf**: パフォーマンス改善
- **test**: テスト追加・修正
- **chore**: ビルドプロセス・補助ツール変更

### 2.3 コミット例
```bash
# 良い例
feat(article): 記事一覧ページの実装
fix(seo): メタタグの重複を修正
docs(api): API仕様書を追加
test(component): 記事カードのテストを追加
refactor(utils): 日付フォーマット関数を共通化

# 悪い例
add article page
fix bug
update
作業中
```

### 2.4 コミット粒度
**推奨する粒度:**
- 1つの機能や修正につき1コミット
- テストとコードは一緒にコミット
- ドキュメント更新は機能と一緒or別コミット

**避けるべき粒度:**
- 複数の異なる機能を1コミット
- 作業途中の中途半端なコミット
- あまりに細かすぎる変更

## 3. Pull Request ガイドライン

### 3.1 PR テンプレート
```markdown
## 概要
この PR の変更内容を簡潔に説明

## 変更内容
- [ ] 機能A の実装
- [ ] テストの追加
- [ ] ドキュメントの更新

## 動作確認
- [ ] ローカル環境での動作確認
- [ ] テストの実行
- [ ] Storybook での確認

## スクリーンショット
（UI変更がある場合）

## 注意事項
レビュー時の注意点があれば記載
```

### 3.2 セルフレビューチェックリスト
**コード品質:**
- [ ] ESLint エラーがない
- [ ] TypeScript エラーがない
- [ ] テストが通る
- [ ] コードカバレッジが維持されている

**機能面:**
- [ ] 要件を満たしている
- [ ] エラーハンドリングが適切
- [ ] レスポンシブ対応済み
- [ ] アクセシビリティ対応済み

**パフォーマンス:**
- [ ] 不要な再レンダリングがない
- [ ] 画像が最適化されている
- [ ] バンドルサイズが適切

## 4. コードスタイル

### 4.1 ESLint 設定
```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### 4.2 Prettier 設定
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 80
}
```

### 4.3 命名規則
**ファイル・ディレクトリ:**
- コンポーネント: PascalCase (`ArticleCard.tsx`)
- ページ: kebab-case (`article-list/page.tsx`)
- ユーティリティ: camelCase (`formatDate.ts`)
- 定数: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)
- コンテキスト: PascalCase + Context (`AIContext.tsx`)

**変数・関数:**
- 変数: camelCase (`articleList`)
- 関数: camelCase (`formatDate`)
- 定数: UPPER_SNAKE_CASE (`MAX_ARTICLES`)
- 型: PascalCase (`ArticleType`)
- Context値: camelCase (`aiState`, `searchQuery`)

### 4.4 インポート順序
```tsx
// 1. React関連
import React from 'react';
import { useState, useEffect, useContext } from 'react';

// 2. 外部ライブラリ
import { NextPage } from 'next';
import clsx from 'clsx';

// 3. 内部モジュール（absolute import）
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { AIContext } from '@/context/AIContext';

// 4. 相対インポート
import { ArticleCardProps } from './types';
```

### 4.5 Tailwind CSS + shadcn/ui スタイル規則
```tsx
// 良い例：Tailwindクラスの組み合わせ
<div className="flex items-center justify-between p-4 bg-card rounded-lg border">
  <Button variant="outline" size="sm">
    編集
  </Button>
</div>

// 悪い例：カスタムCSSファイルの作成
// ArticleCard.module.css は作らない
```

**スタイリング基本原則:**
- **Tailwind CSS v4のみ使用**、カスタムCSSは避ける
- **shadcn/ui変数活用**: `bg-card`, `text-foreground`, `border`等
- **レスポンシブ**: `sm:`, `md:`, `lg:`プレフィックス使用
- **ダークモード**: `dark:`プレフィックスで対応

## 5. テストガイドライン

### 5.1 テスト戦略
**単体テスト (Jest + React Testing Library):**
- コンポーネントのレンダリング
- ユーザーインタラクション
- ユーティリティ関数

**統合テスト:**
- API との連携
- ページ全体の動作

**E2E テスト:**
- 主要なユーザーフロー（必要に応じて）

### 5.2 テストファイル命名
```
src/
├── components/
│   ├── ArticleCard.tsx
│   └── __tests__/
│       └── ArticleCard.test.tsx
├── lib/
│   ├── utils.ts
│   └── __tests__/
│       └── utils.test.ts
```

### 5.3 テストの書き方
```tsx
// コンポーネントテスト例
import { render, screen } from '@testing-library/react';
import { ArticleCard } from '../ArticleCard';

describe('ArticleCard', () => {
  const mockArticle = {
    id: '1',
    title: 'テスト記事',
    publishedAt: '2024-01-01',
  };

  it('記事タイトルが表示される', () => {
    render(<ArticleCard article={mockArticle} />);
    expect(screen.getByText('テスト記事')).toBeInTheDocument();
  });
});
```

### 5.4 カバレッジ目標
- **全体**: 80%以上
- **ユーティリティ関数**: 90%以上
- **重要なコンポーネント**: 85%以上

## 6. Storybook ガイドライン

### 6.1 Story 作成基準
- 再利用可能なコンポーネントは必須
- 各 Props パターンのストーリー作成
- インタラクティブな要素の動作確認

### 6.2 Story 命名規則
```tsx
// ArticleCard.stories.tsx
export default {
  title: 'Components/Article/ArticleCard',
  component: ArticleCard,
} as Meta<typeof ArticleCard>;

export const Default: Story = {
  args: {
    article: mockArticle,
  },
};

export const WithLongTitle: Story = {
  args: {
    article: { ...mockArticle, title: '非常に長いタイトルの記事...' },
  },
};
```

## 7. パフォーマンスガイドライン

### 7.1 パフォーマンス基準
- **Lighthouse Score**: 90点以上（全項目）
- **LCP**: 2.5秒以内
- **FID**: 100ms以内
- **CLS**: 0.1以内

### 7.2 最適化チェックリスト
- [ ] 画像の適切なフォーマット・サイズ
- [ ] 不要な JavaScript の削除
- [ ] CSS の最適化
- [ ] フォントの最適化
- [ ] キャッシュ戦略の実装

## 8. セキュリティガイドライン

### 8.1 環境変数管理
```bash
# .env.local (ローカル開発用)
MICROCMS_API_KEY=your_api_key
NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN=your_domain

# .env.example (テンプレート)
MICROCMS_API_KEY=your_microcms_api_key
NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN=your_service_domain
```

### 8.2 セキュリティチェックリスト
- [ ] 環境変数の適切な管理
- [ ] XSS 対策の実装
- [ ] CSP の設定
- [ ] API エンドポイントの保護
- [ ] 依存関係の脆弱性チェック

## 9. ドキュメントガイドライン

### 9.1 必須ドキュメント
- [ ] README.md の充実
- [ ] API仕様書
- [ ] コンポーネント仕様書
- [ ] デプロイ手順書

### 9.2 コメント規則
```tsx
/**
 * 記事カードコンポーネント
 * 記事の基本情報を表示し、詳細ページへのリンクを提供
 */
interface ArticleCardProps {
  /** 表示する記事データ */
  article: Article;
  /** カードのサイズ */
  size?: 'small' | 'medium' | 'large';
}
```

## 10. CI/CD ガイドライン

### 10.1 自動チェック項目
- [ ] ESLint チェック
- [ ] TypeScript 型チェック
- [ ] 単体テスト実行
- [ ] ビルド成功確認
- [ ] Lighthouse スコア確認

### 10.2 デプロイフロー
1. `feature/*` → `develop` のマージで Preview デプロイ
2. `develop` → `main` のマージで Production デプロイ
3. 各段階での自動テスト実行

## 11. 開発環境セットアップ

### 11.1 必要なツール
```bash
# Node.js バージョン管理
nvm use 18

# パッケージマネージャー
npm install

# 開発ツール
npm run dev        # 開発サーバー起動
npm run build      # ビルド
npm run test       # テスト実行
npm run storybook  # Storybook 起動
npm run lint       # ESLint 実行
```

### 11.2 VS Code 設定
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

この開発ガイドラインに従うことで、一貫性のある高品質なコードベースを維持し、受託案件でも通用するプロフェッショナルな開発プロセスを実践できます。