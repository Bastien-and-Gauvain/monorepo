import cssText from 'data-text:~style.css';
import type { PlasmoCSConfig, PlasmoGetStyle } from 'plasmo';
import { useEffect, useState } from 'react';

import { sendToBackground } from '@plasmohq/messaging';

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
  const [user, setUser] = useState(null);
  console.log('🔥 ・ LinkedinNotionSidePanel ・ user:', user);

  useEffect(() => {
    const getUser = async () => {
      console.log('🔥 ・ onClickHandler ・ onClickHandler:', 'YO');
      const resp = await sendToBackground({
        name: 'users/resolvers/get-user',
        body: {
          jwt: 'e4819e8f-32a2-496a-b767-def00c30447e',
        },
      });
      setUser(resp);
    };

    if (isOpen) {
      getUser();
    }
  }, [isOpen]);

  const handleOAuthLogin = async (provider: Provider, scopes = 'email') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        scopes,
        redirectTo: location.href,
      },
    });
  };

  // Listen the icon onClick message from the background script
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg === 'toggleLinkedInNotionSidePanel') {
      return setIsOpen(!isOpen);
    }

    if (msg === 'closeSidePanels') {
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
