"use client";

import type React from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock, Eye, EyeOff, ArrowRight, Shield } from "lucide-react";
import { GitHubAuthButton } from "../_components/github-auth-button";
import { Checkbox } from "@/components/ui/checkbox";
import { GoogleAuthButton } from "./google-auth-button";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const cookieOptions = rememberMe ? { maxAge: 60 * 60 * 24 * 30 } : undefined;

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookieOptions }
    );

    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (!user) throw new Error("Login failed, user not found.");

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      router.push(profile?.is_admin ? "/admin" : "/dashboard");
      router.refresh();
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0f] px-4 py-12">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/6 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)", backgroundSize: "50px 50px" }}
      />

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/">
          
          <div className="mx-auto cursor-pointer mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#C9A84C]/30 bg-[#C9A84C]/10 shadow-[0_0_30px_rgba(201,168,76,0.15)]">
            <Lock className="h-6 w-6 text-[#C9A84C]" />
          </div>
          </Link>
          <h1
            className="mb-2 text-3xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Welcome back
          </h1>
          <p className="text-sm text-[#6a6a7a]">Sign in to manage your secrets</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm">

          {/* OAuth buttons */}
          <div className="space-y-3">
            <OAuthWrapper><GitHubAuthButton /></OAuthWrapper>
            <OAuthWrapper><GoogleAuthButton /></OAuthWrapper>
          </div>

          {/* Divider */}
          <div className="relative my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#4a4a5a]">
              or continue with email
            </span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-[#4a4a5a] outline-none ring-0 transition-all duration-200 focus:border-[#C9A84C]/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)]"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 pr-11 text-sm text-white placeholder-[#4a4a5a] outline-none transition-all duration-200 focus:border-[#C9A84C]/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a4a5a] transition-colors hover:text-[#C9A84C]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex cursor-pointer items-center gap-2.5">
                <div className="relative">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(c) => setRememberMe(Boolean(c))}
                    className="border-white/10 bg-white/5 data-[state=checked]:border-[#C9A84C]/50 data-[state=checked]:bg-[#C9A84C]/20"
                  />
                </div>
                <span className="text-xs text-[#6a6a7a]">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="group flex items-center gap-1 text-xs font-medium text-[#C9A84C] transition-opacity hover:opacity-80"
              >
                Forgot password?
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center  gap-3 rounded-lg border border-red-500/15 bg-red-500/5 px-4 py-3">
                <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                <p className="text-xs leading-relaxed text-red-400">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#C9A84C] py-3.5 text-sm font-bold text-[#0a0a0f] shadow-[0_0_30px_rgba(201,168,76,0.2)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(201,168,76,0.35)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#0a0a0f]/30 border-t-[#0a0a0f]" />
                  Signing in...
                </span>
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  <div className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0 skew-x-12" />
                </>
              )}
            </button>
          </form>

          {/* Sign up link */}
          <p className="mt-6 text-center text-xs text-[#4a4a5a]">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="font-semibold text-[#C9A84C] transition-opacity hover:opacity-80">
              Create one free
            </Link>
          </p>
        </div>

        {/* Security note */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <Shield className="h-3.5 w-3.5 text-[#4a4a5a]" />
          <p className="text-[10px] text-[#4a4a5a]">
            Secured with AES-256 encryption · Zero-knowledge architecture
          </p>
        </div>
      </div>
    </div>
  );
}

/* Thin wrapper to re-skin OAuth buttons to match dark theme */
function OAuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="[&_button]:!w-full [&_button]:!rounded-lg [&_button]:!border [&_button]:!border-white/5 [&_button]:!bg-white/[0.03] [&_button]:!text-sm [&_button]:!font-medium [&_button]:!text-white [&_button]:!transition-all [&_button]:hover:!border-white/10 [&_button]:hover:!bg-white/[0.06]">
      {children}
    </div>
  );
}