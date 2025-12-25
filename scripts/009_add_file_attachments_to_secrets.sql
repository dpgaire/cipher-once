-- Add columns for file attachments to the secrets table
ALTER TABLE secrets
ADD COLUMN file_url TEXT,
ADD COLUMN file_type TEXT,
ADD COLUMN file_name TEXT,
ADD COLUMN file_size INTEGER,
ADD COLUMN file_encryption_iv TEXT,
ADD COLUMN has_file BOOLEAN DEFAULT FALSE;

-- Create an index on has_file for efficient querying
CREATE INDEX idx_secrets_has_file ON secrets(has_file);

-- Optional: If you want to enforce that file_url, file_type, file_name, file_size, and file_encryption_iv are
-- NOT NULL when has_file is TRUE, you might consider a trigger or check constraints.
-- For now, they will be nullable by default.
