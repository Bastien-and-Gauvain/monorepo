import { Storage } from '@plasmohq/storage';

export const clearLocalStorage = async () => {
  const storage = new Storage({
    area: 'local',
  });
  await storage.clear(true);
};
