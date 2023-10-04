import logo from 'data-base64:~assets/icon.png';
import cssText from 'data-text:~style.css';
import { ButtonPrimary, IFramedSidePanel } from 'design-system';
import { createElement } from 'react';

import './../../../style.css'; // for the font to load

export const getIFrameStyle = () => {
  return createElement('style', {}, cssText);
};

export const GoBackToLinkedInContent = ({
  id,
  isOpen,
  onCloseCallback,
}: {
  id: string;
  isOpen: boolean;
  onCloseCallback: () => void;
}) => {
  const askToOpenLinkedInTab = () => {
    chrome.runtime.sendMessage('openLinkedInTab');
    onCloseCallback();
  };

  return (
    <IFramedSidePanel
      hasCloseButton={true}
      hasTranslateButton={false}
      head={getIFrameStyle()}
      isOpen={isOpen}
      onCloseCallback={onCloseCallback}
      id={id}
      className="top-48 space-y-4 flex flex-col">
      <div className="flex flex-col items-center">
        <img src={logo} className="w-12" />
        <ButtonPrimary onClick={askToOpenLinkedInTab}>Go Back To Linkedin</ButtonPrimary>
      </div>
    </IFramedSidePanel>
  );
};
