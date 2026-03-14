"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/components/ui/use-toast"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ArrowRight, KeyRound, CheckCircle2, Shield } from "lucide-react"
import Link from "next/link"

const ResetPasswordSchema = z
  .object({
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export function ResetPasswordForm() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  })

  const password = form.watch("password")
  const confirmPassword = form.watch("confirmPassword")
  const passwordsMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword

  async function onSubmit(data: z.infer<typeof ResetPasswordSchema>) {
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: data.password })
    setLoading(false)

    if (error) {
      toast({ title: "Error resetting password", description: error.message, variant: "destructive" })
    } else {
      toast({ title: "Password reset successfully", description: "You can now log in with your new password." })
      router.push("/login")
    }
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0f] px-4 py-12">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/6 blur-[120px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)", backgroundSize: "50px 50px" }}
      />

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#C9A84C]/30 bg-[#C9A84C]/10 shadow-[0_0_30px_rgba(201,168,76,0.15)]">
            <KeyRound className="h-6 w-6 text-[#C9A84C]" />
          </div>
          <h1
            className="mb-2 text-3xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Set new password
          </h1>
          <p className="text-sm text-[#6a6a7a]">Choose a strong password for your account</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

            {/* New password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">
                New password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  {...form.register("password")}
                  className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 pr-11 text-sm text-white placeholder-[#4a4a5a] outline-none transition-all duration-200 focus:border-[#C9A84C]/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a4a5a] transition-colors hover:text-[#C9A84C]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="flex items-center gap-2 text-xs text-red-400">
                  <span className="inline-block h-1 w-1 rounded-full bg-red-400" />
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm password */}
            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">
                Confirm new password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  {...form.register("confirmPassword")}
                  className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 pr-11 text-sm text-white placeholder-[#4a4a5a] outline-none transition-all duration-200 focus:border-[#C9A84C]/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a4a5a] transition-colors hover:text-[#C9A84C]"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {passwordsMatch && (
                <p className="flex items-center gap-2 text-xs text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" />
                  Passwords match
                </p>
              )}
              {form.formState.errors.confirmPassword && (
                <p className="flex items-center gap-2 text-xs text-red-400">
                  <span className="inline-block h-1 w-1 rounded-full bg-red-400" />
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#C9A84C] py-3.5 text-sm font-bold text-[#0a0a0f] shadow-[0_0_30px_rgba(201,168,76,0.2)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(201,168,76,0.35)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#0a0a0f]/30 border-t-[#0a0a0f]" />
                  Resetting...
                </span>
              ) : (
                <>
                  <span>Reset password</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  <div className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0 skew-x-12" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-[#4a4a5a]">
            Remember your password?{" "}
            <Link href="/login" className="font-semibold text-[#C9A84C] hover:opacity-80">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          <Shield className="h-3.5 w-3.5 text-[#4a4a5a]" />
          <p className="text-[10px] text-[#4a4a5a]">AES-256 encrypted · Zero-knowledge architecture</p>
        </div>
      </div>
    </div>
  )
}