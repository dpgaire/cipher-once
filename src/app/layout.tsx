import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { createClient } from "@/lib/supabase/server"
import { RootLayout } from "@/features/core/components/root-layout" // Import new component

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const siteConfig = {
  name: "CipherOnce",
  url: "https://cipher-once.vercel.app", // Replace with your actual domain
  description:
    "Share secrets, passwords, and API keys securely with end-to-end encrypted, self-destructing links. A zero-knowledge platform for ephemeral and secure data transfer.",
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Secure, Ephemeral, Zero-Knowledge Secret Sharing`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "secret sharing",
    "secure sharing",
    "one-time secret",
    "file sharing",
    "ephemeral sharing",
    "self-destructing message",
    "zero-knowledge",
    "encrypted message",
    "password sharing",
    "share password securely",
    "API key sharing",
    "burn after reading",
    "secure data transfer",
    "credential sharing",
    "privacy",
    "security",
  ],
  authors: [{ name: "CipherOnce Team" }],
  creator: "CipherOnce",
  
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og-image.svg`],
    creator: "@your-twitter-handle", // Replace with your Twitter handle
  },
  
  icons: {
    icon: [
      {
        url: "/icon-light.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: {
      url: "/apple-icon.svg",
      type: "image/svg+xml",
    },
  },
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAuthenticated = !!user

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <RootLayout isAuthenticated={isAuthenticated}>
              {children}
            </RootLayout>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
