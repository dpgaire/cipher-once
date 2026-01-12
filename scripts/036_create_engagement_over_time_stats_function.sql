CREATE OR REPLACE FUNCTION get_engagement_over_time_stats(
    days_to_track INT DEFAULT 30
)
RETURNS jsonb AS $$
DECLARE
  is_admin_user BOOLEAN;
  result jsonb;
BEGIN
  -- Security check: Ensure the caller is an admin.
  SELECT is_admin INTO is_admin_user FROM public.profiles WHERE id = auth.uid();
  IF NOT is_admin_user THEN
    RETURN '{"error": "Permission denied"}'::jsonb;
  END IF;

  -- Generate a series of dates for the last N days.
  WITH date_series AS (
    SELECT generate_series(
      (CURRENT_DATE - (days_to_track - 1) * INTERVAL '1 day'),
      CURRENT_DATE,
      '1 day'::interval
    )::date AS day
  ),
  -- Aggregate page views per day.
  daily_page_views AS (
    SELECT created_at::date AS day, COUNT(*) AS count
    FROM public.page_views
    WHERE created_at >= (CURRENT_DATE - (days_to_track - 1) * INTERVAL '1 day')
    GROUP BY day
  ),
  -- Aggregate secret creations per day.
  daily_secret_creations AS (
    SELECT created_at::date AS day, COUNT(*) AS count
    FROM public.secrets
    WHERE created_at >= (CURRENT_DATE - (days_to_track - 1) * INTERVAL '1 day')
    GROUP BY day
  ),
  -- Aggregate new users per day.
  daily_new_users AS (
    SELECT created_at::date AS day, COUNT(*) AS count
    FROM auth.users
    WHERE created_at >= (CURRENT_DATE - (days_to_track - 1) * INTERVAL '1 day')
    GROUP BY day
  )
  -- Join all stats with the date series to ensure all dates are present, then build the JSON response.
  SELECT jsonb_build_object(
    'page_views', (
      SELECT jsonb_agg(jsonb_build_object('date', TO_CHAR(ds.day, 'YYYY-MM-DD'), 'count', COALESCE(dpv.count, 0)))
      FROM date_series ds
      LEFT JOIN daily_page_views dpv ON ds.day = dpv.day
    ),
    'secret_creations', (
      SELECT jsonb_agg(jsonb_build_object('date', TO_CHAR(ds.day, 'YYYY-MM-DD'), 'count', COALESCE(dsc.count, 0)))
      FROM date_series ds
      LEFT JOIN daily_secret_creations dsc ON ds.day = dsc.day
    ),
    'new_users', (
      SELECT jsonb_agg(jsonb_build_object('date', TO_CHAR(ds.day, 'YYYY-MM-DD'), 'count', COALESCE(dnu.count, 0)))
      FROM date_series ds
      LEFT JOIN daily_new_users dnu ON ds.day = dnu.day
    )
  ) INTO result;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to any authenticated user.
-- The function itself handles the admin-only security check.
GRANT EXECUTE ON FUNCTION get_engagement_over_time_stats(INT) TO authenticated;
