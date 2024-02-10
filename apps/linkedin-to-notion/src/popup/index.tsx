import { BaseParagraph } from 'design-system';

import { linkedInURLRegex } from '~src/background';

import '~style.css';

export default function Popup() {
  (async () => {
    // Get the active tab (the result sometimes doesn't have a url)
    const [{ id }] = await chrome.tabs.query({ active: true, currentWindow: true });
    // Get all the info on the tab, incl. the url, the only thing we care about
    const { url } = await chrome.tabs.get(id);
    if (url && url?.match(linkedInURLRegex)) {
      return;
    }

    try {
      await chrome.tabs.create({ active: true, url: 'https://www.linkedin.com/in/me/' });
    } catch (e) {
      console.log('Error opening LinkedIn tab', e);
    }
  })();

  return (
    <div className="plasmo-flex plasmo-justify-center plasmo-items-top plasmo-bg-background-light plasmo-p-0 plasmo-text-lg plasmo-w-24 plasmo-h-6">
      <BaseParagraph className="plasmo-bg-background-light plasmo-font-semibold">{'Enjoy 🎉'}</BaseParagraph>
    </div>
  );
}
