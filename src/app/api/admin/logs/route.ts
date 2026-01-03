import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin"; // Import the new admin client

export async function GET() {
  const supabase = await createClient(); // Use the regular client for user authentication

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("API /admin/logs: Authentication required.");
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  // Check if the user is an admin
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (profileError) {
      console.error("API /admin/logs: Error fetching profile for admin check:", profileError);
      return NextResponse.json({ error: "Failed to check admin status" }, { status: 500 });
  }

  const isAdmin = profile?.is_admin === true;
  console.log("API /admin/logs: Admin check for user:", user?.id, "isAdmin:", isAdmin);

  if (!isAdmin) {
    console.log("API /admin/logs: Forbidden - User is not an admin.");
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Use the admin client to fetch all logs, bypassing RLS
  const adminSupabase = createAdminClient();

  const { data: logs, error: logsError } = await adminSupabase
    .from("secret_access_logs")
    .select("*")
    .order("accessed_at", { ascending: false })
    .limit(100);

  if (logsError) {
    console.error("API /admin/logs: Error fetching all access logs (admin client):", logsError);
    return NextResponse.json(
      { error: "Failed to fetch access logs" },
      { status: 500 }
    );
  }

  console.log("API /admin/logs: Fetched logs count:", logs?.length);
  return NextResponse.json(logs ?? []);
}
