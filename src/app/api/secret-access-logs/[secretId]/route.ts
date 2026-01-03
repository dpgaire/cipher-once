import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ secretId: string }> } // Reverted to Promise type
) {
  const { secretId } = await context.params; // Await context.params here

  if (!secretId) {
    return NextResponse.json({ error: "Secret ID is required" }, { status: 400 });
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    // Check if the user is an admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();

    const isAdmin = profile?.is_admin === true;

    // If user is not an admin, verify they own the secret
    if (!isAdmin) {
      const { data: secret, error: secretError } = await supabase
        .from("secrets")
        .select("user_id")
        .eq("id", secretId)
        .single();

      if (secretError || !secret) {
        return NextResponse.json(
          { error: "Secret not found or unauthorized" },
          { status: 404 }
        );
      }

      if (secret.user_id !== user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    // Admins or owners can fetch the logs for that secret
    const { data: logs, error: logsError } = await supabase
      .from("secret_access_logs")
      .select("*")
      .eq("secret_id", secretId)
      .order("accessed_at", { ascending: false });

    if (logsError) {
      console.error("Error fetching access logs:", logsError);
      return NextResponse.json(
        { error: "Failed to fetch access logs" },
        { status: 500 }
      );
    }

    return NextResponse.json(logs ?? []);
  } catch (e) {
    console.error("Unexpected error in secret access logs API:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}