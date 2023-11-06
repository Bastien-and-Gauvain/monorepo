import type { Meta, StoryFn } from '@storybook/react';

import { Header } from '.';
import { Logo } from '../../atoms/logos';

const meta = {
  title: 'Molecules/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    hasCloseButton: {
      control: {
        type: 'boolean',
      },
    },
    hasLogoutButton: {
      control: {
        type: 'boolean',
      },
    },
    hasDragButton: {
      control: {
        type: 'boolean',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;

// I want a Default header whose props can use the args defined above
export const Default: StoryFn<typeof Header> = (args) => (
  <div className="plasmo-w-96">
    <Header
      {...args}
      closeHandler={() => console.log('Closed 🔥')}
      dragMouseDownHandler={() => console.log('MouseDown 🌍')}
      dragMouseUpHandler={() => console.log('MouseUp 🌍')}
      logoutHandler={() => console.log('Logged out 🚪')}>
      <Logo className="plasmo-fill-white" />
    </Header>
  </div>
);

Default.args = {
  hasCloseButton: true,
  hasLogoutButton: true,
  hasDragButton: true,
};
