import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { SelectEntry, TextAreaEntry, TextEntry, ToggleEntry } from 'design-system';
import { useEffect, useState } from 'react';

import { sendToBackground } from '@plasmohq/messaging';
import { useStorage } from '@plasmohq/storage/hook';

import { useSupabaseSession } from '~core/supabase';
import type {
  SaveOneCandidateProfileInput,
  UpdateOneCandidateProfileInput,
} from '~src/background/messages/candidate_profiles/candidateProfiles.type';
import type {
  NotionProfileGender,
  NotionProfileInformation,
  NotionProfileStatus,
} from '~src/background/messages/notion/notion.type';
import { OnboardingStatus } from '~src/background/messages/users/services/user.service';
import { useGetUser } from '~src/components/Shared/getUser.hook';
import { routes } from '~src/routes';

import { type LinkedInProfileInformation } from './../../../contents/scrapers/linkedin-profile-scraper';
import { Alert, type AlertState } from './../Alert';
import { FullScreenLoader } from './../FullScreenLoader';
import { NotionDatabasesSelect } from './../NotionDatabasesSelect';
import { CallToAction, OnboardingCallToAction } from './CallToAction';
import {
  fromFormInputToCandidateProfile,
  fromInputsToNotionProfileInformation,
  fromLinkedInProfileInformationToInputs,
  fromNotionProfileInformationToInputs,
} from './formHelpers';
import { genderOptions, statusOptions } from './formOptions';

export type FormInput = {
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  location: string;
  status: NotionProfileStatus;
  gender: NotionProfileGender;
  comment: string;
  linkedinUrl: string;
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
  const [user, setUser] = useGetUser();

  const linkedinUrl = window.location.href.match(/https:\/\/[a-z]{2,4}\.linkedin\.com\/in\/[^/]+\//gim)?.[0] ?? '';
  const [formValues, setFormValues] = useState<FormInput>({
    firstName: '',
    lastName: '',
    jobTitle: '',
    company: '',
    location: '',
    status: 'NOT_CONTACTED',
    gender: '',
    comment: '',
    linkedinUrl,
  });

  // To handle the toggle switch
  const [displayNotionValues, setDisplayNotionValues] = useState<boolean>(false);

  // To handle the interactions with Notion
  const { notionToken } = useSupabaseSession();
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
    if (notionToken && selectedNotionDatabase && linkedinUrl) {
      findProfileInNotionDatabase(selectedNotionDatabase, linkedinUrl);
    }
  }, [notionToken, selectedNotionDatabase]);

  const findProfileInNotionDatabase = async (databaseId: string, linkedinUrl: string): Promise<void> => {
    setIsNotionLoading(true);

    let res: NotionProfileInformation;
    try {
      if (!notionToken) {
        console.error('No provider_token found');
        return;
      }
      res = await sendToBackground<
        { notionToken: string; databaseId: string; linkedinUrl: string },
        NotionProfileInformation
      >({
        name: 'notion/resolvers/findProfileInDatabase',
        body: {
          notionToken: notionToken,
          databaseId,
          linkedinUrl,
        },
      });
    } catch (error) {
      console.log("The profile query didn't work for ", linkedinUrl);
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
    if (!notionToken) {
      console.error('No provider_token found');
      return;
    }

    if (!user?.id) {
      console.error('No user found');
      return;
    }

    const profileSaved = await sendToBackground<SaveOneCandidateProfileInput, PageObjectResponse>({
      name: 'candidate_profiles/resolvers/saveOneCandidateProfile',
      body: {
        candidateProfile: fromFormInputToCandidateProfile(formValues),
        notion: {
          accessToken: notionToken,
          databaseId: selectedNotionDatabase,
          notionPageId: currentNotionValues?.notionId,
          notionUrl: currentNotionValues?.notionUrl,
        },
        userId: user.id,
      },
    });
    setCurrentNotionValues(fromInputsToNotionProfileInformation(formValues, profileSaved.id, profileSaved.url));
    setAlertState('profile-saved');

    if (user.onboarding_status === OnboardingStatus.CONNECTED_TO_NOTION) {
      setUser({ ...user, onboarding_status: OnboardingStatus.FIRST_PROFILE_SAVED });
      window.location.href = routes.tabs.onboarding;
    }

    setIsSaveLoading(false);
  };

  const updateLinkedInProfile = async (): Promise<void> => {
    setAlertState(null);
    setIsUpdateLoading(true);

    if (!notionToken) {
      console.error('No provider_token found');
      return;
    }

    if (!user?.id) {
      console.error('No user found');
      return;
    }

    const res = await sendToBackground<UpdateOneCandidateProfileInput, PageObjectResponse>({
      name: 'candidate_profiles/resolvers/updateOneCandidateProfile',
      body: {
        notion: {
          accessToken: notionToken,
          databaseId: selectedNotionDatabase,
          notionPageId: notionId,
          notionUrl: currentNotionValues?.notionUrl,
        },
        userId: user.id,
        candidateProfile: fromFormInputToCandidateProfile(formValues),
      },
    });
    setCurrentNotionValues(fromInputsToNotionProfileInformation(formValues, res.id, res.url));

    setAlertState('profile-updated');
    setIsUpdateLoading(false);
  };

  if (isNotionLoading) {
    return <FullScreenLoader />;
  }

  // If we're not on a linkedin profile, we don't bother loading the form and avoid potential errors
  if (!linkedinUrl) {
    return <></>;
  }

  const isUserOnboarding = user?.onboarding_status === OnboardingStatus.CONNECTED_TO_NOTION;
  return (
    <>
      {selectedNotionDatabase && isUserOnboarding && (
        <OnboardingCallToAction saveHandler={saveLinkedInProfile} isSaving={isSaveLoading} />
      )}
      <div className={`plasmo-flex plasmo-flex-col plasmo-space-y-3${isUserOnboarding ? ' plasmo-opacity-60' : ''}`}>
        <NotionDatabasesSelect />
        {selectedNotionDatabase && (
          <>
            {!isUserOnboarding && <Alert state={alertState} notionUrl={currentNotionValues?.notionUrl} />}
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
              {!isUserOnboarding && (
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
