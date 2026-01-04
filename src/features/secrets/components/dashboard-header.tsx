"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock, Plus, Mail } from "lucide-react";
import { UserProfileDropdown } from "@/features/auth/components/user-profile-dropdown";
import { Skeleton } from "@/components/ui/skeleton";
import { NotificationBell } from "@/features/notifications/components/notification-bell";
import type { User } from "@supabase/supabase-js"; // New Import

interface DashboardHeaderProps {
  user: User | null;
  loading: boolean;
}

export function DashboardHeader({ user, loading }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background hidden md:flex">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 font-bold transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <img src="/icon-512.png" className="rounded-md" />
          </div>
          <span className="text-xl">CipherOnce</span>
        </Link>

        <div className="flex items-center gap-4">
          <Button asChild variant="ghost">
            <Link href="/dashboard/inbox">
              <Mail className="mr-2 h-4 w-4" />
              Inbox
            </Link>
          </Button>
          <Button asChild>
            <Link href="/create">
              <Plus className="mr-2 h-4 w-4" />
              New Secret
            </Link>
          </Button>
          <NotificationBell />
          {loading ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : user ? (
            <UserProfileDropdown user={user} />
          ) : null}
        </div>
      </div>
    </header>
  );
}
