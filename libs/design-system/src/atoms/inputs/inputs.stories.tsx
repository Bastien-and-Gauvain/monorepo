import type { Meta, StoryFn } from '@storybook/react';

import { SelectInput, TextInput } from '.';

const meta = {
  title: 'Atoms/Inputs',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextInput | typeof SelectInput>;

export default meta;

export const Text: StoryFn = () => (
  <TextInput inputId="firstName" handleChange={(event) => console.log(event.target.value)} className="w-80" required />
);

export const SelectPrimary: StoryFn = () => {
  const options = [
    { id: '1', label: 'Option 1', value: 'Option 1' },
    { id: '2', label: 'Option 2', value: 'Option 2' },
    { id: '3', label: 'Option 3', value: 'Option 3' },
  ];

  return (
    <SelectInput
      type="primary"
      id="primary"
      handleChange={(event) => console.log(event.target.value)}
      options={options}
      className="w-80"
      required
    />
  );
};

export const SelectSecondary: StoryFn = () => {
  const options = [
    { id: '1', label: 'Option 1', value: 'Option 1' },
    { id: '2', label: 'Option 2', value: 'Option 2' },
    { id: '3', label: 'Option 3', value: 'Option 3' },
  ];

  return (
    <SelectInput
      type="secondary"
      id="secondary"
      handleChange={(event) => console.log(event.target.value)}
      options={options}
      className="w-40"
      required
    />
  );
};
