import type { Provider, User } from '@supabase/supabase-js';
import cssText from 'data-text:~style.css';
import type { PlasmoCSConfig, PlasmoGetStyle } from 'plasmo';
import { useEffect, useState } from 'react';

import { sendToBackground } from '@plasmohq/messaging';
import { Storage } from '@plasmohq/storage';
import { useStorage } from '@plasmohq/storage/hook';

import { supabase } from '~core/supabase';

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
  const [user, setUser] = useStorage<User>({
    key: 'user',
    instance: new Storage({
      area: 'local',
    }),
  });

  useEffect(() => {
    async function init() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error(error);
        return;
      }
      if (data.session) {
        setUser(data.session.user);
        sendToBackground({
          name: 'users/resolvers/init-session',
          body: {
            refresh_token: data.session.refresh_token,
            access_token: data.session.access_token,
          },
        });
      }
    }

    init();
  }, []);

  const handleOAuthLogin = async (provider: Provider, scopes = 'email') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.href,
        scopes,
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
      isLoggedIn={!!user?.id}
      loginCallback={() => handleOAuthLogin('notion')}
      logoutCallBack={() => [supabase.auth.signOut(), setUser(null)]}
      onCloseCallback={() => setIsOpen(false)}
      id="linkedin-to-notion-side-panel"
    />
  );
};

export default LinkedinNotionSidePanel;
