-- Drop the old single-file columns from the secrets table
ALTER TABLE secrets
DROP COLUMN IF EXISTS file_url,
DROP COLUMN IF EXISTS file_type,
DROP COLUMN IF EXISTS file_name,
DROP COLUMN IF EXISTS file_size,
DROP COLUMN IF EXISTS file_encryption_iv;

-- Add a new 'files' column to store an array of file metadata objects
ALTER TABLE secrets
ADD COLUMN files JSONB[];

-- Optional: If you want to enforce that the 'files' array contains specific keys,
-- you can use CHECK constraints with custom functions, but for flexibility,
-- we'll rely on application-level validation for now.
