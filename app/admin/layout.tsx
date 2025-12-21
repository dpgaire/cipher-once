import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ReactNode } from "react"
import type { User } from "@supabase/supabase-js"
import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper" // New import

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single()

  if (!profile?.is_admin) {
    redirect("/")
  }

  return (
    <AdminLayoutWrapper user={user}>
      {children}
    </AdminLayoutWrapper>
  )
}