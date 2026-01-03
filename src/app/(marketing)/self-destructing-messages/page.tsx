import { ArrowRight } from 'lucide-react';
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Self-Destructing Messages (Zero-Knowledge) | CipherOnce",
  description: "Send self-destructing messages with CipherOnce's zero-knowledge encryption. Ensure your sensitive communications vanish after being read.",
};

export default function SelfDestructingMessagesPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Send Self-Destructing Messages with Ultimate Privacy</h1>
      <p className="text-lg text-muted-foreground mb-8">
        In an era where digital footprints are permanent, the ability to send self-destructing messages
        is more valuable than ever. CipherOnce combines the ephemerality of self-destructing content with
        uncompromising zero-knowledge encryption, ensuring your messages truly disappear and remain private.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What Are Self-Destructing Messages?</h2>
        <p className="mb-4">
          Self-destructing messages are communications designed to be viewed once (or a limited number of times)
          and then automatically destroyed, making them inaccessible thereafter. This feature is crucial
          for sensitive exchanges where you want to limit the exposure and persistence of information.
        </p>
        <p className="mb-4">
          Many popular messaging apps offer a "disappearing messages" feature. However, the security and true
          ephemerality of these features vary widely. The key question is: who else can access the message
          before it disappears, and how truly "gone" is it afterward?
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">CipherOnce's Zero-Knowledge Approach to Ephemeral Messaging</h2>
        <p className="mb-4">
          CipherOnce takes self-destructing messages to the next level by building upon a foundation of
          true zero-knowledge encryption. This means:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><strong>Client-Side Encryption:</strong> Your message is encrypted in your browser. Our servers only receive an unreadable ciphertext.</li>
          <li><strong>Unique Decryption Key:</strong> The key to decrypt your message is embedded in the unique, one-time link you share, never stored on our servers.</li>
          <li><strong>Guaranteed Destruction:</strong> Once the message is viewed by the recipient (or the set view limit is reached), it is permanently deleted from our database. There's no backup, no trace, because we never had access to the readable content in the first place.</li>
          <li><strong>Beyond Screenshots:</strong> While we can't prevent screenshots, the immediate and permanent destruction post-view significantly reduces the window of exposure.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Use Cases for Self-Destructing Messages</h2>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Sharing confidential business information that should not persist.</li>
          <li>Transmitting temporary access codes or sensitive instructions.</li>
          <li>Discussing private matters with an assurance of ephemerality.</li>
          <li>Any situation where you need to communicate sensitive data with a limited lifespan.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Experience True Disappearing Messages</h2>
        <p>
          For critical communications that demand both ephemerality and ultimate privacy, choose CipherOnce's
          zero-knowledge self-destructing messages.
        </p>
        {/* Call to Action - Placeholder for a Button/Link */}
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