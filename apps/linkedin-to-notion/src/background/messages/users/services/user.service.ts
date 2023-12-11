import { supabase } from '~core/supabase';
import type { Tables } from '~src/background/types/supabase';

export enum OnboardingStatus {
  NOT_STARTED = 'NOT_STARTED',
  CONNECTED_TO_NOTION = 'CONNECTED_TO_NOTION',
  FIRST_PROFILE_SAVED = 'FIRST_PROFILE_SAVED',
  EXTENSION_PINNED = 'EXTENSION_PINNED',
}

export class UserService {
  constructor() {}

  getOrCreateUser = async (authenticatedUserId: string): Promise<Tables<'users'>> => {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('authenticated_user', authenticatedUserId);

    if (error) {
      console.error(
        `UserService - getOrCreateUser: couldn't get user ${authenticatedUserId}. Error: ${JSON.stringify(error)}`
      );
      throw new Error(`UserService - getOrCreateUser: couldn't get user ${authenticatedUserId}`);
    }

    if (users.length > 0) {
      return users[0];
    }

    const { data: newUser, error: newUserError } = await supabase.from('users').insert([
      {
        authenticated_user: authenticatedUserId,
        onboarding_status: OnboardingStatus.NOT_STARTED,
      },
    ]);

    if (newUserError || !newUser) {
      console.error(
        `UserService - getOrCreateUser: couldn't create public user for ${authenticatedUserId}. Error: ${JSON.stringify(
          newUserError
        )}`
      );
      throw new Error(`UserService - getOrCreateUser: couldn't create public user for ${authenticatedUserId}`);
    }

    return newUser[0];
  };
}

export default {};
