import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

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
  const [checked, setChecked] = useState<boolean>(false);
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <ToggleEntry
      inputId="toggle"
      handleChange={changeHandler}
      labelText="Display data stored in:"
      checked={checked}
      options={{ unchecked: 'LinkedIn', checked: 'Notion' }}
    />
  );
};
