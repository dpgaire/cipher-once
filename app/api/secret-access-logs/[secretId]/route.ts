import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { secretId: string } }
) {
  const url = new URL(request.url)
  const pathParts = url.pathname.split("/")
  const secretId = pathParts[pathParts.length - 1]

  if (!secretId) {
    return NextResponse.json({ error: "Secret ID is required" }, { status: 400 })
  }

  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  try {
    // Fetch the secret to ensure the user owns it (RLS on secret_access_logs relies on this)
    const { data: secret, error: secretError } = await supabase
      .from("secrets")
      .select("user_id")
      .eq("id", secretId)
      .single()

    if (secretError || !secret) {
      return NextResponse.json({ error: "Secret not found or unauthorized" }, { status: 404 })
    }

    if (secret.user_id !== user.id) {
      return NextResponse.json({ error: "Unauthorized to view logs for this secret" }, { status: 403 })
    }

    const { data: logs, error: logsError } = await supabase
      .from("secret_access_logs")
      .select("*")
      .eq("secret_id", secretId)
      .order("accessed_at", { ascending: false })

    if (logsError) {
      console.error("Error fetching access logs:", logsError)
      return NextResponse.json({ error: "Failed to fetch access logs" }, { status: 500 })
    }

    return NextResponse.json(logs)
  } catch (e) {
    console.error("Error in secret access logs API:", e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}