import cssText from 'data-text:~style.css';
import { SmallParagraph } from 'design-system';
import type { PlasmoCSConfig, PlasmoGetInlineAnchor, PlasmoGetStyle, PlasmoMountShadowHost } from 'plasmo';

import { waitForElementToExist } from './utils/utils';

export const config: PlasmoCSConfig = {
  matches: [
    'https://www.notion.so/install-integration?response_type=code&client_id=06ba891a-ecd0-4622-8489-6dae87349cde*',
  ],
  all_frames: false,
};

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  // The Notion OAuth page is a single page app, so we need to wait for the element to exist
  await waitForElementToExist('div', 'Use a template provided by the developer');
  return document.querySelector("div[style*='grid-template-rows: 1fr 1fr;']");
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
  console.log('aha');
  return (
    <div>
      <SmallParagraph className="plasmo-text-info-dark">Select this one 😉</SmallParagraph>
    </div>
  );
};

export default Nudge;

// // a function that injects the nudge in the page
// const injectNudge = () => {
//   const parent = document.querySelector("div[style*='grid-template-rows: 1fr 1fr;']");
//   const sibling = parent.querySelector("div[role='button']");
//   const nudgeText = document.createElement('p');
//   nudgeText.innerText = 'Select this one 😉';
//   nudgeText.className = 'plasmo-text-info-dark';
//   const nudge = document.createElement('div');
//   nudge.appendChild(nudgeText);
//   parent.insertBefore(nudge, sibling);
// };

// injectNudge();
