import type { Session } from '@supabase/supabase-js';
import cssText from 'data-text:~style.css';
import type { PlasmoCSConfig, PlasmoGetStyle } from 'plasmo';
import { useEffect } from 'react';

import { sendToBackground } from '@plasmohq/messaging';
import { useStorage } from '@plasmohq/storage/hook';

import { supabase } from '~core/supabase';
import type { Tables } from '~src/background/types/supabase';

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

  const [selectedNotionDatabase, setSelectedNotionDatabase] = useStorage<string | null>('selectedNotionDatabase');
  selectedNotionDatabase; // to remove ts error

  const [user, setUser] = useStorage<Tables<'users'>>('user');
  const [session, setSession] = useStorage<Session | null>('session');

  useEffect(() => {
    const initSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    const initUser = async () => {
      const userData = await sendToBackground<
        {
          authenticatedUserId: string;
        },
        Tables<'users'>
      >({
        name: 'users/resolvers/getOrCreateUserWithAuthenticatedUserId',
        body: { authenticatedUserId: session.user.id },
      });
      setUser(userData);
    };

    if (!session || session?.expires_at < Date.now()) {
      initSession();
    }

    if (session?.user && !user) {
      initUser();
    }
  }, [session]);

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
      isLoggedIn={!!session?.provider_token}
      loginCallback={() =>
        handleOAuthLogin('notion', {
          redirectUrl: window.location.href.match(/https:\/\/[a-z]{2,3}\.linkedin\.com\/in\/[^/]+\//)[0],
        })
      }
      logoutCallBack={async () => {
        setSelectedNotionDatabase(null);
        setUser(null);
        setSession(null);
        await supabase.auth.signOut();
      }}
      onCloseCallback={() => setIsOpen(false)}
      id="linkedin-to-notion-side-panel"
    />
  );
};

export default LinkedinNotionSidePanel;
