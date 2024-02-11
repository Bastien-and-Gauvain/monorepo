import { useEffect, useState } from 'react';

import { sendToBackground } from '@plasmohq/messaging';
import { Storage } from '@plasmohq/storage';

import type { Nullable } from '~core/shared.types';
import { useSupabaseSession } from '~core/supabase';
import type { Tables } from '~src/background/types/supabase';

/**
 * Get the user from the database or the cache, and save it in the cache
 * setUser only updates the user in the cache
 * @param connection The connection type, 'network-only' or 'cache-first'
 * @returns The user and the setUser function
 */
export const useGetUser = (
  connection: 'network-only' | 'cache-first' = 'cache-first'
): [Nullable<Tables<'users'>>, (user: Nullable<Tables<'users'>>) => void] => {
  const { session } = useSupabaseSession();
  const [user, setUser] = useState<Nullable<Tables<'users'>>>();

  useEffect(() => {
    const getUser = async () => {
      const storage = new Storage();
      let cachedUser: Nullable<Tables<'users'>>;

      if (connection === 'cache-first') {
        cachedUser = await storage.get<Nullable<Tables<'users'>>>('user');
        if (cachedUser) {
          setUser(cachedUser);
        }
      }

      if (!cachedUser) {
        if (!session) {
          console.error('No session found');
          return;
        }
        const userData = await sendToBackground<
          {
            authenticatedUserId: string;
          },
          Tables<'users'>
        >({
          name: 'users/resolvers/getOrCreateUserWithAuthenticatedUserId',
          body: { authenticatedUserId: session.user.id },
        });
        await storage.set('user', userData);
        setUser(userData);
      }
    };

    getUser();
  }, [session]);

  return [user, setUser];
};
