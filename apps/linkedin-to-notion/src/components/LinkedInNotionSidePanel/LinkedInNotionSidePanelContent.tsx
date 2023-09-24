import logo from 'data-base64:~assets/icon.png';
import cssText from 'data-text:~style.css';
import { Heading2, IFramedSidePanel, Spinner } from 'design-system';
import { createElement, useEffect, useState } from 'react';

import './../../../style.css'; // for the font to load

import {
  getLinkedInProfileInformation,
  type LinkedInProfileInformation,
} from './../../contents/linkedin-profile-scraper';
import { Form } from './Form';
import { isScrapingComplete } from './helpers';

export const getIFrameStyle = () => {
  return createElement('style', {}, cssText);
};

export const LinkedInNotionSidePanelContent = ({
  id,
  isOpen,
  onCloseCallback,
}: {
  id: string;
  isOpen: boolean;
  onCloseCallback: () => void;
}) => {
  const [linkedInProfileInformation, setLinkedInProfileInformation] = useState<LinkedInProfileInformation | null>(null);

  const injectLinkedInScraping = async () => {
    let delay = 100;
    // Wait for the page to be loaded, works better this way than with event listeners
    while (document.readyState !== 'complete') {
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay = delay * 2;
    }
    const scrapingResult = getLinkedInProfileInformation();
    setLinkedInProfileInformation(scrapingResult);
  };

  useEffect(() => {
    injectLinkedInScraping();
  }, []);

  useEffect(() => {
    const retryScraping = async () => {
      let numberOfRetries = 0;
      while (!isScrapingComplete(linkedInProfileInformation) && numberOfRetries < 2) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const scrapingResult = getLinkedInProfileInformation();
        setLinkedInProfileInformation(scrapingResult);
        numberOfRetries++;
      }
    };

    retryScraping();
  }, [linkedInProfileInformation]);

  // Listen the icon onClick message from the background script
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg === 'updateLinkedInNotionSidePanel') {
      setLinkedInProfileInformation(null);
      injectLinkedInScraping();
    }
  });

  return (
    <IFramedSidePanel
      hasCloseButton={true}
      hasTranslateButton={true}
      head={getIFrameStyle()}
      isOpen={isOpen}
      onCloseCallback={() => onCloseCallback()}
      id={id}
      className="top-48 space-y-4 flex flex-col">
      <div className="flex flex-col items-center">
        <img src={logo} className="w-12" />
        <Heading2>LinkedIn to Notion</Heading2>
      </div>
      {linkedInProfileInformation ? (
        <Form
          initialValues={linkedInProfileInformation}
          onReload={() => {
            setLinkedInProfileInformation(null);
            injectLinkedInScraping();
          }}
        />
      ) : (
        <Spinner />
      )}
    </IFramedSidePanel>
  );
};
