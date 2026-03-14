"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User as UserIcon, Settings, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import Image from "next/image";

interface UserProfileDropdownProps {
  user: User;
}

export function UserProfileDropdown({ user }: UserProfileDropdownProps) {
  const router = useRouter();
  const name = user.user_metadata?.full_name;
  const avatarUrl = user.user_metadata?.avatar_url;

  const initials = name
    ? name
        .split(" ")
        .map((n: string) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  console.log("avatarUrl", avatarUrl);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2 text-sm transition-all hover:border-white/10 hover:bg-white/[0.05] focus:outline-none">
          {/* Avatar */}
          <div className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border border-[#C9A84C]/20 bg-[#C9A84C]/10">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={name || ""}
                width={28}
                height={28}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xs font-bold text-[#C9A84C]">
                {initials}
              </span>
            )}
          </div>
          {name && (
            <span className="hidden max-w-[100px] truncate text-xs font-semibold text-white sm:block">
              {name}
            </span>
          )}
          <ChevronDown className="h-3.5 w-3.5 text-[#4a4a5a]" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 rounded-xl border border-white/5 bg-[#0d0d14] p-1 text-white shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="px-3 py-2.5">
          {name && <p className="text-sm font-semibold text-white">{name}</p>}
          <p className="text-xs text-[#4a4a5a]">{user.email}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-white/5" />

        <DropdownMenuItem
          asChild
          className="rounded-lg px-3 py-2 text-sm text-[#8a8a9a] focus:bg-white/5 focus:text-white cursor-pointer"
        >
          <Link href="/dashboard/profile" className="flex items-center gap-2.5">
            <UserIcon className="h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="rounded-lg px-3 py-2 text-sm text-[#8a8a9a] focus:bg-white/5 focus:text-white cursor-pointer"
        >
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2.5"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-white/5" />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="rounded-lg px-3 py-2 text-sm text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer flex items-center gap-2.5"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
