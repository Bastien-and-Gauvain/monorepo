import type { Meta, StoryFn } from '@storybook/react';
import { createElement, useState } from 'react';

import { IFramedSidePanel } from '.';
import { ButtonPrimary } from '../..';

const meta = {
  title: 'Molecules/iFramed Side Panel',
  component: IFramedSidePanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IFramedSidePanel>;

export default meta;

export const DefaultSidePanel: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(true);

  // We get all the style from the main html page
  const iFrameStyles: Node[] = [];
  document.head.querySelectorAll('style').forEach((style) => {
    const frameStyles = style.cloneNode(true);
    iFrameStyles.push(frameStyles);
  });
  const styleNode = (
    <>{iFrameStyles.map((style, index) => createElement('style', { key: index }, style.textContent))}</>
  );

  return (
    <>
      <ButtonPrimary onClick={() => setIsOpen(!isOpen)}>Toggle Side Panel</ButtonPrimary>
      <IFramedSidePanel
        hasCloseButton={true}
        hasTranslateButton={true}
        hasLogoutButton={true}
        head={styleNode}
        isOpen={isOpen}
        onCloseCallback={() => setIsOpen(false)}
        id="default-side-panel"
        className="space-y-4">
        <p>Hello, this is a side bar</p>
        <ButtonPrimary onClick={() => console.log('Hello Primary')}>PRIMARY BUTTON</ButtonPrimary>
      </IFramedSidePanel>
    </>
  );
};
