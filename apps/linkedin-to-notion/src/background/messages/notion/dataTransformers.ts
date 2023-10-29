import type { PageObjectResponse, QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

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
  const gender = properties?.gender ? properties.gender['select'].name : '';
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

export default {};
