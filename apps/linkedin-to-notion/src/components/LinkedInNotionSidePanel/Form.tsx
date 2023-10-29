import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { ButtonPrimary, SelectEntry, TextAreaEntry, TextEntry, ToggleEntry } from 'design-system';
import { useEffect, useState } from 'react';

import { sendToBackground } from '@plasmohq/messaging';
import { useStorage } from '@plasmohq/storage/hook';

import type {
  ErrorResponse,
  NotionProfileGender,
  NotionProfileInformation,
  NotionProfileStatus,
} from '~src/background/messages/notion/notion.type';

import { type LinkedInProfileInformation } from './../../contents/scrapers/linkedin-profile-scraper';
import { Alert, type AlertState } from './Alert';
import { NotionDatabasesSelect } from './NotionDatabasesSelect';
import { genderOptions, statusOptions } from './utils/formOptions';
import { getPropertyValue } from './utils/notionFormat.util';

export const Form = ({
  linkedinValues,
  onReload,
}: {
  linkedinValues: LinkedInProfileInformation;
  onReload: () => void;
}) => {
  // We need to have the selected database stored somewhere
  const [selectedNotionDatabase] = useStorage<string>('selectedNotionDatabase');

  // We need to store the data from scraped profiles in the state
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [status, setStatus] = useState<NotionProfileStatus>('NOT_CONTACTED');
  const [gender, setGender] = useState<NotionProfileGender>('');
  const [comment, setComment] = useState<string>('');
  const linkedinUrl = window.location.href.match(/https:\/\/[a-z]{2,4}\.linkedin\.com\/in\/[^/]+\//gim)[0];

  // To handle the toggle switch
  const [displayNotionValues, setDisplayNotionValues] = useState<boolean>(false);

  // To handle the interactions with Notion
  const [notionToken] = useStorage('notionToken');
  const [notionId, setNotionId] = useState<string>('');
  const [alertState, setAlertState] = useState<AlertState>(null);

  // Values of the profile in the selected DB in Notion
  const [currentNotionValues, setCurrentNotionValues] = useState<NotionProfileInformation | null>(null);

  useEffect(() => {
    const setFormValues = () => {
      if (displayNotionValues) {
        const { name, jobTitle, company, location, status, gender, comment } = currentNotionValues;
        const { firstName, lastName } = name;
        setFirstName(firstName);
        setLastName(lastName);
        setJobTitle(jobTitle);
        setCompany(company);
        setLocation(location);
        setStatus(status || 'NOT_CONTACTED');
        setGender(gender || '');
        setComment(comment || '');
      }

      if (!displayNotionValues) {
        const { name, jobTitle, company, location } = linkedinValues;
        const { firstName, lastName } = name;
        setFirstName(firstName);
        setLastName(lastName);
        setJobTitle(jobTitle);
        setCompany(company);
        setLocation(location);
      }
    };

    setFormValues();
  }, [displayNotionValues, linkedinValues]);

  const findProfileInNotionDatabase = async (databaseId: string, linkedinUrl: string): Promise<void> => {
    const res = await sendToBackground<
      { notionToken: string; databaseId: string; linkedinUrl: string },
      NotionProfileInformation
    >({
      name: 'notion/resolvers/findProfileInDatabase',
      body: {
        notionToken: notionToken.accessToken,
        databaseId,
        linkedinUrl,
      },
    });

    if (res) {
      if ((res as unknown as ErrorResponse).error) {
        console.log("The profile query didn't work", res);
        setAlertState('error');
        setCurrentNotionValues(null);
        return;
      } else {
        // If we did find a profile
        console.log('Profile found in Notion', res);
        setCurrentNotionValues(res);
        setNotionId(res.notionId);
        setAlertState('in-notion');
        return;
      }
    } else {
      // The search worked but no profile in selected db
      console.log('No profile found in Notion');
      setCurrentNotionValues(null);
      setAlertState('new-profile');
      return;
    }
  };

  const handleNotionResponse = (response: PageObjectResponse) => {
    if (!response.properties) {
      setAlertState('error');
      console.log('No properties in the response', response);
      return;
    }

    const { properties, url, id } = response;
    const { firstName, lastName, jobTitle, company, location, linkedinUrl, status, gender, comment } = properties;

    setCurrentNotionValues({
      name: {
        firstName: getPropertyValue(firstName),
        lastName: getPropertyValue(lastName),
      },
      jobTitle: getPropertyValue(jobTitle),
      company: getPropertyValue(company),
      location: getPropertyValue(location),
      linkedinUrl: getPropertyValue(linkedinUrl),
      notionUrl: url,
      status: getPropertyValue(status) as NotionProfileStatus,
      gender: getPropertyValue(gender) as NotionProfileGender,
      comment: getPropertyValue(comment),
    });
    setNotionId(id);
    setAlertState('in-notion');
  };

  const saveLinkedInProfile = async (): Promise<void> => {
    const linkedInProfileInformation: NotionProfileInformation = {
      name: {
        firstName,
        lastName,
      },
      jobTitle,
      company,
      location,
      status,
      comment,
      linkedinUrl,
      gender,
      notionUrl: '',
    };

    const res = await sendToBackground<
      { notionToken: string; databaseId: string; linkedInProfileInformation: NotionProfileInformation },
      PageObjectResponse
    >({
      name: 'notion/resolvers/createProfileInDatabase',
      body: {
        notionToken: notionToken.accessToken,
        databaseId: selectedNotionDatabase,
        linkedInProfileInformation,
      },
    });

    if ((res as unknown as ErrorResponse).error) {
      console.log("Couldn't save the profile", res);
      setAlertState('error');
      return;
    }

    handleNotionResponse(res);
  };

  const updateLinkedInProfile = async (): Promise<void> => {
    const linkedInProfileInformation: NotionProfileInformation = {
      name: {
        firstName,
        lastName,
      },
      jobTitle,
      company,
      location,
      status,
      comment,
      linkedinUrl: currentNotionValues.linkedinUrl,
      gender,
      notionUrl: currentNotionValues.notionUrl,
    };

    const res = await sendToBackground<
      { notionToken: string; pageId: string; linkedInProfileInformation: NotionProfileInformation },
      PageObjectResponse
    >({
      name: 'notion/resolvers/updateProfileInDatabase',
      body: {
        notionToken: notionToken.accessToken,
        pageId: notionId,
        linkedInProfileInformation,
      },
    });

    if ((res as unknown as ErrorResponse).error) {
      console.log("Couldn't update the profile", res);
      setAlertState('error');
      return;
    } else {
      console.log('Profile updated in Notion', res);
      handleNotionResponse(res);
      setAlertState('profile-updated');
      return;
    }
  };

  return (
    <div className="plasmo-flex plasmo-flex-col plasmo-space-y-3">
      <Alert state={alertState} notionUrl={currentNotionValues?.notionUrl} />
      <NotionDatabasesSelect
        valueChangeHandler={(databaseId: string) => findProfileInNotionDatabase(databaseId, linkedinUrl)}
      />
      {currentNotionValues && (
        <ToggleEntry
          options={{ unchecked: 'LinkedIn', checked: 'Notion' }}
          inputId="linkedInOrNotion"
          handleChange={() => setDisplayNotionValues(!displayNotionValues)}
          checked={displayNotionValues}
          labelText="Data from:"
        />
      )}
      <SelectEntry
        labelText="Status"
        id="status"
        handleChange={(e) => setStatus(e.target.value as NotionProfileStatus)}
        initialValue={'Not Contacted'}
        value={status}
        options={statusOptions}
      />
      <div className="plasmo-flex plasmo-space-x-4">
        <TextEntry
          initialValue={firstName}
          placeholder="Guy"
          inputId="linkedin-first-name"
          handleChange={(e) => setFirstName(e.target.value)}
          labelText="First Name"
        />
        <TextEntry
          initialValue={lastName}
          placeholder="Tarenbois"
          inputId="linkedin-last-name"
          handleChange={(e) => setLastName(e.target.value)}
          labelText="Last Name"
        />
      </div>
      <TextEntry
        initialValue={jobTitle}
        placeholder="Musicien"
        inputId="linkedin-job-title"
        handleChange={(e) => setJobTitle(e.target.value)}
        labelText="Job title"
      />
      <TextEntry
        initialValue={company}
        placeholder="Rock Band"
        inputId="linkedin-current-company"
        handleChange={(e) => setCompany(e.target.value)}
        labelText="Current company"
      />
      <TextEntry
        initialValue={location}
        placeholder="Paris"
        inputId="linkedin-location"
        handleChange={(e) => setLocation(e.target.value)}
        labelText="Location"
      />
      <SelectEntry
        labelText="Gender"
        id="gender"
        handleChange={(e) => setGender(e.target.value as NotionProfileGender)}
        initialValue={''}
        value={gender}
        options={genderOptions}
      />
      <TextAreaEntry
        inputId="comment"
        labelText="Comment"
        value={comment}
        handleChange={(e) => setComment(e.target.value)}
      />
      <div className="plasmo-flex plasmo-space-x-2">
        {currentNotionValues ? (
          <ButtonPrimary className="plasmo-flex-grow" onClick={updateLinkedInProfile}>
            Update
          </ButtonPrimary>
        ) : (
          <ButtonPrimary className="plasmo-flex-grow" onClick={saveLinkedInProfile}>
            Save
          </ButtonPrimary>
        )}
        <ButtonPrimary onClick={onReload}>🔄</ButtonPrimary>
      </div>
    </div>
  );
};
