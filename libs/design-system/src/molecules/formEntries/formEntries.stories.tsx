import type { Meta, StoryFn } from '@storybook/react';

import { SelectEntry, SelectEntryProps, TextEntry, TextEntryProps } from '.';

const meta = {
  title: 'Molecules/Form Entries',
  component: TextEntry,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<TextEntryProps | SelectEntryProps>;

export default meta;

export const Text: StoryFn = () => (
  <TextEntry inputId="firstName" required handleChange={(event) => console.log(event.target.value)} className="w-80">
    First Name
  </TextEntry>
);

export const Select: StoryFn = () => {
  const options = [
    { id: '1', value: 'France' },
    { id: '2', value: 'UK' },
    { id: '3', value: 'Italy' },
  ];

  return (
    <SelectEntry
      id="country"
      handleChange={(event) => console.log(event.target.value)}
      options={options}
      className="w-80"
      required>
      Country
    </SelectEntry>
  );
};
