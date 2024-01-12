import type {
  AppendBlockChildrenResponse,
  BlockObjectRequest,
  CreatePageResponse,
  DatabaseObjectResponse,
  GetDatabaseResponse,
  PageObjectResponse,
  UpdatePageResponse,
} from '@notionhq/client/build/src/api-endpoints';

import type { EmojiRequest } from '~src/background/types/shared';

import type { CandidateProfile } from '../../candidate_profiles/candidateProfiles.type';
import { candidateProfileToNotionPage, candidateProfileToPageProperties } from '../notion.transformers';
import type { NotionProvider } from '../providers/notion.provider';

export class NotionService {
  constructor(private readonly notionProvider: NotionProvider) {}

  /**
   * Create a new profile page in the database with the given id
   * @param databaseId The id of the database in which the page will be created
   * @param candidateProfile The information to be added to the page
   * @returns the response from the Notion API
   * @throws an error if the page couldn't be created
   */
  async createOneProfilePageInDatabase(
    databaseId: string,
    candidateProfile: CandidateProfile
  ): Promise<CreatePageResponse> {
    const pageParameters = candidateProfileToNotionPage(candidateProfile, databaseId);

    let response: CreatePageResponse;
    try {
      response = await this.notionProvider.createPageInDatabase(pageParameters);
    } catch (error) {
      console.error("NotionService, createOneProfilePageInDatabase, couldn't create page:", error);
      throw new Error(
        JSON.stringify({
          error: "NotionService, createOneProfilePageInDatabase, couldn't create page",
          message: error,
        })
      );
    }

    return response;
  }

  /**
   * Updates a profile page with the given id
   * @param pageId The id of the page to update
   * @param linkedInProfileInformation The information to be added to the page
   * @returns the response from the Notion API
   */
  async updateOneProfilePageInDatabase(
    pageId: string,
    candidateProfile: CandidateProfile
  ): Promise<PageObjectResponse> {
    const properties = candidateProfileToPageProperties(candidateProfile);
    const pageParameters = { page_id: pageId, properties };

    let pageUpdated: UpdatePageResponse;
    try {
      pageUpdated = await this.notionProvider.updatePage(pageParameters);
    } catch (error) {
      console.error("NotionProvider, updatePageInDatabase, couldn't update page:", error);
      throw new Error(
        JSON.stringify({
          error: "NotionProvider, updatePageInDatabase, couldn't update page",
          message: error,
        })
      );
    }

    return pageUpdated as PageObjectResponse; // safe casting as in this situation it cannot be a PartialPageObjectResponse
  }

  /**
   * Add content blocks to a page
   * @param pageId The id of the page to update
   * @param blocks The blocks to add to the page
   * @returns the response from the Notion API
   * @throws an error if the blocks couldn't be added
   */
  async appendVideoToPage(
    pageId: string,
    videoDescription: string,
    videoIcon: EmojiRequest,
    videoUrl: string
  ): Promise<AppendBlockChildrenResponse> {
    const blocks: BlockObjectRequest[] = [
      {
        type: 'callout',
        callout: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: videoDescription,
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
            },
          ],
          icon: {
            type: 'emoji',
            emoji: videoIcon,
          },
          color: 'default',
        },
      },
      {
        type: 'video',
        video: {
          caption: [],
          type: 'external',
          external: {
            url: videoUrl,
          },
        },
      },
    ];

    let response: AppendBlockChildrenResponse;
    try {
      response = await this.notionProvider.appendChildrenBlocksToPage(pageId, blocks);
    } catch (error) {
      console.error("NotionService, appendChildrenBlocksToPage, couldn't add content blocks to the page:", error);
      throw new Error(
        JSON.stringify({
          error: "NotionService, appendChildrenBlocksToPage, couldn't add content blocks to the page",
          message: error,
        })
      );
    }

    return response;
  }

  /**
   * Get a database by its id
   * @param databaseId The id of the database
   * @returns the response from the Notion API
   * @throws an error if the database couldn't be found
   */
  async getDatabaseById(databaseId: string): Promise<DatabaseObjectResponse> {
    let database: GetDatabaseResponse;
    try {
      database = await this.notionProvider.getDatabaseById(databaseId);
    } catch (error) {
      console.error("NotionService, getDatabaseById, couldn't get database:", error);
      throw new Error(
        JSON.stringify({
          error: "NotionService, getDatabaseById, couldn't get database",
          message: error,
        })
      );
    }

    return database as DatabaseObjectResponse; // safe casting as in this situation it cannot be a PartialDatabaseObjectResponse
  }
}

export default {};
