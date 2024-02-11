import type { PlasmoCSConfig } from 'plasmo';

import { waitForElement } from './shared/waitForElement';

export const config: PlasmoCSConfig = {
  matches: ['https://www.notion.so/install-integration?response_type=code&client_id=$PLASMO_PUBLIC_NOTION_CLIENT_ID*'],
};

(async () => {
  console.log('Notion OAuth nudge wrapper styling');
  const wrapper = await waitForElement("div[style*='grid-template-rows: 1fr 1fr;']");
  const originalStyle = wrapper.getAttribute('style');
  const newStyle = originalStyle?.replace('grid-template-rows: 1fr 1fr;', 'grid-template-rows: 24px 1fr 1fr;');
  if (!newStyle) {
    console.error('No new style found');
    return;
  }
  wrapper.setAttribute('style', newStyle);
})();
