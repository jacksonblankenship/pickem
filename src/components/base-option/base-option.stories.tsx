import type { Meta, StoryObj } from '@storybook/react';
import { BaseOption } from '.';

const meta = {
  title: 'Pickem/Option/BaseOption',
  component: BaseOption,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BaseOption>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    odds: 100,
    imageUrl: 'https://picsum.photos/200/300',
  },
};
