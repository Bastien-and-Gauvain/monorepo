import cssText from 'data-text:~style.css';
import { ButtonPrimary, IFramedSidePanel } from 'design-system';
import { createElement, useEffect, useState } from 'react';

import { sendToBackground } from '@plasmohq/messaging';
import { useStorage } from '@plasmohq/storage/hook';

// For some reason, this causes the app to crash and have chrome.tabs.onUpdated errors
// import { linkedInProfileURLRegex } from '~src/background';
import type { Tables } from '~src/background/types/supabase';

import {
  getLinkedInProfileInformation,
  type LinkedInProfileInformation,
} from './../../contents/scrapers/linkedin-profile-scraper';
import { Form } from './Form/Form';
import { FullScreenLoader } from './FullScreenLoader';
import GoToLinkedInProfileCTA from './GoToLinkedInProfileCTA';

export const getIFrameStyle = () => {
  return createElement('style', {}, cssText);
};

export const LinkedInNotionSidePanelContent = ({
  id,
  isOpen,
  onCloseCallback,
  onOpenCallback,
  isLoggedIn,
  loginCallback,
  logoutCallBack,
}: {
  id: string;
  isOpen: boolean;
  onCloseCallback: () => void;
  onOpenCallback: () => void;
  isLoggedIn: boolean;
  loginCallback: () => void;
  logoutCallBack: () => void;
}) => {
  const [linkedInProfileInformation, setLinkedInProfileInformation] = useState<LinkedInProfileInformation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLinkedInProfile, setIsLinkedInProfile] = useState<boolean>(
    !!window.location.href.match(/linkedin\.com\/in\/[^/]+\/#?/)
  );
  const [user] = useStorage<Tables<'users'>>('user');

  const setLinkedInValues = async () => {
    setIsLoading(true);
    const scrapingResult = await getLinkedInProfileInformation();
    setLinkedInProfileInformation(scrapingResult);
    setIsLoading(false);
  };

  const sendUserLinkedInProfileInfoToBackground = async (scrapingResults: LinkedInProfileInformation) => {
    await sendToBackground({
      name: 'users/resolvers/updateUserLinkedInProfileInfo',
      body: {
        id: user.id,
        userLinkedInProfileInfo: scrapingResults,
      },
    });
  };

  useEffect(() => {
    setLinkedInValues();
  }, []);

  useEffect(() => {
    if (user?.id && linkedInProfileInformation?.linkedInURL.match(/linkedin\.com\/in\/me/)) {
      sendUserLinkedInProfileInfoToBackground(linkedInProfileInformation);
    }
  }, [linkedInProfileInformation, user]);

  // Listen the icon onClick message from the background script
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg === 'updateLinkedInNotionSidePanel') {
      setIsLinkedInProfile(true);
      setLinkedInProfileInformation(null);
      // TODO: find a more robust alternative than a timeout
      // Couldn't put the timeout in the bg (don't know why)
      setTimeout(() => setLinkedInValues(), 2000);
    }

    if (msg === 'askToGoBackToLinkedInProfile') {
      setIsLinkedInProfile(false);
    }
  });

  const notALinkedInProfileContent = <GoToLinkedInProfileCTA />;

  const linkedInProfileContent = !isLoggedIn ? (
    <ButtonPrimary onClick={loginCallback}>Sign in with Notion</ButtonPrimary>
  ) : linkedInProfileInformation ? (
    <Form linkedinValues={linkedInProfileInformation} onReload={setLinkedInValues} onReloadLoading={isLoading} />
  ) : (
    <FullScreenLoader />
  );

  return (
    <IFramedSidePanel
      hasCloseButton={true}
      hasDragButton={true}
      hasLogoutButton={isLoggedIn}
      head={getIFrameStyle()}
      isOpen={isOpen}
      onCloseCallback={() => onCloseCallback()}
      onOpenCallback={() => onOpenCallback()}
      onLogoutCallback={() => logoutCallBack()}
      id={id}
      className="plasmo-top-48 plasmo-space-y-4 plasmo-flex plasmo-flex-col">
      {isLinkedInProfile ? linkedInProfileContent : notALinkedInProfileContent}
    </IFramedSidePanel>
  );
};
