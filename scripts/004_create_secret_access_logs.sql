-- Create table for logging secret access attempts
CREATE TABLE IF NOT EXISTS secret_access_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  secret_id UUID REFERENCES public.secrets(id) ON DELETE CASCADE,
  accessed_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  status TEXT NOT NULL, -- e.g., 'attempt', 'success', 'failure', 'burn'
  error_message TEXT, -- Stores specific error details if status is 'failure'
  accessed_by_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}'::jsonb -- For future extensions, e.g., rule evaluation results
);

-- Index for efficient lookups
CREATE INDEX idx_secret_access_logs_secret_id ON secret_access_logs(secret_id);
CREATE INDEX idx_secret_access_logs_accessed_at ON secret_access_logs(accessed_at);
CREATE INDEX idx_secret_access_logs_accessed_by_user_id ON secret_access_logs(accessed_by_user_id);

-- Enable Row Level Security (RLS) for secret_access_logs
ALTER TABLE secret_access_logs ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated users to view logs for their own secrets
CREATE POLICY "Users can view their own secret access logs"
  ON secret_access_logs
  FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.secrets WHERE id = secret_id AND user_id = auth.uid())
  );

-- Policy to allow authenticated users to insert logs for their own secrets (or unauthenticated if secret is public)
-- This policy needs careful consideration to allow logging from anonymous users accessing a public secret,
-- while still attributing logs to authenticated users if available.
-- For now, we'll allow all inserts from the app, and refine if needed.
CREATE POLICY "Allow all authenticated users to insert logs"
  ON secret_access_logs
  FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL -- Only allow authenticated users to insert logs directly
  );

-- Refined policy for INSERT (allowing unauthenticated logs is complex with RLS 'WITH CHECK')
-- It's more practical to handle logging of unauthenticated access via a separate service role or
-- to accept `accessed_by_user_id` as NULL for unauthenticated access.
-- Let's make the INSERT policy permissive enough for now, then refine if user_id is null.
-- The RLS on SELECT will restrict viewing based on secret ownership.
-- For unauthenticated inserts, the `accessed_by_user_id` would be NULL.
-- A simpler INSERT policy:
DROP POLICY IF EXISTS "Allow all authenticated users to insert logs" ON secret_access_logs;
CREATE POLICY "Users can insert logs for their own secrets or for public secrets"
  ON secret_access_logs
  FOR INSERT
  WITH CHECK (
    (auth.uid() IS NOT NULL AND EXISTS (SELECT 1 FROM public.secrets WHERE id = secret_id AND user_id = auth.uid()))
    OR (auth.uid() IS NULL AND EXISTS (SELECT 1 FROM public.secrets WHERE id = secret_id AND user_id IS NULL))
    OR (auth.uid() IS NULL AND NOT EXISTS (SELECT 1 FROM public.secrets WHERE id = secret_id AND user_id IS NOT NULL))
  );
-- The above INSERT policy is getting complex. A simpler approach is to rely on application-level checks
-- for `accessed_by_user_id` and allow all authenticated inserts. Unauthenticated inserts might need to be
-- done via a dedicated RLS-bypassing function.
-- Given the "Do NOT log secret content or encryption keys" constraint, and that `secret_access_logs` will primarily
-- be populated by an API route, a simpler RLS policy for INSERT will be to allow all authenticated writes,
-- and handle unauthenticated writes through a database function invoked by the API route.

-- Let's simplify INSERT for now: allow authenticated users to write for any secret,
-- and rely on the API route to set `accessed_by_user_id` correctly.
DROP POLICY IF EXISTS "Users can insert logs for their own secrets or for public secrets" ON secret_access_logs;
CREATE POLICY "Authenticated users can insert access logs"
  ON secret_access_logs
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- For SELECT, the previous policy is fine.

-- A better INSERT policy that also allows anonymous access for secrets they can view:
-- This is a bit tricky with RLS `WITH CHECK`. The `WITH CHECK` clause applies to rows *being inserted*.
-- If `auth.uid()` is null, the policy for authenticated users inserting fails.
-- If the secret is public (user_id IS NULL), then an anonymous user should be able to log access.
-- To allow unauthenticated inserts, we might need a separate function.

-- Let's assume for now, logs for anonymous access will have `accessed_by_user_id` as NULL.
-- And an authenticated user's log will have `auth.uid()`.
-- A robust RLS for INSERT would allow inserts where `accessed_by_user_id` is
-- either `auth.uid()` OR `NULL` (for anonymous), but validating `secret_id` ownership for `auth.uid()`
-- and public status for `NULL` from `WITH CHECK` is hard.
-- Simplest for now: Allow all inserts from authenticated users, and handle unauthenticated via separate mechanism.
-- The API route will handle setting `accessed_by_user_id`.

-- Final decision for RLS on INSERT:
-- Let's stick with the simplest policy to enable inserts from the API route (which will be authenticated).
-- Anonymous access logging will require a different strategy (e.g., a function that bypasses RLS).
-- For this iteration, we'll focus on authenticated logging.
-- The previous "Authenticated users can insert access logs" policy is sufficient for now.
