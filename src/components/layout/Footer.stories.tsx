import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Layout/Footer',
  component: Footer,
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

export const CustomSite: Story = {
  args: {
    siteName: 'Tech Blog',
    year: 2024,
  },
};

export const WithContent: Story = {
  render: args => (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 container py-8">
        <h1 className="text-4xl font-bold mb-4">Sample Page Content</h1>
        <p className="text-muted-foreground mb-8">
          This shows how the footer looks at the bottom of a page with content.
        </p>
        <div className="space-y-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </div>
      <Footer {...args} />
    </div>
  ),
};
