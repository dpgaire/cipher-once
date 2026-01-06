-- Function to delete files for secrets that have been burned
CREATE OR REPLACE FUNCTION delete_burned_secret_files()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  burned_secret RECORD;
BEGIN
  -- Loop through all burned secrets that still have files attached
  FOR burned_secret IN
    SELECT id FROM secrets WHERE is_burned = TRUE AND has_file = TRUE
  LOOP
    -- Delete the associated file from storage
    PERFORM delete_secret_file(burned_secret.id);

    -- Set has_file to FALSE and clear file-related columns to prevent re-processing and save space
    UPDATE secrets
    SET
      has_file = FALSE,
      file_url = NULL,
      file_type = NULL,
      file_name = NULL,
      file_size = NULL,
      file_encryption_iv = NULL
    WHERE id = burned_secret.id;
  END LOOP;
END;
$$;

-- Grant execute permission to all roles
GRANT EXECUTE ON FUNCTION delete_burned_secret_files() TO public;
