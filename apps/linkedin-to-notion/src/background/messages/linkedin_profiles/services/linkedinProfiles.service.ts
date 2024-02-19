import { supabase } from '~core/supabase';
import type { Tables, TablesInsert } from '~src/background/types/supabase';

import type { CandidateStatus } from '../../candidate_profiles/candidateProfiles.type';
import type { NotionDatabasesService } from '../../notion_databases/services/notionDatabases.service';

export class LinkedinProfilesService {
  constructor(private readonly notionDatabasesService: NotionDatabasesService) {}

  /**
   * Save one linkedin profile in our DB
   * @param linkedinProfile Linkedin profile
   * @returns Linkedin profile
   */
  async createOneLinkedinProfile(
    linkedinProfile: TablesInsert<'linkedin_profiles'>
  ): Promise<Tables<'linkedin_profiles'>> {
    const { data, error } = await supabase.from('linkedin_profiles').insert([linkedinProfile]).select();
    if (error) {
      throw new Error(`createOneLinkedinProfile:: couldn't save linkedin profile: ${JSON.stringify(error)}`);
    }

    return data[0];
  }

  /**
   * Update one linkedin profile in our DB
   */
  async updateLinkedinProfileStatus(
    status: CandidateStatus,
    profileIdentifier: { linkedinUrl: string; userId: string; notionDatabaseId: string }
  ): Promise<void> {
    const notionDatabaseId = await this.notionDatabasesService.getOrCreateOneNotionDatabase({
      notion_id: profileIdentifier.notionDatabaseId,
    });

    const { data: existingLinkedInProfile, error } = await supabase
      .from('linkedin_profiles')
      .select('status, id')
      .eq('linkedin_url', profileIdentifier.linkedinUrl)
      .eq('user', profileIdentifier.userId)
      .eq('notion_database', notionDatabaseId.id);
    if (error) {
      throw new Error(`updateLinkedinProfileStatus:: couldn't get linkedin profile: ${JSON.stringify(error)}`);
    }

    if (existingLinkedInProfile?.[0]?.status && existingLinkedInProfile[0].status !== status) {
      await supabase
        .from('linkedin_profiles')
        .update({ status, status_updated_at: new Date().toISOString() })
        .eq('id', existingLinkedInProfile[0].id);
    }
  }
}

export default {};
