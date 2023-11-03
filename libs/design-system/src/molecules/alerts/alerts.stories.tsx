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
  <SuccessAlert className="plasmo-w-80" link="https://bvelitchkine.notion.site" message="A success alert!" />
);

export const Info: StoryFn = () => (
  <InfoAlert className="plasmo-w-80" link="https://bvelitchkine.notion.site" message="An info alert!" />
);

export const Warning: StoryFn = () => <WarningAlert className="plasmo-w-80" message="A warning alert!" />;

export const Error: StoryFn = () => <ErrorAlert className="plasmo-w-80" message="An error alert!" />;
