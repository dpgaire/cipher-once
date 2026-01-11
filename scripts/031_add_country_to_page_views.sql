-- Add country_code and fingerprint_id to page_views table
ALTER TABLE public.page_views
ADD COLUMN IF NOT EXISTS country_code TEXT,
ADD COLUMN IF NOT EXISTS fingerprint_id TEXT;

COMMENT ON COLUMN public.page_views.country_code IS 'Two-letter country code (ISO 3166-1 alpha-2)';
COMMENT ON COLUMN public.page_views.fingerprint_id IS 'Anonymous user fingerprint ID from cookie.';

-- Also add indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_page_views_path ON public.page_views(path);
CREATE INDEX IF NOT EXISTS idx_page_views_country_code ON public.page_views(country_code);
