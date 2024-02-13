import type { Meta, StoryFn } from '@storybook/react';

import { LogoBubble } from '.';

const meta = {
  title: 'Molecules/LogoBubble',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LogoBubble>;

export default meta;

export const Default: StoryFn = () => <LogoBubble onClick={() => console.log('Extension icon clicked')} />;
