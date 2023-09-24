import type { LinkedInProfileInformation } from '~src/contents/linkedin-profile-scraper';

export const isScrapingComplete = (values: LinkedInProfileInformation): boolean =>
  !Object.values(values).some((value) => !value);
