import { Client } from '@notionhq/client';
import type {
  CreatePageParameters,
  CreatePageResponse,
  DatabaseObjectResponse,
  SearchResponse,
} from '@notionhq/client/build/src/api-endpoints';

type LinkedInProfileInformation = {
  /**
   * The name of the profile to store in Notion
   */
  name: {
    firstName: string;
    lastName: string;
  };

  /**
   * The job title of the profile to store in Notion
   */
  jobTitle: string;

  /**
   * The current company of the profile to store in Notion
   */
  company: string;

  /**
   * The location of the profile to store in Notion
   */
  location: string;

  /**
   * The LinkedIn URL of the profile to store in Notion
   */
  linkedInURL: string;

  /**
   * The status of the profile to store in Notion
   */
  status: 'notContacted' | 'contacted' | 'inProcess' | 'noMatch' | 'notInterested' | 'hired';

  /**
   * The gender of the profile to store in Notion
   */
  gender?: 'M' | 'F';

  /**
   * Comments on the profile to store in Notion
   */
  comment: string;
};

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

  async createPageInDatabase(
    databaseId: string,
    linkedInProfileInformation: LinkedInProfileInformation
  ): Promise<CreatePageResponse> {
    const firstName = linkedInProfileInformation.name.firstName;
    const lastName = linkedInProfileInformation.name.lastName;
    const fullName = `${firstName} ${lastName}`;
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
                content: linkedInProfileInformation.jobTitle,
              },
            },
          ],
        },
        company: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: linkedInProfileInformation.company,
              },
            },
          ],
        },
        location: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: linkedInProfileInformation.location,
              },
            },
          ],
        },
        linkedinUrl: {
          url: linkedInProfileInformation.linkedInURL,
        },
        comment: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: linkedInProfileInformation.comment,
              },
            },
          ],
        },
        status: {
          select: {
            name: linkedInProfileInformation.status,
          },
        },
      },
    };

    if (linkedInProfileInformation.gender) {
      pageParameters.properties['gender'] = {
        select: {
          name: linkedInProfileInformation.gender,
        },
      };
    }

    const response = await this.notion.pages.create(pageParameters);
    return response;
  }
}
