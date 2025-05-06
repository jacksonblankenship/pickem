import type { Meta, StoryObj } from '@storybook/react';
import { addMinutes, subMinutes } from 'date-fns';
import { MatchHeader } from '.';

const meta = {
  title: 'Pickem/MatchHeader',
  component: MatchHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    kickoffTime: {
      control: 'date',
    },
  },
} satisfies Meta<typeof MatchHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    homeTeamAbbr: 'PHI',
    awayTeamAbbr: 'DAL',
    kickoffTime: addMinutes(new Date(), 200),
    isNeutralSite: false,
  },
};

export const Soon: Story = {
  args: {
    homeTeamAbbr: 'PHI',
    awayTeamAbbr: 'DAL',
    kickoffTime: addMinutes(new Date(), 41),
    isNeutralSite: false,
  },
};

export const Past: Story = {
  args: {
    homeTeamAbbr: 'PHI',
    awayTeamAbbr: 'DAL',
    kickoffTime: subMinutes(new Date(), 200),
    isNeutralSite: false,
  },
};

export const NeutralSite: Story = {
  args: {
    homeTeamAbbr: 'PHI',
    awayTeamAbbr: 'DAL',
    kickoffTime: addMinutes(new Date(), 200),
    isNeutralSite: true,
  },
};
