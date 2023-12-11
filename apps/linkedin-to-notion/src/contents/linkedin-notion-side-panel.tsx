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

  const [notionToken, setNotionToken] = useStorage<{
    refreshToken: string;
    accessToken: string;
  }>('notionToken');
  notionToken; // to remove ts error

  const [selectedNotionDatabase, setSelectedNotionDatabase] = useStorage<string>('selectedNotionDatabase');
  selectedNotionDatabase; // to remove ts error

  useEffect(() => {
    const initSession = async () => {
      const { data } = await supabase.auth.getSession();

      setNotionToken({
        accessToken: data.session.provider_token,
        refreshToken: data.session.refresh_token,
      });
    };

    initSession();
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
      isLoggedIn={!!notionToken?.accessToken}
      loginCallback={() =>
        handleOAuthLogin('notion', {
          redirectUrl: window.location.href.match(/https:\/\/[a-z]{2,3}\.linkedin\.com\/in\/[^/]+\//)[0],
        })
      }
      logoutCallBack={async () => {
        setSelectedNotionDatabase('');
        setNotionToken({
          accessToken: '',
          refreshToken: '',
        });
        await supabase.auth.signOut();
      }}
      onCloseCallback={() => setIsOpen(false)}
      id="linkedin-to-notion-side-panel"
    />
  );
};

export default LinkedinNotionSidePanel;
