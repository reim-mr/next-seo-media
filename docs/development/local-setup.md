# ローカル開発環境詳細設定

## エディタ設定詳細

### Visual Studio Code

#### 必須拡張機能

```json
{
  "recommendations": [
    "esbenp.prettier-vscode", // Prettier
    "dbaeumer.vscode-eslint", // ESLint
    "bradlc.vscode-tailwindcss", // Tailwind CSS
    "ms-vscode.vscode-typescript-next", // TypeScript
    "streetsidesoftware.code-spell-checker", // スペルチェック
    "usernamehw.errorlens", // インラインエラー表示
    "christian-kohler.path-intellisense", // パス補完
    "ms-vscode.vscode-json" // JSON
  ]
}
```

#### ワークスペース設定詳細

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "editor.rulers": [80],
  "editor.tabSize": 2,
  "editor.insertSpaces": true,

  // TypeScript設定
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",

  // Tailwind CSS設定
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ],
  "tailwindCSS.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },

  // ファイル関連設定
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "files.exclude": {
    "**/.next": true,
    "**/node_modules": true,
    "**/.git": true,
    "**/.DS_Store": true,
    "**/storybook-static": true
  },

  // 検索設定
  "search.exclude": {
    "node_modules": true,
    ".next": true,
    "storybook-static": true,
    "coverage": true
  },

  // Emmet設定
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },

  // Git設定
  "git.confirmSync": false,
  "git.autofetch": true,

  // その他
  "breadcrumbs.enabled": true,
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false
}
```

#### スニペット設定

`.vscode/snippets.json`:

```json
{
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "interface ${1:ComponentName}Props {",
      "  $2",
      "}",
      "",
      "export const ${1:ComponentName}: React.FC<${1:ComponentName}Props> = ({",
      "  $3",
      "}) => {",
      "  return (",
      "    <div className=\"$4\">",
      "      $5",
      "    </div>",
      "  )",
      "}",
      "",
      "export default ${1:ComponentName}"
    ],
    "description": "React Functional Component with TypeScript"
  },
  "Jest Test": {
    "prefix": "test",
    "body": [
      "import { render, screen } from '@testing-library/react'",
      "import { ${1:ComponentName} } from '../${1:ComponentName}'",
      "",
      "describe('${1:ComponentName}', () => {",
      "  it('should render correctly', () => {",
      "    render(<${1:ComponentName} />)",
      "    expect(screen.getByRole('$2')).toBeInTheDocument()",
      "  })",
      "})"
    ],
    "description": "Jest test template"
  },
  "Storybook Story": {
    "prefix": "story",
    "body": [
      "import type { Meta, StoryObj } from '@storybook/react'",
      "import { ${1:ComponentName} } from './${1:ComponentName}'",
      "",
      "const meta: Meta<typeof ${1:ComponentName}> = {",
      "  title: 'Components/${1:ComponentName}',",
      "  component: ${1:ComponentName},",
      "  parameters: {",
      "    layout: 'centered',",
      "  },",
      "  tags: ['autodocs'],",
      "}",
      "",
      "export default meta",
      "type Story = StoryObj<typeof meta>",
      "",
      "export const Default: Story = {",
      "  args: {",
      "    $2",
      "  },",
      "}"
    ],
    "description": "Storybook story template"
  }
}
```

## 開発サーバー設定

### Next.js 開発設定

`next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 実験的機能
  experimental: {
    typedRoutes: true, // 型安全なルーティング
  },

  // 画像最適化
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },

  // 開発時のみの設定
  ...(process.env.NODE_ENV === 'development' && {
    // 開発時の高速リフレッシュ
    reactStrictMode: true,

    // 詳細なエラー表示
    compiler: {
      removeConsole: false,
    },
  }),

  // 本番時の設定
  ...(process.env.NODE_ENV === 'production' && {
    // 本番時のパフォーマンス最適化
    compiler: {
      removeConsole: true,
    },

    // セキュリティヘッダー
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
          ],
        },
      ];
    },
  }),
};

module.exports = nextConfig;
```

### 環境変数管理

#### 開発環境 (`.env.local`)

```bash
# Next.js
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="SEO Media Template"

# microCMS
MICROCMS_API_KEY=your_development_api_key
NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN=your_dev_domain

# AI APIs (開発用)
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_claude_key

# 開発時のみ
NEXT_PUBLIC_ENV=development
```

#### テスト環境 (`.env.test`)

```bash
# テスト用の環境変数
NEXT_PUBLIC_SITE_URL=http://localhost:3000
MICROCMS_API_KEY=test_api_key
NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN=test_domain
```

## パフォーマンス監視設定

### 開発時のパフォーマンス計測

```javascript
// lib/performance.ts
export const measurePerformance = (name: string, fn: () => void) => {
  if (process.env.NODE_ENV === 'development') {
    const start = performance.now()
    fn()
    const end = performance.now()
    console.log(`${name}: ${end - start}ms`)
  } else {
    fn()
  }
}

// React DevTools Profiler
export const withProfiler = (Component: React.ComponentType, id: string) => {
  if (process.env.NODE_ENV === 'development') {
    return React.memo((props) => (
      <React.Profiler id={id} onRender={() => {}}>
        <Component {...props} />
      </React.Profiler>
    ))
  }
  return Component
}
```

### Bundle Analyzer設定

```bash
# パッケージインストール
npm install -D @next/bundle-analyzer

# 使用方法
ANALYZE=true npm run build
```

## デバッグ設定

### React Developer Tools

1. Chrome拡張機能をインストール
2. React DevTools Profilerを有効化
3. Component rerenderの監視

### TypeScript デバッグ

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "name": "Next.js: debug client-side",
      "type": "pwa-chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

## Git フック詳細設定

### Husky設定ファイル

`.husky/pre-commit`:

```bash
#!/usr/bin/env sh
npx lint-staged
```

`.husky/pre-push`:

```bash
#!/usr/bin/env sh
npm run type-check
npm run test:ci
```

### lint-staged詳細設定

`.lintstagedrc.json`:

```json
{
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write", "git add"],
  "*.{json,md,css,scss}": ["prettier --write", "git add"],
  "*.{ts,tsx}": ["tsc-files --noEmit"],
  "src/**/*.{ts,tsx}": ["npm run test -- --findRelatedTests --passWithNoTests"]
}
```

## 効率的な開発ワークフロー

### 1. 機能開発の流れ

```bash
# 1. 新機能ブランチ作成
git checkout -b feature/article-list

# 2. Storybookでコンポーネント開発
npm run storybook

# 3. テスト先行開発
npm run test:watch

# 4. 実装
# 5. 統合テスト
npm run test

# 6. ビルド確認
npm run build

# 7. コミット
git add .
git commit -m "feat: 記事一覧コンポーネント実装"
```

### 2. 問題解決の流れ

1. エラーログ確認
2. TypeScript型エラー確認
3. ESLint警告確認
4. テスト失敗確認
5. ブラウザDevTools確認

### 3. コードレビューの観点

- [ ] TypeScript型定義は適切か
- [ ] テストカバレッジは十分か
- [ ] アクセシビリティは考慮されているか
- [ ] パフォーマンスに問題はないか
- [ ] セキュリティリスクはないか

## パフォーマンス最適化Tips

### 1. バンドルサイズ最適化

```bash
# Bundle analyzerで確認
ANALYZE=true npm run build
```

### 2. 画像最適化

```tsx
import Image from 'next/image';

// 適切な画像最適化
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={800}
  height={400}
  priority // Above the fold
  placeholder="blur"
/>;
```

### 3. 動的インポート

```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

これで開発環境の詳細設定が完了です！
