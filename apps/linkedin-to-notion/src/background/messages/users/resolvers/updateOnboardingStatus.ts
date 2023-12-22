import type { PlasmoMessaging } from '@plasmohq/messaging';

import { UserService } from '../services/user.service';

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const userService = new UserService();
  const user = await userService.updateOnboardingStatus(req.body.id, req.body.onboardingStatus);

  res.send(user);
};

export default handler;
