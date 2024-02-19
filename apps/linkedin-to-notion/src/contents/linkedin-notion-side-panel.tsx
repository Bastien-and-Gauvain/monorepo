import cssText from 'data-text:~style.css';
import type { PlasmoCSConfig, PlasmoGetStyle } from 'plasmo';
import { useEffect, useState } from 'react';

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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(true);

  const { notionToken } = useSupabaseSession();

  useEffect(() => {
    if (notionToken) {
      setIsLoggedIn(true);
    }
  }, [notionToken]);

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
      onOpenCallback={() => setIsOpen(true)}
      id="linkedin-to-notion-side-panel"
    />
  );
};

export default LinkedinNotionSidePanel;
