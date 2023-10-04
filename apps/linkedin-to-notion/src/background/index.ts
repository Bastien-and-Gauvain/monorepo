export {};

const linkedInURLRegex = /linkedin.com\/in\/.+/;

chrome.action.onClicked.addListener((tab) => {
  if (tab.url.match(linkedInURLRegex)) {
    chrome.tabs.sendMessage(tab.id, 'toggleLinkedInNotionSidePanel');
  }
});

chrome.tabs.onUpdated.addListener((tabId, { status }, tab) => {
  if (tab.url?.match(linkedInURLRegex)) {
    if (status === 'complete') {
      chrome.tabs.sendMessage(tabId, 'updateLinkedInNotionSidePanel');
    }
  } else {
    chrome.tabs.sendMessage(tabId, 'closeLinkedInNotionSidePanel');
  }
});
