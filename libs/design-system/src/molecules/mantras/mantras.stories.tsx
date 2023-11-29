import type { Meta, StoryFn } from '@storybook/react';

import { Mantra } from '.';

const meta = {
  title: 'Molecules/Mantras',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Mantra>;

export default meta;

export const MantraStory: StoryFn = () => {
  return (
    <div className="plasmo-w-80">
      <Mantra interval={3} />
    </div>
  );
};
