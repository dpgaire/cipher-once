import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "One-Time Secret Alternative (Zero-Knowledge & Secure) | CipherOnce",
  description: "Looking for a safer OneTimeSecret alternative? CipherOnce uses true client-side encryption so even our servers can’t read your secrets.",
};

export default function OneTimeSecretAlternativePage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">A Safer One-Time Secret Alternative</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Many services offer one-time secret sharing, but how many truly protect your privacy?
        CipherOnce provides a robust and secure alternative, focusing on a critical aspect: zero-knowledge encryption.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What OneTimeSecret Does (and its limitations)</h2>
        <p className="mb-4">
          OneTimeSecret and similar platforms allow you to share sensitive information that can only be viewed once.
          This is excellent for preventing accidental re-sharing and ensuring ephemeral communication.
          However, a key question remains: what happens to your secret before it's viewed?
        </p>
        <p className="mb-4">
          The primary limitation of many such services is that they often handle your secret on their servers.
          This means that at some point, your sensitive data might exist unencrypted (or encrypted with a key known by the service)
          on their infrastructure. This creates a potential vulnerability, as the service provider itself or an attacker
          breaching their systems could theoretically access your secret.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What CipherOnce Does Differently: True Zero-Knowledge</h2>
        <p className="mb-4">
          CipherOnce elevates the security of one-time secret sharing by implementing true client-side, zero-knowledge encryption.
          Here's what that means for you:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><strong>Client-Side Encryption:</strong> Your secret is encrypted in your web browser before it ever leaves your device.</li>
          <li><strong>Unique Encryption Key:</strong> A unique encryption key is generated for each secret and is never transmitted to our servers.</li>
          <li><strong>No Server Access:</strong> Our servers only store the encrypted blob and an associated initialization vector. We cannot, under any circumstances, decrypt your secret.</li>
          <li><strong>Secure Link for Sharing:</strong> The decryption key is part of the unique, one-time view link that you share with your intended recipient.</li>
        </ul>
        <p>
          This architectural choice ensures that even if CipherOnce's servers were compromised, your secrets would remain safe and unreadable.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Use Cases for CipherOnce</h2>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Securely sharing passwords with a colleague or family member.</li>
          <li>Sending API keys or access tokens without fear of server-side interception.</li>
          <li>Confidential communication that truly vanishes after being read.</li>
          <li>Ensuring compliance with strict privacy regulations.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Get Started with a Safer Alternative</h2>
        <p>
          Choose CipherOnce for your one-time secret sharing needs and experience the unparalleled security of a zero-knowledge solution.
        </p>
        <div className="mt-6 text-center">
          <Link href="/create">
            <button className="group relative inline-flex items-center justify-center h-14 px-10 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 hover:scale-105">
              <span className="relative z-10">Create a secure secret</span>
              <ArrowRight className="ml-2 h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}