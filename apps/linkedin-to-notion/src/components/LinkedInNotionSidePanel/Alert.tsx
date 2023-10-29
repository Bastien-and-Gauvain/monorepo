import { ErrorAlert, InfoAlert, SuccessAlert } from 'design-system';

export type AlertState = 'error' | 'in-notion' | 'new-profile' | 'profile-updated' | null;

export const Alert = ({ state, notionUrl }: { state: AlertState; notionUrl?: string }) => {
  if (state === 'error') {
    return <ErrorAlert message="Something went wrong. Open developer console to know more." />;
  }

  if (state === 'in-notion') {
    return <InfoAlert message="Click to open profile in Notion" link={notionUrl} />;
  }

  if (state === 'new-profile') {
    return <InfoAlert message="It's a new profile!" />;
  }

  if (state === 'profile-updated') {
    return <SuccessAlert message="Successfully updated! Click to open ↗️" link={notionUrl} />;
  }

  return <></>;
};
