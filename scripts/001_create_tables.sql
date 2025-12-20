-- Create secrets table for storing encrypted secrets
CREATE TABLE IF NOT EXISTS secrets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  encrypted_content TEXT NOT NULL,
  encryption_iv TEXT NOT NULL,
  short_id VARCHAR(12) UNIQUE NOT NULL,
  passphrase_hash TEXT,
  max_views INTEGER DEFAULT 1,
  view_count INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_burned BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create index for efficient lookups
CREATE INDEX idx_secrets_short_id ON secrets(short_id);
CREATE INDEX idx_secrets_user_id ON secrets(user_id);
CREATE INDEX idx_secrets_expires_at ON secrets(expires_at);

-- Enable RLS
ALTER TABLE secrets ENABLE ROW LEVEL SECURITY;

-- Public can view non-burned, non-expired secrets by short_id (read-once behavior enforced in app logic)
CREATE POLICY "Anyone can view active secrets"
  ON secrets
  FOR SELECT
  USING (
    is_burned = FALSE 
    AND expires_at > NOW()
  );

-- Authenticated users can insert their own secrets
CREATE POLICY "Users can create their own secrets"
  ON secrets
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id 
    OR user_id IS NULL
  );

-- Users can update their own secrets (for burn/view tracking)
CREATE POLICY "Users can update their own secrets"
  ON secrets
  FOR UPDATE
  USING (
    auth.uid() = user_id 
    OR user_id IS NULL
  );

-- Users can delete their own secrets
CREATE POLICY "Users can delete their own secrets"
  ON secrets
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to auto-delete expired secrets
CREATE OR REPLACE FUNCTION delete_expired_secrets()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM secrets
  WHERE expires_at < NOW() - INTERVAL '7 days';
END;
$$;

-- Note: In production, you would set up a pg_cron job to run this function periodically
-- For development, we'll handle cleanup in the application
