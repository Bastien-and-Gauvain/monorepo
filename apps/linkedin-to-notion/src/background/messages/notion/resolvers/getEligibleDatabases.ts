import type { PlasmoMessaging } from '@plasmohq/messaging';

import NotionProvider from '../providers/notion.provider';

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const notionService = new NotionProvider(req.body.notionToken);
  const databases = await notionService.getDatabases();

  res.send({ databases });
};

export default handler;
