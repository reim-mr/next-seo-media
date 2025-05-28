import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomSiteName: Story = {
  args: {
    siteName: 'Tech Blog',
  },
};

export const WithBackground: Story = {
  render: args => (
    <div className="min-h-screen bg-background">
      <Header {...args} />
      <div className="container py-8">
        <h1 className="text-4xl font-bold">Sample Content</h1>
        <p className="text-muted-foreground mt-2">
          This shows how the header looks with content below it.
        </p>
      </div>
    </div>
  ),
};
