import type { Meta, StoryFn } from '@storybook/react';

import { ErrorAlert, InfoAlert, SuccessAlert, WarningAlert } from '.';

const meta = {
  title: 'Molecules/Alerts',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SuccessAlert>;

export default meta;

export const Success: StoryFn = () => (
  <SuccessAlert link="https://bvelitchkine.notion.site" message="Profile saved! Click to open in Notion." />
);

export const Info: StoryFn = () => <InfoAlert message="This profile isn't saved yet!" />;

export const Warning: StoryFn = () => <WarningAlert message="Useless alert for now" />;

export const Error: StoryFn = () => (
  <ErrorAlert link="https://bvelitchkine.notion.site" message="An error occurred. Click to report it." />
);
