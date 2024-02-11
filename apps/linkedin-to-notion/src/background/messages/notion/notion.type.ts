export type ErrorResponse = { error: string; message: string };

export type NotionProfileStatus =
  | 'NOT_CONTACTED'
  | 'CONTACTED'
  | 'IN_PROCESS'
  | 'NO_MATCH'
  | 'NOT_INTERESTED'
  | 'HIRED';

export type NotionProfileGender = '' | 'M' | 'F';

export type NotionProfileInformation = {
  /**
   * The name of the profile stored in Notion
   */
  name: {
    firstName: string;
    lastName: string;
  };

  /**
   * The job title of the profile stored in Notion
   */
  jobTitle: string;

  /**
   * The current company of the profile stored in Notion
   */
  company: string;

  /**
   * The location of the profile stored in Notion
   */
  location: string;

  /**
   * The LinkedIn URL of the profile stored in Notion
   */
  linkedinUrl: string;

  /**
   * The url of the profile in Notion
   */
  notionUrl: string;

  /**
   * The optional id of the page in Notion
   */
  notionId: string;

  /**
   * The status of the profile that's stored in Notion
   */
  status: NotionProfileStatus;

  /**
   * The gender of the profile stored in Notion
   */
  gender: NotionProfileGender;

  /**
   * Any comments on the profile, stored in Notion
   */
  comment: string;
};

export default {};
