ALTER TABLE profiles
ADD COLUMN total_secrets_created INTEGER DEFAULT 0,
ADD COLUMN total_secrets_viewed INTEGER DEFAULT 0,
ADD COLUMN total_secrets_burned INTEGER DEFAULT 0;

-- Optional: Backfill existing user stats
-- This is commented out as it might be a heavy operation on a large dataset.
-- It can be run manually if needed.
/*
WITH user_stats AS (
  SELECT
    user_id,
    COUNT(id) AS total_created,
    COALESCE(SUM(view_count), 0) AS total_views,
    COUNT(id) FILTER (WHERE is_burned = TRUE) AS total_burned
  FROM
    secrets
  WHERE
    user_id IS NOT NULL
  GROUP BY
    user_id
)
UPDATE
  profiles
SET
  total_secrets_created = user_stats.total_created,
  total_secrets_viewed = user_stats.total_views,
  total_secrets_burned = user_stats.total_burned
FROM
  user_stats
WHERE
  profiles.id = user_stats.user_id;
*/
