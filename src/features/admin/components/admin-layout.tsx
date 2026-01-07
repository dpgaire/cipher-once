"use client"

import { useState, ReactNode } from "react"
import { AdminNav } from "./admin-nav"
import type { User } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

interface AdminLayoutWrapperProps {
  user: User
  children: ReactNode
}

export function AdminLayoutWrapper({ user, children }: AdminLayoutWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen((pre)=>!pre)
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - visible on large screens, hidden on small, toggleable as an overlay */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 transform 
          ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full"}
          lg:relative lg:translate-x-0
          transition-transform duration-200 ease-in-out
          max-w-full shrink-0
        `}
      >
        <AdminNav
          user={user}
          isMobileOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar for mobile toggle */}
        <header className="flex items-center justify-between lg:hidden border-b bg-background p-4 shadow-sm z-30">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">Admin</h1>
          <div className="w-10" /> {/* Placeholder for balance */}
        </header>

        <main className="flex-1 p-4 md:p-8 bg-muted/20">
          {children}
        </main>
      </div>
    </div>
  )
}
