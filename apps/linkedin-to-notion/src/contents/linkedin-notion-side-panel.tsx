import cssText from 'data-text:~style.css';
import type { PlasmoCSConfig, PlasmoGetStyle } from 'plasmo';
import { useEffect, useState } from 'react';

import { useStorage } from '@plasmohq/storage/hook';

import { clearLocalStorage } from '~core/storage';
import { signInWithOAuth, supabase, useSupabaseSession } from '~core/supabase';

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
  // Open the extension by default because we know that the user is on a LinkedIn profile
  const [isOpen, setIsOpen] = useStorage('linkedInNotionSidePanelIsOpen', true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { notionToken } = useSupabaseSession();

  useEffect(() => {
    if (notionToken) {
      setIsLoggedIn(true);
    }
  }, [notionToken]);

  // Listen the icon onClick message from the background script
  chrome.runtime.onMessage.addListener(async (msg) => {
    if (msg === 'openLinkedInNotionSidePanel') {
      setIsOpen(true);
      await chrome.runtime.sendMessage({ name: 'linkedInNotionSidePanelStatus', body: { isOpen: true } });
    }

    if (msg === 'toggleLinkedInNotionSidePanel') {
      setIsOpen(!isOpen);
      await chrome.runtime.sendMessage({ name: 'linkedInNotionSidePanelStatus', body: { isOpen: !isOpen } });
    }

    if (msg === 'closeSidePanels') {
      setIsOpen(false);
      await chrome.runtime.sendMessage({ name: 'linkedInNotionSidePanelStatus', body: { isOpen: false } });
    }
  });

  return (
    <LinkedInNotionSidePanelContent
      isOpen={isOpen}
      isLoggedIn={isLoggedIn}
      loginCallback={() =>
        signInWithOAuth('notion', {
          redirectUrl: window.location.href.match(/https:\/\/[a-z]{2,3}\.linkedin\.com\/in\/[^/]+\//)?.[0],
        })
      }
      logoutCallBack={async () => {
        await clearLocalStorage();
        await supabase.auth.signOut();
        setIsLoggedIn(false);
      }}
      onCloseCallback={() => setIsOpen(false)}
      id="linkedin-to-notion-side-panel"
    />
  );
};

export default LinkedinNotionSidePanel;
