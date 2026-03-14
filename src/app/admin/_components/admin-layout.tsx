"use client"
 
import { useState, ReactNode } from "react"
import { AdminNav } from "./admin-nav"
import type { User } from "@supabase/supabase-js"
import { Menu } from "lucide-react"
 
interface AdminLayoutWrapperProps {
  user: User
  children: ReactNode
}
 
export function AdminLayoutWrapper({ user, children }: AdminLayoutWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev)
 
  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
 
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-200 ease-in-out shrink-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0
      `}>
        <AdminNav user={user} isMobileOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
 
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}
 
      {/* Main */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-white/5 bg-[#0a0a0f]/90 px-4 backdrop-blur-xl lg:hidden">
          <button
            onClick={toggleSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/[0.03] text-[#6a6a7a] transition-all hover:border-white/10 hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-base font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Admin
          </span>
          <div className="w-9" />
        </header>
 
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
 