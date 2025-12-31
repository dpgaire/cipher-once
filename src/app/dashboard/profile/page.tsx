"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import type { User } from "@supabase/supabase-js";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        if (profileData) {
          setProfile(profileData);
        } else {
            console.error("Error fetching profile:", error);
        }
      } else {
        router.push("/auth/login");
      }
      setLoading(false);
    };
    fetchUser();
  }, [supabase, router]);

  const handleDeleteAccount = async () => {
    if (!user) return;
    
    // This is a placeholder for a proper server-side function
    // Directly calling admin functions from the client is insecure.
    // In a real app, this should be a call to a secure API route / serverless function.
    console.warn("Account deletion should be handled by a secure server-side function.");

    toast({
        title: "Account Deletion (Placeholder)",
        description: "This is a placeholder. Account deletion logic needs to be implemented securely on the server.",
    });

    // Example of what a server-side function might do:
    // const { error } = await supabase.auth.admin.deleteUser(user.id);
    // if (error) {
    //   toast({ title: "Error deleting account", description: error.message, variant: "destructive" });
    // } else {
    //   toast({ title: "Account deleted successfully" });
    //   router.push("/");
    // }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>Your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input id="full_name" value={profile?.full_name || ""} readOnly disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user?.email || ""} readOnly disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="created_at">Member Since</Label>
              <Input id="created_at" value={profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : ''} readOnly disabled />
            </div>
             <div className="space-y-2">
              <Label>Account Status</Label>
              <div>
                {profile?.is_blocked ? (
                  <Badge variant="destructive">Blocked</Badge>
                ) : (
                  <Badge variant="secondary">Active</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
                <CardDescription>Your activity on the platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 {profile && (
                <>
                    <div className="space-y-2">
                    <Label htmlFor="secrets-created">Secrets Created</Label>
                    <Input id="secrets-created" value={profile.total_secrets_created || 0} readOnly disabled />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="secrets-viewed">Secrets Viewed</Label>
                    <Input id="secrets-viewed" value={profile.total_secrets_viewed || 0} readOnly disabled />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="secrets-burned">Secrets Burned</Label>
                    <Input id="secrets-burned" value={profile.total_secrets_burned || 0} readOnly disabled />
                    </div>
                </>
                )}
            </CardContent>
        </Card>

        <Card className="border-destructive lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>These actions are irreversible.</CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive hover:bg-destructive/90">
                    Delete My Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
