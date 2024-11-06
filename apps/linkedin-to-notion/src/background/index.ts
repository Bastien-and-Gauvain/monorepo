import { routes } from '~src/routes';

import { retrySendMessage } from './shared.utils';

export {};

// You can test the regex here: https://regex101.com/r/RJgYar/2
// Don't forget to update the comment when you update the regex on regex101.com
export const linkedInProfileURLRegex = /linkedin\.com\/in\/[^/]+\/#?$/;
export const linkedInURLRegex = /linkedin\.com/;

chrome.tabs.onUpdated.addListener(async (tabId, { status }, tab): Promise<void> => {
  if (status !== 'complete') {
    return;
  }

  if (!tab?.url) {
    return;
  }

  const isOnLinkedIn = linkedInURLRegex.test(tab.url);
  const isOnLinkedInProfile = linkedInProfileURLRegex.test(tab.url);

  // We close the extension when we leave LinkedIn
  if (!isOnLinkedIn) {
    try {
      console.log(tab.url);
      await chrome.tabs.sendMessage(tabId, 'closeSidePanels');
    } catch (e) {
      console.log('Error closing side panels', e);
    }
  }

  if (isOnLinkedIn) {
    // We update the side panel's content when we are on a LinkedIn profile
    if (isOnLinkedInProfile) {
      try {
        await retrySendMessage(tabId, 'updateLinkedInNotionSidePanel');
      } catch (e) {
        console.log('Error updating side panels', e);
      }
      return;
    }

    await retrySendMessage(tabId, 'askToGoBackToLinkedInProfile');
  }
});

chrome.runtime.onMessage.addListener(({ msg }) => {
  if (msg === 'openUserLinkedInProfile') {
    chrome.tabs.update({ url: routes.linkedin.me });
  }
});

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === 'install') {
    await chrome.tabs.create({ url: routes.tabs.onboarding });
  }
});
