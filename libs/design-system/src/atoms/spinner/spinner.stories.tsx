import type { Meta, StoryFn } from '@storybook/react';

import { Spinner } from '.';

const meta = {
  title: 'Atoms/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export default meta;

export const DefaultSpinner: StoryFn = () => <Spinner />;
