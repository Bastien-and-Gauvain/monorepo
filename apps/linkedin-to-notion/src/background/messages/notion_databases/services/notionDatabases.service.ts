import { supabase } from '~core/supabase';
import type { Tables, TablesInsert } from '~src/background/types/supabase';

import type { NotionService } from '../../notion/services/notion.service';

export class NotionDatabasesService {
  constructor(private readonly notionService: NotionService) {}

  async getOrCreateOneNotionDatabase(
    notionDatabase: TablesInsert<'notion_databases'>
  ): Promise<Tables<'notion_databases'>> {
    {
      const { data, error } = await supabase
        .from('notion_databases')
        .select('*')
        .eq('notion_id', notionDatabase.notion_id);
      if (error) {
        throw new Error(`getOrCreateOneNotionDatabase: couldn't find notion database ${JSON.stringify(error)}`);
      }
      if (data.length > 0) {
        return data[0];
      }
    }

    {
      if (!notionDatabase.notion_id) {
        throw new Error('getOrCreateOneNotionDatabase: notion_id is required');
      }
      const database = await this.notionService.getDatabaseById(notionDatabase.notion_id);
      const { data, error } = await supabase
        .from('notion_databases')
        .upsert([{ ...notionDatabase, description: database.properties, name: database?.title?.[0]?.plain_text }])
        .select();
      if (error || data.length === 0) {
        throw new Error(
          `getOrCreateOneNotionDatabase: couldn't upsert notion database ${JSON.stringify(error)} ${JSON.stringify(
            data
          )}`
        );
      }

      return data[0];
    }
  }
}

export default {};
