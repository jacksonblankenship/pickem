import type { Meta, StoryObj } from '@storybook/react';
import { TotalOption } from '.';

const meta = {
  title: 'Pickem/Option/TotalOption',
  component: TotalOption,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TotalOption>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Over: Story = {
  args: {
    type: 'over',
    odds: 100,
    total: 45,
    homeTeamAbbr: 'BAL',
    awayTeamAbbr: 'DEN',
    isNeutralSite: false,
  },
};

export const Under: Story = {
  args: {
    type: 'under',
    odds: 100,
    total: 45,
    homeTeamAbbr: 'DAL',
    awayTeamAbbr: 'PHI',
    isNeutralSite: false,
  },
};

export const NeutralSite: Story = {
  args: {
    type: 'over',
    odds: 100,
    total: 45,
    homeTeamAbbr: 'NYG',
    awayTeamAbbr: 'CHI',
    isNeutralSite: true,
  },
};
