-- Function to get all users with their profile information
CREATE OR REPLACE FUNCTION get_all_users()
RETURNS TABLE (
  id UUID,
  email TEXT,
  full_name TEXT,
  is_admin BOOLEAN,
  is_blocked BOOLEAN,
  created_at TIMESTAMPTZ
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
    u.created_at
  FROM auth.users u
  LEFT JOIN public.profiles p ON u.id = p.id
  ORDER BY u.created_at DESC;
END;
$$;
