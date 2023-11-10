import type { DatabaseObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

/**
 * Get the title of a database
 * @param database The database to get the title of
 * @returns The title of the database
 */
export const getDatabaseTitle = (database: DatabaseObjectResponse): string => {
  const icon = database.icon && database.icon.type === 'emoji' ? database.icon.emoji : '';

  if (!database.title.length) {
    return database.id;
  }

  return `${icon} ${database.title[0].plain_text}`.trim();
};

/**
 * Get the value of a property based on its type
 * @param property The Notion property to get the value of
 * @returns The value of the property
 */
export const getPropertyValue = (property: PageObjectResponse['properties'][0]): string => {
  if (property.type === 'rich_text') {
    return property.rich_text[0]?.plain_text;
  }

  if (property.type === 'url') {
    return property.url;
  }

  if (property.type === 'select') {
    return property.select ? property.select.name : '';
  }
};
