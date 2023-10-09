export {};

// You can test the regex here: https://regex101.com/r/RJgYar/1
// Don't forget to update the comment when you update the regex on regex101.com
const linkedInProfileRegex = /linkedin\.com\/in\/[^/]+\/$/;
const linkedInRegex = /linkedin\.com/g;

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.match(linkedInProfileRegex)) {
    return await chrome.tabs.sendMessage(tab.id, 'toggleLinkedInNotionSidePanel');
  } else {
    return await chrome.tabs.sendMessage(tab.id, 'toggleGoBackToLinkedInSidePanel');
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, { status, url }, tab) => {
  const urlToCheck = url || tab?.url;
  if (urlToCheck) {
    if (urlToCheck.match(linkedInProfileRegex) && status === 'complete') {
      return await chrome.tabs.sendMessage(tabId, 'updateLinkedInNotionSidePanel');
    }

    if (!urlToCheck.match(linkedInRegex)) {
      return await chrome.tabs.sendMessage(tabId, 'closeSidePanels');
    }
  }
  return;
});

chrome.runtime.onMessage.addListener(async (msg) => {
  if (msg === 'openLinkedInTab') {
    return await chrome.tabs.create({ url: 'https://www.linkedin.com/in/me/' });
  }
});
