import { NextResponse } from "next/server"
import { type NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  // Get user from session (if authenticated)
  const { data: { user } } = await supabase.auth.getUser()

  try {
    const { secret_id, status, error_message, metadata } = await request.json()

    // Get IP address and user agent
    const ip_address = request.headers.get("x-forwarded-for")
    const user_agent = request.headers.get("user-agent")

    // Ensure secret_id is a valid UUID
    if (!secret_id) {
      return NextResponse.json({ error: "secret_id is required" }, { status: 400 })
    }

    const { error } = await supabase.from("secret_access_logs").insert({
      secret_id,
      status,
      error_message,
      ip_address,
      user_agent,
      accessed_by_user_id: user?.id || null, // Log the user ID if authenticated
      metadata, // Any additional metadata
    })

    if (error) {
      console.error("Error logging secret access:", error)
      return NextResponse.json({ error: "Failed to log access" }, { status: 500 })
    }

    return NextResponse.json({ message: "Access logged successfully" }, { status: 200 })
  } catch (e) {
    console.error("Error parsing request body or logging access:", e)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
