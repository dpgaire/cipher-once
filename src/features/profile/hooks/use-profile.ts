"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { getUser, getProfile, deleteUserAccount } from "../services";
import type { Profile } from "../types";
import type { User } from "@supabase/supabase-js";

export function useProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadProfileData() {
      const currentUser = await getUser();
      if (currentUser) {
        setUser(currentUser);
        const profileData = await getProfile(currentUser.id);
        if (profileData) {
          setProfile(profileData);
        } else {
            // Handle case where profile doesn't exist
            toast({
                title: "Error",
                description: "Could not fetch your profile data.",
                variant: "destructive"
            });
        }
      } else {
        router.push("/auth/login");
      }
      setLoading(false);
    }
    loadProfileData();
  }, [router]);

  const handleDeleteAccount = async () => {
    const { error } = await deleteUserAccount();
    if (error) {
      toast({
        title: "Account Deletion (Placeholder)",
        description: "This is a placeholder. Account deletion logic needs to be implemented securely on the server.",
      });
    } else {
      // This part will not be reached with the current placeholder service.
      toast({ title: "Account deleted successfully" });
      router.push("/");
    }
  };

  return { user, profile, loading, handleDeleteAccount };
}
