import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { SelectInput, TextAreaInput, TextInput } from '.';
import { ToggleInput } from './toggleInputs';

const meta = {
  title: 'Atoms/Inputs',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

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

export const TextArea: StoryFn = () => (
  <TextAreaInput
    inputId="comment"
    handleChange={(event) => console.log(event.target.value)}
    className="w-80"
    required
  />
);

export const Toggle: StoryFn = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    console.log(event.target.checked);
  };
  return (
    <ToggleInput
      options={{ checked: 'Notion', unchecked: 'LinkedIn' }}
      checked={checked}
      inputId="linkedinNotionSwitch"
      handleChange={changeHandler}
    />
  );
};
