export {};

export const linkedInURLRegex = /linkedin.com\/in\/.+/;

chrome.action.onClicked.addListener((tab) => {
  if (tab.url.match(linkedInURLRegex)) {
    chrome.tabs.sendMessage(tab.id, 'toggleLinkedInNotionSidePanel');
  }
});

chrome.tabs.onUpdated.addListener((tabId, _, tab) => {
  if (tab.url.match(linkedInURLRegex)) {
    return chrome.tabs.sendMessage(tabId, 'updateLinkedInNotionSidePanel');
  }
  return chrome.tabs.sendMessage(tabId, 'closeLinkedInNotionSidePanel');
});
