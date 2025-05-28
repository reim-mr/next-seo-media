import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Layout } from './Layout';

const meta: Meta<typeof Layout> = {
  title: 'Layout/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to SEO Media</h1>
        <p className="text-xl text-muted-foreground mb-8">
          AIを活用したSEOメディアテンプレートへようこそ
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>記事一覧</CardTitle>
              <CardDescription>最新の記事をチェック</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>記事を見る</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI記事生成</CardTitle>
              <CardDescription>AIで高品質な記事を作成</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>生成開始</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO最適化</CardTitle>
              <CardDescription>検索エンジン最適化</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>最適化</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    ),
  },
};

export const CustomSiteName: Story = {
  args: {
    siteName: 'Tech Blog Pro',
    children: (
      <div className="container py-8">
        <h1 className="text-4xl font-bold">Tech Blog Pro</h1>
        <p className="text-muted-foreground mt-2">
          カスタムサイト名でのレイアウト例
        </p>
      </div>
    ),
  },
};

export const LongContent: Story = {
  args: {
    children: (
      <div className="container py-8 space-y-8">
        <h1 className="text-4xl font-bold">Long Content Example</h1>

        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="space-y-4">
            <h2 className="text-2xl font-semibold">Section {i + 1}</h2>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-muted-foreground">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </div>
        ))}
      </div>
    ),
  },
};
