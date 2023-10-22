import type { Provider, User } from '@supabase/supabase-js';
import cssText from 'data-text:~style.css';
import type { PlasmoCSConfig, PlasmoGetOverlayAnchor, PlasmoGetStyle } from 'plasmo';
import { useEffect, useState } from 'react';

import { sendToBackground } from '@plasmohq/messaging';
import { Storage } from '@plasmohq/storage';
import { useStorage } from '@plasmohq/storage/hook';
import { SecureStorage } from '@plasmohq/storage/secure';

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

  const storeEntriesSecurely = async (key: string, value: Record<string, string>): Promise<void> => {
    const storage = new SecureStorage({ area: 'local' });
    await storage.setPassword('napoleon');
    await storage.set(key, value);
  };

  useEffect(() => {
    async function init() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error(error);
        return;
      }
      if (data.session) {
        setUser(data.session.user);

        // There's one thing we're specifically interested in in the data.session object
        // It's the provider_token (i.e notion's api access token in this case)
        // This token is necessary to make api calls to notion elsewhere in the app
        // There's no way to retrieve this token if we don't save it here
        // However, it's only available in the session object when the user logs in, not afterwards
        // So, to make sure it's stored once and not erased afterwards, we store it in the secure storage
        // after assessing it's in data.session
        if (data.session.provider_token) {
          storeEntriesSecurely('notionToken', {
            accessToken: data.session.provider_token,
            refreshToken: data.session.refresh_token,
          });
        }

        sendToBackground({
          name: 'sessions/resolvers/init-session',
          body: {
            refresh_token: data.session.refresh_token,
            access_token: data.session.access_token,
          },
        });
      }
    }

    init();
  }, []);

  const handleOAuthLogin = async (provider: Provider, scopes?: string) => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.href.match(/https:\/\/[a-z]{2,3}\.linkedin\.com\/in\/[^/]+\//)[0],
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
