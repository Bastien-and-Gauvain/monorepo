import type { Meta, StoryFn } from '@storybook/react';

import { Icon } from '.';

const meta = {
  title: 'Atoms/Icons',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;

export const Spinner: StoryFn = () => <Icon isSpinning={true} type="Spinner" className="plasmo-fill-black" />;

export const SixDots: StoryFn = () => <Icon type="SixDots" className="plasmo-stroke-black" />;
