import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from './button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the content of the card. You can put any content here.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithoutFooter: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Simple Card</CardTitle>
        <CardDescription>A card without footer</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card doesn&apos;t have a footer section.</p>
      </CardContent>
    </Card>
  ),
};

export const ArticlePreview: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Next.js 15の新機能解説</CardTitle>
        <CardDescription>2024年5月28日 • プログラミング</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Next.js 15で追加された新しい機能について詳しく解説します。App
          Routerの改善点や...
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline">読む</Button>
        <Button variant="ghost" size="sm">
          ♡ 42
        </Button>
      </CardFooter>
    </Card>
  ),
};
