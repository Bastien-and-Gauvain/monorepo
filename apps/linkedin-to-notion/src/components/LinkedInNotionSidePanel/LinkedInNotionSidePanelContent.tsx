import logo from 'data-base64:~assets/icon.png';
import cssText from 'data-text:~style.css';
import { ButtonPrimary, Heading2, IFramedSidePanel, Spinner } from 'design-system';
import { createElement, useEffect, useState } from 'react';

import './../../../style.css'; // for the font to load

import {
  getLinkedInProfileInformation,
  type LinkedInProfileInformation,
} from './../../contents/linkedin-profile-scraper';
import { Form, type NotionProfileInformation } from './Form';

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
  const [notionProfileInformation, setNotionProfileInformation] = useState<NotionProfileInformation | null>(null);

  const setLinkedInValues = async () => {
    const scrapingResult = await getLinkedInProfileInformation();
    setLinkedInProfileInformation(scrapingResult);
  };

  const setNotionValues = async () => {
    const firstName = 'Will';
    const lastName = 'Ramos';
    const jobTitle = 'Vocalist';
    const currentCompany = 'Lorna Shore';
    const location = 'Los Angeles';
    const status = 'hired';
    const linkedInURL = 'https://www.linkedin.com/in/will-ramos';
    const gender = 'M';
    const comment = 'Best deathcore vocalist ever.';
    setNotionProfileInformation({
      name: { firstName, lastName },
      jobTitle,
      currentCompany,
      location,
      linkedInURL,
      status,
      gender,
      comment,
    });
  };

  useEffect(() => {
    setLinkedInValues();
    setNotionValues();
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
      hasTranslateButton={true}
      hasLogoutButton={isLoggedIn}
      head={getIFrameStyle()}
      isOpen={isOpen}
      onCloseCallback={() => onCloseCallback()}
      onLogoutCallback={() => logoutCallBack()}
      id={id}
      className="top-48 space-y-4 flex flex-col">
      <div className="flex flex-col items-center">
        <img src={logo} className="w-12" />
        <Heading2>LinkedIn to Notion</Heading2>
      </div>
      {isLoggedIn ? (
        linkedInProfileInformation ? (
          <Form
            linkedinValues={linkedInProfileInformation}
            notionValues={notionProfileInformation}
            onReload={setLinkedInValues}
          />
        ) : (
          <Spinner />
        )
      ) : (
        <ButtonPrimary onClick={loginCallback}>Sign in with Notion</ButtonPrimary>
      )}
    </IFramedSidePanel>
  );
};
