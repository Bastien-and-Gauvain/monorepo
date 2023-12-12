import { supabase } from '~core/supabase';
import type { Tables } from '~src/background/types/supabase';

export enum OnboardingStatus {
  CONNECTED_TO_NOTION = 'CONNECTED_TO_NOTION',
  FIRST_PROFILE_SAVED = 'FIRST_PROFILE_SAVED',
  EXTENSION_PINNED = 'EXTENSION_PINNED',
}

export class UserService {
  constructor() {}

  async getOrCreateUserWithAuthenticatedUserId(authenticatedUserId: string): Promise<Tables<'users'>> {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('authenticated_user', authenticatedUserId);

    if (error) {
      console.error(
        `UserService - upsertUser: couldn't get user ${authenticatedUserId}. Error: ${JSON.stringify(error)}`
      );
      throw new Error(`UserService - upsertUser: couldn't get user ${authenticatedUserId}`);
    }

    if (users.length > 0) {
      return users[0];
    }

    const { data: newUser, error: newUserError } = await supabase.from('users').insert([
      {
        authenticated_user: authenticatedUserId,
        onboarding_status: OnboardingStatus.CONNECTED_TO_NOTION, // Assume that the user is connected to Notion because they just logged in
      },
    ]);

    if (newUserError || !newUser) {
      console.error(
        `UserService - upsertUser: couldn't create public user for ${authenticatedUserId}. Error: ${JSON.stringify(
          newUserError
        )}`
      );
      throw new Error(`UserService - upsertUser: couldn't create public user for ${authenticatedUserId}`);
    }

    return newUser[0];
  }

  async updateOnboardingStatus(id: string, onboardingStatus: OnboardingStatus): Promise<Tables<'users'>> {
    const { data: user, error } = await supabase
      .from('users')
      .update({ onboarding_status: onboardingStatus })
      .eq('id', id)
      .select('*');

    if (error) {
      console.error(
        `UserService - updateOnboardingStatus: couldn't update user ${id}. Error: ${JSON.stringify(error)}`
      );
      throw new Error(`UserService - updateOnboardingStatus: couldn't update user ${id}`);
    }

    return user[0];
  }
}

export default {};
