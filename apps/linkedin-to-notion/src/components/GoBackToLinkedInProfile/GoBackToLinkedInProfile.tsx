import { ButtonPrimary, Header, Logo } from 'design-system';

export type GoBackToLinkedInProfileProps = {
  callback: () => void;
};

export const GoBackToLinkedInProfile = ({ callback }: GoBackToLinkedInProfileProps) => {
  const askToOpenLinkedInTab = () => {
    chrome.runtime.sendMessage('openLinkedInTab');
    callback();
  };

  return (
    <div className="plasmo-flex plasmo-flex-col plasmo-justify-start plasmo-w-full">
      <Header>
        <Logo className="plasmo-fill-white-transparent90" />
      </Header>
      <div className="plasmo-px-4 plasmo-pt-8">
        <ButtonPrimary onClick={askToOpenLinkedInTab}>Use it on a LinkedIn profile</ButtonPrimary>
      </div>
    </div>
  );
};
