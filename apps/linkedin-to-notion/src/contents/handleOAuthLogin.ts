import type { Provider } from '@supabase/supabase-js';

import { supabase } from '~core/supabase';

/**
 * Handle OAuth login with Supabase
 * @param provider OAuth provider
 * @param redirectUrl Redirect URL
 * @param scopes OAuth scopes
 * @returns
 */
export const handleOAuthLogin = async (provider: Provider, redirectUrl: string, scopes?: string): Promise<void> => {
  await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
      scopes,
    },
  });
};
