-- Function to get all users with their profile information
DROP FUNCTION IF EXISTS get_all_users();
CREATE OR REPLACE FUNCTION get_all_users()
RETURNS TABLE (
  id UUID,
  email TEXT,
  full_name TEXT,
  is_admin BOOLEAN,
  is_blocked BOOLEAN,
  created_at TIMESTAMPTZ,
  total_secrets_created INTEGER,
  total_secrets_viewed INTEGER,
  total_secrets_burned INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if the calling user is an admin
  IF NOT (
    SELECT p.is_admin
    FROM public.profiles p
    WHERE p.id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Only admins can perform this action';
  END IF;

  RETURN QUERY
  SELECT
    u.id,
    u.email::text, -- Explicitly cast to text to match RETURNS TABLE definition
    p.full_name,
    p.is_admin,
    p.is_blocked,
    u.created_at,
  p.total_secrets_created,
  p.total_secrets_viewed,
  p.total_secrets_burned
  FROM auth.users u
  LEFT JOIN public.profiles p ON u.id = p.id
  ORDER BY u.created_at DESC;
END;
$$;
