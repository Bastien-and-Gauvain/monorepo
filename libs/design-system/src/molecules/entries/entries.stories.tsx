import type { Meta, StoryFn } from '@storybook/react';

import { TextEntry, TextEntryProps } from './entries';

const meta = {
  title: 'Molecules/Entries',
  component: TextEntry,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<TextEntryProps>;

export default meta;
export const Text: StoryFn = () => (
  <TextEntry inputId="firstName" required handleChange={(event) => console.log(event.target.value)}>
    First Name
  </TextEntry>
);
