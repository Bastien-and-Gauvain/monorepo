export {};

const linkedInURLRegex = /linkedin.com\/in\/.+/;

chrome.action.onClicked.addListener((tab) => {
  if (tab.url.match(linkedInURLRegex)) {
    chrome.tabs.sendMessage(tab.id, 'toggleLinkedInNotionSidePanel');
  } else {
    chrome.tabs.sendMessage(tab.id, 'toggleGoBackToLinkedInSidePanel');
  }
});

chrome.tabs.onUpdated.addListener((tabId, _, tab) => {
  if (tab.url.match(linkedInURLRegex)) {
    return chrome.tabs.sendMessage(tabId, 'updateLinkedInNotionSidePanel');
  }
  return chrome.tabs.sendMessage(tabId, 'closeSidePanels');
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg === 'openLinkedInTab') {
    chrome.tabs.create({ url: 'https://www.linkedin.com/in/me/' });
  }
});
