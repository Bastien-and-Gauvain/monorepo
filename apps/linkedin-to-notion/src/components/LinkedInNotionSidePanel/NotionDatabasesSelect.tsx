import type { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { SelectEntry, Spinner } from 'design-system';
import { useEffect, useState } from 'react';

import { sendToBackground } from '@plasmohq/messaging';
import { useStorage } from '@plasmohq/storage/hook';

import { getDatabaseTitle } from './notionFormat.util';

export const NotionDatabasesSelect = () => {
  const [notionDatabases, setNotionDatabases] = useState<{ databases: DatabaseObjectResponse[] } | null>(null);
  const [selectedNotionDatabase, setSelectedNotionDatabase] = useStorage<string>('selectedNotionDatabase');
  const [notionToken] = useStorage('notionToken');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const notionDatabasesSetter = async () => {
      const databases = await sendToBackground({
        name: 'notion/resolvers/getEligibleDatabases',
        body: {
          notionToken: notionToken.accessToken,
        },
      });
      setNotionDatabases(databases);
      setIsLoading(false);
    };

    if (notionToken?.accessToken) {
      notionDatabasesSetter();
    }
  }, [notionToken]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!notionDatabases?.databases?.length) {
    return <></>;
  }

  return (
    <SelectEntry
      labelText="Notion databases"
      id="notion-databases"
      handleChange={(e) => setSelectedNotionDatabase(e.target.value)}
      initialValue={selectedNotionDatabase}
      options={notionDatabases.databases.map((database: DatabaseObjectResponse) => ({
        id: database.id,
        label: getDatabaseTitle(database),
        value: database.id,
      }))}
    />
  );
};
