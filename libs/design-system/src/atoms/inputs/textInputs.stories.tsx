import type { Meta, StoryFn } from '@storybook/react';

import { TextInput } from '.';

const meta = {
  title: 'Example/Inputs',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextInput>;

export default meta;
export const Text: StoryFn = () => (
  <TextInput inputId="firstName" handleChange={(event) => console.log(event.target.value)} required />
);
