import type { PlasmoCSConfig } from 'plasmo';

import { waitForElementToExist } from './utils/utils';

export const config: PlasmoCSConfig = {
  matches: [
    'https://www.notion.so/install-integration?response_type=code&client_id=06ba891a-ecd0-4622-8489-6dae87349cde*',
  ],
};

(async () => {
  await waitForElementToExist('div', 'Use a template provided by the developer');
  // Wait 0.1s with a promise
  await new Promise((resolve) => setTimeout(resolve, 100));
  const wrapper = document.querySelector("div[style*='grid-template-rows: 1fr 1fr;']");
  const originalStyle = wrapper.getAttribute('style');
  const newStyle = originalStyle.replace('grid-template-rows: 1fr 1fr;', 'grid-template-rows: 24px 1fr 1fr;');
  wrapper.setAttribute('style', newStyle);
})();
