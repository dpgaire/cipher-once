import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "No Content Logging Policy | CipherOnce",
  description: "Your privacy is paramount. CipherOnce operates on a strict no-content-logging policy, ensuring your shared secrets are never stored or seen by us.",
};

export default function NoContentLoggingPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Our Commitment to Your Privacy: No Content Logging</h1>
      <p className="text-lg text-muted-foreground mb-8">
        At CipherOnce, we believe that true security comes with absolute privacy. That's why we've engineered our platform with a foundational principle: we do not log, store, or have access to the content of your secrets. What you share is for your recipient's eyes only.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What "No Content Logging" Means for You</h2>
        <p className="mb-4">
          When we say "no content logging," we mean it. Here’s our promise:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><strong>Zero-Knowledge Architecture:</strong> Your data is encrypted at the client-side (in your browser). By the time it reaches our servers, it's already a scrambled, unreadable piece of text. We don't have the keys to decrypt it, and we never will.</li>
          <li><strong>Ephemeral Data:</strong> The encrypted content you create is designed to be temporary. Once the secret is viewed the specified number of times, it's permanently deleted from our database.</li>
          <li><strong>No Metadata Snooping:</strong> We minimize the metadata we collect. We only store what's essential for the service to function, such as the secret's expiry time and view count. We never analyze your data.</li>
          <li><strong>Complete Anonymity:</strong> You can use CipherOnce without creating an account, ensuring that your identity is never linked to the secrets you share.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Why This Matters for Secure Sharing</h2>
        <p className="mb-4">
          Many services claim to be secure, but they often store your data in a way that can be compromised, either by external attackers or internal policies. Our no-logging policy eliminates this risk entirely.
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><strong>Protection from Data Breaches:</strong> If our servers were ever compromised, attackers would only find encrypted gibberish. Your sensitive information remains safe.</li>
          <li><strong>No Third-Party Access:</strong> We cannot be compelled to hand over your data because we simply don't have it in a readable format.</li>
          <li><strong>Peace of Mind:</strong> You can share secrets with the confidence that your privacy is structurally guaranteed by our system's design.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Experience True Privacy Today</h2>
        <p>
          Choose a service that respects your privacy by design. Create your first zero-knowledge, unlogged secret with CipherOnce.
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
