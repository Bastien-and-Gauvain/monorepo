import type { PlasmoMessaging } from '@plasmohq/messaging';

import SessionService from '../services/session.service';

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const sessionService = new SessionService();
  await sessionService.initSession(req.body);

  res.send({ success: true });
};

export default handler;
