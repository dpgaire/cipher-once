import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the Terms of Service for CipherOnce. By using our zero-knowledge secret sharing service, you agree to these terms.",
  keywords: ["terms of service", "user agreement", "acceptable use", "legal", "CipherOnce terms"],
  openGraph: {
    title: "Terms of Service | CipherOnce",
    description: "By using our zero-knowledge secret sharing service, you agree to these terms.",
    url: "/terms",
  },
  twitter: {
    title: "Terms of Service | CipherOnce",
    description: "By using our zero-knowledge secret sharing service, you agree to these terms.",
  },
}

export default async function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold">Terms of Service for CipherOnce</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="space-y-8 prose prose-sm max-w-none dark:prose-invert">
            <p>
              Welcome to CipherOnce ("we," "us," or "our"). These Terms of Service ("Terms") govern your access to and
              use of our website, services, and applications (collectively, the "Service"). Please read them carefully.
            </p>

            <section>
              <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms and our{" "}
                <Link href="/privacy">Privacy Policy</Link>. If you do not agree to these Terms, you may not use the
                Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">2. Description of Service</h2>
              <p>
                CipherOnce provides a zero-knowledge platform for sharing sensitive information securely. Secrets are
                encrypted client-side (in your browser), and we have no ability to access or decrypt your content. The
                Service allows you to create self-destructing links with configurable expiration times and view limits.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">3. User Accounts</h2>
              <p>
                To access certain features, such as managing secrets and viewing access logs, you must create an
                account. You are responsible for safeguarding your account credentials and for all activities that occur
                under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">4. Acceptable Use Policy</h2>
              <p>You agree not to use the Service to:</p>
              <ul>
                <li>
                  Transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar,
                  obscene, or otherwise objectionable.
                </li>
                <li>Share illegal information, including but not limited to copyrighted material you do not have the
                  rights to, or material related to illicit activities.
                </li>
                <li>Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with
                  a person or entity.
                </li>
                <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the
                  Service, the server on which the Service is stored, or any server, computer, or database connected to
                  the Service.
                </li>
                <li>Use the Service for any form of spamming, phishing, or distribution of malware.</li>
              </ul>
              <p>
                Violation of this Acceptable Use Policy may result in the immediate termination of your access to the
                Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">5. Content Responsibility and Ownership</h2>
              <p>
                You retain full ownership of the content you create and share through the Service. Because of our
                zero-knowledge architecture, you are solely responsible for the content you transmit. We have no
                knowledge of your content and no liability for it. You are also solely responsible for maintaining the
                confidentiality of the shareable links you create.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">6. Disclaimer of Warranties</h2>
              <p>
                The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranty that the Service will
                be uninterrupted, timely, secure, or error-free. You use the Service at your own risk. We expressly
                disclaim all warranties of any kind, whether express or implied, including, but not limited to, the
                implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">7. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, CipherOnce shall not be liable for any indirect, incidental,
                special, consequential, or exemplary damages, including but not limited to, damages for loss of profits,
                goodwill, use, data, or other intangible losses (even if we have been advised of the possibility of such
                damages), resulting from your use of the Service. Because we cannot access your data, we cannot be
                responsible for data loss.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">8. Termination</h2>
              <p>
                We may terminate or suspend your access to the Service at any time, with or without cause or notice,
                for any reason, including for a breach of these Terms. Upon termination, your right to use the Service
                will immediately cease.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">9. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
                What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">10. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which
                the company is based, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">11. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please <Link href="/contact">contact us</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
