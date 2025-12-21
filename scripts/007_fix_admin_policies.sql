-- Remove the recursive and problematic RLS policies for admins on the profiles table.
-- Admin actions should be performed using the service_role key in secure server-side environments,
-- not through broad RLS policies.

-- Drop the recursive SELECT policy for admins.
-- The `get_all_users` RPC function handles fetching all users for the admin panel securely.
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Drop the recursive UPDATE policy for admins.
-- Updates (like blocking a user) will be handled by server actions using the service_role key.
DROP POLICY IF EXISTS "Admins can update profiles" ON public.profiles;
