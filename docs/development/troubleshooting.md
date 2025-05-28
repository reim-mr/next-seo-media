# トラブルシューティングガイド

## よくある問題と解決策

### 環境構築関連

#### Node.js バージョンエラー

**問題**: `npm install` 時にengineエラーが発生

```
npm WARN EBADENGINE Unsupported engine
```

**解決策**:

```bash
# nvmを使用してNode.jsをアップデート
nvm install 20
nvm use 20

# またはNode.jsを直接ダウンロード
# https://nodejs.org/ から最新LTSをインストール
```

#### npm キャッシュエラー

**問題**: パッケージインストールが失敗する

**解決策**:

```bash
# npmキャッシュをクリア
npm cache clean --force

# node_modules削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

### ESLint / Prettier関連

#### ESLint設定エラー

**問題**: `eslint.config.mjs` の設定が反映されない

**解決策**:

```bash
# ESLintキャッシュをクリア
npx eslint . --clear-cache
rm -rf .eslintcache

# VSCodeでESLintサーバーを再起動
# Cmd/Ctrl + Shift + P → "ESLint: Restart ESLint Server"
```

#### Prettierフォーマットが効かない

**問題**: 保存時にフォーマットされない

**解決策**:

1. VSCodeのデフォルトフォーマッターを確認

```json
// .vscode/settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

2. Prettierキャッシュクリア

```bash
npx prettier --write . --cache false
```

#### import順序エラー

**問題**: `eslint-plugin-import` のエラーが続発

**解決策**:

```bash
# 正しいimport順序に修正
# 1. Node.js built-in modules
import { readFile } from 'fs/promises'

# 2. External packages
import React from 'react'
import clsx from 'clsx'

# 3. Internal modules (absolute import)
import { Button } from '@/components/ui/button'

# 4. Relative imports
import './styles.css'
```

### TypeScript関連

#### 型エラーが解決されない

**問題**: TypeScriptの型チェックエラーが続く

**解決策**:

```bash
# TypeScriptサーバー再起動 (VSCode)
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

# 型チェック実行
npm run type-check

# tsconfig.jsonの確認
npx tsc --showConfig
```

#### モジュール解決エラー

**問題**: `@/` パスでのimportができない

**解決策**:

```json
// tsconfig.json の確認
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### strict mode エラー

**問題**: TypeScript strict modeでエラーが多発

**解決策**:

```typescript
// 段階的に型を追加
interface Props {
  title?: string; // Optional
  children: React.ReactNode; // Required
}

// Union typesの活用
type Status = 'loading' | 'success' | 'error';

// 型ガードの使用
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
```

### Jest / Testing関連

#### テストが実行されない

**問題**: `npm run test` でテストが見つからない

**解決策**:

```bash
# Jestキャッシュクリア
npx jest --clearCache

# テストファイルのパターン確認
npx jest --listTests

# jest.config.jsの確認
```

#### React Testing Library エラー

**問題**: `render` や `screen` でエラーが発生

**解決策**:

```typescript
// 正しいインポート
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// setup ファイルの確認
// jest.setup.js が正しく読み込まれているか確認
```

#### モックエラー

**問題**: Next.js関連のモックが効かない

**解決策**:

```javascript
// jest.setup.js でのモック設定
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
    query: {},
  }),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));
```

### Storybook関連

#### Storybook起動エラー

**問題**: PostCSS設定エラーでStorybookが起動しない

**解決策**:

```javascript
// postcss.config.mjs を正しい形式に修正
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
```

#### Tailwind CSSが効かない

**問題**: StorybookでTailwindスタイルが適用されない

**解決策**:

```typescript
// .storybook/preview.ts
import '../src/app/globals.css'; // Tailwind CSSを読み込み

const preview = {
  // 設定...
};
```

#### Story作成エラー

**問題**: Storyファイルでエラーが発生

**解決策**:

```typescript
// 正しいStory形式
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Components/Component',
  component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
```

### Next.js関連

#### 開発サーバー起動エラー

**問題**: `npm run dev` でエラーが発生

**解決策**:

```bash
# ポート競合の確認
lsof -ti:3000
kill -9 [PID]

# .nextキャッシュクリア
rm -rf .next

# 再ビルド
npm run dev
```

#### ビルドエラー

**問題**: `npm run build` で失敗

**解決策**:

```bash
# TypeScript型チェック
npm run type-check

# ESLintチェック
npm run lint

# 詳細なビルドログを確認
npm run build 2>&1 | tee build.log
```

#### 画像最適化エラー

**問題**: Next.js Imageコンポーネントでエラー

**解決策**:

```typescript
// 正しいImage使用法
import Image from 'next/image'

<Image
  src="/image.jpg"  // public フォルダからの相対パス
  alt="Description"
  width={500}       // 必須
  height={300}      // 必須
  priority={true}   // Above the fold の場合
/>
```

### Git / Husky関連

#### Git hooks が動作しない

**問題**: コミット時にlint-stagedが実行されない

**解決策**:

```bash
# Huskyの再インストール
rm -rf .husky
npx husky init

# pre-commitファイルの作成
echo "npx lint-staged" > .husky/pre-commit
chmod +x .husky/pre-commit
```

#### lint-stagedエラー

**問題**: ステージされたファイルのlintでエラー

**解決策**:

```bash
# 手動でlint修正
npm run lint:fix

# 強制的にコミット (緊急時のみ)
git commit --no-verify -m "fix: 緊急修正"
```

### Tailwind CSS関連

#### スタイルが反映されない

**問題**: Tailwindクラスが効かない

**解決策**:

```bash
# Tailwind設定確認
npx tailwindcss --help

# クラス名の確認 (typo チェック)
# 正: bg-blue-500
# 誤: bg-blue-500px
```

#### VSCodeでTailwind補完が効かない

**問題**: クラス名の補完が出ない

**解決策**:

```json
// .vscode/settings.json
{
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([
```
