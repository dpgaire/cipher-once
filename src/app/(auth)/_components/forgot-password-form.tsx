'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { toast } from 'sonner'
import { ArrowRight, ArrowLeft, MailCheck } from 'lucide-react'
import Link from 'next/link'

const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: '' },
  })

  async function onSubmit(data: z.infer<typeof ForgotPasswordSchema>) {
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${location.origin}/callback?next=/reset-password`,
    })
    setLoading(false)

    if (error) {
      toast.error('Error sending password reset email')
    } else {
      setSubmittedEmail(data.email)
      setSent(true)
      toast.success('Check your email for a link to reset your password.')
    }
  }

  if (sent) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10">
          <MailCheck className="h-7 w-7 text-emerald-400" />
        </div>
        <div>
          <p className="mb-2 text-base font-bold text-white">Check your inbox</p>
          <p className="text-sm leading-relaxed text-[#6a6a7a]">
            We sent a reset link to{' '}
            <span className="font-semibold text-[#C9A84C]">{submittedEmail}</span>.
            It expires in 1 hour.
          </p>
        </div>
        <div className="h-px bg-white/5" />
        <Link
          href="/login"
          className="group inline-flex items-center gap-2 text-xs font-semibold text-[#6a6a7a] transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="block text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]"
        >
          Email address
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...form.register('email')}
          className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-[#4a4a5a] outline-none transition-all duration-200 focus:border-[#C9A84C]/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)]"
        />
        {form.formState.errors.email && (
          <p className="flex items-center gap-2 text-xs text-red-400">
            <span className="inline-block h-1 w-1 rounded-full bg-red-400" />
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#C9A84C] py-3.5 text-sm font-bold text-[#0a0a0f] shadow-[0_0_30px_rgba(201,168,76,0.2)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(201,168,76,0.35)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#0a0a0f]/30 border-t-[#0a0a0f]" />
            Sending...
          </span>
        ) : (
          <>
            <span>Send reset link</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            <div className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0 skew-x-12" />
          </>
        )}
      </button>

      <div className="h-px bg-white/5" />

      <Link
        href="/login"
        className="group flex items-center justify-center gap-2 text-xs font-semibold text-[#6a6a7a] transition-colors hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        Back to sign in
      </Link>
    </form>
  )
}