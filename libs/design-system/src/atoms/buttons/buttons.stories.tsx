import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { ButtonIcon, ButtonPrimary, ButtonSecondary } from '.';
import { Icon } from '..';

const meta = {
  title: 'Atoms/Buttons',
  component: ButtonPrimary,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonPrimary>;

export default meta;

export const PrimaryButton: StoryFn = () => (
  <div className="plasmo-w-72 plasmo-flex plasmo-flex-col plasmo-justify-center plasmo-items-center">
    <ButtonPrimary onClick={() => console.log('Hello Primary')}>Update</ButtonPrimary>
  </div>
);

export const PrimaryButtonLoading: StoryFn = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="plasmo-w-72 plasmo-flex plasmo-flex-col plasmo-justify-center plasmo-items-center">
      <ButtonPrimary
        onClick={() => [console.log('Hello Primary'), setIsLoading(true), setTimeout(() => setIsLoading(false), 2000)]}
        isLoading={isLoading}>
        Update
      </ButtonPrimary>
    </div>
  );
};

export const IconButton: StoryFn = () => (
  <div className="plasmo-w-72 plasmo-flex plasmo-flex-col plasmo-justify-center plasmo-items-center">
    <ButtonIcon onClick={() => console.log('Hello Primary')}>
      <Icon type="ArrowPath" />
    </ButtonIcon>
  </div>
);

export const SecondaryButton: StoryFn = () => (
  <ButtonSecondary onClick={() => console.log('Hello secondary')}>Secondary Button</ButtonSecondary>
);
