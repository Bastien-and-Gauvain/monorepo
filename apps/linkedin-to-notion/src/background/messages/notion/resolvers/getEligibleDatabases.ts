import type { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import type { PlasmoMessaging } from '@plasmohq/messaging';

import type { ErrorResponse } from '../notion.type';
import { NotionProvider } from '../providers/notion.provider';

const handler: PlasmoMessaging.MessageHandler<
  {
    notionToken: string;
  },
  DatabaseObjectResponse[] | ErrorResponse
> = async (req, res) => {
  if (!req.body) {
    throw new Error('Request body is required');
  }

  const notionService = new NotionProvider(req.body.notionToken);
  const databases = await notionService.getDatabases();

  res.send(databases);
};

export default handler;
