import type { Meta, StoryFn } from '@storybook/react';

import { BaseLabel, SmallLabel } from '.';

const meta = {
  title: 'Atoms/Labels',
  component: BaseLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BaseLabel>;

export default meta;
export const StandardLabel: StoryFn = (p: Omit<typeof BaseLabel, 'labelText'>) => (
  <BaseLabel labelText="Base Label" {...p} />
);
export const TinyLabel: StoryFn = (p: Omit<typeof BaseLabel, 'labelText'>) => (
  <SmallLabel labelText="Small Label" {...p} />
);
