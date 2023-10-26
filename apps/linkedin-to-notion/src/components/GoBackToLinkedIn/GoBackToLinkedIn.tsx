import logo from 'data-base64:~assets/icon.png';
import { ButtonPrimary } from 'design-system';

export const GoBackToLinkedInContent = () => {
  const askToOpenLinkedInTab = () => {
    chrome.runtime.sendMessage('openLinkedInTab');
  };

  return (
    <div className="plasmo-flex plasmo-flex-col plasmo-items-center">
      <img src={logo} className="plasmo-w-12 plasmo-mb-4" />
      <ButtonPrimary onClick={askToOpenLinkedInTab}>Go to Linkedin</ButtonPrimary>
    </div>
  );
};
