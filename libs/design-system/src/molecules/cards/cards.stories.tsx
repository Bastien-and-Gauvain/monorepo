import type { Meta, StoryFn } from '@storybook/react';

import { ButtonPrimary, Heading2 } from '../..';
import { Card } from './cards';

const meta = {
  title: 'Molecules/Cards',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;

export const CardDefault: StoryFn = () => (
  <div className="plasmo-w-72 plasmo-flex plasmo-flex-col plasmo-justify-center plasmo-items-center">
    <Card
      title={<Heading2>2 - Save a first profile</Heading2>}
      callToAction={<ButtonPrimary>Connect to Notion</ButtonPrimary>}
      state="current"
      icon={<img src="./linkedin_logo.svg" alt="Notion Logo" width={150} height={150} />}
    />
  </div>
);

export const CardNext: StoryFn = () => (
  <div className="plasmo-w-72 plasmo-flex plasmo-flex-col plasmo-justify-center plasmo-items-center">
    <Card
      title={<Heading2>3 - Pin the extension</Heading2>}
      state="next"
      icon={<img src="./pin_icon.svg" alt="Notion Logo" width={150} height={150} />}
    />
  </div>
);

export const CardDone: StoryFn = () => (
  <div className="plasmo-w-72 plasmo-flex plasmo-flex-col plasmo-justify-center plasmo-items-center">
    <Card
      title={<Heading2>1 - Connect to Notion</Heading2>}
      callToAction={<ButtonPrimary state="done">Done</ButtonPrimary>}
      state="done"
      icon={<img src="./notion_logo.svg" alt="Notion Logo" width={150} height={150} />}
    />
  </div>
);
