import { supabase } from '~core/supabase';
import type { Tables } from '~src/background/types/supabase';
import type { LinkedInProfileInformation } from '~src/contents/scrapers/linkedin-profile-scraper';

export enum OnboardingStatus {
  CONNECTED_TO_NOTION = 'CONNECTED_TO_NOTION',
  FIRST_PROFILE_SAVED = 'FIRST_PROFILE_SAVED',
  EXTENSION_PINNED = 'EXTENSION_PINNED',
}

export type LinkedInProfileInformationForSupabase = {
  first_name: string;
  last_name: string;
  job_title: string;
  company_name: string;
  location: string;
};

const transformLinkedInProfileInfoForSupabase = (
  userLinkedInProfileInfo: LinkedInProfileInformation
): LinkedInProfileInformationForSupabase => {
  const { name, jobTitle, company, location } = userLinkedInProfileInfo;

  return {
    first_name: name.firstName,
    last_name: name.lastName,
    job_title: jobTitle,
    company_name: company,
    location: location,
  };
};

export class UserService {
  constructor() {}

  /**
   * Get or create a user with the authenticated user ID
   * @param authenticatedUserId Authenticated user ID
   * @returns User
   */
  async getOrCreateUserWithAuthenticatedUserId(authenticatedUserId: string): Promise<Tables<'users'>> {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('authenticated_user', authenticatedUserId);
    if (error) {
      throw new Error(
        `getOrCreateUserWithAuthenticatedUserId: couldn't get user ${authenticatedUserId} - ${JSON.stringify(error)}`
      );
    }

    if (users.length > 0) {
      return users[0];
    }

    const { data: newUser, error: newUserError } = await supabase
      .from('users')
      .insert([
        {
          authenticated_user: authenticatedUserId,
          onboarding_status: OnboardingStatus.CONNECTED_TO_NOTION, // Assume that the user is connected to Notion because they just logged in
        },
      ])
      .select();
    if (newUserError || !newUser) {
      throw new Error(
        `getOrCreateUserWithAuthenticatedUserId: couldn't create public user for ${authenticatedUserId} - ${JSON.stringify(
          newUserError
        )}`
      );
    }

    return newUser[0];
  }

  /**
   * Update the onboarding status of a user
   * @param id User ID
   * @param onboardingStatus Onboarding status
   * @returns User
   */
  async updateOnboardingStatus(id: string, onboardingStatus: OnboardingStatus): Promise<Tables<'users'>> {
    const { data: user, error } = await supabase
      .from('users')
      .update({ onboarding_status: onboardingStatus })
      .eq('id', id)
      .select('*');

    if (error) {
      throw new Error(`updateOnboardingStatus: couldn't update user ${id} - ${JSON.stringify(error)}`);
    }

    return user[0];
  }

  /**
   * Increment the number of profiles saved by a user
   * @param id User ID
   * @param numberProfilesSaved Number of profiles saved
   * @returns User
   */
  async incrementNumberProfilesSaved(id: string): Promise<Tables<'users'>> {
    const { error } = await supabase.rpc('increment_number_profiles_saved', { row_id: id });

    if (error) {
      throw new Error(
        `updateOnboardingStatus: couldn't increment user's nb of profiles saved counter ${id} - ${JSON.stringify(
          error
        )}`
      );
    }

    return;
  }

  /**
   * Update the linkedin profile info of a user
   * @param id User ID
   * @param userLinkedInProfileInfo the linkedin profile info of the user to put in supabase
   * @returns User
   */
  async updateUserLinkedInProfileInfo(
    id: string,
    userLinkedInProfileInfo: LinkedInProfileInformation
  ): Promise<Tables<'users'>> {
    const userLinkedInProfileInfoForSupabase = transformLinkedInProfileInfoForSupabase(userLinkedInProfileInfo);
    const { data: user, error } = await supabase
      .from('users')
      .update(userLinkedInProfileInfoForSupabase)
      .eq('id', id)
      .select('*');

    if (error) {
      throw new Error(
        `updateUserLinkedInProfileInfo: couldn't update linkedin profile info of user ${id} - ${JSON.stringify(error)}`
      );
    }

    return user[0];
  }

  /**
   * Get a user by its ID
   * @param id User ID
   * @returns User
   */
  async getUserById(id: string): Promise<Tables<'users'>> {
    const { data: user, error } = await supabase.from('users').select('*').eq('id', id);

    if (error) {
      throw new Error(`getOneUser: couldn't get user ${id} - ${JSON.stringify(error)}`);
    }

    return user[0];
  }
}

export default {};
