export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      assistentes: {
        Row: {
          created_at: string
          display_order: number
          email: string
          full_bio: string
          group_key: string
          id: string
          linkedin: string
          mini_bio: string
          name: string
          photo_url: string
          role: string
          slug: string
          status: Database["public"]["Enums"]["entity_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          email: string
          full_bio: string
          group_key?: string
          id?: string
          linkedin?: string
          mini_bio: string
          name: string
          photo_url: string
          role: string
          slug: string
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          email?: string
          full_bio?: string
          group_key?: string
          id?: string
          linkedin?: string
          mini_bio?: string
          name?: string
          photo_url?: string
          role?: string
          slug?: string
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Relationships: []
      }
      atividades_log: {
        Row: {
          action: string
          created_at: string
          entity_id: string | null
          entity_name: string
          entity_type: string
          id: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          entity_id?: string | null
          entity_name: string
          entity_type: string
          id?: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          entity_id?: string | null
          entity_name?: string
          entity_type?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "atividades_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categorias_noticia: {
        Row: {
          created_at: string
          display_order: number
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      colaboradores: {
        Row: {
          created_at: string
          description: string
          display_order: number
          id: string
          institution: string
          name: string
          photo_url: string
          role: string
          slug: string
          status: Database["public"]["Enums"]["entity_status"]
          updated_at: string
          website: string
        }
        Insert: {
          created_at?: string
          description: string
          display_order?: number
          id?: string
          institution: string
          name: string
          photo_url: string
          role: string
          slug: string
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
          website?: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number
          id?: string
          institution?: string
          name?: string
          photo_url?: string
          role?: string
          slug?: string
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
          website?: string
        }
        Relationships: []
      }
      consultores: {
        Row: {
          bio: string
          created_at: string
          display_order: number
          email: string
          id: string
          institution: string
          lattes: string
          linkedin: string
          name: string
          photo_url: string
          role: string
          slug: string
          status: Database["public"]["Enums"]["entity_status"]
          updated_at: string
        }
        Insert: {
          bio: string
          created_at?: string
          display_order?: number
          email: string
          id?: string
          institution: string
          lattes?: string
          linkedin?: string
          name: string
          photo_url: string
          role: string
          slug: string
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Update: {
          bio?: string
          created_at?: string
          display_order?: number
          email?: string
          id?: string
          institution?: string
          lattes?: string
          linkedin?: string
          name?: string
          photo_url?: string
          role?: string
          slug?: string
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Relationships: []
      }
      contato_mensagens: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          ip_hash: string | null
          last_name: string
          message: string
          read_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          ip_hash?: string | null
          last_name: string
          message: string
          read_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          ip_hash?: string | null
          last_name?: string
          message?: string
          read_at?: string | null
        }
        Relationships: []
      }
      editoriais: {
        Row: {
          author: string
          bibliographic_references: Json
          closing_text: string | null
          content: string
          created_at: string
          display_order: number
          id: string
          image_url: string
          number: string
          published_at: string
          references_title: string | null
          signatures: Json
          slug: string
          status: Database["public"]["Enums"]["entity_status"]
          subtitle: string | null
          summary: string
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          bibliographic_references?: Json
          closing_text?: string | null
          content: string
          created_at?: string
          display_order?: number
          id?: string
          image_url: string
          number: string
          published_at: string
          references_title?: string | null
          signatures?: Json
          slug: string
          status?: Database["public"]["Enums"]["entity_status"]
          subtitle?: string | null
          summary: string
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          bibliographic_references?: Json
          closing_text?: string | null
          content?: string
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string
          number?: string
          published_at?: string
          references_title?: string | null
          signatures?: Json
          slug?: string
          status?: Database["public"]["Enums"]["entity_status"]
          subtitle?: string | null
          summary?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      evento_paineis: {
        Row: {
          color: Database["public"]["Enums"]["galeria_color"]
          created_at: string
          description: string
          display_order: number
          evento_id: string
          id: string
          title: string
          updated_at: string
          video_title: string | null
          video_url: string | null
        }
        Insert: {
          color?: Database["public"]["Enums"]["galeria_color"]
          created_at?: string
          description: string
          display_order?: number
          evento_id: string
          id?: string
          title: string
          updated_at?: string
          video_title?: string | null
          video_url?: string | null
        }
        Update: {
          color?: Database["public"]["Enums"]["galeria_color"]
          created_at?: string
          description?: string
          display_order?: number
          evento_id?: string
          id?: string
          title?: string
          updated_at?: string
          video_title?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "evento_paineis_evento_id_fkey"
            columns: ["evento_id"]
            isOneToOne: false
            referencedRelation: "eventos"
            referencedColumns: ["id"]
          },
        ]
      }
      eventos: {
        Row: {
          created_at: string
          display_order: number
          event_date: string | null
          event_time: string | null
          featured: boolean
          full_description: string
          has_detail_page: boolean
          id: string
          image_url: string
          link: string
          location: string | null
          name: string
          short_description: string
          slug: string
          status: Database["public"]["Enums"]["entity_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          event_date?: string | null
          event_time?: string | null
          featured?: boolean
          full_description: string
          has_detail_page?: boolean
          id?: string
          image_url: string
          link?: string
          location?: string | null
          name: string
          short_description: string
          slug: string
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          event_date?: string | null
          event_time?: string | null
          featured?: boolean
          full_description?: string
          has_detail_page?: boolean
          id?: string
          image_url?: string
          link?: string
          location?: string | null
          name?: string
          short_description?: string
          slug?: string
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Relationships: []
      }
      galeria_fotos: {
        Row: {
          alt: string | null
          created_at: string
          display_order: number
          galeria_id: string
          id: string
          image_url: string
        }
        Insert: {
          alt?: string | null
          created_at?: string
          display_order?: number
          galeria_id: string
          id?: string
          image_url: string
        }
        Update: {
          alt?: string | null
          created_at?: string
          display_order?: number
          galeria_id?: string
          id?: string
          image_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "galeria_fotos_galeria_id_fkey"
            columns: ["galeria_id"]
            isOneToOne: false
            referencedRelation: "galerias"
            referencedColumns: ["id"]
          },
        ]
      }
      galerias: {
        Row: {
          color: Database["public"]["Enums"]["galeria_color"]
          cover_url: string
          created_at: string
          display_order: number
          evento_id: string | null
          id: string
          intro: string | null
          slug: string
          status: Database["public"]["Enums"]["entity_status"]
          title: string
          updated_at: string
        }
        Insert: {
          color?: Database["public"]["Enums"]["galeria_color"]
          cover_url: string
          created_at?: string
          display_order?: number
          evento_id?: string | null
          id?: string
          intro?: string | null
          slug: string
          status?: Database["public"]["Enums"]["entity_status"]
          title: string
          updated_at?: string
        }
        Update: {
          color?: Database["public"]["Enums"]["galeria_color"]
          cover_url?: string
          created_at?: string
          display_order?: number
          evento_id?: string | null
          id?: string
          intro?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["entity_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "galerias_evento_id_fkey"
            columns: ["evento_id"]
            isOneToOne: false
            referencedRelation: "eventos"
            referencedColumns: ["id"]
          },
        ]
      }
      links_parceiros: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          highlight: string | null
          id: string
          links: Json
          status: Database["public"]["Enums"]["entity_status"]
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          highlight?: string | null
          id?: string
          links?: Json
          status?: Database["public"]["Enums"]["entity_status"]
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          highlight?: string | null
          id?: string
          links?: Json
          status?: Database["public"]["Enums"]["entity_status"]
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      livros: {
        Row: {
          authors: string[]
          category_label: string | null
          cover_alt: string | null
          cover_url: string
          created_at: string
          credits: Json
          date_published: string | null
          display_order: number
          download_label: string | null
          download_url: string
          editorial_info: Json
          id: string
          isbn: string | null
          organizers: string[]
          publisher: string
          read_url: string
          related_links: Json
          seo: Json
          slug: string
          status: Database["public"]["Enums"]["entity_status"]
          subtitle: string | null
          summary: Json
          title: string
          updated_at: string
        }
        Insert: {
          authors?: string[]
          category_label?: string | null
          cover_alt?: string | null
          cover_url: string
          created_at?: string
          credits?: Json
          date_published?: string | null
          display_order?: number
          download_label?: string | null
          download_url?: string
          editorial_info?: Json
          id?: string
          isbn?: string | null
          organizers?: string[]
          publisher?: string
          read_url?: string
          related_links?: Json
          seo?: Json
          slug: string
          status?: Database["public"]["Enums"]["entity_status"]
          subtitle?: string | null
          summary?: Json
          title: string
          updated_at?: string
        }
        Update: {
          authors?: string[]
          category_label?: string | null
          cover_alt?: string | null
          cover_url?: string
          created_at?: string
          credits?: Json
          date_published?: string | null
          display_order?: number
          download_label?: string | null
          download_url?: string
          editorial_info?: Json
          id?: string
          isbn?: string | null
          organizers?: string[]
          publisher?: string
          read_url?: string
          related_links?: Json
          seo?: Json
          slug?: string
          status?: Database["public"]["Enums"]["entity_status"]
          subtitle?: string | null
          summary?: Json
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      midia: {
        Row: {
          alt: string | null
          bucket: string
          created_at: string
          id: string
          media_type: Database["public"]["Enums"]["media_type"]
          mime_type: string | null
          name: string
          path: string
          public_url: string
          size_bytes: number | null
          uploaded_by: string | null
        }
        Insert: {
          alt?: string | null
          bucket: string
          created_at?: string
          id?: string
          media_type?: Database["public"]["Enums"]["media_type"]
          mime_type?: string | null
          name: string
          path: string
          public_url: string
          size_bytes?: number | null
          uploaded_by?: string | null
        }
        Update: {
          alt?: string | null
          bucket?: string
          created_at?: string
          id?: string
          media_type?: Database["public"]["Enums"]["media_type"]
          mime_type?: string | null
          name?: string
          path?: string
          public_url?: string
          size_bytes?: number | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "midia_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      noticias: {
        Row: {
          audio_duration: string | null
          audio_label: string | null
          audio_url: string | null
          author: string
          categoria_id: string | null
          content: string
          cover_image_url: string
          created_at: string
          display_order: number
          featured: boolean
          hero_image_alt: string | null
          hero_image_url: string | null
          id: string
          published_at: string
          related_link_href: string | null
          related_link_label: string | null
          slug: string
          status: Database["public"]["Enums"]["entity_status"]
          summary: string
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          audio_duration?: string | null
          audio_label?: string | null
          audio_url?: string | null
          author: string
          categoria_id?: string | null
          content: string
          cover_image_url: string
          created_at?: string
          display_order?: number
          featured?: boolean
          hero_image_alt?: string | null
          hero_image_url?: string | null
          id?: string
          published_at: string
          related_link_href?: string | null
          related_link_label?: string | null
          slug: string
          status?: Database["public"]["Enums"]["entity_status"]
          summary: string
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          audio_duration?: string | null
          audio_label?: string | null
          audio_url?: string | null
          author?: string
          categoria_id?: string | null
          content?: string
          cover_image_url?: string
          created_at?: string
          display_order?: number
          featured?: boolean
          hero_image_alt?: string | null
          hero_image_url?: string | null
          id?: string
          published_at?: string
          related_link_href?: string | null
          related_link_label?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["entity_status"]
          summary?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "noticias_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias_noticia"
            referencedColumns: ["id"]
          },
        ]
      }
      paginas_conteudo: {
        Row: {
          content: Json
          created_at: string
          id: string
          page_type: string
          seo: Json
          slug: string
          status: Database["public"]["Enums"]["entity_status"]
          title: string
          updated_at: string
        }
        Insert: {
          content?: Json
          created_at?: string
          id?: string
          page_type?: string
          seo?: Json
          slug: string
          status?: Database["public"]["Enums"]["entity_status"]
          title: string
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          page_type?: string
          seo?: Json
          slug?: string
          status?: Database["public"]["Enums"]["entity_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      parceiro_grupos: {
        Row: {
          created_at: string
          display_order: number
          id: string
          status: Database["public"]["Enums"]["entity_status"]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          status?: Database["public"]["Enums"]["entity_status"]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          status?: Database["public"]["Enums"]["entity_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      parceiro_logos: {
        Row: {
          alt: string
          created_at: string
          display_order: number
          grupo_id: string
          id: string
          logo_url: string
          website: string
        }
        Insert: {
          alt: string
          created_at?: string
          display_order?: number
          grupo_id: string
          id?: string
          logo_url: string
          website?: string
        }
        Update: {
          alt?: string
          created_at?: string
          display_order?: number
          grupo_id?: string
          id?: string
          logo_url?: string
          website?: string
        }
        Relationships: [
          {
            foreignKeyName: "parceiro_logos_grupo_id_fkey"
            columns: ["grupo_id"]
            isOneToOne: false
            referencedRelation: "parceiro_grupos"
            referencedColumns: ["id"]
          },
        ]
      }
      pesquisadores: {
        Row: {
          created_at: string
          display_order: number
          email: string
          full_bio: string
          group_key: string
          id: string
          lattes: string
          linkedin: string
          mini_bio: string
          name: string
          photo_url: string
          role: string
          slug: string
          status: Database["public"]["Enums"]["entity_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          email: string
          full_bio: string
          group_key?: string
          id?: string
          lattes?: string
          linkedin?: string
          mini_bio: string
          name: string
          photo_url: string
          role: string
          slug: string
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          email?: string
          full_bio?: string
          group_key?: string
          id?: string
          lattes?: string
          linkedin?: string
          mini_bio?: string
          name?: string
          photo_url?: string
          role?: string
          slug?: string
          status?: Database["public"]["Enums"]["entity_status"]
          updated_at?: string
        }
        Relationships: []
      }
      podcast_episodios: {
        Row: {
          audio_url: string
          created_at: string
          description: string | null
          display_order: number
          duration: string | null
          id: string
          published_at: string | null
          slug: string
          status: Database["public"]["Enums"]["entity_status"]
          title: string
          updated_at: string
        }
        Insert: {
          audio_url: string
          created_at?: string
          description?: string | null
          display_order?: number
          duration?: string | null
          id?: string
          published_at?: string | null
          slug: string
          status?: Database["public"]["Enums"]["entity_status"]
          title: string
          updated_at?: string
        }
        Update: {
          audio_url?: string
          created_at?: string
          description?: string | null
          display_order?: number
          duration?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["entity_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      videos: {
        Row: {
          color: Database["public"]["Enums"]["galeria_color"]
          created_at: string
          description: string | null
          display_order: number
          id: string
          slug: string
          status: Database["public"]["Enums"]["entity_status"]
          thumbnail_alt: string | null
          thumbnail_url: string
          title: string
          updated_at: string
          video_url: string
        }
        Insert: {
          color?: Database["public"]["Enums"]["galeria_color"]
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          slug: string
          status?: Database["public"]["Enums"]["entity_status"]
          thumbnail_alt?: string | null
          thumbnail_url: string
          title: string
          updated_at?: string
          video_url: string
        }
        Update: {
          color?: Database["public"]["Enums"]["galeria_color"]
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          slug?: string
          status?: Database["public"]["Enums"]["entity_status"]
          thumbnail_alt?: string | null
          thumbnail_url?: string
          title?: string
          updated_at?: string
          video_url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
      is_editor_or_above: { Args: never; Returns: boolean }
    }
    Enums: {
      entity_status: "active" | "inactive"
      galeria_color: "amber" | "red" | "orange" | "yellow"
      media_type: "image" | "video" | "document" | "audio"
      user_role: "admin" | "editor" | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      entity_status: ["active", "inactive"],
      galeria_color: ["amber", "red", "orange", "yellow"],
      media_type: ["image", "video", "document", "audio"],
      user_role: ["admin", "editor", "viewer"],
    },
  },
} as const
