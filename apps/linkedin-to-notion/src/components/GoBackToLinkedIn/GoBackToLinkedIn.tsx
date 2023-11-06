import { ButtonPrimary, Header, Logo } from 'design-system';

export const GoBackToLinkedInContent = () => {
  const askToOpenLinkedInTab = () => {
    chrome.runtime.sendMessage('openLinkedInTab');
  };

  return (
    <div className="plasmo-flex plasmo-flex-col plasmo-justify-start plasmo-w-full">
      <Header>
        <Logo className="plasmo-fill-white-transparent90" />
      </Header>
      <div className="plasmo-px-4 plasmo-pt-8">
        <ButtonPrimary onClick={askToOpenLinkedInTab}>Use the extension on LinkedIn</ButtonPrimary>
      </div>
    </div>
  );
};
