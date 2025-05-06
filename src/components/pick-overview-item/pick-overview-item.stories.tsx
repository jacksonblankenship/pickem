import type { Meta, StoryObj } from '@storybook/react';
import { PickOverviewItem } from '.';

const meta = {
  title: 'Pickem/PickOverview/PickOverviewItem',
  component: PickOverviewItem,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof PickOverviewItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NotPicked: Story = {
  args: {
    type: 'favorite',
    status: 'not-picked',
  },
};

export const Locked: Story = {
  args: {
    type: 'favorite',
    status: 'locked',
  },
};

export const Win: Story = {
  args: {
    type: 'favorite',
    status: 'win',
  },
};

export const Loss: Story = {
  args: {
    type: 'favorite',
    status: 'loss',
  },
};

export const Push: Story = {
  args: {
    type: 'favorite',
    status: 'push',
  },
};

export const MissedPick: Story = {
  args: {
    type: 'favorite',
    status: 'missed-pick',
  },
};
