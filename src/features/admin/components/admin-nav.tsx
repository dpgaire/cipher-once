"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  BarChart,
  Shield,
  ChevronRight,
  Menu,
  X,
  History,
} from "lucide-react";
import { UserProfileDropdown } from "@/features/auth/components/user-profile-dropdown";
import type { User } from "@supabase/supabase-js";
import { useState } from "react";
import { cn } from "@/lib/utils"; // assuming you have a cn utility (classNames)

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface AdminNavProps {
  user: User;
  isMobileOpen: boolean;
  toggleSidebar: () => void;
}

const navItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/logs", label: "Access Logs", icon: History },
];

export function AdminNav({ user, isMobileOpen, toggleSidebar }: AdminNavProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Better active detection: exact match or starts with href (but not if parent is longer)
  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href) && pathname[href.length] === "/";
  };

  return (
    <aside
      className={cn(
        "fixed lg:static h-screen inset-y-0 left-0 z-50 flex flex-col bg-card border-r shadow-lg transition-all duration-300",
        "lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Shield className="h-7 w-7 text-primary" />
          {!isCollapsed && (
            <h2 className="text-xl font-bold tracking-tight">Admin Panel</h2>
          )}
        </div>

        {/* Toggle Buttons */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:block p-1.5 bg-blue-500 text-white mr-2 rounded-full  hover:scale-95 transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <button
          onClick={toggleSidebar}
          className="lg:hidden p-1.5 rounded-md hover:bg-muted"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={toggleSidebar}
                  className={cn(
                    "group relative flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/80",
                    isCollapsed && "justify-center"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {/* Active Indicator */}
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-9 w-1 bg-primary-foreground rounded-r-full" />
                  )}

                  <Icon
                    className={cn(
                      "h-5 w-5 shrink-0 transition-transform duration-200",
                      active ? "scale-110" : "group-hover:scale-110"
                    )}
                  />

                  {!isCollapsed && (
                    <>
                      <span className="ml-3 flex-1">{item.label}</span>
                      {active && (
                        <ChevronRight className="h-4 w-4 opacity-80 translate-x-0 group-hover:translate-x-1 transition-transform" />
                      )}
                    </>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Footer */}
      <div className={cn("border-t p-3", isCollapsed && "px-2")}>
        <UserProfileDropdown user={user}  />
      </div>
    </aside>
  );
}