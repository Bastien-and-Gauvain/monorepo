import { BaseParagraph, cn } from 'design-system';
import { useEffect, useState } from 'react';

import { linkedInProfileURLRegex } from '~src/background';
import { GoBackToLinkedInProfile } from '~src/components/GoBackToLinkedInProfile/GoBackToLinkedInProfile';

import '~style.css';

export default function Popup() {
  const [isLinkedInProfile, setIsLinkedInProfile] = useState<boolean>(false);
  const [linkedInNotionSidePanelStatus, setLinkedInNotionSidePanelStatus] = useState<boolean>(false);

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.name === 'linkedInNotionSidePanelStatus') {
      setLinkedInNotionSidePanelStatus(msg.body.isOpen);
    }
  });

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const url = tabs[0].url;
      if (url.match(linkedInProfileURLRegex)) {
        setIsLinkedInProfile(true);
        await chrome.tabs.sendMessage(tabs[0].id, 'openLinkedInNotionSidePanel'); // Message sent to the content and not to the background
      }
    });
  }, []);

  return (
    <div
      className={cn(
        'plasmo-flex plasmo-justify-center plasmo-items-top plasmo-bg-background-light plasmo-p-0 plasmo-text-lg',
        !isLinkedInProfile ? 'plasmo-w-96 plasmo-h-48' : 'plasmo-w-24 plasmo-h-6'
      )}>
      {!isLinkedInProfile ? (
        <GoBackToLinkedInProfile callback={() => setIsLinkedInProfile(true)} />
      ) : (
        <BaseParagraph className="plasmo-bg-background-light plasmo-font-semibold">
          {linkedInNotionSidePanelStatus ? 'Enjoy 🎉' : 'Goodbye 👋'}
        </BaseParagraph>
      )}
    </div>
  );
}
