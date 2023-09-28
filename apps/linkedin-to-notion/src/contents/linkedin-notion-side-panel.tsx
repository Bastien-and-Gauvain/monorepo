import cssText from 'data-text:~style.css';
import type { PlasmoCSConfig, PlasmoGetStyle } from 'plasmo';
import { useState } from 'react';

import { LinkedInNotionSidePanelContent } from '../components/LinkedInNotionSidePanel/LinkedInNotionSidePanelContent';

export const config: PlasmoCSConfig = {
  matches: ['https://www.linkedin.com/in/*'],
  all_frames: false,
};

// Needed for the style directly applied to the iFramedSidePanel
export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement('style');
  style.textContent = cssText;
  return style;
};

const LinkedinNotionSidePanel = () => {
  const [isOpen, setIsOpen] = useState(true); // set-back to false before deployment

  // Listen the icon onClick message from the background script
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg === 'toggleLinkedInNotionSidePanel') {
      return setIsOpen(!isOpen);
    }

    if (msg === 'closeLinkedInNotionSidePanel') {
      return setIsOpen(false);
    }
  });

  return (
    <LinkedInNotionSidePanelContent
      isOpen={isOpen}
      onCloseCallback={() => setIsOpen(false)}
      id="linkedin-to-notion-side-panel"
    />
  );
};

export default LinkedinNotionSidePanel;