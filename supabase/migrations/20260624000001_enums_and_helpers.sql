-- Enums e funções auxiliares compartilhadas

CREATE TYPE public.entity_status AS ENUM ('active', 'inactive');
CREATE TYPE public.user_role AS ENUM ('admin', 'editor', 'viewer');
CREATE TYPE public.media_type AS ENUM ('image', 'video', 'document', 'audio');
CREATE TYPE public.galeria_color AS ENUM ('amber', 'red', 'orange', 'yellow');

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
