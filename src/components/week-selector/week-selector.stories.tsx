import type { Meta, StoryObj } from '@storybook/react';
import { WeekSelector } from '.';

const meta = {
  title: 'Pickem/WeekSelector',
  component: WeekSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WeekSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FirstWeek: Story = {
  args: {
    selectedWeek: 1,
    latestAvailableWeek: 1,
    totalWeeks: 18,
    onWeekChange: () => {},
  },
};

export const MidSeason: Story = {
  args: {
    selectedWeek: 5,
    latestAvailableWeek: 9,
    totalWeeks: 18,
    onWeekChange: () => {},
  },
};

export const LastWeek: Story = {
  args: {
    selectedWeek: 18,
    latestAvailableWeek: 18,
    totalWeeks: 18,
    onWeekChange: () => {},
  },
};
