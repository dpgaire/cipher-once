-- Add device, browser, and os to page_views table
ALTER TABLE public.page_views
ADD COLUMN IF NOT EXISTS device TEXT,
ADD COLUMN IF NOT EXISTS browser TEXT,
ADD COLUMN IF NOT EXISTS os TEXT;

COMMENT ON COLUMN public.page_views.device IS 'Device type (e.g., mobile, tablet, desktop)';
COMMENT ON COLUMN public.page_views.browser IS 'Browser name (e.g., Chrome, Firefox)';
COMMENT ON COLUMN public.page_views.os IS 'Operating system name (e.g., Windows, macOS)';

-- Add indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_page_views_device ON public.page_views(device);
CREATE INDEX IF NOT EXISTS idx_page_views_browser ON public.page_views(browser);
CREATE INDEX IF NOT EXISTS idx_page_views_os ON public.page_views(os);
