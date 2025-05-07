import type { Meta, StoryObj } from '@storybook/react';
import { PickStatusBadge } from '.';

const meta = {
  title: 'Pickem/PickStatusBadge',
  component: PickStatusBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PickStatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Locked: Story = {
  args: {
    status: 'locked',
  },
};

export const Win: Story = {
  args: {
    status: 'win',
  },
};

export const Loss: Story = {
  args: {
    status: 'loss',
  },
};

export const Push: Story = {
  args: {
    status: 'push',
  },
};

export const MissedPick: Story = {
  args: {
    status: 'missed-pick',
  },
};

export const NotPicked: Story = {
  args: {
    status: 'not-picked',
  },
};
