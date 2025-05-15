import type { Meta, StoryObj } from '@storybook/react';
import { PickOverview } from '.';

const meta = {
  title: 'Pickem/PickOverview',
  component: PickOverview,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof PickOverview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NonePending: Story = {
  args: {
    picks: {
      favorite: 'not-picked',
      underdog: 'not-picked',
      total: 'not-picked',
    },
  },
};

export const SomePending: Story = {
  args: {
    picks: {
      favorite: 'not-picked',
      underdog: 'locked',
      total: 'not-picked',
    },
  },
};

export const AllPending: Story = {
  args: {
    picks: {
      favorite: 'locked',
      underdog: 'locked',
      total: 'locked',
    },
  },
};

export const AllGraded: Story = {
  args: {
    picks: {
      favorite: 'win',
      underdog: 'loss',
      total: 'push',
    },
  },
};
