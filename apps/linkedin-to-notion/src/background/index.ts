export {};

const linkedInURLRegex = /linkedin.com\/in\/.+/;

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.match(linkedInURLRegex)) {
    return await chrome.tabs.sendMessage(tab.id, 'toggleLinkedInNotionSidePanel');
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, { status }, tab) => {
  if (tab.url && tab.url.match(linkedInURLRegex)) {
    if (status === 'complete') {
      return await chrome.tabs.sendMessage(tabId, 'updateLinkedInNotionSidePanel');
    }
  } else {
    return await chrome.tabs.sendMessage(tabId, 'closeLinkedInNotionSidePanel');
  }
});
