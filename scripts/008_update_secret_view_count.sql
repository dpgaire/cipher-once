-- Function to update secret view count and burn status
CREATE OR REPLACE FUNCTION update_secret_view_and_burn(
  p_secret_id UUID
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER -- This allows the function to bypass RLS policies
AS $$
DECLARE
  v_current_view_count INTEGER;
  v_max_views INTEGER;
  v_is_burned BOOLEAN;
  v_user_id UUID;
BEGIN
  -- Get current view count, max views, and user_id for the secret
  SELECT view_count, max_views, is_burned, user_id
  INTO v_current_view_count, v_max_views, v_is_burned, v_user_id
  FROM secrets
  WHERE id = p_secret_id;

  -- Only proceed if the secret exists and is not already burned
  IF FOUND AND NOT v_is_burned THEN
    -- Increment view count
    v_current_view_count := v_current_view_count + 1;

    -- Determine if secret should be burned
    IF v_max_views IS NOT NULL AND v_max_views != -1 AND v_current_view_count >= v_max_views THEN
      v_is_burned := TRUE;
    END IF;

    -- Update the secret
    UPDATE secrets
    SET
      view_count = v_current_view_count,
      is_burned = v_is_burned
    WHERE id = p_secret_id;
  END IF;
END;
$$;

-- Grant execute permissions to all users (anon and authenticated)
GRANT EXECUTE ON FUNCTION update_secret_view_and_burn(UUID) TO anon, authenticated;
