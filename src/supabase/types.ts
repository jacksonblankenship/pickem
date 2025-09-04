export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.4';
  };
  public: {
    Tables: {
      bet_options: {
        Row: {
          createdAt: string;
          game_id: number;
          id: number;
          line: number;
          odds: number;
          target: Database['public']['Enums']['bet_target'];
          type: Database['public']['Enums']['bet_type'];
        };
        Insert: {
          createdAt?: string;
          game_id: number;
          id?: never;
          line: number;
          odds: number;
          target: Database['public']['Enums']['bet_target'];
          type?: Database['public']['Enums']['bet_type'];
        };
        Update: {
          createdAt?: string;
          game_id?: number;
          id?: never;
          line?: number;
          odds?: number;
          target?: Database['public']['Enums']['bet_target'];
          type?: Database['public']['Enums']['bet_type'];
        };
        Relationships: [
          {
            foreignKeyName: 'bet_options_game_id_games_id_fk';
            columns: ['game_id'];
            isOneToOne: false;
            referencedRelation: 'games';
            referencedColumns: ['id'];
          },
        ];
      };
      games: {
        Row: {
          away_team_id: number;
          away_team_score: number;
          createdAt: string;
          date: string | null;
          external_id: string;
          game_status: Database['public']['Enums']['game_status'];
          home_team_id: number;
          home_team_score: number;
          id: number;
          system_status: Database['public']['Enums']['system_status'];
          week: number;
          year: number;
        };
        Insert: {
          away_team_id: number;
          away_team_score?: number;
          createdAt?: string;
          date?: string | null;
          external_id: string;
          game_status?: Database['public']['Enums']['game_status'];
          home_team_id: number;
          home_team_score?: number;
          id?: never;
          system_status?: Database['public']['Enums']['system_status'];
          week: number;
          year: number;
        };
        Update: {
          away_team_id?: number;
          away_team_score?: number;
          createdAt?: string;
          date?: string | null;
          external_id?: string;
          game_status?: Database['public']['Enums']['game_status'];
          home_team_id?: number;
          home_team_score?: number;
          id?: never;
          system_status?: Database['public']['Enums']['system_status'];
          week?: number;
          year?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'games_away_team_id_teams_id_fk';
            columns: ['away_team_id'];
            isOneToOne: false;
            referencedRelation: 'teams';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'games_home_team_id_teams_id_fk';
            columns: ['home_team_id'];
            isOneToOne: false;
            referencedRelation: 'teams';
            referencedColumns: ['id'];
          },
        ];
      };
      picks: {
        Row: {
          bet_option_id: number | null;
          createdAt: string;
          id: number;
          user_id: string;
        };
        Insert: {
          bet_option_id?: number | null;
          createdAt?: string;
          id?: never;
          user_id?: string;
        };
        Update: {
          bet_option_id?: number | null;
          createdAt?: string;
          id?: never;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'picks_bet_option_id_bet_options_id_fk';
            columns: ['bet_option_id'];
            isOneToOne: false;
            referencedRelation: 'bet_options';
            referencedColumns: ['id'];
          },
        ];
      };
      teams: {
        Row: {
          abbr: string;
          conference: string;
          conference_abbr: string;
          division: string;
          id: number;
          name: string;
        };
        Insert: {
          abbr: string;
          conference: string;
          conference_abbr: string;
          division: string;
          id?: never;
          name: string;
        };
        Update: {
          abbr?: string;
          conference?: string;
          conference_abbr?: string;
          division?: string;
          id?: never;
          name?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      bet_target: 'home' | 'away' | 'over' | 'under';
      bet_type: 'spread' | 'total';
      game_status:
        | 'not-started'
        | 'in-progress'
        | 'completed'
        | 'postponed'
        | 'suspended';
      pick_status: 'pending' | 'won' | 'lost';
      system_status: 'scheduled' | 'open' | 'closed' | 'settled';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      bet_target: ['home', 'away', 'over', 'under'],
      bet_type: ['spread', 'total'],
      game_status: [
        'not-started',
        'in-progress',
        'completed',
        'postponed',
        'suspended',
      ],
      pick_status: ['pending', 'won', 'lost'],
      system_status: ['scheduled', 'open', 'closed', 'settled'],
    },
  },
} as const;
