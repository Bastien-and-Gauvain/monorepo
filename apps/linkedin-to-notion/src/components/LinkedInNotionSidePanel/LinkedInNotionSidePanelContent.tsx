import logo from 'data-base64:~assets/icon.png';
import cssText from 'data-text:~style.css';
import { ButtonPrimary, Heading2, IFramedSidePanel } from 'design-system';
import { createElement } from 'react';

import './../../../style.css'; // for the font to load

export const getIFrameStyle = () => {
  return createElement('style', {}, cssText);
};

export const LinkedInNotionSidePanelContent = ({
  id,
  isOpen,
  onCloseCallback,
}: {
  id: string;
  isOpen: boolean;
  onCloseCallback: () => void;
}) => {
  return (
    <IFramedSidePanel
      hasCloseButton={true}
      hasTranslateButton={true}
      head={getIFrameStyle()}
      isOpen={isOpen}
      onCloseCallback={() => onCloseCallback()}
      id={id}
      className="top-48 space-y-4 flex flex-col">
      <div className="flex flex-col items-center">
        <img src={logo} className="w-20" />
        <Heading2>LinkedIn to Notion</Heading2>
      </div>
      <ButtonPrimary>Click me</ButtonPrimary>
    </IFramedSidePanel>
  );
};
