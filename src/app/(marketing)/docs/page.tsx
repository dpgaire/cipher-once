import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CipherOnce Documentation | Secure One-Time Secret Sharing",
  description:
    "Official CipherOnce documentation. Learn how to securely share secrets and files with one-time access, client-side encryption, automatic destruction, and zero-knowledge design.",
  keywords: [
    "one-time secret",
    "secure secret sharing",
    "encrypted file sharing",
    "self-destructing secrets",
    "client-side encryption",
    "privacy focused sharing",
    "CipherOnce",
  ],
  openGraph: {
    title: "CipherOnce Docs – Secure One-Time Secret Sharing",
    description:
      "Learn how CipherOnce protects your secrets using client-side encryption and one-time access.",
    url: "https://cipheronce.com/docs",
    siteName: "CipherOnce",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CipherOnce Documentation",
    description:
      "Secure, self-destructing, one-time secret and file sharing.",
  },
};


export default function DocsPage() {
  return (
    <div className="container py-12 px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-12">

        {/* Header */}
        <header>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            CipherOnce User Manual
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Secure, private, one-time secret and file sharing — built with a zero-knowledge mindset.
          </p>
        </header>

        {/* What is CipherOnce */}
        <section className="space-y-4">
          <h2 className="text-3xl font-semibold">What is CipherOnce?</h2>
          <p className="text-lg text-muted-foreground">
            CipherOnce is a privacy-first platform that allows you to share sensitive
            information and files that can be accessed only once and are automatically
            destroyed after viewing or expiration.
          </p>
          <p className="text-lg text-muted-foreground">
            All encryption happens <strong>client-side</strong>. CipherOnce servers never
            see your secrets in plaintext, ensuring zero-knowledge security.
          </p>
        </section>

        {/* How it works */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold">How CipherOnce Works</h2>

          <div>
            <h3 className="text-2xl font-medium">1. Create a Secret</h3>
            <ol className="list-decimal list-inside space-y-2 text-lg text-muted-foreground">
              <li>Go to the <a href="/create" className="text-primary hover:underline">Create Secret</a> page.</li>
              <li>Enter sensitive text such as passwords, API keys, private notes, or messages.</li>
              <li>Optionally attach a file (encrypted before upload).</li>
              <li>Set expiration time or maximum view count.</li>
              <li>Add an optional passphrase for extra protection.</li>
              <li>Click <strong>Create Secret</strong>.</li>
            </ol>
          </div>

          <div>
            <h3 className="text-2xl font-medium">2. Share the Secret Link</h3>
            <ol className="list-decimal list-inside space-y-2 text-lg text-muted-foreground">
              <li>You’ll receive a unique, one-time secret link.</li>
              <li>
                <strong>Copy the entire URL</strong>, including the part after the
                <code className="mx-1 rounded bg-muted px-1">#</code>.
              </li>
              <li>
                This fragment contains the encryption key and is never sent to the server.
              </li>
              <li>Share the link securely with the intended recipient.</li>
              <li>If you used a passphrase, share it separately.</li>
            </ol>
          </div>

          <div>
            <h3 className="text-2xl font-medium">3. Viewing a Secret</h3>
            <ol className="list-decimal list-inside space-y-2 text-lg text-muted-foreground">
              <li>The recipient opens the link.</li>
              <li>Passphrase (if set) is required.</li>
              <li>Secret is decrypted locally in the browser.</li>
              <li>Once viewed, the secret is permanently destroyed.</li>
            </ol>
          </div>
        </section>

        {/* Security Model */}
        <section className="space-y-4">
          <h2 className="text-3xl font-semibold">Security & Privacy Model</h2>
          <ul className="list-disc list-inside space-y-2 text-lg text-muted-foreground">
            <li><strong>Client-side encryption:</strong> Encryption keys never leave your device.</li>
            <li><strong>Zero-knowledge design:</strong> Servers store only encrypted data.</li>
            <li><strong>One-time access:</strong> Secrets self-destruct after viewing.</li>
            <li><strong>Metadata logging:</strong> Only access-related metadata (IP, user agent, timestamps) is logged for abuse prevention.</li>
            <li><strong>No tracking:</strong> No ads, trackers, or behavioral profiling.</li>
          </ul>
        </section>

        {/* What you can share */}
        <section className="space-y-4">
          <h2 className="text-3xl font-semibold">What Can You Share?</h2>
          <ul className="list-disc list-inside space-y-2 text-lg text-muted-foreground">
            <li>Passwords, API keys, tokens</li>
            <li>Private messages or credentials</li>
            <li>Confidential documents and files</li>
            <li>Legal, financial, or technical data</li>
          </ul>
        </section>

        {/* Troubleshooting */}
        <section className="space-y-4">
          <h2 className="text-3xl font-semibold">Troubleshooting</h2>
          <ul className="list-disc list-inside space-y-2 text-lg text-muted-foreground">
            <li>Ensure the full link including <code className="bg-muted px-1 rounded">#key</code> is copied.</li>
            <li>Some messaging apps strip URL fragments — double check.</li>
            <li>Secrets cannot be recovered once viewed or expired.</li>
            <li>On iOS, files may open in a new tab instead of downloading.</li>
          </ul>
        </section>

        {/* Contact */}
        <section className="space-y-4 border-t pt-8">
          <h2 className="text-3xl font-semibold">Contact the Developer</h2>
          <p className="text-lg text-muted-foreground">
            CipherOnce is actively developed and security-reviewed.  
            If you discover a bug, security issue, or need support:
          </p>
          <p className="text-lg">
            📧 <Link
              href="mailto:support@cipheronce.com"
              className="text-primary hover:underline font-medium"
            >
             gairhedurga13@gmail.com
            </Link>
          </p>
         
          <p className="text-sm text-muted-foreground">
            Responsible disclosure is appreciated.
          </p>
        </section>

      </div>
    </div>
  );
}
