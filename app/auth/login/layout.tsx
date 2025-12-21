import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login to CipherOnce",
  description: "Access your CipherOnce account to manage your secure secrets.",
  robots: "noindex, nofollow",
}

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>{children}</>
  )
}
