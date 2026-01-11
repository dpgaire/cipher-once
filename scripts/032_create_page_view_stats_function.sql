CREATE OR REPLACE FUNCTION get_page_view_stats()
RETURNS TABLE(path TEXT, country_code TEXT, view_count BIGINT) AS $$
DECLARE
  is_admin_user BOOLEAN;
BEGIN
  -- Check if the calling user is an admin by looking up their profile
  SELECT is_admin INTO is_admin_user FROM public.profiles WHERE id = auth.uid();

  -- If the user is not an admin, return an empty result.
  -- The query will not proceed.
  IF NOT is_admin_user THEN
    RETURN;
  END IF;

  -- If the user is an admin, execute the query and return the results.
  RETURN QUERY
  SELECT
    pv.path,
    pv.country_code,
    COUNT(pv.id) as view_count
  FROM
    public.page_views pv
  GROUP BY
    pv.path,
    pv.country_code
  ORDER BY
    view_count DESC;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission to all authenticated users.
-- The security check to ensure the user is an admin is handled internally by the function.
GRANT EXECUTE ON FUNCTION get_page_view_stats() TO authenticated;
