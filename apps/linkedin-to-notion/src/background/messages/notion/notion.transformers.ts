import type {
  CreatePageParameters,
  PageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';

import { getFullName } from '~src/background/shared.utils';
import { getPropertyValue } from '~src/components/LinkedInNotionSidePanel/utils/notionFormat.util';

import type { CandidateProfile } from '../candidate_profiles/candidateProfiles.type';
import type { NotionProfileGender, NotionProfileInformation, NotionProfileStatus } from './notion.type';

/**
 * Convert Notion page properties to NotionProfileInformation
 * @param notionPageProperties The profile information to convert to a Notion page
 * @param databaseId The database id to create the page in
 * @returns
 */
export const databaseSearchResultsToNotionProfileInformation = (
  databaseSearchResults: QueryDatabaseResponse
): NotionProfileInformation => {
  const profileStatusMap: Record<string, NotionProfileStatus> = {
    'Not Contacted': 'NOT_CONTACTED',
    Contacted: 'CONTACTED',
    'In Process': 'IN_PROCESS',
    'No Match': 'NO_MATCH',
    'Not Interested': 'NOT_INTERESTED',
    Hired: 'HIRED',
  };

  const { properties, url, id } = databaseSearchResults.results[0] as PageObjectResponse;

  const name = {
    firstName: getPropertyValue(properties['firstName'] as PageObjectResponse['properties'][number]) || '',
    lastName: getPropertyValue(properties['lastName'] as PageObjectResponse['properties'][number]) || '',
  };

  const jobTitle = getPropertyValue(properties['jobTitle'] as PageObjectResponse['properties'][number]) || '';
  const company = getPropertyValue(properties['company'] as PageObjectResponse['properties'][number]) || '';
  const location = getPropertyValue(properties['location'] as PageObjectResponse['properties'][number]);
  const linkedinUrl = getPropertyValue(properties['linkedinUrl'] as PageObjectResponse['properties'][number]);
  const status = profileStatusMap[
    getPropertyValue(properties['status'] as PageObjectResponse['properties'][number])
  ] as NotionProfileStatus;
  const gender = getPropertyValue(
    properties['gender'] as PageObjectResponse['properties'][number]
  ) as NotionProfileGender;
  const comment = getPropertyValue(properties['comment'] as PageObjectResponse['properties'][number]);

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
export const candidateProfileToPageProperties = (
  candidateProfile: CandidateProfile
): CreatePageParameters['properties'] => {
  const fullName = getFullName(candidateProfile.firstName, candidateProfile.lastName);

  const candidateStatusMap = {
    NOT_CONTACTED: 'Not Contacted',
    CONTACTED: 'Contacted',
    IN_PROCESS: 'In Process',
    NO_MATCH: 'No Match',
    NOT_INTERESTED: 'Not Interested',
    HIRED: 'Hired',
  };

  const candidateGenderMap = {
    M: 'M',
    F: 'F',
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
            content: candidateProfile.firstName,
          },
        },
      ],
    },
    lastName: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: candidateProfile.lastName,
          },
        },
      ],
    },
    jobTitle: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: candidateProfile.jobTitle || '',
          },
        },
      ],
    },
    company: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: candidateProfile.company || '',
          },
        },
      ],
    },
    location: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: candidateProfile.location || '',
          },
        },
      ],
    },
    linkedinUrl: {
      url: candidateProfile.linkedinUrl || '',
    },
    comment: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: candidateProfile.comment || '',
          },
        },
      ],
    },
    status: {
      select: {
        name: candidateProfile.status ? candidateStatusMap[candidateProfile.status] : candidateStatusMap.NOT_CONTACTED,
      },
    },
  };

  if (candidateProfile.gender) {
    pageProperties['gender'] = {
      select: {
        name: candidateProfile.gender ? candidateGenderMap[candidateProfile.gender] : '',
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
export const candidateProfileToNotionPage = (
  candidateProfile: CandidateProfile,
  databaseId: string
): CreatePageParameters => {
  const properties = candidateProfileToPageProperties(candidateProfile);
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
