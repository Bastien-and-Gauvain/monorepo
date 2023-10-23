import cssText from 'data-text:~style.css';
import { ButtonPrimary, IFramedSidePanel, Spinner } from 'design-system';
import { createElement, useEffect, useState } from 'react';

import {
  getLinkedInProfileInformation,
  type LinkedInProfileInformation,
} from './../../contents/scrapers/linkedin-profile-scraper';
// TODO Uncomment the line below when you want the toggle switch to work
// import { Form, type NotionProfileInformation } from './Form';

// TODO Comment the line below when you want the toggle switch to work
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
  // TODO Uncomment the line below when you want the toggle switch to work
  // const [notionProfileInformation, setNotionProfileInformation] = useState<NotionProfileInformation | null>(null);

  const setLinkedInValues = async () => {
    const scrapingResult = await getLinkedInProfileInformation();
    setLinkedInProfileInformation(scrapingResult);
  };

  // TODO Uncomment the function below when you want the toggle switch to work
  // const setNotionValues = async () => {
  //   const firstName = 'Will';
  //   const lastName = 'Ramos';
  //   const jobTitle = 'Vocalist';
  //   const currentCompany = 'Lorna Shore';
  //   const location = 'Los Angeles';
  //   const status = 'hired';
  //   const linkedInURL = 'https://www.linkedin.com/in/will-ramos';
  //   const gender = 'M';
  //   const comment = 'Best deathcore vocalist ever.';
  //   setNotionProfileInformation({
  //     name: { firstName, lastName },
  //     jobTitle,
  //     currentCompany,
  //     location,
  //     linkedInURL,
  //     status,
  //     gender,
  //     comment,
  //   });
  // };

  useEffect(() => {
    setLinkedInValues();
    // TODO Uncomment the function below when you want the toggle switch to work
    // setNotionValues();
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
      className="plasmo-top-48 plasmo-space-y-4 plasmo-flex plasmo-flex-col">
      {isLoggedIn ? (
        linkedInProfileInformation ? (
          <Form
            linkedinValues={linkedInProfileInformation}
            // TODO Uncomment the line below when you want the toggle switch to work
            // notionValues={notionProfileInformation}
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
