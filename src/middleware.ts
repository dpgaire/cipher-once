import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const anonCookie = req.cookies.get("cipheronce_anon_id");

  if (!anonCookie) {
    const anonId = nanoid(32);

    res.cookies.set("cipheronce_anon_id", anonId, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30 // 30 days
    });
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
