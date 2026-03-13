"use client"

import { createClient } from "@/lib/supabase/client"

const GoogleIcon = (props: React.ComponentProps<"svg">) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="16" height="16" {...props}>
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.67 1.22 9.15 3.62l6.85-6.85C35.82 2.48 30.4 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.02 17.77 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.98c-.58 2.96-2.26 5.48-4.8 7.18l7.73 6C43.52 38.98 46.98 32.28 46.98 24.55z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.17 2.3-6.23 0-11.57-3.52-13.46-8.41l-7.97 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
)

export function GoogleAuthButton({ disabled }: { disabled?: boolean }) {
  const handleGoogleLogin = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/callback`,
        queryParams: { terms_accepted: "true" },
      },
    })
  }

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={disabled}
      className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:border-white/10 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <GoogleIcon className="shrink-0" />
      Continue with Google
    </button>
  )
}