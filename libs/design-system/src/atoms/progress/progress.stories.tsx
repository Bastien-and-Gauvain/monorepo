import type { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import { ProgressBar } from '.';

const meta = {
  title: 'Atoms/Progress',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressBar>;

export default meta;

export const AnimatedProgressBar: StoryFn = () => {
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (ratio !== 100) {
      intervalId = setInterval(() => {
        setRatio((ratio) => ratio + 1);
      }, 100);
    }
    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [ratio]);

  return (
    <div className="plasmo-w-80">
      <ProgressBar ratio={ratio} />
    </div>
  );
};
