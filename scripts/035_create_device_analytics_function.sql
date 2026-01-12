CREATE OR REPLACE FUNCTION get_device_analytics()
RETURNS jsonb AS $$
DECLARE
  is_admin_user BOOLEAN;
  result jsonb;
BEGIN
  -- Security check to ensure only admins can access this data.
  SELECT is_admin INTO is_admin_user FROM public.profiles WHERE id = auth.uid();
  IF NOT is_admin_user THEN
    RETURN '{"error": "Permission denied"}'::jsonb;
  END IF;

  -- Aggregate stats for devices, browsers, and operating systems.
  WITH device_stats AS (
    SELECT device, COUNT(*) as count FROM public.page_views GROUP BY device ORDER BY count DESC
  ),
  browser_stats AS (
    SELECT browser, COUNT(*) as count FROM public.page_views GROUP BY browser ORDER BY count DESC
  ),
  os_stats AS (
    SELECT os, COUNT(*) as count FROM public.page_views GROUP BY os ORDER BY count DESC
  )
  -- Combine all stats into a single JSONB object.
  SELECT jsonb_build_object(
    'devices', COALESCE((SELECT jsonb_agg(to_jsonb(device_stats)) FROM device_stats), '[]'::jsonb),
    'browsers', COALESCE((SELECT jsonb_agg(to_jsonb(browser_stats)) FROM browser_stats), '[]'::jsonb),
    'operating_systems', COALESCE((SELECT jsonb_agg(to_jsonb(os_stats)) FROM os_stats), '[]'::jsonb)
  ) INTO result;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to any authenticated user.
-- The function itself handles the admin-only security check.
GRANT EXECUTE ON FUNCTION get_device_analytics() TO authenticated;
