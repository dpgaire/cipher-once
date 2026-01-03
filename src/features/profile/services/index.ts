import { createClient } from "@/lib/supabase/client";
import type { Profile } from "../types";
import type { User } from "@supabase/supabase-js";

const supabase = createClient();

export async function getUser(): Promise<User | null> {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return data;
}

export async function deleteUserAccount(): Promise<{ error: Error | null }> {
    // This is a placeholder for a proper server-side function.
    // Directly calling admin functions from the client is insecure.
    // In a real app, this should be a call to a secure API route or serverless function.
    console.warn("Account deletion should be handled by a secure server-side function.");
    
    // Example of what a server-side function might do:
    // const { error } = await supabase.auth.admin.deleteUser(user.id);
    
    // For now, we'll return a mock error to indicate this is not implemented.
    return { error: new Error("Account deletion is not implemented on the server.") };
}
