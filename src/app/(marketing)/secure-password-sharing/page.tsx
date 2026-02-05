import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Secure Way to Share Passwords Online | CipherOnce",
  description: "Looking for a secure way to share passwords online? CipherOnce offers end-to-end encrypted, zero-knowledge secret sharing to protect sensitive credentials.",
};

export default function SecurePasswordSharingPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Securely Share Passwords Online with Zero-Knowledge Encryption</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Sharing passwords can be risky business. Whether it's with a colleague, family member, or friend,
        you need a method that guarantees the password remains confidential and is not exposed to third parties.
        CipherOnce provides that secure channel through its unique zero-knowledge architecture.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">The Risks of Traditional Password Sharing</h2>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><strong>Email & Chat Apps:</strong> Often unencrypted, leaving passwords vulnerable to interception.</li>
          <li><strong>Text Messages:</strong> Similar to email, not designed for secure credential transfer.</li>
          <li><strong>Unsecured Documents:</strong> Storing passwords in plain text files or shared cloud documents is a major security loophole.</li>
          <li><strong>Compromised Services:</strong> Many password sharing services hold encryption keys, making your data vulnerable if their systems are breached.</li>
        </ul>
        <p>
          These methods put your accounts at risk of unauthorized access, identity theft, and data breaches.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How CipherOnce Makes Password Sharing Secure</h2>
        <p className="mb-4">
          CipherOnce is engineered from the ground up for maximum security and privacy, especially for sensitive data like passwords.
          Here’s how we ensure your passwords are shared securely:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><strong>Client-Side Encryption:</strong> Passwords are encrypted in your browser before they touch our servers.</li>
          <li><strong>Unique, Ephemeral Keys:</strong> Each shared password gets its own unique encryption key, which is never stored on our servers.</li>
          <li><strong>Zero-Knowledge Design:</strong> We never know your passwords. Our system is designed so that we cannot decrypt the information you share, even if we wanted to.</li>
          <li><strong>One-Time View Links:</strong> Passwords shared via CipherOnce can only be viewed once (or a limited number of times), after which they are automatically destroyed.</li>
          <li><strong>Optional Password Protection:</strong> Add an extra layer of security with a recipient-only passphrase.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Ideal Use Cases for Secure Password Sharing</h2>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Sharing Wi-Fi passwords with guests.</li>
          <li>Providing temporary access credentials to freelancers or support staff.</li>
          <li>Exchanging software licenses or activation keys.</li>
          <li>Securely transferring account login details between personal devices.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Start Sharing Passwords Safely Today</h2>
        <p>
          Don't compromise on security when sharing passwords. Use CipherOnce for a truly private and secure exchange.
        </p>
        {/* Call to Action - Placeholder for a Button/Link */}
        <div className="flex mt-6 flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/create" passHref>
                <button className="group flex w-full items-center justify-center gap-3 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 sm:w-auto">
                  Create a Secure Share
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
      </section>
    </div>
  );
}