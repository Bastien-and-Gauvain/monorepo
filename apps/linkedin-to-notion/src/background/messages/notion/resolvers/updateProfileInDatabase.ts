import type { UpdatePageResponse } from '@notionhq/client/build/src/api-endpoints';

import type { PlasmoMessaging } from '@plasmohq/messaging';

import type { ErrorResponse, NotionProfileInformation } from '../notion.type';
import { NotionProvider } from '../providers/notion.provider';

const handler: PlasmoMessaging.MessageHandler<
  {
    notionToken: string;
    pageId: string;
    linkedInProfileInformation: NotionProfileInformation;
  },
  UpdatePageResponse | ErrorResponse
> = async (req, res) => {
  const { notionToken, pageId, linkedInProfileInformation } = req.body;
  const notionService = new NotionProvider(notionToken);
  const response = await notionService.updatePageInDatabase(pageId, linkedInProfileInformation);

  res.send(response);
};

export default handler;
