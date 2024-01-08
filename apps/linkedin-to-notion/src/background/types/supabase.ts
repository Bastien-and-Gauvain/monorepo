export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      linkedin_profiles: {
        Row: {
          id: string;
          linkedin_url: string | null;
          notion_database: string | null;
          saved_at: string;
          status: string | null;
          status_updated_at: string | null;
          user: string | null;
        };
        Insert: {
          id?: string;
          linkedin_url?: string | null;
          notion_database?: string | null;
          saved_at?: string;
          status?: string | null;
          status_updated_at?: string | null;
          user?: string | null;
        };
        Update: {
          id?: string;
          linkedin_url?: string | null;
          notion_database?: string | null;
          saved_at?: string;
          status?: string | null;
          status_updated_at?: string | null;
          user?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'linkedin_profiles_notion_database_fkey';
            columns: ['notion_database'];
            isOneToOne: false;
            referencedRelation: 'notion_databases';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'linkedin_profiles_user_fkey';
            columns: ['user'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      notion_databases: {
        Row: {
          description: Json | null;
          id: string;
          name: string | null;
          notion_id: string | null;
          user: string | null;
        };
        Insert: {
          description?: Json | null;
          id?: string;
          name?: string | null;
          notion_id?: string | null;
          user?: string | null;
        };
        Update: {
          description?: Json | null;
          id?: string;
          name?: string | null;
          notion_id?: string | null;
          user?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'notion_databases_user_fkey';
            columns: ['user'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          authenticated_user: string | null;
          company_name: string | null;
          created_at: string;
          first_name: string | null;
          id: string;
          job_title: string | null;
          last_name: string | null;
          location: string | null;
          number_profiles_saved: number;
          onboarding_status: Database['public']['Enums']['onboarding_status'] | null;
        };
        Insert: {
          authenticated_user?: string | null;
          company_name?: string | null;
          created_at?: string;
          first_name?: string | null;
          id?: string;
          job_title?: string | null;
          last_name?: string | null;
          location?: string | null;
          number_profiles_saved?: number;
          onboarding_status?: Database['public']['Enums']['onboarding_status'] | null;
        };
        Update: {
          authenticated_user?: string | null;
          company_name?: string | null;
          created_at?: string;
          first_name?: string | null;
          id?: string;
          job_title?: string | null;
          last_name?: string | null;
          location?: string | null;
          number_profiles_saved?: number;
          onboarding_status?: Database['public']['Enums']['onboarding_status'] | null;
        };
        Relationships: [
          {
            foreignKeyName: 'users_authenticated_user_fkey';
            columns: ['authenticated_user'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      increment_number_profiles_saved:
        | {
            Args: Record<PropertyKey, never>;
            Returns: undefined;
          }
        | {
            Args: {
              row_id: string;
            };
            Returns: undefined;
          };
    };
    Enums: {
      onboarding_status: 'CONNECTED_TO_NOTION' | 'FIRST_PROFILE_SAVED' | 'EXTENSION_PINNED';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] & Database['public']['Views'])
  ? (Database['public']['Tables'] & Database['public']['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
  ? Database['public']['Enums'][PublicEnumNameOrOptions]
  : never;
