import cssText from 'data-text:~style.css';
import { ButtonPrimary, IFramedSidePanel } from 'design-system';
import { createElement, useEffect, useState } from 'react';

import { sendToBackground } from '@plasmohq/messaging';

import GoToLinkedInProfileCTA from '../GoToLinkedInProfileCTA/GoToLinkedInProfileCTA';
import { useGetUser } from '../Shared/getUser.hook';
import {
  getLinkedInProfileInformation,
  type LinkedInProfileInformation,
} from './../../contents/scrapers/linkedin-profile-scraper';
import { Form } from './Form/Form';
import { FullScreenLoader } from './FullScreenLoader';

// Global message listener registry to handle messages even when component isn't mounted
const messageListeners = new Set<(msg: any) => void>();

// Single chrome message listener that delegates to all registered handlers
chrome.runtime.onMessage.addListener((msg) => {
  messageListeners.forEach((listener) => listener(msg));
  return true;
});

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
  const [user] = useGetUser();
  const [isLinkedInProfile, setIsLinkedInProfile] = useState<boolean>(
    !!window.location.href.match(/linkedin\.com\/in\/[^/]+\/#?/)
  );

  const setLinkedInValues = async () => {
    setIsLoading(true);
    const scrapingResult = await getLinkedInProfileInformation();
    setLinkedInProfileInformation(scrapingResult);
    setIsLoading(false);
  };

  const sendUserLinkedInProfileInfoToBackground = async (
    scrapingResults: LinkedInProfileInformation,
    userId: string
  ) => {
    await sendToBackground({
      name: 'users/resolvers/updateUserLinkedInProfileInfo',
      body: {
        id: userId,
        userLinkedInProfileInfo: scrapingResults,
      },
    });
  };

  useEffect(() => {
    setLinkedInValues();
  }, []);

  useEffect(() => {
    if (user?.id && linkedInProfileInformation?.linkedInURL.match(/linkedin\.com\/in\/me/)) {
      sendUserLinkedInProfileInfoToBackground(linkedInProfileInformation, user.id);
    }
  }, [linkedInProfileInformation, user]);

  useEffect(() => {
    // Register this component's message handler
    const handleMessage = (msg: any) => {
      if (msg === 'updateLinkedInNotionSidePanel') {
        setIsLinkedInProfile(true);
        setLinkedInProfileInformation(null);
        setTimeout(() => setLinkedInValues(), 2000);
      }

      if (msg === 'askToGoBackToLinkedInProfile') {
        setIsLinkedInProfile(false);
      }
    };

    messageListeners.add(handleMessage);
    return () => {
      messageListeners.delete(handleMessage);
    };
  }, []);

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
