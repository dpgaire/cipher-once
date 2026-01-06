-- Function to delete expired secrets and their files
CREATE OR REPLACE FUNCTION delete_expired_secrets()
RETURNS VOID AS $$
DECLARE
  expired_secret RECORD;
BEGIN
  -- Loop through all expired and not burned secrets
  FOR expired_secret IN
    SELECT id FROM secrets WHERE expires_at < NOW() AND is_burned = FALSE
  LOOP
    -- Delete the associated file from storage
    PERFORM delete_secret_file(expired_secret.id);

    -- Delete the secret record
    DELETE FROM secrets WHERE id = expired_secret.id;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION delete_expired_secrets() TO anon, authenticated;
