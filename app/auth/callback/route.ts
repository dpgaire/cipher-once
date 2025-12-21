import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.exchangeCodeForSession(code)

    if (user) {
      const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

      if (profile?.is_admin) {
        return NextResponse.redirect(`${requestUrl.origin}/admin`)
      }
    }
  }

  // URL to redirect to after sign in process completes for non-admins
  return NextResponse.redirect(`${requestUrl.origin}/dashboard`)
}
