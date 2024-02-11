import { routes } from '~src/routes';

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

  if (!isOnLinkedInProfile) {
    try {
      await chrome.tabs.sendMessage(tabId, 'closeSidePanels');
    } catch (e) {
      console.log('Error updating side panels', e);
    }
  }

  // We update the side panel's content when we are on a LinkedIn profile
  if (isOnLinkedInProfile) {
    try {
      await chrome.tabs.sendMessage(tabId, 'openLinkedInNotionSidePanel');
      await chrome.tabs.sendMessage(tabId, 'updateLinkedInNotionSidePanel');
    } catch (e) {
      console.log('Error updating side panels', e);
    }
  }
});

chrome.runtime.onMessage.addListener(async (msg) => {
  if (msg === 'openLinkedInTab') {
    try {
      const updatedTab = await chrome.tabs.update({ url: 'https://www.linkedin.com/in/me/' });
      if (updatedTab?.id) {
        chrome.tabs.sendMessage(updatedTab.id, 'openLinkedInNotionSidePanel');
      }
    } catch (e) {
      console.log('Error opening LinkedIn tab', e);
    }
  }
});

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === 'install') {
    await chrome.tabs.create({ url: routes.tabs.onboarding });
  }
});
