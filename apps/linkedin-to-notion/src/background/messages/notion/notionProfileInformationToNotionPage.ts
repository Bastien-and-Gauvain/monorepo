import type { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints';

import { getFullName } from '~src/background/shared.utils';

import type { NotionProfileInformation } from './notion.type';

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

  const pageParameters: CreatePageParameters = {
    icon: {
      type: 'emoji',
      emoji: '✨',
    },
    parent: {
      type: 'database_id',
      database_id: databaseId,
    },
    properties: {
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
    },
  };

  if (profileInformation.gender) {
    pageParameters.properties['gender'] = {
      select: {
        name: profileInformation.gender,
      },
    };
  }

  return pageParameters;
};

export default {};
