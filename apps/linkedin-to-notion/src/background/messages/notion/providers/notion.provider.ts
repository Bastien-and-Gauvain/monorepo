import { Client } from '@notionhq/client';
import type {
  AppendBlockChildrenResponse,
  BlockObjectRequest,
  CreatePageParameters,
  CreatePageResponse,
  DatabaseObjectResponse,
  GetDatabaseResponse,
  SearchResponse,
  UpdatePageParameters,
  UpdatePageResponse,
} from '@notionhq/client/build/src/api-endpoints';

import { getLinkedinSlug, retryRequest } from '~src/background/shared.utils';

import { databaseSearchResultsToNotionProfileInformation } from '../notion.transformers';
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
      searchResults = await retryRequest(() =>
        this.notion.search({
          filter: {
            value: 'database',
            property: 'object',
          },
          sort: {
            direction: 'descending',
            timestamp: 'last_edited_time',
          },
        })
      );
    } catch (error) {
      console.error("NotionProvider, getDatabases, couldn't get databases:", error);
      throw new Error(
        JSON.stringify({
          error: "NotionProvider, getDatabases, couldn't get databases",
          message: error,
        })
      );
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
   * Create a page in notion
   * @param pageBodyParameters The parameters to create the page
   * @returns the response from the Notion API
   * @throws an error if the page couldn't be created
   */
  async createPageInDatabase(pageBodyParameters: CreatePageParameters): Promise<CreatePageResponse> {
    let response: CreatePageResponse;
    try {
      response = await this.notion.pages.create(pageBodyParameters);
    } catch (error) {
      console.error("NotionProvider, createPageInDatabase, couldn't create page:", error);
      throw new Error(
        JSON.stringify({
          error: "NotionProvider, createPageInDatabase, couldn't create page",
          message: error,
        })
      );
    }

    return response;
  }

  /**
   * Add content blocks to a page
   * @param pageId The id of the page to update
   * @param blocks The blocks to add to the page
   * @returns the response from the Notion API
   * @throws an error if the blocks couldn't be added
   */
  async appendChildrenBlocksToPage(pageId: string, blocks: BlockObjectRequest[]): Promise<AppendBlockChildrenResponse> {
    let response: AppendBlockChildrenResponse;
    try {
      response = await this.notion.blocks.children.append({
        block_id: pageId,
        children: blocks,
      });
    } catch (error) {
      console.error("NotionProvider, appendChildrenBlocksToPage, couldn't add content blocks to the page:", error);
      throw new Error(
        JSON.stringify({
          error: "NotionProvider, appendChildrenBlocksToPage, couldn't add content blocks to the page",
          message: error,
        })
      );
    }

    return response;
  }

  /**
   * Find a profile page in the database with a given id using its LinkedIn url
   * @param databaseId The id of the database where the page is located
   * @param linkedInUrl The LinkedIn url of the profile to find
   * @returns the response from the Notion API
   */
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
      searchResults = await retryRequest(() =>
        this.notion.databases.query({
          database_id: databaseId,
          filter: {
            property: 'linkedinUrl',
            url: {
              contains: `/${slug}`,
            },
          },
        })
      );

      // No searchResults at all
      if (searchResults.results.length <= 0) {
        console.log(`No page was found in the DB ${databaseId} matching the slug ${slug}`);
        return null;
      }

      console.log(`A page was found in the DB ${databaseId} matching the slug ${slug}`);
      return databaseSearchResultsToNotionProfileInformation(searchResults);
    } catch (error) {
      console.error("NotionProvider, findProfileInDatabase, couldn't complete:", error);
      throw new Error(
        JSON.stringify({
          error: "NotionProvider, findProfileInDatabase, couldn't complete:",
          message: error,
        })
      );
    }
  }

  /**
   * Update a page in notion
   * @param pageParameters The parameters to update the page
   * @returns the response from the Notion API
   * @throws an error if the page couldn't be updated
   */
  async updatePage(pageParameters: UpdatePageParameters): Promise<CreatePageResponse> {
    let response: UpdatePageResponse;
    try {
      response = await this.notion.pages.update(pageParameters);
    } catch (error) {
      console.error("NotionProvider, updatePage, couldn't update page:", error);
      throw new Error(
        JSON.stringify({
          error: "NotionProvider, updatePage, couldn't update page",
          message: error,
        })
      );
    }

    return response;
  }

  /**
   * Get a database by its id
   * @param databaseId The id of the database to retrieve
   * @returns the response from the Notion API
   * @throws an error if the database couldn't be retrieved
   */
  async getDatabaseById(databaseId: string): Promise<GetDatabaseResponse> {
    let response: GetDatabaseResponse;
    try {
      response = await this.notion.databases.retrieve({ database_id: databaseId });
    } catch (error) {
      console.error("NotionProvider, getDatabaseById, couldn't get database:", error);
      throw new Error(
        JSON.stringify({
          error: "NotionProvider, getDatabaseById, couldn't get database",
          message: error,
        })
      );
    }

    return response;
  }
}

export default {};
