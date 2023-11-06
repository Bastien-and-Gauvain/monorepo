import type { Meta, StoryFn } from '@storybook/react';

import { SelectEntry, TextAreaEntry, TextEntry } from '.';
import { ToggleEntry } from './toggleEntry';

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
    className="plasmo-w-80"
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
      id="primary"
      handleChange={(value) => console.log(value)}
      options={options}
      value={options[0].value}
      className="plasmo-w-56"
      labelText="Select an option"
    />
  );
};

export const TextArea: StoryFn = () => {
  return (
    <TextAreaEntry
      inputId="comment"
      handleChange={(event) => console.log(event.target.value)}
      className="plasmo-w-80"
      labelText="Comment"
      required
    />
  );
};

export const Toggle: StoryFn = () => {
  const changeHandler = (checked: boolean) => {
    console.log(checked);
  };

  return (
    <ToggleEntry
      inputId="toggle"
      handleChange={changeHandler}
      labelText="Display data stored in:"
      options={{ unchecked: 'LinkedIn', checked: 'Notion' }}
    />
  );
};
