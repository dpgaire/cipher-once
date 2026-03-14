"use client";

import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfile } from "../_hooks/use-profile";
import { User, Activity, Flame, Eye, AlertTriangle, ShieldCheck } from "lucide-react";

function ProfileSkeleton() {
  return (
    <div className="container max-w-7xl mx-auto py-8 space-y-6">
      <Skeleton className="h-8 w-48 rounded-lg bg-white/5" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-white/[0.02] p-7 space-y-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <Skeleton className="h-3 w-24 rounded bg-white/5" />
              <Skeleton className="h-11 w-full rounded-lg bg-white/5" />
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-7 space-y-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <Skeleton className="h-3 w-24 rounded bg-white/5" />
              <Skeleton className="h-11 w-full rounded-lg bg-white/5" />
            </div>
          ))}
        </div>
        <Skeleton className="lg:col-span-3 h-28 rounded-2xl bg-white/5" />
      </div>
    </div>
  );
}

const readonlyInput = (value: string) => (
  <div className="rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-white">
    {value || <span className="text-[#4a4a5a]">—</span>}
  </div>
);

export function ProfileForm() {
  const { user, profile, loading, handleDeleteAccount } = useProfile();
  if (loading) return <ProfileSkeleton />;

  return (
    <div className="container max-w-7xl mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
        Your Profile
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {/* Profile details */}
        <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-white/[0.02] p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#C9A84C]/20 bg-[#C9A84C]/10">
              <User className="h-4 w-4 text-[#C9A84C]" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Profile Details</p>
              <p className="text-xs text-[#4a4a5a]">Your personal information</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">Full name</label>
              {readonlyInput(profile?.full_name || "")}
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">Email</label>
              {readonlyInput(user?.email || "")}
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">Member since</label>
              {readonlyInput(profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "")}
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">Account status</label>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
                  <ShieldCheck className="h-3 w-3" />
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Usage stats */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10">
              <Activity className="h-4 w-4 text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Usage Statistics</p>
              <p className="text-xs text-[#4a4a5a]">Your activity on the platform</p>
            </div>
          </div>

          {profile && (
            <div className="space-y-3">
              {[
                { label: "Secrets Created", value: profile.total_secrets_created ?? 0, icon: User, color: "text-[#C9A84C]", bg: "bg-[#C9A84C]/10 border-[#C9A84C]/15" },
                { label: "Secrets Viewed", value: profile.total_secrets_viewed ?? 0, icon: Eye, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/15" },
                { label: "Secrets Burned", value: profile.total_secrets_burned ?? 0, icon: Flame, color: "text-red-400", bg: "bg-red-500/10 border-red-500/15" },
              ].map(({ label, value, icon: Icon, color, bg }) => (
                <div key={label} className={`flex items-center justify-between rounded-xl border px-4 py-3 ${bg}`}>
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${color}`} />
                    <span className="text-xs text-[#6a6a7a]">{label}</span>
                  </div>
                  <span className="text-lg font-bold text-white">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Danger zone */}
        <div className="lg:col-span-3 rounded-2xl border border-red-500/15 bg-red-500/[0.03] p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-red-400">Danger Zone</p>
              <p className="text-xs text-[#4a4a5a]">These actions are irreversible</p>
            </div>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="rounded-lg border border-red-500/20 bg-red-500/10 px-5 py-2.5 text-sm font-bold text-red-400 transition-all hover:bg-red-500/20">
                Delete Account
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="border-white/5 bg-[#0d0d14] text-white">
              <AlertDialogHeader>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <AlertDialogTitle className="text-center text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center text-[#6a6a7a]">
                  This action cannot be undone. Your account and all associated data will be permanently deleted from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="gap-3">
                <AlertDialogCancel className="flex-1 border-white/10 bg-white/5 text-white hover:bg-white/10">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="flex-1 border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                >
                  Delete My Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}