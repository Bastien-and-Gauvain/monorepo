import { ButtonPrimary, SelectEntry, TextAreaEntry, TextEntry } from 'design-system';
import { useState } from 'react';

import {
  getLinkedInProfileInformation,
  type LinkedInProfileInformation,
} from './../../contents/linkedin-profile-scraper';

export const Form = ({ initialValues }: { initialValues: LinkedInProfileInformation }) => {
  // From LinkedIn
  const [firstName, setFirstName] = useState<string>(initialValues.name.firstName);
  const [lastName, setLastName] = useState<string>(initialValues.name.lastName);
  const [jobTitle, setJobTitle] = useState<string>(initialValues.jobTitle);
  const [currentCompany, setCurrentCompany] = useState<string>(initialValues.currentCompany);
  const [location, setLocation] = useState<string>(initialValues.location);

  // Not from LinkedIn
  const [status, setStatus] = useState<string>('notContacted');
  const [gender, setGender] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const onReload = async () => {
    const scrapingResult = await getLinkedInProfileInformation();
    const { name, jobTitle, currentCompany, location } = scrapingResult;
    const { firstName, lastName } = name;
    setFirstName(firstName);
    setLastName(lastName);
    setJobTitle(jobTitle);
    setCurrentCompany(currentCompany);
    setLocation(location);
  };

  return (
    <div className="flex flex-col space-y-3">
      <SelectEntry
        labelText="Status"
        id="status"
        handleChange={(e) => setStatus(e.target.value)}
        initialValue={status}
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
        initialValue={gender}
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
