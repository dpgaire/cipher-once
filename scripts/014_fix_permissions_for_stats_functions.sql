-- Update the function to run with admin privileges
CREATE OR REPLACE FUNCTION increment_created_secret_count(p_user_id UUID)
RETURNS void AS $$
BEGIN
  IF p_user_id IS NOT NULL THEN
    UPDATE profiles
    SET total_secrets_created = total_secrets_created + 1
    WHERE id = p_user_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION increment_created_secret_count(UUID) TO authenticated;

-- Re-apply grant on the updated burn function for consistency
GRANT EXECUTE ON FUNCTION update_secret_view_and_burn(UUID) TO anon, authenticated;
