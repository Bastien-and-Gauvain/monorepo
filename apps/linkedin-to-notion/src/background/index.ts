export {};

// You can test the regex here: https://regex101.com/r/RJgYar/1
// Don't forget to update the comment when you update the regex on regex101.com
const linkedInURLRegex = /linkedin\.com\/in\/[^/]+\/$/;

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
