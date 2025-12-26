"use server"

import { createClient as createServerClient } from "@/lib/supabase/server"
import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

async function getSupabaseAdmin() {
  // This client uses the service role key to bypass RLS.
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}

async function checkAdmin() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single()

  if (!profile?.is_admin) {
    throw new Error("Not an admin")
  }
}

export async function blockUser(userId: string) {
  await checkAdmin()
  const supabase = await getSupabaseAdmin()
  const { error } = await supabase
    .from("profiles")
    .update({ is_blocked: true })
    .eq("id", userId)

  if (error) throw error
  revalidatePath("/admin/users")
}

export async function unblockUser(userId: string) {
  await checkAdmin()
  const supabase = await getSupabaseAdmin()
  const { error } = await supabase
    .from("profiles")
    .update({ is_blocked: false })
    .eq("id", userId)

  if (error) throw error
  revalidatePath("/admin/users")
}

export async function deleteUser(userId: string) {
  await checkAdmin()
  const supabaseAdmin = await getSupabaseAdmin()
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)

  if (error) throw error
  revalidatePath("/admin/users")
}
