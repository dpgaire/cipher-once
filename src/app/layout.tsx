import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { RootLayout } from "@/features/core/components/root-layout"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const siteConfig = {
  name: "CipherOnce",
  url: "https://cipheronce.com", 
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
        url: `${siteConfig.url}/cipheronce_lock_fade_blue500.png`,
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
    images: [`${siteConfig.url}/cipheronce_lock_fade_blue500.png`],
    creator: "@your-twitter-handle",
  },
  
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
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

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
            <RootLayout>
              {children}
            </RootLayout>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
