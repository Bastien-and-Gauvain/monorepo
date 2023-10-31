import type { PlasmoMessaging } from '@plasmohq/messaging';

import type { ErrorResponse, NotionProfileInformation } from '../notion.type';
import { NotionProvider } from '../providers/notion.provider';

const handler: PlasmoMessaging.MessageHandler<
  {
    notionToken: string;
    databaseId: string;
    linkedinUrl: string;
  },
  NotionProfileInformation | ErrorResponse
> = async (req, res) => {
  const notionService = new NotionProvider(req.body.notionToken);
  const profile = await notionService.findProfileInDatabase(req.body.databaseId, req.body.linkedinUrl);

  res.send(profile);
};

export default handler;
