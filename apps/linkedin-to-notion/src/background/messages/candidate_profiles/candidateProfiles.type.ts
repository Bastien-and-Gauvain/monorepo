import type { Nullable } from '~core/shared.types';

export type CandidateProfile = {
  firstName: string;
  lastName: string;
  jobTitle?: string;
  company?: string;
  location?: string;
  status?: Nullable<CandidateStatus>;
  gender?: Nullable<CandidateGender>;
  comment?: string;
  linkedinUrl: string;
};

export enum CandidateStatus {
  NOT_CONTACTED = 'NOT_CONTACTED',
  CONTACTED = 'CONTACTED',
  IN_PROCESS = 'IN_PROCESS',
  NO_MATCH = 'NO_MATCH',
  NOT_INTERESTED = 'NOT_INTERESTED',
  HIRED = 'HIRED',
}

export enum CandidateGender {
  M = 'M',
  F = 'F',
}

export type SaveOneCandidateProfileInput = {
  candidateProfile: CandidateProfile;
  userId: string;
  notion: { databaseId: string; databaseName?: string; accessToken: string; notionUrl?: string; notionPageId?: string };
};

export type UpdateOneCandidateProfileInput = {
  candidateProfile: CandidateProfile;
  userId: string;
  notion: { databaseId: string; databaseName?: string; accessToken: string; notionUrl?: string; notionPageId: string };
};

export default {};
