import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    

    if (authError) {
      console.warn("Auth warning:", authError.message)
    }

    const body = await request.json()

    const { secret_id, status, error_message = null, metadata = null } = body

    if (!secret_id) {
      return NextResponse.json(
        { error: "secret_id is required" },
        { status: 400 }
      )
    }

    // Normalize IP (take first if multiple)
    const rawIp = request.headers.get("x-forwarded-for")
    const ip_address = rawIp?.split(",")[0]?.trim() ?? null

    const user_agent = request.headers.get("user-agent") ?? null

    const { error } = await supabase
      .from("secret_access_logs")
      .insert({
        secret_id,
        status,
        error_message,
        ip_address,
        user_agent,
        accessed_by_user_id: user?.id ?? null,
        metadata,
      })

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: "Access logged successfully" },
      { status: 200 }
    )
  } catch (err) {
    console.error("Unhandled error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
