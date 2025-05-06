import type { Meta, StoryObj } from '@storybook/react';
import { SpreadOption } from '.';

const meta = {
  title: 'Pickem/Option/SpreadOption',
  component: SpreadOption,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpreadOption>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Favorite: Story = {
  args: {
    teamAbbr: 'BAL',
    odds: 100,
    spread: -3.5,
  },
};

export const Underdog: Story = {
  args: {
    teamAbbr: 'PHI',
    odds: 100,
    spread: 3.5,
  },
};
