import cssText from 'data-text:~style.css';
import { SmallParagraph } from 'design-system';
import type { PlasmoCSConfig, PlasmoGetInlineAnchor, PlasmoGetStyle, PlasmoMountShadowHost } from 'plasmo';

import { waitForElement } from './shared/waitForElement';

export const config: PlasmoCSConfig = {
  matches: ['https://www.notion.so/install-integration?response_type=code&client_id=$PLASMO_PUBLIC_NOTION_CLIENT_ID*'],
  all_frames: false,
};

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  // The Notion OAuth page is a single page app, so we need to wait for the element to exist
  return await waitForElement("div[style*='grid-template-rows: 1fr 1fr;']");
};

// With getInlineAnchor, Plasmo mounts the component after the anchor by default.
// In our case, we want the injected element to be the first.
export const mountShadowHost: PlasmoMountShadowHost = async ({ shadowHost, anchor, mountState }) => {
  const firstChild = anchor.element.querySelector('*');
  anchor.element.insertBefore(shadowHost, firstChild);
  mountState.observer.disconnect();
};

// Inject into the ShadowDOM
export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement('style');
  style.textContent = cssText;
  return style;
};

const Nudge = () => {
  console.log('Notion OAuth nudge wrapper styling');
  return (
    <div>
      <SmallParagraph className="plasmo-text-info-dark">Select this one 😉</SmallParagraph>
    </div>
  );
};

export default Nudge;
