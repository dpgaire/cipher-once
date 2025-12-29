CREATE OR REPLACE FUNCTION increment_created_secret_count(p_user_id UUID)
RETURNS void AS $$
BEGIN
  IF p_user_id IS NOT NULL THEN
    UPDATE profiles
    SET total_secrets_created = total_secrets_created + 1
    WHERE id = p_user_id;
  END IF;
END;
$$ LANGUAGE plpgsql;
