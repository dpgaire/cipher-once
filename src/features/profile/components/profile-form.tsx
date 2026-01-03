"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "../hooks/use-profile";
import { CardSkeleton } from "@/features/core/components";

function ProfileSkeleton() {
  return (
    <div className="container max-w-7xl mx-auto py-8">
      <div className="h-8 w-48 bg-muted rounded animate-pulse mb-6" />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <CardSkeleton className="lg:col-span-2" lines={4} />
        <CardSkeleton lines={3} />
        <CardSkeleton className="lg:col-span-3" lines={1} />
      </div>
    </div>
  )
}

export function ProfileForm() {
  const { user, profile, loading, handleDeleteAccount } = useProfile();

  if (loading) {
    return <ProfileSkeleton />;
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
                {/* Assuming is_blocked is not part of the current profile type, this can be added if needed */}
                <Badge variant="secondary">Active</Badge>
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
