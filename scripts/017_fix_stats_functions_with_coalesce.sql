-- Drop the old function if it exists, as its return type has changed
DROP FUNCTION IF EXISTS increment_created_secret_count(UUID);

-- Update the increment function to handle potential NULL values and return a boolean
CREATE OR REPLACE FUNCTION increment_created_secret_count(p_user_id UUID)
RETURNS boolean AS $$
BEGIN
  IF p_user_id IS NOT NULL THEN
    UPDATE profiles
    SET total_secrets_created = COALESCE(total_secrets_created, 0) + 1
    WHERE id = p_user_id;
    return FOUND;
  ELSE
    return false;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION increment_created_secret_count(UUID) TO authenticated;


-- Drop the old function if it exists, as its return type has changed
DROP FUNCTION IF EXISTS update_secret_view_and_burn(UUID);

-- Update the burn function to handle potential NULL values and return a boolean
CREATE OR REPLACE FUNCTION update_secret_view_and_burn(
  p_secret_id UUID
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_current_view_count INTEGER;
  v_max_views INTEGER;
  v_is_burned BOOLEAN;
  v_should_burn BOOLEAN := FALSE;
  v_user_id UUID;
BEGIN
  -- Get current view count, max views, and user_id for the secret
  SELECT view_count, max_views, is_burned, user_id
  INTO v_current_view_count, v_max_views, v_is_burned, v_user_id
  FROM secrets
  WHERE id = p_secret_id;

  -- Only proceed if the secret exists and is not already burned
  IF FOUND AND NOT v_is_burned THEN
    v_current_view_count := v_current_view_count + 1;

    IF v_max_views IS NOT NULL AND v_max_views != -1 AND v_current_view_count >= v_max_views THEN
      v_should_burn := TRUE;
    END IF;

    UPDATE secrets
    SET
      view_count = v_current_view_count,
      is_burned = v_should_burn
    WHERE id = p_secret_id;

    -- If a user is associated with the secret, update their stats
    IF v_user_id IS NOT NULL THEN
      UPDATE profiles
      SET total_secrets_viewed = COALESCE(total_secrets_viewed, 0) + 1
      WHERE id = v_user_id;

      IF v_should_burn THEN
        UPDATE profiles
        SET total_secrets_burned = COALESCE(total_secrets_burned, 0) + 1
        WHERE id = v_user_id;
      END IF;
    END IF;
    
    return TRUE; -- Return true on success
  END IF;

  return FALSE; -- Return false on failure
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION update_secret_view_and_burn(UUID) TO anon, authenticated;
