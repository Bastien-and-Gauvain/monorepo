import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import type { Tables } from '~src/background/types/supabase';

import type { LinkedinProfilesService } from '../../linkedin_profiles/services/linkedinProfiles.service';
import type { NotionDatabasesService } from '../../notion_databases/services/notionDatabases.service';
import type { NotionService } from '../../notion/services/notion.service';
import { OnboardingStatus, type UserService } from '../../users/services/user.service';
import type { SaveOneCandidateProfileInput, UpdateOneCandidateProfileInput } from '../candidateProfiles.type';

enum OnboardingContent {
  CALLOUT_TEXT = 'Congratulations! These 1-click exports are going to save a lot of your time each week. We wanted to thank you, so here’s a quick vid to show you how to get the most out of the extension 👇',
  CALLOUT_ICON = '✨',
  VIDEO_URL = 'https://www.youtube.com/watch?v=vJfBo7rgl7o',
}

export class CandidateProfilesService {
  constructor(
    private readonly notionService: NotionService,
    private readonly userService: UserService,
    private readonly linkedinProfilesService: LinkedinProfilesService,
    private readonly notionDatabasesService: NotionDatabasesService
  ) {}

  async saveOneCandidateProfile({
    candidateProfile,
    userId,
    notion,
  }: SaveOneCandidateProfileInput): Promise<PageObjectResponse> {
    const notionPage = await this.notionService.createOneProfilePageInDatabase(notion.databaseId, candidateProfile);

    const user = await this.userService.getUserById(userId);
    if (user.onboarding_status === OnboardingStatus.CONNECTED_TO_NOTION) {
      await this.notionService.appendVideoToPage(
        notionPage.id,
        OnboardingContent.CALLOUT_TEXT,
        OnboardingContent.CALLOUT_ICON,
        OnboardingContent.VIDEO_URL
      );

      // Open a new tab with the newly created page
      const cleanDatabaseId = notion.databaseId.replaceAll('-', '');
      const cleanPageId = notionPage.id.replaceAll('-', '');
      chrome.tabs.create({ url: `https://www.notion.so/${cleanDatabaseId}?p=${cleanPageId}&pm=s`, active: true });

      await this.userService.updateOnboardingStatus(userId, OnboardingStatus.FIRST_PROFILE_SAVED);
    }

    await this.userService.incrementNumberProfilesSaved(userId); // to be removed

    let notionDatabase: Tables<'notion_databases'>;
    // we don't want to block the user if this fails
    try {
      notionDatabase = await this.notionDatabasesService.getOrCreateOneNotionDatabase({
        notion_id: notion.databaseId,
        user: userId,
      });
    } catch (error) {
      console.error(`saveOneCandidateProfile: couldn't create notion database ${JSON.stringify(error)}`);
      return notionPage as PageObjectResponse; // safe casting as in this situation it cannot be a PartialPageObjectResponse
    }

    // we don't want to block the user if this fails
    try {
      await this.linkedinProfilesService.createOneLinkedinProfile({
        saved_at: new Date().toISOString(),
        status: candidateProfile.status,
        status_updated_at: new Date().toISOString(),
        notion_database: notionDatabase.id,
        linkedin_url: candidateProfile.linkedinUrl,
        user: userId,
      });
    } catch (error) {
      console.error(`saveOneCandidateProfile:: couldn't create linkedin profile: ${error}`);
    }

    return notionPage as PageObjectResponse; // safe casting as in this situation it cannot be a PartialPageObjectResponse
  }

  async updateOneCandidateProfile({
    candidateProfile,
    userId,
    notion,
  }: UpdateOneCandidateProfileInput): Promise<PageObjectResponse> {
    const updatedCandidateProfile = await this.notionService.updateOneProfilePageInDatabase(
      notion.notionPageId,
      candidateProfile
    );

    if (!candidateProfile.status) {
      return updatedCandidateProfile;
    }

    try {
      // we don't want to block the user if this fails
      await this.linkedinProfilesService.updateLinkedinProfileStatus(candidateProfile.status, {
        linkedinUrl: candidateProfile.linkedinUrl,
        notionDatabaseId: notion.databaseId,
        userId: userId,
      });
    } catch (error) {
      console.error(`updateOneCandidateProfile:: couldn't update linkedin profile: ${error}`);
    }

    return updatedCandidateProfile;
  }
}

export default {};
