import type { Meta, StoryFn } from '@storybook/react';

import { ImageLogo, Logo } from '.';

const meta = {
  title: 'Atoms/Logos',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Logo>;

export default meta;

export const DarkLogo: StoryFn = () => <Logo className="plasmo-fill-black" scale={150} />;

export const LightLogo: StoryFn = () => <Logo className="plasmo-fill-main" />;

export const ExtensionLogo: StoryFn = () => <ImageLogo />;
