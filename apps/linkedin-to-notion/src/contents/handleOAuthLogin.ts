import type { Provider } from '@supabase/supabase-js';

import { supabase } from '~core/supabase';

/**
 * Handle OAuth login with Supabase
 * @param provider OAuth provider
 * @param redirectUrl Redirect URL
 * @param scopes OAuth scopes
 * @returns
 */
export const handleOAuthLogin = async (
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
