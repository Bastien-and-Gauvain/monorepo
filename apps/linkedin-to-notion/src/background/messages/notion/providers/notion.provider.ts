import { Client } from '@notionhq/client';
import type {
  CreatePageResponse,
  DatabaseObjectResponse,
  SearchResponse,
  UpdatePageResponse,
} from '@notionhq/client/build/src/api-endpoints';

import { getLinkedinSlug } from '~src/background/shared.utils';

import {
  databaseSearchResultsToNotionProfileInformation,
  notionProfileInformationToNotionPage,
  notionProfileInformationToPageProperties,
} from '../notion.transformers';
import type { ErrorResponse, NotionProfileInformation } from '../notion.type';

export class NotionProvider {
  private readonly notion: Client;

  constructor(private readonly NOTION_TOKEN: string) {
    this.notion = new Client({
      auth: this.NOTION_TOKEN,
    });
  }

  /**
   * Get the databases that are eligible for the creation of a new profile page ie. have the right fields
   * @returns a list of databases
   */
  async getDatabases(): Promise<DatabaseObjectResponse[] | ErrorResponse> {
    let searchResults: SearchResponse;
    try {
      searchResults = await this.notion.search({
        filter: {
          value: 'database',
          property: 'object',
        },
        sort: {
          direction: 'descending',
          timestamp: 'last_edited_time',
        },
      });
    } catch (error) {
      console.error("NotionProvider, getDatabases, couldn't get databases:", error);
      return { error: "NotionProvider, getDatabases, couldn't get databases", message: JSON.stringify(error) };
    }

    const mandatoryProperties = [
      'comment',
      'company',
      'firstName',
      'fullName',
      'gender',
      'hiringDate',
      'jobTitle',
      'lastName',
      'linkedinUrl',
      'location',
      'status',
    ];
    const filteredEligibleDatabases = searchResults.results.filter((database: DatabaseObjectResponse) => {
      const databaseProperties = Object.keys(database.properties);
      let isEligible = true;
      mandatoryProperties.forEach((property) => {
        if (!databaseProperties.includes(property)) {
          isEligible = false;
        }
      });
      return isEligible;
    }) as DatabaseObjectResponse[]; // safe casting based on the search filter

    return filteredEligibleDatabases;
  }

  /**
   * Create a new profile page in the database with the given id
   * @param databaseId The id of the database in which the page will be created
   * @param linkedInProfileInformation The information to be added to the page
   * @returns the response from the Notion API
   */
  async createPageInDatabase(
    databaseId: string,
    linkedInProfileInformation: NotionProfileInformation
  ): Promise<CreatePageResponse | ErrorResponse> {
    const pageParameters = notionProfileInformationToNotionPage(linkedInProfileInformation, databaseId);

    let response: CreatePageResponse;
    try {
      response = await this.notion.pages.create(pageParameters);
    } catch (error) {
      console.error("NotionProvider, createPageInDatabase, couldn't create page:", error);
      return { error: "NotionProvider, createPageInDatabase, couldn't create page", message: JSON.stringify(error) };
    }

    return response;
  }

  async findProfileInDatabase(
    databaseId: string,
    linkedInUrl: string
  ): Promise<null | NotionProfileInformation | ErrorResponse> {
    const slug = getLinkedinSlug(linkedInUrl);
    if (!slug) {
      console.log(`We couldn't find a slug for ${linkedInUrl}`);
      return null;
    }

    let searchResults: SearchResponse;
    try {
      searchResults = await this.notion.databases.query({
        database_id: databaseId,
        filter: {
          property: 'linkedinUrl',
          url: {
            contains: slug,
          },
        },
      });

      // No searchResults at all
      if (searchResults.results.length <= 0) {
        console.log(`No page was found in the DB ${databaseId} matching the slug ${slug}`);
        return null;
      }

      console.log(`A page was found in the DB ${databaseId} matching the slug ${slug}`);
      return databaseSearchResultsToNotionProfileInformation(searchResults);
    } catch (error) {
      console.error("NotionProvider, findProfileInDatabase, couldn't complete:", error);
      return { error: "NotionProvider, findProfileInDatabase, couldn't complete:", message: JSON.stringify(error) };
    }
  }

  /**
   * Updates a profile page with the given id
   * @param pageId The id of the page to update
   * @param linkedInProfileInformation The information to be added to the page
   * @returns the response from the Notion API
   */
  async updatePageInDatabase(
    pageId: string,
    linkedInProfileInformation: NotionProfileInformation
  ): Promise<CreatePageResponse | ErrorResponse> {
    const properties = notionProfileInformationToPageProperties(linkedInProfileInformation);
    const pageParameters = { page_id: pageId, properties };

    let response: UpdatePageResponse;
    try {
      response = await this.notion.pages.update(pageParameters);
    } catch (error) {
      console.error("NotionProvider, updatePageInDatabase, couldn't update page:", error);
      return { error: "NotionProvider, updatePageInDatabase, couldn't update page", message: JSON.stringify(error) };
    }

    return response;
  }
}

export default {};
