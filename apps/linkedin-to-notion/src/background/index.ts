export {};

// You can test the regex here: https://regex101.com/r/RJgYar/2
// Don't forget to update the comment when you update the regex on regex101.com
export const linkedInURLRegex = /linkedin\.com\/in\/[^/]+\/#?/;

chrome.tabs.onUpdated.addListener(async (tabId, { status }, tab): Promise<void> => {
  if (status !== 'complete') {
    return;
  }

  const isLinkedInURL = tab?.url?.match(linkedInURLRegex);

  if (!isLinkedInURL) {
    try {
      await chrome.tabs.sendMessage(tabId, 'closeSidePanels');
    } catch (e) {
      console.log('Error closing side panels', e);
    }
  }

  if (isLinkedInURL) {
    try {
      await chrome.tabs.sendMessage(tabId, 'openLinkedInNotionSidePanel');
    } catch (e) {
      console.log('Error opening side panels', e);
    }

    try {
      await chrome.tabs.sendMessage(tabId, 'updateLinkedInNotionSidePanel');
    } catch (e) {
      console.log('Error updating side panels', e);
    }
  }
});

chrome.runtime.onMessage.addListener(async (msg) => {
  if (msg === 'openLinkedInTab') {
    return await chrome.tabs.create({ url: 'https://www.linkedin.com/in/me/' });
  }
});
