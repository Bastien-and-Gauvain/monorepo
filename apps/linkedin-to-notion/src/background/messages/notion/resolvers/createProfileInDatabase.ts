import type { CreatePageResponse } from '@notionhq/client/build/src/api-endpoints';

import type { PlasmoMessaging } from '@plasmohq/messaging';

import type { ErrorResponse, NotionProfileInformation } from '../notion.type';
import { NotionProvider } from '../providers/notion.provider';

const handler: PlasmoMessaging.MessageHandler<
  {
    notionToken: string;
    databaseId: string;
    linkedInProfileInformation: NotionProfileInformation;
  },
  CreatePageResponse | ErrorResponse
> = async (req, res) => {
  const { notionToken, databaseId, linkedInProfileInformation } = req.body;
  const notionService = new NotionProvider(notionToken);
  const response = await notionService.createPageInDatabase(databaseId, linkedInProfileInformation);

  res.send(response);
};

export default handler;
