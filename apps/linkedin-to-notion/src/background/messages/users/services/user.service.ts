import { supabase } from '~core/supabase';

export default class UserService {
  constructor() {}

  async getUser(jwt?: string) {
    const user = await supabase.auth.getUser(jwt);
    return user;
  }
}
