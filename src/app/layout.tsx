import type React from "react";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { RootLayout } from "@/features/core/components/root-layout";
import { TrackPageView } from "@/features/analytics/components/TrackPageView";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const siteConfig = {
  name: "CipherOnce",
  url: "https://cipheronce.com",
  description:
    "A zero-knowledge platform for secure messaging, file sharing, and one-time secrets with end-to-end encryption, access control, and automatic expiration.",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Secure File, Message, and Secret Sharing`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    // Core intent
    "secure file sharing",
    "secure message sharing",
    "secure secret sharing",
    "one time secret",
    "one time link",
    "self destructing message",
    "self destructing file",
    "ephemeral file sharing",
    "ephemeral messaging",

    // Security & encryption
    "end to end encrypted sharing",
    "encrypted file sharing",
    "encrypted messaging app",
    "zero knowledge encryption",
    "zero knowledge sharing",
    "privacy focused sharing",
    "secure data transfer",
    "no log secure sharing",

    // Passwords & credentials
    "share password securely",
    "password sharing tool",
    "secure credential sharing",
    "API key sharing",
    "share api keys securely",
    "token sharing securely",

    // File & download control
    "secure file sharing without download",
    "disable file download sharing",
    "controlled file sharing",
    "private file sharing",
    "temporary file sharing",

    // Product & SaaS intent
    "secure sharing platform",
    "secure collaboration tool",
    "developer security tools",
    "secure communication platform",

    // Modern auth / device-first (future-proof)
    "passwordless login",
    "qr code login",
    "secure login with phone",
    "passkey authentication",

    // Trust & compliance signals
    "privacy first app",
    "secure alternative to pastebin",
    "secure alternative to email",
    "confidential information sharing",
  ],

  authors: [{ name: "CipherOnce Team" }],
  creator: "CipherOnce",
  manifest: "/manifest.json",

  // Canonical URL
  alternates: {
    canonical: "./",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} - Secure Secret Sharing`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/cipheronce_lock_fade_blue500.png`,
        width: 1200,
        height: 630,
        alt: "CipherOnce Secure Sharing",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Secure Secret Sharing`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/cipheronce_lock_fade_blue500.png`],
    creator: "@CipherOnce",
  }
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
          <TrackPageView />
          {/* JSON-LD Structured Data for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: siteConfig.name,
                url: siteConfig.url,
                description: siteConfig.description,
                publisher: {
                  "@type": "Organization",
                  name: siteConfig.name,
                  logo: {
                    "@type": "ImageObject",
                    url: `${siteConfig.url}/cipheronce_lock_fade_blue500.png`,
                  },
                },
              }),
            }}
          />

          <div className="flex min-h-screen flex-col">
            <RootLayout>
              {children}
              <Toaster position="top-right" richColors closeButton />
            </RootLayout>
          </div>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
