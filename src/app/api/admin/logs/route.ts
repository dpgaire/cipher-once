import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin" // Import the new admin client

export async function GET(request: NextRequest) {
  const supabase = await createClient() // Use the regular client for user authentication

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    console.log("API /admin/logs: Authentication required.")
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    )
  }

  // Check if the user is an admin
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single()

  if (profileError) {
    console.error(
      "API /admin/logs: Error fetching profile for admin check:",
      profileError
    )
    return NextResponse.json(
      { error: "Failed to check admin status" },
      { status: 500 }
    )
  }

  const isAdmin = profile?.is_admin === true
  console.log(
    "API /admin/logs: Admin check for user:",
    user?.id,
    "isAdmin:",
    isAdmin
  )

  if (!isAdmin) {
    console.log("API /admin/logs: Forbidden - User is not an admin.")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  // Use the admin client to fetch all logs, bypassing RLS
  const adminSupabase = createAdminClient()

  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get("page") || "1", 10)
  const pageSize = parseInt(searchParams.get("pageSize") || "100", 10)
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const {
    data: logs,
    error: logsError,
    count
  } = await adminSupabase
    .from("secret_access_logs")
    .select("*", { count: "exact" })
    .order("accessed_at", { ascending: false })
    .range(from, to)

  if (logsError) {
    console.error(
      "API /admin/logs: Error fetching all access logs (admin client):",
      logsError
    )
    return NextResponse.json(
      { error: "Failed to fetch access logs" },
      { status: 500 }
    )
  }

  return NextResponse.json({
    data: logs ?? [],
    total: count ?? 0
  })
}
