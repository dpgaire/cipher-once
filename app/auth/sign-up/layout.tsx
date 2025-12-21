import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up for CipherOnce",
  description: "Create an account on CipherOnce to manage and track your secure, self-destructing secrets.",
  robots: "noindex, nofollow",
}

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>{children}</>
  )
}
