export {};

const linkedInURLRegex = /linkedin.com\/in\/.+/;

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.match(linkedInURLRegex)) {
    return await chrome.tabs.sendMessage(tab.id, 'toggleLinkedInNotionSidePanel');
  } else {
    return await chrome.tabs.sendMessage(tab.id, 'toggleGoBackToLinkedInSidePanel');
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, _, tab) => {
  if (tab.url.match(linkedInURLRegex)) {
    return await chrome.tabs.sendMessage(tabId, 'updateLinkedInNotionSidePanel');
  }
  return await chrome.tabs.sendMessage(tabId, 'closeSidePanels');
});

chrome.runtime.onMessage.addListener(async (msg) => {
  if (msg === 'openLinkedInTab') {
    return await chrome.tabs.create({ url: 'https://www.linkedin.com/in/me/' });
  }
});
