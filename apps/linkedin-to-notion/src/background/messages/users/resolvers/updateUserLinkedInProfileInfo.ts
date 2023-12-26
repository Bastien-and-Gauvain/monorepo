import type { PlasmoMessaging } from '@plasmohq/messaging';

import { UserService } from '../services/user.service';

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const userService = new UserService();
  const user = await userService.updateUserLinkedInProfileInfo(req.body.id, req.body.userLinkedInProfileInfo);

  res.send(user);
};

export default handler;
