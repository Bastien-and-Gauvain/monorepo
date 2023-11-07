import type { Meta, StoryFn } from '@storybook/react';

import { Loader } from '.';

const meta = {
  title: 'Molecules/Loader',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Loader>;

export default meta;

export const Default: StoryFn = () => <Loader />;
