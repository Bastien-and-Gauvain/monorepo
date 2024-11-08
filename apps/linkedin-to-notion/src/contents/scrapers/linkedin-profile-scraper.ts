import type { PlasmoCSConfig } from 'plasmo';

import { isScrapingComplete } from './helpers';
import { cleanJobTitle, splitName } from './linkedin-data-cleaners';

export const config: PlasmoCSConfig = {
  matches: ['https://www.linkedin.com/in/*'],
  run_at: 'document_idle',
};

export type LinkedInProfileInformation = {
  name: {
    firstName: string;
    lastName: string;
  };
  jobTitle: string;
  company: string;
  location: string;
  linkedInURL: string;
};

const getName = (): {
  firstName?: string;
  lastName?: string;
  fullName: string;
} => {
  const name = document.querySelector('main section:first-child h1');
  if (!name?.textContent) {
    return {
      fullName: '',
    };
  }

  const { firstName, lastName } = splitName(name.textContent);

  return {
    fullName: name.textContent,
    firstName,
    lastName,
  };
};

const getJobTitle = (): string => {
  const rawJobTitle = document.querySelector('div.text-body-medium.break-words')?.textContent;
  const fallbackCurrentJob = rawJobTitle ? cleanJobTitle(rawJobTitle) : rawJobTitle;

  const experienceAnchor = document.getElementById('experience');
  if (!experienceAnchor) {
    return fallbackCurrentJob ?? '';
  }

  const experienceList = experienceAnchor.parentElement;
  if (!experienceList) {
    return fallbackCurrentJob ?? '';
  }

  const lastJob = experienceList.querySelector('li');
  if (!lastJob) {
    return fallbackCurrentJob ?? '';
  }

  const jobTitle = lastJob.querySelector('div.display-flex.align-items-center.mr1.t-bold > span');
  if (!jobTitle?.textContent) {
    return fallbackCurrentJob ?? '';
  }

  // This covers the case of a person with several experiences in a same company
  if (jobTitle.textContent === getCompany() && fallbackCurrentJob) {
    return fallbackCurrentJob;
  }

  return cleanJobTitle(jobTitle.textContent);
};

const getCompany = (): string => {
  const company = document.querySelector('button[aria-label^="Entreprise actuelle"]');
  if (!company) {
    return '';
  }

  if (!company?.textContent) {
    return '';
  }

  return company.textContent.trim();
};

const getLocation = (): string => {
  const location = document.querySelector('span.text-body-small.inline.t-black--light.break-words');
  if (!location?.textContent) {
    return '';
  }

  return location.textContent.trim();
};

export const getLinkedInProfileInformation = async (
  maxNumberOfRetries = 3,
  currentRetry = 0
): Promise<LinkedInProfileInformation> => {
  let delay = 100;
  // Wait for the page to be loaded, works better this way than with event listeners
  while (document.readyState !== 'complete') {
    await new Promise((resolve) => setTimeout(resolve, delay));
    delay = delay * 2;
  }

  const { firstName, lastName, fullName } = getName();
  const jobTitle = getJobTitle();
  const company = getCompany();
  const location = getLocation();
  const linkedInURL = window.location.href;

  let scrapingResult = {
    name: {
      firstName: firstName || fullName,
      lastName: lastName || '',
    },
    jobTitle,
    company,
    location,
    linkedInURL,
  };

  while (!isScrapingComplete(scrapingResult) && currentRetry < maxNumberOfRetries) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    scrapingResult = await getLinkedInProfileInformation(maxNumberOfRetries, currentRetry + 1);
  }

  return scrapingResult;
};

// TODO: Keeping these lines to test if needed
// window.addEventListener('load', () => {
//   // Adding a timeout as I'm still having issues to detect a proper load - must be resolved when using getLinkedInProfileInformation but not here
//   setTimeout(() => {
//     const LinkedInProfileInformation = getLinkedInProfileInformation();
//     console.log('🔥 ・ LinkedInProfileInformation:', LinkedInProfileInformation);
//   }, 5000);
// });
