import type {
  CreatePageParameters,
  PageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';

import { getFullName } from '~src/background/shared.utils';

import type { NotionProfileInformation } from './notion.type';

/**
 * Convert Notion page properties to NotionProfileInformation
 * @param notionPageProperties The profile information to convert to a Notion page
 * @param databaseId The database id to create the page in
 * @returns
 */
export const databaseSearchResultsToNotionProfileInformation = (
  databaseSearchResults: QueryDatabaseResponse
): NotionProfileInformation => {
  const profileStatusMap = {
    'Not Contacted': 'NOT_CONTACTED',
    Contacted: 'CONTACTED',
    'In Process': 'IN_PROCESS',
    'No Match': 'NO_MATCH',
    'Not Interested': 'NOT_INTERESTED',
    Hired: 'HIRED',
  };

  const { properties, url, id } = databaseSearchResults.results[0] as PageObjectResponse;

  const name = {
    firstName: properties.firstName['rich_text'][0].text.content,
    lastName: properties.lastName['rich_text'][0].text.content,
  };

  const jobTitle = properties.jobTitle['rich_text'][0].text.content;
  const company = properties.company['rich_text'][0].text.content;
  const location = properties.location['rich_text'][0].text.content;
  const linkedinUrl = properties.linkedinUrl['url'];
  const status = profileStatusMap[properties.status['select'].name];
  const gender = properties.gender['select'] ? properties.gender['select'].name : '';
  const comment = properties.comment['rich_text'][0].text.content;

  return {
    name,
    jobTitle,
    company,
    location,
    linkedinUrl,
    status,
    gender,
    comment,
    notionUrl: url,
    notionId: id,
  };
};

/**
 * A function that creates page properties for a Notion page
 * @param profileInformation The profile information to convert to a Notion page
 * @returns
 */
export const notionProfileInformationToPageProperties = (
  profileInformation: NotionProfileInformation
): CreatePageParameters['properties'] => {
  const { firstName, lastName } = profileInformation.name;
  const fullName = getFullName(firstName, lastName);

  const profileStatusMap = {
    NOT_CONTACTED: 'Not Contacted',
    CONTACTED: 'Contacted',
    IN_PROCESS: 'In Process',
    NO_MATCH: 'No Match',
    NOT_INTERESTED: 'Not Interested',
    HIRED: 'Hired',
  };

  const pageProperties: CreatePageParameters['properties'] = {
    title: {
      title: [
        {
          text: {
            content: fullName,
          },
        },
      ],
    },
    firstName: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: firstName,
          },
        },
      ],
    },
    lastName: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: lastName,
          },
        },
      ],
    },
    jobTitle: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: profileInformation.jobTitle,
          },
        },
      ],
    },
    company: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: profileInformation.company,
          },
        },
      ],
    },
    location: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: profileInformation.location,
          },
        },
      ],
    },
    linkedinUrl: {
      url: profileInformation.linkedinUrl,
    },
    comment: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: profileInformation.comment,
          },
        },
      ],
    },
    status: {
      select: {
        name: profileStatusMap[profileInformation.status],
      },
    },
  };

  if (profileInformation.gender) {
    pageProperties['gender'] = {
      select: {
        name: profileInformation.gender,
      },
    };
  }

  return pageProperties;
};

/**
 * Convert a NotionProfileInformation to a Notion page
 * @param profileInformation The profile information to convert to a Notion page
 * @param databaseId The database id to create the page in
 * @returns
 */
export const notionProfileInformationToNotionPage = (
  profileInformation: NotionProfileInformation,
  databaseId: string
): CreatePageParameters => {
  const properties = notionProfileInformationToPageProperties(profileInformation);
  return {
    icon: {
      type: 'emoji',
      emoji: '✨',
    },
    parent: {
      type: 'database_id',
      database_id: databaseId,
    },
    properties,
  };
};

export default {};
