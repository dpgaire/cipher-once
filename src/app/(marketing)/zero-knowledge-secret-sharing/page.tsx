import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zero-Knowledge Secret Sharing | CipherOnce",
  description: "Learn about CipherOnce's true zero-knowledge secret sharing for ultimate privacy and security. Our servers never see your sensitive data.",
};

export default function ZeroKnowledgeSecretSharingPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">True Zero-Knowledge Secret Sharing</h1>
      <p className="text-lg text-muted-foreground mb-8">
        At CipherOnce, we are committed to providing the highest level of privacy and security for your sensitive information.
        Our true zero-knowledge architecture ensures that your secrets remain yours alone.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What is Zero-Knowledge?</h2>
        <p className="mb-4">
          Zero-knowledge means that our servers never have access to the unencrypted content of your secrets.
          When you create a secret with CipherOnce, it is encrypted directly in your browser using strong cryptographic algorithms.
          Only the recipient, with the correct link and (optionally) passphrase, can decrypt and view the secret.
        </p>
        <p className="mb-4">
          This is a crucial distinction from many other "secure" sharing services, which often claim to be secure but still
          process or store your data on their servers in a way that could potentially expose it. With CipherOnce, if we don't
          have the key, we can't unlock your data, because the key never leaves your browser.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Why True Zero-Knowledge Matters</h2>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><strong>Enhanced Privacy:</strong> Your data remains confidential, even from us.</li>
          <li><strong>Reduced Risk:</strong> No central honeypot of unencrypted data for attackers to target.</li>
          <li><strong>Trust by Design:</strong> Security is built into the architecture, not just promised in a policy.</li>
        </ul>
        <p>
          Experience the peace of mind that comes with sharing secrets knowing that they are protected by genuine zero-knowledge principles.
        </p>
      </section>

      <div className="mt-6 text-center">
        <Link href="/create">
          <button className="group relative inline-flex items-center justify-center h-14 px-10 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 hover:scale-105">
            <span className="relative z-10">Create a secure secret</span>
            <ArrowRight className="ml-2 h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
          </button>
        </Link>
      </div>
    </div>
  );
}