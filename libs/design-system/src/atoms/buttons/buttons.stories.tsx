import { ArrowPathIcon } from '@heroicons/react/24/outline';
import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { ButtonIcon, ButtonPrimary, ButtonSecondary } from '.';

const meta = {
  title: 'Atoms/Buttons',
  component: ButtonPrimary,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonPrimary>;

export default meta;

export const PrimaryButtonDefault: StoryFn = () => (
  <div className="plasmo-w-72 plasmo-flex plasmo-flex-col plasmo-justify-center plasmo-items-center">
    <ButtonPrimary onClick={() => console.log('Hello Primary')}>Update</ButtonPrimary>
  </div>
);

export const PrimaryButtonDisabled: StoryFn = () => (
  <div className="plasmo-w-72 plasmo-flex plasmo-flex-col plasmo-justify-center plasmo-items-center">
    <ButtonPrimary onClick={() => console.log('Hello Primary')} state="disabled">
      Go to Notion
    </ButtonPrimary>
  </div>
);

export const PrimaryButtonDone: StoryFn = () => (
  <div className="plasmo-w-72 plasmo-flex plasmo-flex-col plasmo-justify-center plasmo-items-center">
    <ButtonPrimary onClick={() => console.log('Hello Primary')} state="done">
      Done
    </ButtonPrimary>
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
      <ArrowPathIcon className="plasmo-h-8 plasmo-w-8" />
    </ButtonIcon>
  </div>
);

export const SecondaryButton: StoryFn = () => (
  <ButtonSecondary onClick={() => console.log('Hello secondary')}>Secondary Button</ButtonSecondary>
);
