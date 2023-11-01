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

export const Spinner: StoryFn = () => <Icon isSpinning={true} type="Spinner" color="black" />;

export const ArrowUpTray: StoryFn = () => <Icon type="ArrowUpTray" color="black" rotation={90} />;

export const ChevronUpDown: StoryFn = () => <Icon type="ChevronUpDown" color="black" rotation={90} />;

export const XMark: StoryFn = () => <Icon type="XMark" color="black" />;

export const CheckCircle: StoryFn = () => <Icon type="CheckCircle" color="black" />;

export const InformationCircle: StoryFn = () => <Icon type="InformationCircle" color="black" />;

export const ExclamationCircle: StoryFn = () => <Icon type="ExclamationCircle" color="black" />;

export const ArrowPath: StoryFn = () => <Icon type="ArrowPath" color="black" />;
