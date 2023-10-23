import type { Meta, StoryFn } from '@storybook/react';

import { ErrorAlert, InfoAlert, SuccessAlert, WarningAlert } from '.';

const meta = {
  title: 'Atoms/Alerts',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SuccessAlert>;

export default meta;

export const Success: StoryFn = () => <SuccessAlert message="A success alert!" className="plasmo-w-80" />;

export const Info: StoryFn = () => <InfoAlert message="An info alert!" className="plasmo-w-80" />;

export const Warning: StoryFn = () => <WarningAlert message="A warning alert!" className="plasmo-w-80" />;

export const Error: StoryFn = () => <ErrorAlert message="An error alert!" className="plasmo-w-80" />;
