import { ResetPasswordForm } from '@/features/auth/components/reset-password-form'

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Reset Password</h1>
        <ResetPasswordForm />
      </div>
    </div>
  )
}
