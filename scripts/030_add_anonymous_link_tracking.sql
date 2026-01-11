
-- Create the table to store anonymous usage stats
CREATE TABLE IF NOT EXISTS anonymous_usage (
  fingerprint_id TEXT PRIMARY KEY,
  created_count INTEGER DEFAULT 0,
  last_created_at TIMESTAMPTZ
);

-- RLS Policies for anonymous_usage
ALTER TABLE anonymous_usage ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow anonymous read access" ON anonymous_usage;
CREATE POLICY "Allow anonymous read access" ON anonymous_usage FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow anonymous write access" ON anonymous_usage;
CREATE POLICY "Allow anonymous write access" ON anonymous_usage FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow anonymous update access" ON anonymous_usage;
CREATE POLICY "Allow anonymous update access" ON anonymous_usage FOR UPDATE USING (true) WITH CHECK (true);

-- Function to increment the created_count for a given fingerprint_id
CREATE OR REPLACE FUNCTION increment_anonymous_creations(p_fingerprint_id TEXT)
RETURNS INTEGER AS $$
DECLARE
  new_count INTEGER;
BEGIN
  INSERT INTO anonymous_usage (fingerprint_id, created_count, last_created_at)
  VALUES (p_fingerprint_id, 1, NOW())
  ON CONFLICT (fingerprint_id)
  DO UPDATE SET
    created_count = anonymous_usage.created_count + 1,
    last_created_at = NOW()
  RETURNING created_count INTO new_count;

  RETURN new_count;
END;
$$ LANGUAGE plpgsql;

-- Grant usage on the function
GRANT EXECUTE ON FUNCTION increment_anonymous_creations(TEXT) TO anon, authenticated;
