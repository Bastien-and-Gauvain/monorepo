import type { Meta, StoryFn } from '@storybook/react';

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
  <TextInput inputId="firstName" handleChange={(event) => console.log(event.target.value)} required />
);

export const Select: StoryFn = () => {
  const options = [
    { id: '1', label: 'Option 1', value: 'Option 1' },
    { id: '2', label: 'Option 2', value: 'Option 2' },
    { id: '3', label: 'Option 3', value: 'Option 3' },
    { id: '4', label: 'An empty one', value: '' },
  ];

  return (
    <SelectInput
      id="primary"
      handleChange={(value) => console.log(value)}
      options={options}
      value={options[0].value}
      className="plasmo-w-56"
      required
    />
  );
};

export const TextArea: StoryFn = () => (
  <TextAreaInput inputId="comment" handleChange={(event) => console.log(event.target.value)} required />
);

export const Toggle: StoryFn = () => {
  const changeHandler = (checkedStatus: boolean) => console.log(checkedStatus);
  return (
    <div className="plasmo-w-60">
      <ToggleInput
        options={{ checked: 'Notion', unchecked: 'LinkedIn' }}
        inputId="linkedinNotionSwitch"
        handleChange={changeHandler}
      />
    </div>
  );
};
