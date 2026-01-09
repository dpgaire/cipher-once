CREATE TABLE public.page_views (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    path TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.page_views IS 'To track page views for analytics.';

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for all"
ON public.page_views
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Enable read for admins"
ON public.page_views
FOR SELECT
USING ((SELECT is_admin FROM public.profiles WHERE id = auth.uid()));
