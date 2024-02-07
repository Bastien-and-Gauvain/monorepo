import { BaseParagraph } from 'design-system';

import '~style.css';

export default function Popup() {
  (async () => {
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
