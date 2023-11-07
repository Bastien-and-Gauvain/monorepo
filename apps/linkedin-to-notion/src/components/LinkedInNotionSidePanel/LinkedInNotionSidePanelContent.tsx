import cssText from 'data-text:~style.css';
import { ButtonPrimary, IFramedSidePanel } from 'design-system';
import { createElement, useEffect, useState } from 'react';

import {
  getLinkedInProfileInformation,
  type LinkedInProfileInformation,
} from './../../contents/scrapers/linkedin-profile-scraper';
import { Form } from './Form';
import { FullScreenLoader } from './FullScreenLoader';

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
  const [isLoading, setIsLoading] = useState(false);

  const setLinkedInValues = async () => {
    setIsLoading(true);
    const scrapingResult = await getLinkedInProfileInformation();
    setLinkedInProfileInformation(scrapingResult);
    setIsLoading(false);
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
          <Form linkedinValues={linkedInProfileInformation} onReload={setLinkedInValues} onReloadLoading={isLoading} />
        ) : (
          <FullScreenLoader />
        )
      ) : (
        <ButtonPrimary onClick={loginCallback}>Sign in with Notion</ButtonPrimary>
      )}
    </IFramedSidePanel>
  );
};
