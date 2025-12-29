-- Update the function to return a boolean indicating success
CREATE OR REPLACE FUNCTION increment_created_secret_count(p_user_id UUID)
RETURNS boolean AS $$
BEGIN
  IF p_user_id IS NOT NULL THEN
    UPDATE profiles
    SET total_secrets_created = total_secrets_created + 1
    WHERE id = p_user_id;
    -- The special variable FOUND is true if the last UPDATE/INSERT/DELETE affected at least one row
    return FOUND;
  ELSE
    return false;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure execute permission is granted to authenticated users
GRANT EXECUTE ON FUNCTION increment_created_secret_count(UUID) TO authenticated;
