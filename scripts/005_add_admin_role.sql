-- Add is_admin and is_blocked columns to the profiles table
ALTER TABLE public.profiles
ADD COLUMN is_admin BOOLEAN DEFAULT FALSE,
ADD COLUMN is_blocked BOOLEAN DEFAULT FALSE;

-- Create a policy to ensure only admins can see all profiles
-- First, drop the existing policy if it exists
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Allow users to view their own profile
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);
  
-- Allow admins to view all profiles
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = TRUE
  );

-- Allow admins to update profiles (for blocking)
CREATE POLICY "Admins can update profiles"
  ON public.profiles FOR UPDATE
  USING (
    (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = TRUE
  );
