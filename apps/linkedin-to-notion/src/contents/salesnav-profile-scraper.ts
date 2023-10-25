import type { PlasmoCSConfig } from 'plasmo';

import { cleanJobTitle, splitName } from './linkedin-data-cleaners';

export const config: PlasmoCSConfig = {
  matches: ['https://www.linkedin.com/sales/people/*'],
  run_at: 'document_idle',
};

type SalesNavProfileInformation = {
  name: {
    firstName: string;
    lastName: string;
  };
  jobTitle: string;
  company: string;
  location: string;
  salesNavURL: string;
};

const getName = (): {
  firstName?: string;
  lastName?: string;
  fullName: string;
} => {
  const name = document.querySelector("span[data-anonymize='person-name']");
  if (!name) {
    return {
      fullName: '',
    };
  }

  const { firstName, lastName } = splitName(name.textContent);

  return {
    fullName: name.textContent.trim(),
    firstName,
    lastName,
  };
};

const getJobTitle = (): string => {
  const headline = cleanJobTitle(document.querySelector("dd[data-anonymize='headline']")?.textContent);

  const hasJobAnchor = document.querySelector('button span.artdeco-button__text');
  if (!hasJobAnchor) {
    return headline ?? '';
  }

  const hasJob = hasJobAnchor.textContent.trim().match('Actuel');
  if (!hasJob) {
    return headline ?? '';
  }

  const jobTitle = document.querySelector("span[data-anonymize='job-title']");
  if (!jobTitle) {
    return headline ?? '';
  }

  return cleanJobTitle(jobTitle.textContent);
};

const getCompany = (): string => {
  const hasJobAnchor = document.querySelector('button span.artdeco-button__text');
  if (!hasJobAnchor) {
    return '';
  }

  const hasJob = hasJobAnchor.textContent.trim().match('Actuel');
  if (!hasJob) {
    return '';
  }

  const companyAnchor = document.querySelector("a[data-anonymize='company-name']");
  if (!companyAnchor) {
    return '';
  }

  return companyAnchor.textContent.trim();
};

const getLocation = (): string => {
  const locationAnchor = document.querySelector("div[data-anonymize='location']");
  if (!locationAnchor) {
    return '';
  }

  return locationAnchor.textContent.trim();
};

export const getSalesNavProfileInformation = (): SalesNavProfileInformation => {
  const { firstName, lastName, fullName } = getName();
  const jobTitle = getJobTitle();
  const company = getCompany();
  const location = getLocation();
  const salesNavURL = window.location.href;

  return {
    name: {
      firstName: firstName || fullName,
      lastName: lastName,
    },
    jobTitle,
    company,
    location,
    salesNavURL,
  };
};

// Keeping these lines to test the script as the front isn't yet implemented. To remove in PLAS-20: https://www.notion.so/bvelitchkine/Integrate-the-form-on-the-side-panel-af97bf09aa6346469c57bd0269751554?pvs=4
window.addEventListener('load', () => {
  // Adding a timeout as I'm still having issues to detect a proper load - must be resolved when using getLinkedInProfileInformation but not here
  setTimeout(() => {
    const salesNavProfileInformation = getSalesNavProfileInformation();
    console.log('🔥 ・ LinkedInProfileInformation:', salesNavProfileInformation);
  }, 5000);
});
