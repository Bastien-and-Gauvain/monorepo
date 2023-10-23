import logo from 'data-base64:~assets/icon.png';
import cssText from 'data-text:~style.css';
import { ButtonPrimary, IFramedSidePanel } from 'design-system';
import { createElement } from 'react';

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
      className="plasmo-top-48 plasmo-space-y-4 plasmo-flex plasmo-flex-col">
      <div className="plasmo-flex plasmo-flex-col plasmo-items-center">
        <img src={logo} className="plasmo-w-12 plasmo-mb-4" />
        <ButtonPrimary onClick={askToOpenLinkedInTab}>Go Back To Linkedin</ButtonPrimary>
      </div>
    </IFramedSidePanel>
  );
};
