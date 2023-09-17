import type { Meta, StoryFn } from '@storybook/react';

import { BaseLabel, SmallLabel } from '.';

const meta = {
  title: 'Example/Labels',
  component: BaseLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BaseLabel>;

export default meta;
export const StandardLabel: StoryFn = () => <BaseLabel>Base Label</BaseLabel>;
export const TinyLabel: StoryFn = () => <SmallLabel>Small Label</SmallLabel>;
