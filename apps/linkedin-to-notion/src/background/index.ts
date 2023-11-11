export {};

// You can test the regex here: https://regex101.com/r/RJgYar/2
// Don't forget to update the comment when you update the regex on regex101.com
export const linkedInURLRegex = /linkedin\.com\/in\/[^/]+\/#?/;

chrome.tabs.onUpdated.addListener(async (tabId, { status }, tab) => {
  if (!tab?.url?.match(linkedInURLRegex)) {
    return await chrome.tabs.sendMessage(tabId, 'closeSidePanels');
  }

  await chrome.tabs.sendMessage(tabId, 'openLinkedInNotionSidePanel');
  if (status === 'complete') {
    return await chrome.tabs.sendMessage(tabId, 'updateLinkedInNotionSidePanel');
  }
});

chrome.runtime.onMessage.addListener(async (msg) => {
  if (msg === 'openLinkedInTab') {
    return await chrome.tabs.create({ url: 'https://www.linkedin.com/in/me/' });
  }
});
