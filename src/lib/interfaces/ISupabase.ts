export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      nodes: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          label: string | null
          subject: number | null
          type: string | null
          updated_at: string | null
          x: number | null
          y: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          label?: string | null
          subject?: number | null
          type?: string | null
          updated_at?: string | null
          x?: number | null
          y?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          label?: string | null
          subject?: number | null
          type?: string | null
          updated_at?: string | null
          x?: number | null
          y?: number | null
        }
      }
      subjects: {
        Row: {
          created_at: string | null
          id: number
          title: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          title: string
        }
        Update: {
          created_at?: string | null
          id?: number
          title?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
