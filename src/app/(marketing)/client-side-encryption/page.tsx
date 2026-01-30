import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Client-Side Encryption Explained | CipherOnce",
  description: "Learn how CipherOnce uses client-side encryption to provide zero-knowledge secret sharing. Your data is encrypted in your browser before it ever reaches our servers.",
};

export default function ClientSideEncryptionPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Securing Your Data with Client-Side Encryption</h1>
      <p className="text-lg text-muted-foreground mb-8">
        At the heart of CipherOnce's security model is client-side encryption. This means all encryption and decryption of your secrets happens directly in your browser. We never receive your plaintext data, making our platform a true zero-knowledge service.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How Client-Side Encryption Works</h2>
        <p className="mb-4">
          The process is simple yet incredibly secure:
        </p>
        <ol className="list-decimal list-inside space-y-3 mb-4">
          <li><strong>You Create a Secret:</strong> You type your sensitive information into the form on our website.</li>
          <li><strong>In-Browser Encryption:</strong> Before your data is sent, our JavaScript code generates a unique, cryptographically-strong encryption key. This key is used to encrypt your secret right there in your browser.</li>
          <li><strong>Data Transmission:</strong> Only the encrypted data (ciphertext) is sent to our servers for storage. The encryption key is appended to the share link's URL fragment (#), which is never sent to the server.</li>
          <li><strong>Recipient Access:</strong> When the recipient opens the link, their browser retrieves the encrypted data from our server. The key, present in the URL fragment, is then used by the browser to decrypt the message locally.</li>
          <li><strong>Zero Server-Side Knowledge:</strong> At no point does our server have access to the encryption key or the unencrypted data. This guarantees that we, or any third party, cannot read your secrets.</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">The Benefits of This Approach</h2>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><strong>Maximum Privacy:</strong> Your data remains confidential from the moment you create it until the moment your recipient views it.</li>
          <li><strong>Trustless Security:</strong> You don't have to trust us. Our architecture is designed to be "trustless," meaning its security is based on verifiable cryptography, not on our promises.</li>
          <li><strong>End-to-End Protection:</strong> The encryption covers the entire lifecycle of your secret, from your device to your recipient's device, without any vulnerable points in between.</li>
          <li><strong>Resilience to Breaches:</strong> Even in the unlikely event of a server breach, your secrets remain secure as they are stored in an encrypted format that is impossible for us or attackers to decipher.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Share with Confidence</h2>
        <p>
          Client-side encryption is the gold standard for secure communication on the web. By using CipherOnce, you are leveraging this powerful technology to protect your most sensitive information.
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
