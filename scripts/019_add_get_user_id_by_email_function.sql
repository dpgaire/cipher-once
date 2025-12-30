CREATE OR REPLACE FUNCTION get_user_id_by_email(p_email TEXT)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_id UUID;
BEGIN
  -- First get the user id from auth.users based on email
  SELECT id INTO user_id FROM auth.users WHERE email = p_email;

  -- If a user is found, verify that a corresponding profile exists
  IF user_id IS NOT NULL AND EXISTS(SELECT 1 FROM public.profiles WHERE id = user_id) THEN
    RETURN user_id;
  END IF;

  -- If no user is found or no profile exists, return null
  RETURN NULL;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_user_id_by_email(TEXT) TO authenticated;