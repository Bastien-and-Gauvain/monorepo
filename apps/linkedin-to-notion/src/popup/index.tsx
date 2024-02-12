import { BaseParagraph } from 'design-system';
import { useEffect, useState } from 'react';

import { linkedInProfileURLRegex } from '~src/background';
import GoToLinkedInProfileCTA from '~src/components/GoToLinkedInProfileCTA/GoToLinkedInProfileCTA';

import '~style.css';

export default function Popup() {
  const [onLinkedInProfile, setOnLinkedInProfile] = useState<boolean>(true);
  const checkIfLinkedInProfile = async () => {
    const [{ id }] = await chrome.tabs.query({ active: true, currentWindow: true });
    const { url } = await chrome.tabs.get(id);
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
    <div className="plasmo-flex plasmo-justify-center plasmo-items-center plasmo-bg-background-light plasmo-p-0 plasmo-text-lg plasmo-w-32 plasmo-h-12">
      <BaseParagraph className="plasmo-bg-background-light plasmo-font-semibold">{'Enjoy 🎉'}</BaseParagraph>
    </div>
  ) : (
    <div className="plasmo-flex plasmo-flex-col plasmo-justify-center plasmo-items-top plasmo-bg-background-light plasmo-p-0 plasmo-w-96 plasmo-h-52">
      <GoToLinkedInProfileCTA callback={() => window.close()} />
    </div>
  );
}
