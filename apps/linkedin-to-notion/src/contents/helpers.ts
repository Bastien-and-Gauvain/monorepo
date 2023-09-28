import type { LinkedInProfileInformation } from '~src/contents/linkedin-profile-scraper';

export const isScrapingComplete = (values: LinkedInProfileInformation): boolean => {
  if (!values) {
    return false;
  }
  return Object.values(values).every(value => value);
};
