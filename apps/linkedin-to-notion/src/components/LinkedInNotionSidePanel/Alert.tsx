import { ErrorAlert, InfoAlert } from 'design-system';

export type AlertState = 'error' | 'in-notion' | null;

export const Alert = ({ state, notionUrl }: { state: AlertState; notionUrl?: string }) => {
  if (state === 'error') {
    return <ErrorAlert message="Something went wrong. Open developer console to know more." />;
  }

  if (state === 'in-notion') {
    return <InfoAlert message="Click to open profile in Notion" link={notionUrl} />;
  }

  return <></>;
};
