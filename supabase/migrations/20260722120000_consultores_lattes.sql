-- Consultores: campo Lattes usado no admin e no site público

ALTER TABLE public.consultores
  ADD COLUMN IF NOT EXISTS lattes TEXT NOT NULL DEFAULT '';
