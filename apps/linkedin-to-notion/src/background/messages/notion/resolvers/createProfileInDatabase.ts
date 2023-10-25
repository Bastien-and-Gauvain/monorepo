import type { PlasmoMessaging } from '@plasmohq/messaging';

import NotionProvider from '../providers/notion.provider';

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { notionToken, databaseId, linkedinProfileInformation } = req.body;
  const notionService = new NotionProvider(notionToken);
  console.log(databaseId);
  const creationResponse = await notionService.createPageInDatabase(databaseId, linkedinProfileInformation);

  res.send({ creationResponse });
};

export default handler;
