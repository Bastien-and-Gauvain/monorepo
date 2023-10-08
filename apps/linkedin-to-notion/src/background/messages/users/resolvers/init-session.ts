import type { PlasmoMessaging } from '@plasmohq/messaging';

import UserService from '../services/user.service';

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const userService = new UserService();
  await userService.initSession(req.body);

  res.send({ success: true });
};

export default handler;
