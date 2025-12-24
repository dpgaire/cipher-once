import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the Privacy Policy for CipherOnce to understand how we handle your data with a zero-knowledge commitment. Your privacy is our priority.",
  keywords: ["privacy policy", "data protection", "zero-knowledge", "encryption", "user rights", "secure sharing"],
  openGraph: {
    title: "Privacy Policy | CipherOnce",
    description: "Understand how we handle your data with a zero-knowledge commitment.",
    url: "/privacy",
  },
  twitter: {
    title: "Privacy Policy | CipherOnce",
    description: "Understand how we handle your data with a zero-knowledge commitment.",
  },
}

export default async function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold">Privacy Policy for CipherOnce</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="space-y-8 prose prose-sm max-w-none dark:prose-invert">
            <p>
              Welcome to CipherOnce. We are committed to protecting your privacy and ensuring you have a transparent
              understanding of how we handle your data. This Privacy Policy outlines our practices concerning the
              collection, use, and protection of your information. Our core principle is zero-knowledge; your secrets
              are yours alone.
            </p>

            <section>
              <h2 className="text-2xl font-semibold">Our Zero-Knowledge Commitment</h2>
              <p>
                CipherOnce is fundamentally designed as a <strong>zero-knowledge</strong> service. When you create a
                secret, it is encrypted and decrypted exclusively within your browser using strong, modern
                cryptography (AES-256-GCM). The encryption key is appended to the shareable URL and is never transmitted
                to our servers. This means we, the operators of CipherOnce, have no ability to view, access, or decrypt
                your secret content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Information We Collect</h2>
              <p>To provide our service, we collect a minimal amount of information:</p>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Information You Provide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul>
                      <li>
                        <strong>Encrypted Secret Data:</strong> The content of your secret, in its fully encrypted
                        form. We cannot read this.
                      </li>
                      <li>
                        <strong>Secret Metadata:</strong> The settings you choose for a secret, such as its expiration
                        time, maximum number of views, and whether it is protected by a passphrase.
                      </li>
                      <li>
                        <strong>Account Information:</strong> If you create an account, we collect your email address
                        and associate it with your authentication provider (e.g., GitHub). This is used for account
                        management and security.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Information Collected Automatically</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul>
                      <li>
                        <strong>Access Logs:</strong> For secrets created by registered users, we log access attempts.
                        This log includes the viewer&apos;s IP address, browser User-Agent, and the time of access.
                        These logs are only visible to the secret&apos;s owner and are a feature to enhance security.
                      </li>
                      <li>
                        <strong>Server Logs:</strong> Like most web services, our servers may automatically log basic
                        information for security and debugging purposes, such as your IP address, browser type, and
                        the pages you visit. This data is not linked to specific secrets.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
              <p>Your information is used for the following purposes:</p>
              <ul>
                <li>
                  <strong>To Operate the Service:</strong> To store your encrypted secrets, enforce the access rules
                  you define, and allow you to manage your secrets via your dashboard.
                </li>
                <li>
                  <strong>For Security:</strong> To protect your account, monitor for malicious activity, and allow you
                  to track access to your secrets.
                </li>
                <li>
                  <strong>To Communicate With You:</strong> To send important notices regarding your account, such as
                  security alerts or password reset emails. We will not send you marketing emails.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Data Retention and Deletion</h2>
              <p>We retain data only for as long as necessary:</p>
              <ul>
                <li>
                  <strong>Secrets:</strong> A secret is permanently and irrecoverably deleted from our database
                  immediately when its expiration time is reached, its maximum view count is met, or it is manually
                  "burned" by its creator.
                </li>
                <li>
                  <strong>Access Logs:</strong> Access logs associated with a secret are permanently deleted when the
                  secret itself is deleted.
                </li>
                <li>
                  <strong>User Accounts:</strong> Your account information is retained as long as your account is
                  active. You may delete your account at any time, which will also delete all associated secrets and
                  logs.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Data Sharing and Third Parties</h2>
              <p>We do not sell, trade, or rent your personal information to others. We limit data sharing to the
                essential third-party services that help us operate CipherOnce:</p>
              <ul>
                <li>
                  <strong>Supabase:</strong> We use Supabase for our database, authentication, and serverless
                  functions. Supabase is our primary data processor. You can view the{" "}
                  <Link href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">
                    Supabase Privacy Policy here
                  </Link>
                  .
                </li>
                <li>
                  <strong>Hosting Provider:</strong> Our application is hosted on Vercel. Standard server logs may be
                  collected and stored by our hosting provider for security and operational purposes.
                </li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">Cookies</h2>
              <p>
                We use cookies for essential functionlity only. Specifically, we use them to manage your authentication session if you are logged in. We do not use cookies for tracking or advertising purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Your Rights</h2>
              <p>
                As a user, you have the right to access, correct, or delete your personal information. If you have an account, you can manage your secrets directly from your dashboard. To request account deletion, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any significant changes by
                posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please{" "}
                <Link href="/contact">contact us</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
