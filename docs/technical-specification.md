# 技術仕様書

## 1. 技術スタック選定

### 1.1 フロントエンド

#### Next.js 15 (App Router)
**選定理由:**
- SEOに必要なSSG/ISR機能が標準装備
- App Routerによる直感的なルーティング
- 画像最適化、フォント最適化などのパフォーマンス機能
- Vercelとの親和性が高く、デプロイが容易

**代替案検討:**
- Nuxt.js: Vue生態系だが、React経験を活かしたい
- Gatsby: GraphQLが必須で学習コストが高い
- Vite + React: SSG機能の実装が複雑

#### React 19
**選定理由:**
- 最新の機能（Server Components、Concurrent Features）
- TypeScriptとの親和性
- 豊富なエコシステム

#### TypeScript
**選定理由:**
- 型安全性による開発効率向上
- リファクタリング時の安全性
- 大規模開発での保守性
- 受託案件での標準的な選択

### 1.2 スタイリング

#### Tailwind CSS v4
**選定理由:**
- CSS-in-JS的なアプローチによる高速開発
- ユーティリティファーストによる保守性向上
- レスポンシブデザインの効率的な実装
- カスタムCSSファイルが不要（globals.cssのみ）
- 成果物のCSS量削減

#### shadcn/ui
**選定理由:**
- アクセシブルなコンポーネント
- Tailwind CSS v4との完全な親和性
- コピー&ペーストで導入、完全にカスタマイズ可能
- TypeScript完全対応
- 受託案件での再利用性とメンテナンス性

### 1.3 ヘッドレスCMS

#### microCMS
**選定理由:**
- 日本語ドキュメントの充実
- 使いやすい管理画面
- GraphQL/REST API両対応
- 無料プランでの開発が可能

**代替案検討:**
- Contentful: 英語ドキュメント、コスト面
- Strapi: セルフホストが必要
- Sanity: 学習コストが高い

### 1.4 テスト・品質管理

#### Jest + React Testing Library
**選定理由:**
- React コンポーネントテストの標準
- 直感的なテストAPI
- 豊富なマッチャーとモック機能
- CI/CDとの統合が容易

#### Storybook
**選定理由:**
- コンポーネント駆動開発の促進
- 視覚的なテスト・確認
- デザインシステムの文書化
- 受託案件でのコミュニケーション改善

#### ESLint + Prettier
**選定理由:**
- コード品質の自動チェック
- 一貫したコードスタイル
- チーム開発での標準的な構成

#### Husky + lint-staged
**選定理由:**
- コミット前の自動品質チェック
- 不適切なコードのコミット防止
- CI/CD負荷の軽減

### 1.5 AI統合

#### OpenAI API / Anthropic Claude API
**選定理由:**
- 高品質なテキスト生成
- 豊富なAPI機能
- 安定したサービス提供

#### Ollama（オプション）
**選定理由:**
- ローカル実行によるプライバシー保護
- API コスト削減
- オフライン動作可能

### 1.6 CI/CD・ホスティング

#### GitHub Actions
**選定理由:**
- GitHubとの統合
- 豊富なAction エコシステム
- 無料枠での利用可能

#### Vercel
**選定理由:**
- Next.js との親和性
- 簡単なデプロイフロー
- プレビューデプロイ機能
- 高いパフォーマンス

**代替案検討:**
- Netlify: 機能的には同等だが、Next.js特化度でVercelが上
- AWS Amplify: 設定が複雑、学習コスト高

## 2. アーキテクチャ設計

### 2.1 全体構成
```
┌─────────────────┐    ┌─────────────────┐
│   Client        │    │   microCMS      │
│   (Next.js)     │◄──►│   (Headless CMS)│
└─────────────────┘    └─────────────────┘
         │
         ▼
┌─────────────────┐    ┌─────────────────┐
│   Vercel        │    │   AI APIs       │
│   (Hosting)     │    │   (OpenAI/Claude)│
└─────────────────┘    └─────────────────┘
```

### 2.2 ディレクトリ構成
```
src/
├── app/                 # App Router
│   ├── (routes)/       # ルーティング
│   ├── api/            # API Routes
│   ├── globals.css     # グローバルスタイル
│   ├── layout.tsx      # レイアウト
│   └── page.tsx        # ホームページ
├── components/         # コンポーネント
│   ├── ui/            # shadcn/ui コンポーネント
│   ├── layout/        # レイアウトコンポーネント
│   ├── article/       # 記事関連コンポーネント
│   └── ai/            # AI機能関連コンポーネント
├── lib/               # ユーティリティ
│   ├── microcms.ts    # microCMS クライアント
│   ├── ai.ts          # AI API クライアント
│   └── utils.ts       # 汎用ユーティリティ
├── types/             # 型定義
├── hooks/             # カスタムフック
└── constants/         # 定数定義
```

### 2.3 データフロー
```
microCMS → Next.js API Routes → Client Components
                ↓
           Static Generation (SSG)
                ↓
              Vercel
```

## 3. パフォーマンス戦略

### 3.1 レンダリング戦略
- **記事一覧**: SSG（静的生成）
- **記事詳細**: ISR（増分静的再生成）
- **検索機能**: CSR（クライアントサイドレンダリング）
- **AI機能**: CSR + API Routes

### 3.2 最適化手法
- **画像最適化**: Next.js Image コンポーネント
- **フォント最適化**: next/font
- **バンドル最適化**: Dynamic Import
- **キャッシュ戦略**: SWR or React Query

### 3.3 Core Web Vitals 対策
- **LCP**: 画像最適化、クリティカルCSS
- **FID**: JavaScript 最適化、Code Splitting
- **CLS**: 画像・フォントサイズ指定

## 4. セキュリティ考慮事項

### 4.1 API セキュリティ
- API キーの環境変数管理
- Rate Limiting 実装
- CORS 設定

### 4.2 XSS 対策
- サニタイゼーション実装
- CSP（Content Security Policy）設定
- dangerouslySetInnerHTML の適切な使用

### 4.3 認証・認可
- API キー管理の暗号化
- セッション管理（必要に応じて）

## 5. 開発・運用考慮事項

### 5.1 環境管理
- 開発環境（Development）
- ステージング環境（Preview）
- 本番環境（Production）

### 5.2 ログ・監視
- Vercel Analytics
- Error Boundary 実装
- ログ収集戦略

### 5.3 バックアップ・災害対策
- microCMS データのバックアップ
- Git によるコードバックアップ
- 設定ファイルの管理

## 6. 技術的制約・前提条件

### 6.1 ブラウザサポート
- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+

### 6.2 デバイスサポート
- デスクトップ（1920×1080以上）
- タブレット（768×1024以上）
- スマートフォン（375×667以上）

### 6.3 外部サービス依存
- microCMS API
- OpenAI/Claude API
- Vercel ホスティング
- GitHub Actions

## 7. 技術的リスクと対策

### 7.1 パフォーマンスリスク
**リスク**: 記事数増加によるビルド時間増加
**対策**: ISR による段階的な静的生成

### 7.2 API制限リスク
**リスク**: AI API のレート制限・コスト
**対策**: ユーザー負担方式、フォールバック機能

### 7.3 依存関係リスク
**リスク**: 外部サービスの障害・仕様変更
**対策**: 複数プロバイダー対応、エラーハンドリング

## 8. 今後の拡張性

### 8.1 機能拡張
- 多言語対応（i18n）
- ダークモード対応
- PWA 機能
- コメント機能

### 8.2 技術拡張
- GraphQL 対応
- Server Components 活用
- Edge Runtime 対応

### 8.3 運用拡張
- A/B テスト機能
- アナリティクス強化
- SEO 分析ツール連携