import type { Meta, StoryFn } from '@storybook/react';

import { OpenExtensionBubble } from '.';

const meta = {
  title: 'Molecules/ExtensionBubble',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OpenExtensionBubble>;

export default meta;

export const Default: StoryFn = () => <OpenExtensionBubble onClick={() => console.log('Extension icon clicked')} />;
