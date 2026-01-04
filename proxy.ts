import { NextRequest, NextResponse } from "next/server"

const IS_DEV = process.env.NODE_ENV === "development"

// =====================
// Rate Limiting
// =====================
const RATE_LIMIT_WINDOW = 60_000 // 60 seconds
const MAX_REQUESTS = 100
const ipRequests = new Map<string, number[]>()

function getClientIP(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  )
}

function isRateLimited(ip: string) {
  const now = Date.now()
  const requests = ipRequests.get(ip) || []
  const recent = requests.filter(ts => ts > now - RATE_LIMIT_WINDOW)

  if (recent.length >= MAX_REQUESTS) return true

  recent.push(now)
  ipRequests.set(ip, recent)
  return false
}

// =====================
// Content Security Policy
// =====================
function buildCSP(nonce: string) {
  return `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' https: ${IS_DEV ? "'unsafe-eval'" : ""};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    connect-src 'self' https://*.supabase.co wss://*.supabase.co ${IS_DEV ? "ws:" : ""};
    media-src 'self' blob:;
    block-all-mixed-content;
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, " ")
    .trim()
}

// =====================
// Proxy Handler
// =====================
export async function proxy(request: NextRequest) {
  const ip = getClientIP(request)

  // Rate limiting
  if (!IS_DEV && isRateLimited(ip)) {
    return new NextResponse("Too many requests", { status: 429 })
  }

  // CSP nonce
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64")
  const csp = buildCSP(nonce)

  // Set request headers
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-nonce", nonce)
  requestHeaders.set("Content-Security-Policy", csp)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })

  // Set security headers
  response.headers.set("Content-Security-Policy", csp)
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin"
  )
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()"
  )
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  )

  return response
}

// =====================
// Matcher
// =====================
export const config = {
  matcher: [
    // Apply to all routes except Next.js static files & images & favicon
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
