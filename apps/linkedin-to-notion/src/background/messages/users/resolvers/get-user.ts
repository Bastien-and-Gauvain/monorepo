import type { PlasmoMessaging } from '@plasmohq/messaging';

import UserService from '../services/user.service';

type GetUserRequest = {
  jwt?: string;
};

const handler: PlasmoMessaging.MessageHandler<GetUserRequest> = async (req, res) => {
  const userService = new UserService();
  const user = userService.getUser(req.body.jwt);

  res.send({
    user,
  });
};

export default handler;
