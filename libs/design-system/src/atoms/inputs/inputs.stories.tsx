import type { Meta, StoryFn } from '@storybook/react';

import { SelectInput, SelectInputProps, TextInput, TextInputProps } from '.';

const meta = {
  title: 'Atoms/Inputs',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<TextInputProps | SelectInputProps>;

export default meta;

export const Text: StoryFn = () => (
  <TextInput inputId="firstName" handleChange={(event) => console.log(event.target.value)} className="w-80" required />
);

export const Select: StoryFn = () => {
  const options = [
    { id: '1', value: 'Option 1' },
    { id: '2', value: 'Option 2' },
    { id: '3', value: 'Option 3' },
  ];

  return (
    <SelectInput
      id="test"
      handleChange={(event) => console.log(event.target.value)}
      options={options}
      className="w-80"
      required
    />
  );
};
