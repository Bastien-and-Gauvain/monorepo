import { BaseParagraph, ButtonPrimary } from 'design-system';

type GoToLinkedInProfileCTAProps = {
  /**
   * A call back function to call on button click
   */
  callback?: () => void;
};

const GoToLinkedInProfileCTA = ({ callback }: GoToLinkedInProfileCTAProps) => {
  // First display a small paragraph stating that the extension only works on LinkedIn profiles
  // Then, add a primary button to redirect to the user's LinkedIn profile
  return (
    <div className="plasmo-fixed plasmo-top-0 plasmo-left-0 plasmo-w-full plasmo-h-[100vh] plasmo-flex plasmo-flex-col plasmo-justify-center plasmo-items-center plasmo-bg-background-light">
      <span className="plasmo-w-3/4">
        <BaseParagraph className="plasmo-text-grey-light plasmo-text-3 plasmo-text-center">
          {'recruitivity only works on LinkedIn profiles...'}
        </BaseParagraph>
        <ButtonPrimary
          className="plasmo-mt-4"
          onClick={() => {
            chrome.runtime.sendMessage({ msg: 'openUserLinkedInProfile' });
            callback && callback();
          }}>
          {'...yours for instance ✨'}
        </ButtonPrimary>
      </span>
    </div>
  );
};

export default GoToLinkedInProfileCTA;
