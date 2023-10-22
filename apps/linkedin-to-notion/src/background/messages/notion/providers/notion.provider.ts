import { Client } from '@notionhq/client';
import type { DatabaseObjectResponse, SearchResponse } from '@notionhq/client/build/src/api-endpoints';

export default class NotionProvider {
  private readonly notion: Client;

  constructor(private readonly NOTION_TOKEN: string) {
    this.notion = new Client({
      auth: this.NOTION_TOKEN,
    });
  }

  async getDatabases(): Promise<DatabaseObjectResponse[]> {
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
      return [];
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
}
