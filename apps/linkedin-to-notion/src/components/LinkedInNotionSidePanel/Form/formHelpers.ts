import type { NotionProfileInformation } from '~src/background/messages/notion/notion.type';
import type { LinkedInProfileInformation } from '~src/contents/scrapers/linkedin-profile-scraper';

import type { Inputs } from './Form';

export const fromInputsToNotionProfileInformation = (
  inputs: Inputs,
  notionId: string,
  notionUrl: string
): NotionProfileInformation => {
  return {
    name: {
      firstName: inputs.firstName,
      lastName: inputs.lastName,
    },
    jobTitle: inputs.jobTitle,
    company: inputs.company,
    location: inputs.location,
    status: inputs.status,
    comment: inputs.comment,
    linkedinUrl: inputs.linkedInUrl,
    gender: inputs.gender,
    notionUrl,
    notionId,
  };
};

export const fromNotionProfileInformationToInputs = (notionProfileInformation: NotionProfileInformation): Inputs => {
  return {
    firstName: notionProfileInformation.name.firstName,
    lastName: notionProfileInformation.name.lastName,
    jobTitle: notionProfileInformation.jobTitle,
    company: notionProfileInformation.company,
    location: notionProfileInformation.location,
    status: notionProfileInformation.status,
    comment: notionProfileInformation.comment,
    linkedInUrl: notionProfileInformation.linkedinUrl,
    gender: notionProfileInformation.gender,
  };
};

export const fromLinkedInProfileInformationToInputs = (
  linkedInProfileInformation: LinkedInProfileInformation,
  notionSpecificInformation: Pick<Inputs, 'status' | 'comment' | 'gender' | 'linkedInUrl'>
): Inputs => {
  return {
    firstName: linkedInProfileInformation.name.firstName,
    lastName: linkedInProfileInformation.name.lastName,
    jobTitle: linkedInProfileInformation.jobTitle,
    company: linkedInProfileInformation.company,
    location: linkedInProfileInformation.location,
    status: notionSpecificInformation.status,
    comment: notionSpecificInformation.comment,
    gender: notionSpecificInformation.gender,
    linkedInUrl: notionSpecificInformation.linkedInUrl,
  };
};
