import type { User } from '@supabase/supabase-js';
import cssText from 'data-text:~style.css';
import type { PlasmoCSConfig, PlasmoGetStyle } from 'plasmo';
import { useEffect } from 'react';

import { useStorage } from '@plasmohq/storage/hook';

import { supabase } from '~core/supabase';

import { LinkedInNotionSidePanelContent } from '../components/LinkedInNotionSidePanel/LinkedInNotionSidePanelContent';
import { handleOAuthLogin } from './handleOAuthLogin';

export const config: PlasmoCSConfig = {
  matches: ['https://www.linkedin.com/*'],
  all_frames: false,
};

// Needed for the style directly applied to the iFramedSidePanel
export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement('style');
  style.textContent = cssText;
  return style;
};

const LinkedinNotionSidePanel = () => {
  const [isOpen, setIsOpen] = useStorage('linkedInNotionSidePanelIsOpen', false);
  const [user, setUser] = useStorage<User>('user');
  const [selectedNotionDatabase, setSelectedNotionDatabase] = useStorage<string>('selectedNotionDatabase');
  selectedNotionDatabase; // to remove ts error
  const [notionToken, setNotionToken] = useStorage<{
    refreshToken: string;
    accessToken: string;
  }>('notionToken');
  notionToken; // to remove ts error

  useEffect(() => {
    async function init() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
        return;
      }

      setUser(data.session.user);

      setNotionToken({
        accessToken: data.session.provider_token,
        refreshToken: data.session.refresh_token,
      });
    }

    init();
  }, []);

  // Listen the icon onClick message from the background script
  chrome.runtime.onMessage.addListener(async (msg) => {
    if (msg === 'toggleLinkedInNotionSidePanel') {
      setIsOpen(!isOpen);
      await chrome.runtime.sendMessage({ name: 'linkedInNotionSidePanelStatus', body: { isOpen: !isOpen } });
    }

    if (msg === 'closeSidePanels') {
      setIsOpen(false);
      await chrome.runtime.sendMessage({ name: 'linkedInNotionSidePanelStatus', body: { isOpen: !isOpen } });
    }
  });

  return (
    <LinkedInNotionSidePanelContent
      isOpen={isOpen}
      isLoggedIn={!!user?.id}
      loginCallback={() =>
        handleOAuthLogin('notion', window.location.href.match(/https:\/\/[a-z]{2,3}\.linkedin\.com\/in\/[^/]+\//)[0])
      }
      logoutCallBack={() => [
        supabase.auth.signOut(),
        setUser(null),
        setSelectedNotionDatabase(''),
        setNotionToken(null),
      ]}
      onCloseCallback={() => setIsOpen(false)}
      id="linkedin-to-notion-side-panel"
    />
  );
};

export default LinkedinNotionSidePanel;
