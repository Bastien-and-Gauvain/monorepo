import type { PlasmoMessaging } from '@plasmohq/messaging';

import { UserService } from '../services/user.service';

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const userService = new UserService();
  await userService.incrementNumberProfilesSaved(req.body.id);

  res.send('successful increment');
};

export default handler;
