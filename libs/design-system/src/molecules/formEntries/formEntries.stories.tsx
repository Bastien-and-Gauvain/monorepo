import type { Meta, StoryFn } from '@storybook/react';

import { SelectEntry, TextEntry } from '.';

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

export const Select: StoryFn = () => {
  const options = [
    { id: '1', label: 'Option 1', value: 'Option 1' },
    { id: '2', label: 'Option 2', value: 'Option 2' },
    { id: '3', label: 'Option 3', value: 'Option 3' },
  ];

  return (
    <SelectEntry
      id="country"
      handleChange={(event) => console.log(event.target.value)}
      options={options}
      className="w-80"
      labelText="Country"
      required
    />
  );
};
