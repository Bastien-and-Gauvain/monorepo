import { BaseParagraph } from 'design-system';
import { useEffect, useState } from 'react';

import { linkedInURLRegex } from '~src/background';
import { GoBackToLinkedInContent } from '~src/components/GoBackToLinkedIn/GoBackToLinkedIn';

import '~style.css';

export default function Popup() {
  const [isLinkedIn, setIsLinkedIn] = useState<boolean>(false);
  const [linkedInNotionSidePanelStatus, setLinkedInNotionSidePanelStatus] = useState<boolean>(false);

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.name === 'linkedInNotionSidePanelStatus') {
      setLinkedInNotionSidePanelStatus(msg.body.isOpen);
    }
  });

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const url = tabs[0].url;
      if (url.match(linkedInURLRegex)) {
        setIsLinkedIn(true);
        await chrome.tabs.sendMessage(tabs[0].id, 'toggleLinkedInNotionSidePanel'); // Message sent to the content and not to the background
      }
    });
  }, []);

  return (
    <div
      className={`plasmo-p-2 plasmo-w-${!isLinkedIn ? 52 : 40} plasmo-h-${
        !isLinkedIn ? 32 : 20
      } plasmo-flex plasmo-justify-center plasmo-items-center`}>
      {!isLinkedIn ? (
        <GoBackToLinkedInContent />
      ) : (
        <BaseParagraph className="plasmo-font-bold">
          {linkedInNotionSidePanelStatus ? 'Enjoy 🎉' : 'Goodbye 👋'}
        </BaseParagraph>
      )}
    </div>
  );
}
