import logo from 'data-base64:~assets/icon.png';
import cssText from 'data-text:~style.css';
import { ButtonPrimary, Heading2, IFramedSidePanel, Spinner } from 'design-system';
import { createElement, useEffect, useState } from 'react';

import './../../../style.css'; // for the font to load

import {
  getLinkedInProfileInformation,
  type LinkedInProfileInformation,
} from './../../contents/linkedin-profile-scraper';
import { Form } from './Form';

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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const injectLinkedInInformation = async () => {
    const scrapingResult = await getLinkedInProfileInformation();
    setLinkedInProfileInformation(scrapingResult);
  };

  // Watch changes in the chrome storage to see if we log in or out
  // If we log in, the profile page should be scraped
  // If we log out, we should remove the form and display the login button
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.api) {
      const loggedIn = !!changes.api.newValue;
      setIsLoggedIn(loggedIn);
      if (loggedIn) injectLinkedInInformation();
    }
  });

  useEffect(() => {
    // Check if we are logged in
    chrome.storage.local.get('api', ({ api }) => {
      // Only scrape content if we are
      if (api) {
        setIsLoggedIn(true);
        injectLinkedInInformation();
      }
    });
  }, []);

  // Listen the icon onClick message from the background script
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg === 'updateLinkedInNotionSidePanel') {
      setLinkedInProfileInformation(null);
      // TODO: find a more robust alternative than a timeout
      // Couldn't put the timeout in the bg (don't know why)
      setTimeout(() => injectLinkedInInformation(), 2000);
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
      {isLoggedIn ? (
        linkedInProfileInformation ? (
          <Form initialValues={linkedInProfileInformation} />
        ) : (
          <Spinner />
        )
      ) : (
        <ButtonPrimary onClick={() => console.log('asked to login')}>LOGIN</ButtonPrimary>
      )}
    </IFramedSidePanel>
  );
};
