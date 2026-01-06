-- Function to delete a secret's file from storage
CREATE OR REPLACE FUNCTION delete_secret_file(secret_id_to_delete UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  file_path_to_delete TEXT;
BEGIN
  -- Get the file path from the file_url
  SELECT substring(file_url from '.*/(.*)$') INTO file_path_to_delete
  FROM secrets
  WHERE id = secret_id_to_delete;

  -- If a file path is found, delete the file from storage
  IF file_path_to_delete IS NOT NULL THEN
    -- Bypass helper functions and delete directly from the storage.objects view.
    -- This is more robust as it doesn't depend on a specific storage API version.
    DELETE FROM storage.objects
    WHERE bucket_id = 'file-storage'
      AND name = file_path_to_delete;
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION delete_secret_file(UUID) TO anon, authenticated;
