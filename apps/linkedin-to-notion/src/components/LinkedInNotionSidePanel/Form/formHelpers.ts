import {
  CandidateGender,
  CandidateStatus,
  type CandidateProfile,
} from '~src/background/messages/candidate_profiles/candidateProfiles.type';
import type { NotionProfileInformation } from '~src/background/messages/notion/notion.type';
import type { LinkedInProfileInformation } from '~src/contents/scrapers/linkedin-profile-scraper';

import type { FormInput } from './Form';

export const fromInputsToNotionProfileInformation = (
  inputs: FormInput,
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
    linkedinUrl: inputs.linkedinUrl,
    gender: inputs.gender,
    notionUrl,
    notionId,
  };
};

export const fromNotionProfileInformationToInputs = (notionProfileInformation: NotionProfileInformation): FormInput => {
  return {
    firstName: notionProfileInformation.name.firstName,
    lastName: notionProfileInformation.name.lastName,
    jobTitle: notionProfileInformation.jobTitle,
    company: notionProfileInformation.company,
    location: notionProfileInformation.location,
    status: notionProfileInformation.status,
    comment: notionProfileInformation.comment,
    linkedinUrl: notionProfileInformation.linkedinUrl,
    gender: notionProfileInformation.gender,
  };
};

export const fromLinkedInProfileInformationToInputs = (
  linkedInProfileInformation: LinkedInProfileInformation,
  notionSpecificInformation: Pick<FormInput, 'status' | 'comment' | 'gender' | 'linkedinUrl'>
): FormInput => {
  return {
    firstName: linkedInProfileInformation.name.firstName,
    lastName: linkedInProfileInformation.name.lastName,
    jobTitle: linkedInProfileInformation.jobTitle,
    company: linkedInProfileInformation.company,
    location: linkedInProfileInformation.location,
    status: notionSpecificInformation.status,
    comment: notionSpecificInformation.comment,
    gender: notionSpecificInformation.gender,
    linkedinUrl: notionSpecificInformation.linkedinUrl,
  };
};

export const fromFormInputToCandidateProfile = (input: FormInput): CandidateProfile => {
  const statusMapping = {
    NOT_CONTACTED: CandidateStatus.NOT_CONTACTED,
    CONTACTED: CandidateStatus.CONTACTED,
    IN_PROCESS: CandidateStatus.IN_PROCESS,
    NO_MATCH: CandidateStatus.NO_MATCH,
    NOT_INTERESTED: CandidateStatus.NOT_INTERESTED,
    HIRED: CandidateStatus.HIRED,
  };

  const genderMapping = {
    M: CandidateGender.M,
    F: CandidateGender.F,
  };

  return {
    ...input,
    status: input.status ? statusMapping[input.status] : null,
    gender: input.gender ? genderMapping[input.gender] : null,
  };
};
