CREATE OR REPLACE FUNCTION get_global_stats()
RETURNS TABLE (
    total_users BIGINT,
    total_secrets_created BIGINT,
    total_secrets_viewed BIGINT,
    total_secrets_burned BIGINT
) AS $$
DECLARE
  is_admin_user BOOLEAN;
BEGIN
  -- Security check: Ensure the caller is an admin.
  SELECT is_admin INTO is_admin_user FROM public.profiles WHERE id = auth.uid();
  IF NOT is_admin_user THEN
    -- Return an empty result set if the user is not an admin.
    RETURN;
  END IF;

  -- If the user is an admin, calculate and return the global stats.
  RETURN QUERY
  SELECT
    (SELECT COUNT(*) FROM auth.users),
    (SELECT SUM(p.total_secrets_created) FROM public.profiles p),
    (SELECT SUM(p.total_secrets_viewed) FROM public.profiles p),
    (SELECT SUM(p.total_secrets_burned) FROM public.profiles p);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to any authenticated user.
-- The function itself ensures that only admins can get the data.
GRANT EXECUTE ON FUNCTION get_global_stats() TO authenticated;
