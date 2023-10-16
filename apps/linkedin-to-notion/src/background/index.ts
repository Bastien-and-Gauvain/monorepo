import { SecureStorage } from '@plasmohq/storage/secure';

export {};

// You can test the regex here: https://regex101.com/r/RJgYar/1
// Don't forget to update the comment when you update the regex on regex101.com
export const linkedInURLRegex = /linkedin\.com\/in\/[^/]+\/#?$/;

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.match(linkedInURLRegex)) {
    return await chrome.tabs.sendMessage(tab.id, 'toggleLinkedInNotionSidePanel');
  } else {
    return await chrome.tabs.sendMessage(tab.id, 'toggleGoBackToLinkedInSidePanel');
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, { status }, tab) => {
  if (tab.url && tab.url.match(linkedInURLRegex)) {
    if (status === 'complete') {
      return await chrome.tabs.sendMessage(tabId, 'updateLinkedInNotionSidePanel');
    }
  } else {
    return await chrome.tabs.sendMessage(tabId, 'closeSidePanels');
  }
});

chrome.runtime.onMessage.addListener(async (msg) => {
  if (msg === 'openLinkedInTab') {
    return await chrome.tabs.create({ url: 'https://www.linkedin.com/in/me/' });
  }
});

/**
 * A function that display changes in the secure storage on the authData key
 * Should be removed, only there for testing purposes
 */
const temp = async () => {
  const storage = new SecureStorage({ area: 'local' });
  await storage.setPassword('napoleon');
  storage.watch({
    authData: (c) => {
      console.log(c.newValue);
    },
  });
};

temp();
