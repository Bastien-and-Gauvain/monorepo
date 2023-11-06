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

export const ArrowRightTray: StoryFn = () => <Icon type="ArrowRightTray" className="plasmo-stroke-black" />;

export const ChevronLeftRight: StoryFn = () => <Icon type="ChevronLeftRight" className="plasmo-stroke-black" />;

export const ChevronDown: StoryFn = () => <Icon type="ChevronDown" className="plasmo-stroke-black" />;

export const XMark: StoryFn = () => <Icon type="XMark" className="plasmo-stroke-black" />;

export const CheckCircle: StoryFn = () => <Icon type="CheckCircle" className="plasmo-stroke-black" />;

export const InformationCircle: StoryFn = () => <Icon type="InformationCircle" className="plasmo-stroke-black" />;

export const ExclamationCircle: StoryFn = () => <Icon type="ExclamationCircle" className="plasmo-stroke-black" />;

export const ArrowPath: StoryFn = () => <Icon type="ArrowPath" className="plasmo-stroke-black" />;

export const SixDots: StoryFn = () => <Icon type="SixDots" className="plasmo-stroke-black" />;
