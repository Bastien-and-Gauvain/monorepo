import { BaseParagraph } from 'design-system';
import { useEffect, useState } from 'react';

import { linkedInProfileURLRegex } from '~src/background';
import GoToLinkedInProfileCTA from '~src/components/GoToLinkedInProfileCTA/GoToLinkedInProfileCTA';

import '~style.css';

import openExtensionGif from 'data-base64:~assets/openExtensionTutorial.gif';

export default function Popup() {
  const [onLinkedInProfile, setOnLinkedInProfile] = useState<boolean>(true);
  const checkIfLinkedInProfile = async () => {
    const tab = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab[0]?.id) {
      setOnLinkedInProfile(false);
      return;
    }
    const { url } = await chrome.tabs.get(tab[0].id);
    if (url && url?.match(linkedInProfileURLRegex)) {
      setOnLinkedInProfile(true);
      return;
    }
    setOnLinkedInProfile(false);
  };

  useEffect(() => {
    checkIfLinkedInProfile();
  }, []);

  return onLinkedInProfile ? (
    <div className="plasmo-flex plasmo-flex-col plasmo-justify-between plasmo-bg-background-light plasmo-p-4 plasmo-w-96 plasmo-h-60">
      <BaseParagraph className="plasmo-text-grey-light plasmo-text-center">
        {'This is how to toggle the extension 👇 Enjoy!'}
      </BaseParagraph>
      <img
        src={openExtensionGif}
        alt="A tutorial on how to open the extension. Answer: by clicking on the floating bubble on the top right-hand corner of the screen"
      />
    </div>
  ) : (
    <div className="plasmo-flex plasmo-flex-col plasmo-justify-center plasmo-items-top plasmo-bg-background-light plasmo-p-0 plasmo-w-96 plasmo-h-52">
      <GoToLinkedInProfileCTA callback={() => window.close()} />
    </div>
  );
}
