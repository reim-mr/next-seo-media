import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ArticleCard } from './article-card';

const meta: Meta<typeof ArticleCard> = {
  title: 'UI/ArticleCard',
  component: ArticleCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: '1',
    title: 'サンプル記事タイトル',
    excerpt: 'これは記事の抜粋です。ここに記事の短い説明が入ります。',
    publishedAt: '2025-05-30T10:00:00Z',
    readTime: 5,
    viewCount: 1200,
    likeCount: 42,
    category: {
      name: 'テクノロジー',
      slug: 'technology',
      color: '#3498db',
    },
    tags: [
      { name: 'React', slug: 'react' },
      { name: 'Next.js', slug: 'nextjs' },
      { name: 'TypeScript', slug: 'typescript' },
    ],
    featuredImage: {
      url: 'https://via.placeholder.com/800x450',
      alt: 'サンプル画像',
      width: 800,
      height: 450,
    },
    author: {
      name: '山田太郎',
      avatar: 'https://via.placeholder.com/100x100',
    },
    slug: 'sample-article',
    isPremium: false,
    isNew: false,
  },
};

export const Premium: Story = {
  args: {
    ...Default.args,
    isPremium: true,
  },
};

export const New: Story = {
  args: {
    ...Default.args,
    isNew: true,
  },
};

export const PremiumAndNew: Story = {
  args: {
    ...Default.args,
    isPremium: true,
    isNew: true,
  },
};

export const NoImage: Story = {
  args: {
    ...Default.args,
    featuredImage: undefined,
  },
};

export const NoAuthor: Story = {
  args: {
    ...Default.args,
    author: undefined,
  },
};

export const ManyTags: Story = {
  args: {
    ...Default.args,
    tags: [
      { name: 'React', slug: 'react' },
      { name: 'Next.js', slug: 'nextjs' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'JavaScript', slug: 'javascript' },
      { name: 'CSS', slug: 'css' },
      { name: 'HTML', slug: 'html' },
    ],
  },
};

export const LongTitle: Story = {
  args: {
    ...Default.args,
    title:
      'これはとても長いタイトルです。複数行にわたって表示されるかどうかをテストするためのサンプルタイトルです。',
  },
};

export const LongExcerpt: Story = {
  args: {
    ...Default.args,
    excerpt:
      'これはとても長い抜粋です。複数行にわたって表示されるかどうかをテストするためのサンプルテキストです。この文章は3行以上になるように十分な長さがあります。ここにさらにテキストを追加して、省略記号が表示されるかどうかを確認します。',
  },
};

export const HighViewCount: Story = {
  args: {
    ...Default.args,
    viewCount: 12500,
    likeCount: 9800,
  },
};
