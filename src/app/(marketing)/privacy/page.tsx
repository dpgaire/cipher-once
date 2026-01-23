import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | CipherOnce",
  description:
    "CipherOnce Privacy Policy. Learn how we protect your data using client-side encryption, zero-knowledge architecture, and minimal metadata collection.",
  keywords: [
    "CipherOnce privacy",
    "zero-knowledge",
    "client-side encryption",
    "secure secret sharing",
    "data protection",
  ],
  openGraph: {
    title: "Privacy Policy | CipherOnce",
    description:
      "Understand how CipherOnce handles your data with a strict zero-knowledge commitment.",
    url: "/privacy",
  },
  twitter: {
    title: "Privacy Policy | CipherOnce",
    description:
      "Understand how CipherOnce protects your privacy with zero-knowledge encryption.",
  },
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen overflow-auto flex-col">
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8 prose prose-sm max-w-none dark:prose-invert">

            <p>
              CipherOnce is built with privacy as a core principle. This Privacy
              Policy explains what data we collect, why we collect it, and—most
              importantly—what we <strong>cannot</strong> see or access.
            </p>

            {/* Zero Knowledge */}
            <section>
              <h2 className="text-2xl font-semibold">
                Zero-Knowledge Architecture
              </h2>
              <p>
                CipherOnce is designed as a <strong>zero-knowledge</strong> service.
                Secrets and files are encrypted and decrypted entirely within your
                browser using modern cryptography (AES-256-GCM).
              </p>
              <p>
                The encryption key is embedded in the URL fragment
                (<code>#key</code>) and is never transmitted to our servers.
                As a result:
              </p>
              <ul>
                <li>We cannot read your secrets</li>
                <li>We cannot recover lost secrets</li>
                <li>We cannot decrypt your files</li>
              </ul>
            </section>

            {/* Data Collected */}
            <section>
              <h2 className="text-2xl font-semibold">
                Information We Collect
              </h2>

              <div className="space-y-4">

                <Card>
                  <CardHeader>
                    <CardTitle>Data You Provide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul>
                      <li>
                        <strong>Encrypted Secret Content:</strong> Stored only in
                        encrypted form. We never see plaintext.
                      </li>
                      <li>
                        <strong>Secret Configuration:</strong> Expiration time,
                        view limits, passphrase usage, and feature flags.
                      </li>
                      <li>
                        <strong>Account Information:</strong> Email address and
                        authentication identifiers if you register an account.
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Automatically Collected Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul>
                      <li>
                        <strong>Access Logs:</strong> When a secret is accessed,
                        we may log:
                        <ul>
                          <li>IP address</li>
                          <li>Browser User-Agent</li>
                          <li>Access timestamp</li>
                          <li>Access status (success, expired, invalid, etc.)</li>
                          <li>Error metadata (when applicable)</li>
                        </ul>
                        These logs are visible only to the secret owner and are
                        used for transparency and abuse prevention.
                      </li>
                      <li>
                        <strong>Server Logs:</strong> Basic operational logs
                        required for security, rate limiting, and debugging.
                        These logs are not used for tracking or profiling.
                      </li>
                    </ul>
                  </CardContent>
                </Card>

              </div>
            </section>

            {/* Usage */}
            <section>
              <h2 className="text-2xl font-semibold">
                How We Use Your Information
              </h2>
              <ul>
                <li>To store and deliver encrypted secrets</li>
                <li>To enforce expiration and view limits</li>
                <li>To secure accounts and prevent abuse</li>
                <li>To display access history to secret owners</li>
                <li>To communicate critical service or security notices</li>
              </ul>
              <p>
                We do <strong>not</strong> use your data for advertising,
                behavioral analytics, or profiling.
              </p>
            </section>

            {/* Retention */}
            <section>
              <h2 className="text-2xl font-semibold">
                Data Retention & Deletion
              </h2>
              <ul>
                <li>
                  <strong>Secrets:</strong> Permanently deleted after expiration,
                  view limit, or manual destruction.
                </li>
                <li>
                  <strong>Access Logs:</strong> Deleted automatically when the
                  associated secret is deleted.
                </li>
                <li>
                  <strong>Accounts:</strong> You may delete your account at any
                  time, which removes all associated data.
                </li>
              </ul>
            </section>

            {/* Third Parties */}
            <section>
              <h2 className="text-2xl font-semibold">
                Third-Party Services
              </h2>
              <p>
                CipherOnce uses a minimal set of trusted infrastructure providers:
              </p>
              <ul>
                <li>
                  <strong>Supabase:</strong> Database, authentication, and server
                  functions.{" "}
                  <Link
                    href="https://supabase.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <strong>Vercel:</strong> Hosting and edge infrastructure.
                  Standard operational logs may apply.
                </li>
              </ul>
              <p>
                We never sell or share your data with advertisers or data brokers.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-semibold">Cookies</h2>
              <p>
                CipherOnce uses <strong>essential cookies only</strong> for
                authentication and session management. We do not use tracking,
                analytics, or advertising cookies.
              </p>
            </section>

            {/* Rights */}
            <section>
              <h2 className="text-2xl font-semibold">Your Rights</h2>
              <ul>
                <li>Access or delete your account data</li>
                <li>Delete secrets at any time</li>
                <li>Request account removal</li>
              </ul>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-2xl font-semibold">
                Changes to This Policy
              </h2>
              <p>
                We may update this policy as CipherOnce evolves. Updates will be
                reflected on this page with a revised date.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold">Contact</h2>
              <p>
                For privacy questions, data requests, or security disclosures:
              </p>
              <p>
                <Link
                  href="https://www.durgagairhe.com.np/"
                  className="font-medium underline"
                  target="_blank"
                >
                 Developer profile
                </Link>
              </p>
            </section>

          </div>
        </div>
      </main>
    </div>
  )
}
