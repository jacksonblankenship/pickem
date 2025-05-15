import type { Meta, StoryObj } from '@storybook/react';
import { CategoryWrapper } from '.';

const meta = {
  title: 'Pickem/CategoryWrapper',
  component: CategoryWrapper,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof CategoryWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Favorite: Story = {
  args: {
    category: 'favorite',
    children: <div>Some content...</div>,
    pickStatus: 'not-picked',
  },
};

export const Underdog: Story = {
  args: {
    category: 'underdog',
    children: <div>Some content...</div>,
    pickStatus: 'loss',
  },
};

export const Total: Story = {
  args: {
    category: 'total',
    children: <div>Some content...</div>,
    pickStatus: 'win',
  },
};
