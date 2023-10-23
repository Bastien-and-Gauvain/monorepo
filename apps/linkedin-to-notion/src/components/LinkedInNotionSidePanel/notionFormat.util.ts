import type { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export const getDatabaseTitle = (database: DatabaseObjectResponse): string => {
  const icon = database.icon && database.icon.type === 'emoji' ? database.icon.emoji : '';

  if (!database.title.length) {
    return database.id;
  }

  return `${icon} ${database.title[0].plain_text}`.trim();
};
