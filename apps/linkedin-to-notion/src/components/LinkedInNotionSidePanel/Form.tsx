import { ButtonPrimary, SelectEntry, TextEntry } from 'design-system';

import type { LinkedInProfileInformation } from './../../contents/linkedin-profile-scraper';

export const Form = ({
  initialValues,
  onReload,
}: {
  initialValues: LinkedInProfileInformation;
  onReload: () => void;
}) => {
  return (
    <form className="flex flex-col space-y-4">
      <SelectEntry
        labelText="Status"
        id="status"
        handleChange={() => {}}
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
          initialValue={initialValues.name.firstName}
          placeholder="Guy"
          inputId="linkedin-first-name"
          handleChange={() => {}}
          labelText="First Name"
        />
        <TextEntry
          initialValue={initialValues.name.lastName}
          placeholder="Tarenbois"
          inputId="linkedin-last-name"
          handleChange={() => {}}
          labelText="Last Name"
        />
      </div>
      <TextEntry
        initialValue={initialValues.jobTitle}
        placeholder="Musicien"
        inputId="linkedin-job-title"
        handleChange={() => {}}
        labelText="Job title"
      />
      <TextEntry
        initialValue={initialValues.currentCompany}
        placeholder="Rock Band"
        inputId="linkedin-current-company"
        handleChange={() => {}}
        labelText="Current company"
      />
      <TextEntry
        initialValue={initialValues.location}
        placeholder="Paris"
        inputId="linkedin-location"
        handleChange={() => {}}
        labelText="Location"
      />
      <SelectEntry
        labelText="Gender"
        id="gender"
        handleChange={() => {}}
        options={[
          {
            id: '',
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
          {
            id: 'other',
            label: 'Other',
            value: 'other',
          },
        ]}
      />
      <div className="flex space-x-2">
        <ButtonPrimary className="flex-grow">Save</ButtonPrimary>
        <ButtonPrimary onClick={onReload}>🔄</ButtonPrimary>
      </div>
    </form>
  );
};
