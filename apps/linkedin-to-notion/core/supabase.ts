import { createClient, type Provider, type Session } from '@supabase/supabase-js';
import { useEffect } from 'react';

import { Storage } from '@plasmohq/storage';
import { useStorage } from '@plasmohq/storage/hook';

import type { Nullable } from './shared.types';

const storage = new Storage({
  area: 'local',
});

export const supabase = createClient(
  process.env['PLASMO_PUBLIC_SUPABASE_URL'] || '',
  process.env['PLASMO_PUBLIC_SUPABASE_KEY'] || '',
  {
    auth: {
      storage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      storageKey: 'session',
    },
  }
);

/**
 * Custom hook to get the session from Supabase and the Notion token
 * If the session is not found, it will return null
 * If the notion token is not found, it will return null
 * @returns The session from Supabase and the Notion token
 */
export const useSupabaseSession = (): { session: Nullable<Session>; notionToken: Nullable<string> } => {
  const [session, setSession] = useStorage<Nullable<Session>>({
    key: 'session',
    instance: storage,
  });

  const [notionToken, setNotionToken] = useStorage<Nullable<string>>({
    key: 'notionToken',
    instance: storage,
  });

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session?.provider_token && !notionToken) {
        setNotionToken(data.session.provider_token);
      }

      if (!data.session?.expires_at && !notionToken) {
        setSession(null);
      }

      setSession(data.session);
    };

    getSession();
  }, []);

  // return only if the session is not null
  return { session, notionToken };
};

/**
 * Handle OAuth login with Supabase
 * @param provider OAuth provider
 * @param redirectUrl Redirect URL
 * @param scopes OAuth scopes
 * @returns
 */
export const signInWithOAuth = async (
  provider: Provider,
  options: { redirectUrl?: string; scopes?: string; skipBrowserRedirect?: boolean }
): Promise<
  | {
      provider: Provider;
      url: string;
    }
  | {
      provider: Provider;
      url: null;
    }
> => {
  const { data } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: options.redirectUrl,
      scopes: options.scopes,
      skipBrowserRedirect: options.skipBrowserRedirect,
    },
  });

  return data;
};
