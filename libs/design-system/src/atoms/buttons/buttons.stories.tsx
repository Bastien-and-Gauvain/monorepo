import type { Meta, StoryFn } from '@storybook/react';

import { ButtonPrimary, ButtonSecondary } from '.';

const meta = {
  title: 'Atoms/Buttons',
  component: ButtonPrimary,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonPrimary>;

export default meta;

export const FirstButton: StoryFn = () => (
  <ButtonPrimary onClick={() => console.log('Hello Primary')}>PRIMARY BUTTON</ButtonPrimary>
);

export const SecondButton: StoryFn = () => (
  <ButtonSecondary onClick={() => console.log('Hello secondary')}>Secondary Button</ButtonSecondary>
);
