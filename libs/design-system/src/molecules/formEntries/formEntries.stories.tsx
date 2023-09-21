import type { Meta, StoryFn } from '@storybook/react';

import { SelectEntry, TextAreaEntry, TextEntry } from '.';

const meta = {
  title: 'Molecules/Form Entries',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextEntry | typeof SelectEntry>;

export default meta;

export const Text: StoryFn = () => (
  <TextEntry
    inputId="firstName"
    required
    handleChange={(event) => console.log(event.target.value)}
    className="w-80"
    labelText="First Name"
  />
);

export const TextArea: StoryFn = () => {
  return (
    <TextAreaEntry
      inputId="comment"
      handleChange={(event) => console.log(event.target.value)}
      className="w-80"
      labelText="Comment"
      required
    />
  );
};
