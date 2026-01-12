import { createClient } from "@/lib/supabase/server";
import { type NextRequest, NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";

export async function POST(request: NextRequest) {
  const { path } = await request.json();

  if (!path) {
    return NextResponse.json({ error: "Path is required" }, { status: 400 });
  }

  // Get country from Vercel headers
  const country = request.headers.get("x-vercel-ip-country") || null;

  // Get anonymous user ID from cookie
  const anonId = request.cookies.get("cipheronce_anon_id")?.value || null;

  // Get User-Agent info
  const uaString = request.headers.get("user-agent");
  const parser = new UAParser(uaString || "");
  const result = parser.getResult();
  
  const device = result.device.type || 'desktop'; // Default to desktop
  const browser = result.browser.name || 'Unknown';
  const os = result.os.name || 'Unknown';

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("page_views").insert({
    path,
    user_id: user?.id,
    country_code: country,
    fingerprint_id: anonId,
    device,
    browser,
    os,
  });

  if (error) {
    console.error("Error tracking page view:", error);
    return NextResponse.json(
      { error: "Failed to track page view" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}