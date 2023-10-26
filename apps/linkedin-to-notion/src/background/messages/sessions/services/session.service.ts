import { supabase } from '~core/supabase';

export class SessionService {
  constructor() {}

  async initSession(currentSession: { access_token: string; refresh_token: string }) {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
    });

    return await supabase.auth.setSession(currentSession);
  }
}

export default {};
