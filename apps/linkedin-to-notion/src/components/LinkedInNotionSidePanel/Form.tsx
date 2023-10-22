import { ButtonPrimary, SelectEntry, TextAreaEntry, TextEntry, ToggleEntry } from 'design-system';
import { useEffect, useState } from 'react';

import { type LinkedInProfileInformation } from './../../contents/linkedin-profile-scraper';
import { NotionDatabasesSelect } from './NotionDatabasesSelect';

export type NotionProfileInformation = {
  /**
   * The name of the profile stored in Notion
   */
  name: {
    firstName: string;
    lastName: string;
  };

  /**
   * The job title of the profile stored in Notion
   */
  jobTitle: string;

  /**
   * The current company of the profile stored in Notion
   */
  currentCompany: string;

  /**
   * The location of the profile stored in Notion
   */
  location: string;

  /**
   * The LinkedIn URL of the profile stored in Notion
   */
  linkedInURL: string;

  /**
   * The status of the profile that's stored in Notion
   */
  status: 'notContacted' | 'contacted' | 'inProcess' | 'noMatch' | 'notInterested' | 'hired';

  /**
   * The gender of the profile stored in Notion
   */
  gender: '' | 'M' | 'F';

  /**
   * Any comments on the profile, stored in Notion
   */
  comment: string;
};

export const Form = ({
  linkedinValues,
  notionValues,
  onReload,
}: {
  linkedinValues: LinkedInProfileInformation;
  notionValues?: NotionProfileInformation;
  onReload: () => void;
}) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');
  const [currentCompany, setCurrentCompany] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [status, setStatus] = useState<string>('notContacted');
  const [gender, setGender] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);

  const setLinkedInValues = async () => {
    const { name, jobTitle, currentCompany, location } = linkedinValues;
    const { firstName, lastName } = name;
    setFirstName(firstName);
    setLastName(lastName);
    setJobTitle(jobTitle);
    setCurrentCompany(currentCompany);
    setLocation(location);
    setStatus('notContacted');
    setGender('');
    setComment('');
  };

  const setNotionValues = async () => {
    const { name, jobTitle, currentCompany, location, status, gender, comment } = notionValues;
    const { firstName, lastName } = name;
    setFirstName(firstName);
    setLastName(lastName);
    setJobTitle(jobTitle);
    setCurrentCompany(currentCompany);
    setLocation(location);
    setStatus(status);
    setGender(gender);
    setComment(comment);
  };

  const onSwitch = async (event: React.ChangeEvent<HTMLInputElement>) => setChecked(event.target.checked);

  useEffect(() => {
    checked ? setNotionValues() : setLinkedInValues();
  }, [checked]);

  return (
    <div className="flex flex-col space-y-3">
      <NotionDatabasesSelect />
      {notionValues && (
        <ToggleEntry
          options={{ unchecked: 'LinkedIn', checked: 'Notion' }}
          inputId="linkedInOrNotion"
          handleChange={onSwitch}
          checked={checked}
          labelText="Data from:"
        />
      )}
      <SelectEntry
        labelText="Status"
        id="status"
        handleChange={(e) => setStatus(e.target.value)}
        initialValue={'notContacted'}
        value={status}
        options={[
          {
            id: 'not-contacted',
            label: 'Not contacted',
            value: 'notContacted',
          },
          {
            id: 'contacted',
            label: 'Contacted',
            value: 'contacted',
          },
          {
            id: 'in-process',
            label: 'In process',
            value: 'inProcess',
          },
          {
            id: 'no-match',
            label: 'No match',
            value: 'noMatch',
          },
          {
            id: 'not-interested',
            label: 'Not interested',
            value: 'notInterested',
          },
          {
            id: 'hired',
            label: 'Hired',
            value: 'hired',
          },
        ]}
      />
      <div className="flex space-x-4">
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
        initialValue={currentCompany}
        placeholder="Rock Band"
        inputId="linkedin-current-company"
        handleChange={(e) => setCurrentCompany(e.target.value)}
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
        handleChange={(e) => setGender(e.target.value)}
        initialValue={''}
        value={gender}
        options={[
          {
            id: 'empty-gender',
            label: '',
            value: '',
          },
          {
            id: 'female',
            label: 'Female',
            value: 'female',
          },
          {
            id: 'male',
            label: 'Male',
            value: 'male',
          },
        ]}
      />
      <TextAreaEntry
        inputId="comment"
        labelText="Comment"
        value={comment}
        handleChange={(e) => setComment(e.target.value)}
      />
      <div className="flex space-x-2">
        <ButtonPrimary className="flex-grow">Save</ButtonPrimary>
        <ButtonPrimary onClick={onReload}>🔄</ButtonPrimary>
      </div>
    </div>
  );
};
