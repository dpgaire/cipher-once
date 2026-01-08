import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ReactNode } from "react"
import { AdminLayoutWrapper } from "@/features/admin/components/admin-layout" // New import
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminLayoutPage({
  children,
}: {
  children: ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
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