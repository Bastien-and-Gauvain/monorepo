import cssText from 'data-text:~style.css';
import type { PlasmoCSConfig, PlasmoGetStyle } from 'plasmo';
import { useState } from 'react';

import { GoBackToLinkedInContent } from '../components/GoBackToLinkedIn/GoBackToLinkedIn';

export const config: PlasmoCSConfig = {
  matches: ['<all_urls>'],
  all_frames: false,
};

// Needed for the style directly applied to the iFramedSidePanel
export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement('style');
  style.textContent = cssText;
  return style;
};

const GoBackToLinkedInSidePanel = () => {
  const [isOpen, setIsOpen] = useState(false); // set-back to false before deployment

  // Listen the icon onClick message from the background script
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg === 'toggleGoBackToLinkedInSidePanel') {
      return setIsOpen(!isOpen);
    }

    if (msg === 'closeSidePanels') {
      return setIsOpen(false);
    }
  });

  return (
    <GoBackToLinkedInContent
      isOpen={isOpen}
      onCloseCallback={() => setIsOpen(false)}
      id="go-back-to-linkedin-side-panel"
    />
  );
};

export default GoBackToLinkedInSidePanel;
