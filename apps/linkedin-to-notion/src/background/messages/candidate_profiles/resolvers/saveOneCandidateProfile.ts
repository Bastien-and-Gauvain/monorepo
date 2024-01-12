import type { CreatePageResponse } from '@notionhq/client/build/src/api-endpoints';

import type { PlasmoMessaging } from '@plasmohq/messaging';

import { LinkedinProfilesService } from '../../linkedin_profiles/services/linkedinProfiles.service';
import { NotionDatabasesService } from '../../notion_databases/services/notionDatabases.service';
import { NotionProvider } from '../../notion/providers/notion.provider';
import { NotionService } from '../../notion/services/notion.service';
import { UserService } from '../../users/services/user.service';
import type { SaveOneCandidateProfileInput } from '../candidateProfiles.type';
import { CandidateProfilesService } from '../services/candidateProfiles.service';

const handler: PlasmoMessaging.MessageHandler<SaveOneCandidateProfileInput, CreatePageResponse> = async (req, res) => {
  const notionProvider = new NotionProvider(req.body.notion.accessToken);
  const notionService = new NotionService(notionProvider);
  const userService = new UserService();
  const notionDatabasesService = new NotionDatabasesService(notionService);
  const linkedinProfilesService = new LinkedinProfilesService(notionDatabasesService);

  const candidateProfilesService = new CandidateProfilesService(
    notionService,
    userService,
    linkedinProfilesService,
    notionDatabasesService
  );
  const savedProfile = await candidateProfilesService.saveOneCandidateProfile(req.body);

  res.send(savedProfile);
};

export default handler;
