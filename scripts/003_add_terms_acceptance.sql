-- Add column for terms acceptance to profiles table
ALTER TABLE public.profiles
ADD COLUMN terms_accepted_at TIMESTAMPTZ;

-- Update the handle_new_user function to set the terms acceptance timestamp
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, terms_accepted_at)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data ->> 'full_name', NULL),
    CASE
      WHEN (new.raw_user_meta_data ->> 'terms_accepted')::boolean = true THEN NOW()
      ELSE NULL
    END
  )
  ON CONFLICT (id) DO UPDATE SET
    -- Update fields if user signs up via OAuth after having an email account
    full_name = COALESCE(new.raw_user_meta_data ->> 'full_name', EXCLUDED.full_name),
    -- Importantly, set terms_accepted_at if it's passed during a subsequent login/signup
    terms_accepted_at = COALESCE(
      CASE
        WHEN (new.raw_user_meta_data ->> 'terms_accepted')::boolean = true THEN NOW()
        ELSE NULL
      END,
      profiles.terms_accepted_at
    );
  
  RETURN new;
END;
$$;

-- The trigger is already created in 002_create_profiles.sql,
-- so we don't need to create it again.
-- The CREATE OR REPLACE FUNCTION statement is sufficient to update the logic.
