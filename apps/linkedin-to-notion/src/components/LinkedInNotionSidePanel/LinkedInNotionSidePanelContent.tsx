import cssText from 'data-text:~style.css';
import { ButtonPrimary, IFramedSidePanel, Spinner } from 'design-system';
import { createElement, useEffect, useState } from 'react';

import {
  getLinkedInProfileInformation,
  type LinkedInProfileInformation,
} from './../../contents/scrapers/linkedin-profile-scraper';
import { Form } from './Form';

export const getIFrameStyle = () => {
  return createElement('style', {}, cssText);
};

export const LinkedInNotionSidePanelContent = ({
  id,
  isOpen,
  onCloseCallback,
  isLoggedIn,
  loginCallback,
  logoutCallBack,
}: {
  id: string;
  isOpen: boolean;
  onCloseCallback: () => void;
  isLoggedIn: boolean;
  loginCallback: () => void;
  logoutCallBack: () => void;
}) => {
  const [linkedInProfileInformation, setLinkedInProfileInformation] = useState<LinkedInProfileInformation | null>(null);

  const setLinkedInValues = async () => {
    const scrapingResult = await getLinkedInProfileInformation();
    setLinkedInProfileInformation(scrapingResult);
  };

  useEffect(() => {
    setLinkedInValues();
  }, []);

  // Listen the icon onClick message from the background script
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg === 'updateLinkedInNotionSidePanel') {
      setLinkedInProfileInformation(null);
      // TODO: find a more robust alternative than a timeout
      // Couldn't put the timeout in the bg (don't know why)
      setTimeout(() => setLinkedInValues(), 2000);
    }
  });

  return (
    <IFramedSidePanel
      hasCloseButton={true}
      hasDragButton={true}
      hasLogoutButton={isLoggedIn}
      head={getIFrameStyle()}
      isOpen={isOpen}
      onCloseCallback={() => onCloseCallback()}
      onLogoutCallback={() => logoutCallBack()}
      id={id}
      className="plasmo-top-48 plasmo-space-y-4 plasmo-flex plasmo-flex-col">
      {isLoggedIn ? (
        linkedInProfileInformation ? (
          <Form linkedinValues={linkedInProfileInformation} onReload={setLinkedInValues} />
        ) : (
          <Spinner />
        )
      ) : (
        <ButtonPrimary onClick={loginCallback}>Sign in with Notion</ButtonPrimary>
      )}
    </IFramedSidePanel>
  );
};
