"use client";

import type React from "react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Lock, ArrowRight, Shield, CheckCircle2 } from "lucide-react";
import { GitHubAuthButton } from "@/app/(auth)/_components/github-auth-button";
import { Checkbox } from "@/components/ui/checkbox";
import { GoogleAuthButton } from "@/app/(auth)/_components/google-auth-button";

const passwordStrength = (pw: string) => {
  if (pw.length === 0) return 0;
  if (pw.length < 6) return 1;
  if (pw.length < 8) return 2;
  const hasUpper = /[A-Z]/.test(pw);
  const hasNumber = /[0-9]/.test(pw);
  const hasSpecial = /[^A-Za-z0-9]/.test(pw);
  return 2 + (hasUpper ? 1 : 0) + (hasNumber ? 1 : 0) + (hasSpecial ? 1 : 0);
};

const strengthConfig = [
  { label: "", color: "bg-white/5" },
  { label: "Too short", color: "bg-red-500" },
  { label: "Weak", color: "bg-orange-500" },
  { label: "Fair", color: "bg-yellow-500" },
  { label: "Good", color: "bg-[#C9A84C]" },
  { label: "Strong", color: "bg-emerald-500" },
];

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const strength = passwordStrength(password);
  const strengthInfo = strengthConfig[Math.min(strength, 5)];

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }
    const supabase = createClient();
    setIsLoading(true);
    setError(null);
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
            `${window.location.origin}/dashboard`,
          data: { full_name: fullName, terms_accepted: agreedToTerms },
        },
      });
      if (error) throw error;
      router.push("/verify-email");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0f] px-4 py-12">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/5 blur-[140px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)", backgroundSize: "50px 50px" }}
      />

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#C9A84C]/30 bg-[#C9A84C]/10 shadow-[0_0_30px_rgba(201,168,76,0.15)]">
            <Lock className="h-6 w-6 text-[#C9A84C]" />
          </div>
          <h1
            className="mb-2 text-3xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Create your account
          </h1>
          <p className="text-sm text-[#6a6a7a]">
            Get started with secure, ephemeral secret sharing
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm">

          {/* OAuth */}
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
          <form onSubmit={handleSignUp} className="space-y-4">

            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="John Doe"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-[#4a4a5a] outline-none transition-all duration-200 focus:border-[#C9A84C]/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)]"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-[#4a4a5a] outline-none transition-all duration-200 focus:border-[#C9A84C]/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)]"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
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

              {/* Strength bar */}
              {password.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i <= strength ? strengthInfo.color : "bg-white/5"
                        }`}
                      />
                    ))}
                  </div>
                  {strengthInfo.label && (
                    <p className="text-[10px] text-[#6a6a7a]">
                      Strength:{" "}
                      <span className={`font-semibold ${
                        strength <= 1 ? "text-red-400" :
                        strength === 2 ? "text-orange-400" :
                        strength === 3 ? "text-yellow-400" :
                        strength === 4 ? "text-[#C9A84C]" :
                        "text-emerald-400"
                      }`}>
                        {strengthInfo.label}
                      </span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 pt-1">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(c) => setAgreedToTerms(!!c.valueOf())}
                className="mt-0.5 border-white/10 bg-white/5 data-[state=checked]:border-[#C9A84C]/50 data-[state=checked]:bg-[#C9A84C]/20"
              />
              <label htmlFor="terms" className="cursor-pointer text-xs leading-relaxed text-[#6a6a7a]">
                I agree to the{" "}
                <Link href="/terms" className="font-semibold text-[#C9A84C] hover:opacity-80">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="font-semibold text-[#C9A84C] hover:opacity-80">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 rounded-lg border border-red-500/15 bg-red-500/5 px-4 py-3">
                <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                <p className="text-xs leading-relaxed text-red-400">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || !agreedToTerms}
              className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#C9A84C] py-3.5 text-sm font-bold text-[#0a0a0f] shadow-[0_0_30px_rgba(201,168,76,0.2)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(201,168,76,0.35)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#0a0a0f]/30 border-t-[#0a0a0f]" />
                  Creating account...
                </span>
              ) : (
                <>
                  <span>Create account</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  <div className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0 skew-x-12" />
                </>
              )}
            </button>
          </form>

          {/* Sign in link */}
          <p className="mt-6 text-center text-xs text-[#4a4a5a]">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#C9A84C] transition-opacity hover:opacity-80">
              Sign in
            </Link>
          </p>
        </div>

        {/* Benefits strip */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {["No credit card required", "Free forever", "Privacy by default"].map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-[#C9A84C]" />
              <span className="text-[10px] text-[#4a4a5a]">{item}</span>
            </div>
          ))}
        </div>

        {/* Security note */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <Shield className="h-3.5 w-3.5 text-[#4a4a5a]" />
          <p className="text-[10px] text-[#4a4a5a]">
            AES-256 encrypted · Zero-knowledge · Open source
          </p>
        </div>
      </div>
    </div>
  );
}

function OAuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="[&_button]:!w-full [&_button]:!rounded-lg [&_button]:!border [&_button]:!border-white/5 [&_button]:!bg-white/[0.03] [&_button]:!text-sm [&_button]:!font-medium [&_button]:!text-white [&_button]:!transition-all [&_button]:hover:!border-white/10 [&_button]:hover:!bg-white/[0.06]">
      {children}
    </div>
  );
}