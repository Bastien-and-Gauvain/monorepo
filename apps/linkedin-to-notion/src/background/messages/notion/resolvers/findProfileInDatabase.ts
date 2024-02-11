import type { PlasmoMessaging } from '@plasmohq/messaging';

import type { Nullable } from '~core/shared.types';

import type { NotionProfileInformation } from '../notion.type';
import { NotionProvider } from '../providers/notion.provider';

const handler: PlasmoMessaging.MessageHandler<
  {
    notionToken: string;
    databaseId: string;
    linkedinUrl: string;
  },
  Nullable<NotionProfileInformation>
> = async (req, res) => {
  if (!req.body) {
    throw new Error('Request body is required');
  }
  const notionService = new NotionProvider(req.body.notionToken);
  const profile = await notionService.findProfileInDatabase(req.body.databaseId, req.body.linkedinUrl);

  res.send(profile);
};

export default handler;
