export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          id: string;
          username: string;
          display_name: string | null;
          email: string;
          role: string;
          phonenumber: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          display_name?: string | null;
          email: string;
          role?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          display_name?: string | null;
          email?: string;
          role?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      articles: {
        Row: {
          id: string;
          title: string;
          body: string;
          thumbnail_url: string | null;
          category: string | null;
          author_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          body: string;
          thumbnail_url?: string | null;
          category?: string | null;
          author_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          body?: string;
          thumbnail_url?: string | null;
          category?: string | null;
          author_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      reports: {
        Row: {
          id: string;
          mood_level: number | null;
          action_type: string | null;
          location: string | null;
          gender: string | null;
          age: number | null;
          phone: string | null;
          role: string | null;
          created_at: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

export type Admin = Database["public"]["Tables"]["admins"]["Row"];
export type AdminInsert = Database["public"]["Tables"]["admins"]["Insert"];
export type AdminUpdate = Database["public"]["Tables"]["admins"]["Update"];

export type Article = Database["public"]["Tables"]["articles"]["Row"];
export type ArticleInsert = Database["public"]["Tables"]["articles"]["Insert"];
export type ArticleUpdate = Database["public"]["Tables"]["articles"]["Update"];

export type Report = Database["public"]["Tables"]["reports"]["Row"];
