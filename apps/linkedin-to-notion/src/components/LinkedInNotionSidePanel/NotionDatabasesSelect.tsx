import type { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { ButtonPrimary, ErrorAlert, SelectEntry } from 'design-system';
import { useEffect, useState } from 'react';

import { sendToBackground } from '@plasmohq/messaging';
import { useStorage } from '@plasmohq/storage/hook';

import { FullScreenLoader } from './FullScreenLoader';
import { getDatabaseTitle } from './utils/notionFormat.util';

export const NotionDatabasesSelect = () => {
  const [notionDatabases, setNotionDatabases] = useState<DatabaseObjectResponse[]>([]);
  const [selectedNotionDatabase, setSelectedNotionDatabase] = useStorage<string>('selectedNotionDatabase');
  const [notionToken] = useStorage('notionToken');
  const [isLoading, setIsLoading] = useState(true);

  const notionDatabasesSetter = async () => {
    setIsLoading(true);

    try {
      const databases = await sendToBackground<{ notionToken: string }, DatabaseObjectResponse[]>({
        name: 'notion/resolvers/getEligibleDatabases',
        body: {
          notionToken: notionToken.accessToken,
        },
      });

      if (databases.length) {
        setNotionDatabases(databases);
        setSelectedNotionDatabase(selectedNotionDatabase || databases[0].id);
      }

      if (!databases.length) {
        setSelectedNotionDatabase('');
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (notionToken?.accessToken) {
      notionDatabasesSetter();
    }
  }, [notionToken, selectedNotionDatabase]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <>
      {notionDatabases.length === 0 ? (
        <>
          <ButtonPrimary onClick={notionDatabasesSetter}>Refresh databases</ButtonPrimary>
          <ErrorAlert
            message="No databases found. Click here to create a template."
            link="https://www.notion.so/7f997332291a4e80beebecbd489430b5?v=b993efeb1b064d6d8a261fd46a8fa07f&duplicate=true"
          />
        </>
      ) : (
        <SelectEntry
          labelText="Notion databases"
          id="notion-databases"
          handleChange={setSelectedNotionDatabase}
          value={selectedNotionDatabase}
          options={notionDatabases.map((database: DatabaseObjectResponse) => ({
            id: database.id,
            label: getDatabaseTitle(database),
            value: database.id,
          }))}
        />
      )}
    </>
  );
};
