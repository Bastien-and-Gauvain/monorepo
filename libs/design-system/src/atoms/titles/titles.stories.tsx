import type { Meta, StoryFn } from '@storybook/react';

import { Heading1, Heading2, Heading3 } from '.';

const meta = {
  title: 'Atoms/Titles',
  component: Heading1,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Heading1>;

export default meta;

export const FirstHeading: StoryFn = () => <Heading1>Heading 1</Heading1>;

export const SecondHeading: StoryFn = () => <Heading2>Heading 2</Heading2>;

export const ThirdHeading: StoryFn = () => <Heading3>Heading 3</Heading3>;
