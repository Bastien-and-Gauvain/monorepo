import type { Provider, User } from '@supabase/supabase-js';
import { useEffect } from 'react';

import { sendToBackground } from '@plasmohq/messaging';
import { Storage } from '@plasmohq/storage';
import { useStorage } from '@plasmohq/storage/hook';

import { supabase } from '~core/supabase';

function IndexOptions() {
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
          name: 'init-session',
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
        scopes,
      },
    });
  };

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        top: 240,
        position: 'relative',
      }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 240,
          justifyContent: 'space-between',
          gap: 4.2,
        }}>
        {user && (
          <>
            <h3>
              {user.email} - {user.id}
            </h3>
            <button
              onClick={() => {
                supabase.auth.signOut();
                setUser(null);
              }}>
              Logout
            </button>
          </>
        )}
        {!user && (
          <button
            onClick={() => {
              handleOAuthLogin('notion');
            }}>
            Sign in with Notion
          </button>
        )}
      </div>
    </main>
  );
}

export default IndexOptions;
