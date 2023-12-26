import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { Session } from '@supabase/supabase-js';
import { SelectEntry, TextAreaEntry, TextEntry, ToggleEntry } from 'design-system';
import { useEffect, useState } from 'react';

import { sendToBackground } from '@plasmohq/messaging';
import { useStorage } from '@plasmohq/storage/hook';

import type {
  NotionProfileGender,
  NotionProfileInformation,
  NotionProfileStatus,
} from '~src/background/messages/notion/notion.type';
import { OnboardingStatus } from '~src/background/messages/users/services/user.service';
import type { Tables } from '~src/background/types/supabase';
import { routes } from '~src/routes';

import { type LinkedInProfileInformation } from './../../../contents/scrapers/linkedin-profile-scraper';
import { Alert, type AlertState } from './../Alert';
import { FullScreenLoader } from './../FullScreenLoader';
import { NotionDatabasesSelect } from './../NotionDatabasesSelect';
import { CallToAction, OnboardingCallToAction } from './CallToAction';
import {
  fromInputsToNotionProfileInformation,
  fromLinkedInProfileInformationToInputs,
  fromNotionProfileInformationToInputs,
} from './formHelpers';
import { genderOptions, statusOptions } from './formOptions';

export type Inputs = {
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  location: string;
  status: NotionProfileStatus;
  gender: NotionProfileGender;
  comment: string;
  linkedInUrl: string;
};

export const Form = ({
  linkedinValues,
  onReload,
  onReloadLoading,
}: {
  linkedinValues: LinkedInProfileInformation;
  onReload: () => void;
  onReloadLoading: boolean;
}) => {
  // We need to have the selected database stored somewhere
  const [selectedNotionDatabase] = useStorage<string>('selectedNotionDatabase');
  const [user, setUser] = useStorage<Tables<'users'>>('user');

  const linkedinUrl = window.location.href.match(/https:\/\/[a-z]{2,4}\.linkedin\.com\/in\/[^/]+\//gim)?.[0];
  const [formValues, setFormValues] = useState<Inputs>({
    firstName: '',
    lastName: '',
    jobTitle: '',
    company: '',
    location: '',
    status: 'NOT_CONTACTED',
    gender: '',
    comment: '',
    linkedInUrl: window.location.href.match(/https:\/\/[a-z]{2,4}\.linkedin\.com\/in\/[^/]+\//gim)?.[0],
  });

  // To handle the toggle switch
  const [displayNotionValues, setDisplayNotionValues] = useState<boolean>(false);

  // To handle the interactions with Notion
  const [session] = useStorage<Session | null>('session');
  const [notionId, setNotionId] = useState<string>('');
  const [alertState, setAlertState] = useState<AlertState>(null);
  const [isNotionLoading, setIsNotionLoading] = useState<boolean>(false);
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);

  // Values of the profile in the selected DB in Notion
  const [currentNotionValues, setCurrentNotionValues] = useState<NotionProfileInformation | null>(null);

  useEffect(() => {
    if (displayNotionValues && currentNotionValues) {
      setFormValues(fromNotionProfileInformationToInputs(currentNotionValues));
    }

    if (!displayNotionValues) {
      setFormValues(fromLinkedInProfileInformationToInputs(linkedinValues, formValues));
    }
  }, [displayNotionValues, currentNotionValues, linkedinValues]);

  useEffect(() => {
    if (selectedNotionDatabase) {
      findProfileInNotionDatabase(selectedNotionDatabase, linkedinUrl);
    }
  }, [selectedNotionDatabase]);

  const findProfileInNotionDatabase = async (databaseId: string, linkedinUrl: string): Promise<void> => {
    setIsNotionLoading(true);

    let res: NotionProfileInformation;
    try {
      res = await sendToBackground<
        { notionToken: string; databaseId: string; linkedinUrl: string },
        NotionProfileInformation
      >({
        name: 'notion/resolvers/findProfileInDatabase',
        body: {
          notionToken: session.provider_token,
          databaseId,
          linkedinUrl,
        },
      });
    } catch (error) {
      console.log("The profile query didn't work", res);
      setAlertState('error');
      setCurrentNotionValues(null);
      setIsNotionLoading(false);
      return;
    }

    // No matching profile in Notion
    if (!res) {
      console.log('No profile found in Notion');
      setCurrentNotionValues(null);
      setAlertState('new-profile');
      setIsNotionLoading(false);
      return;
    }

    // Matching profile found
    console.log('Profile found in Notion');
    setCurrentNotionValues(res);
    setNotionId(res.notionId);
    setAlertState('in-notion');

    setFormValues({
      ...formValues,
      status: res.status,
      gender: res.gender,
      comment: res.comment,
    });

    setIsNotionLoading(false);
    return;
  };

  const saveLinkedInProfile = async (): Promise<void> => {
    setIsSaveLoading(true);

    try {
      const res = await sendToBackground<
        { notionToken: string; databaseId: string; linkedInProfileInformation: NotionProfileInformation },
        PageObjectResponse
      >({
        name: 'notion/resolvers/createProfileInDatabase',
        body: {
          notionToken: session.provider_token,
          databaseId: selectedNotionDatabase,
          linkedInProfileInformation: fromInputsToNotionProfileInformation(
            formValues,
            currentNotionValues?.notionId,
            currentNotionValues?.notionUrl
          ),
        },
      });
      console.log('Profile saved in Notion');
      setCurrentNotionValues(fromInputsToNotionProfileInformation(formValues, res.id, res.url));
      setAlertState('profile-saved');
    } catch (error) {
      console.log("Couldn't save the profile", error);
      setAlertState('error');
      return;
    }

    if (user.onboarding_status === OnboardingStatus.CONNECTED_TO_NOTION) {
      const updatedUser = await sendToBackground({
        name: 'users/resolvers/updateOnboardingStatus',
        body: { id: user.id, onboardingStatus: OnboardingStatus.FIRST_PROFILE_SAVED },
      });
      setUser(updatedUser);
      // go back to the onboarding page
      window.location.href = routes.tabs.onboarding;
    }

    setIsSaveLoading(false);
  };

  const updateLinkedInProfile = async (): Promise<void> => {
    setAlertState(null);
    setIsUpdateLoading(true);

    try {
      const res = await sendToBackground<
        { notionToken: string; pageId: string; linkedInProfileInformation: NotionProfileInformation },
        PageObjectResponse
      >({
        name: 'notion/resolvers/updateProfileInDatabase',
        body: {
          notionToken: session.provider_token,
          pageId: notionId,
          linkedInProfileInformation: fromInputsToNotionProfileInformation(
            formValues,
            currentNotionValues?.notionId,
            currentNotionValues?.notionUrl
          ),
        },
      });
      console.log('Profile updated in Notion');
      setCurrentNotionValues(fromInputsToNotionProfileInformation(formValues, res.id, res.url));
      setAlertState('profile-updated');
    } catch (error) {
      console.log("Couldn't update the profile", error);
      setAlertState('error');
      return;
    }

    setIsUpdateLoading(false);
  };

  if (isNotionLoading) {
    return <FullScreenLoader />;
  }

  // If we're not on a linkedin profile, we don't bother loading the form and avoid potential errors
  if (!linkedinUrl) {
    return <></>;
  }

  const isBeingOnboarded = user?.onboarding_status === OnboardingStatus.CONNECTED_TO_NOTION;
  return (
    <>
      {selectedNotionDatabase && isBeingOnboarded && (
        <OnboardingCallToAction saveHandler={saveLinkedInProfile} isSaving={isSaveLoading} />
      )}
      <div className={`plasmo-flex plasmo-flex-col plasmo-space-y-3${isBeingOnboarded ? ' plasmo-opacity-60' : ''}`}>
        <NotionDatabasesSelect />
        {selectedNotionDatabase && (
          <>
            {!isBeingOnboarded && <Alert state={alertState} notionUrl={currentNotionValues?.notionUrl} />}
            {currentNotionValues && (
              <ToggleEntry
                options={{ unchecked: 'LinkedIn', checked: 'Notion' }}
                inputId="linkedInOrNotion"
                handleChange={setDisplayNotionValues}
                labelText="Display data from"
              />
            )}
            <>
              <div className="plasmo-flex plasmo-space-x-2 plasmo-justify-between">
                <div className="plasmo-flex-grow">
                  <SelectEntry
                    labelText="Status"
                    id="status"
                    handleChange={(value) => setFormValues({ ...formValues, status: value as NotionProfileStatus })}
                    value={formValues.status}
                    options={statusOptions}
                  />
                </div>
                <SelectEntry
                  labelText="Gender"
                  id="gender"
                  handleChange={(value) => setFormValues({ ...formValues, gender: value as NotionProfileGender })}
                  value={formValues.gender}
                  options={genderOptions}
                />
              </div>
              <div className="plasmo-flex plasmo-space-x-2">
                <TextEntry
                  initialValue={formValues.firstName}
                  placeholder="Guy"
                  inputId="linkedin-first-name"
                  handleChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })}
                  labelText="First Name"
                />
                <TextEntry
                  initialValue={formValues.lastName}
                  placeholder="Tarenbois"
                  inputId="linkedin-last-name"
                  handleChange={(e) => setFormValues({ ...formValues, lastName: e.target.value })}
                  labelText="Last Name"
                />
              </div>
              <TextEntry
                initialValue={formValues.jobTitle}
                placeholder="Musicien"
                inputId="linkedin-job-title"
                handleChange={(e) => setFormValues({ ...formValues, jobTitle: e.target.value })}
                labelText="Job title"
              />
              <TextEntry
                initialValue={formValues.company}
                placeholder="Rock Band"
                inputId="linkedin-current-company"
                handleChange={(e) => setFormValues({ ...formValues, company: e.target.value })}
                labelText="Current company"
              />
              <TextEntry
                initialValue={formValues.location}
                placeholder="Paris"
                inputId="linkedin-location"
                handleChange={(e) => setFormValues({ ...formValues, location: e.target.value })}
                labelText="Location"
              />
              <TextAreaEntry
                inputId="comment"
                labelText="Comment"
                value={formValues.comment}
                handleChange={(e) => setFormValues({ ...formValues, comment: e.target.value })}
              />
              {!isBeingOnboarded && (
                <CallToAction
                  hasNotionValues={!!currentNotionValues}
                  isDisplayingNotionValues={displayNotionValues}
                  updateHandler={updateLinkedInProfile}
                  isUpdating={isUpdateLoading}
                  saveHandler={saveLinkedInProfile}
                  isSaving={isSaveLoading}
                  reloadHandler={onReload}
                  isReloading={onReloadLoading}
                />
              )}
            </>
          </>
        )}
      </div>
    </>
  );
};
