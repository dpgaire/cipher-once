import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CipherOnce Docs - Secure One-Time Secret Sharing',
  description: 'Learn how to use CipherOnce for secure, self-destructing, one-time secret and file sharing. Your guide to privacy and data protection.',
};

export default function DocsPage() {
  return (
    <div className="container py-12 px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="text-start">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">CipherOnce User Manual</h1>
          <p className="mt-4 text-lg text-muted-foreground">Your guide to secure, self-destructing secret sharing.</p>
        </header>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">What is CipherOnce?</h2>
          <p className="text-lg text-muted-foreground">
            CipherOnce is a secure platform designed for sharing sensitive information and files
            with the assurance that they can only be viewed once and then permanently destroyed.
            It uses client-side encryption to ensure your data remains private and confidential.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">How to Use CipherOnce</h2>

          <div className="space-y-4">
            <h3 className="text-2xl font-medium text-foreground">1. Creating a Secret</h3>
            <ol className="list-decimal list-inside text-lg text-muted-foreground space-y-2">
              <li>Navigate to the <a href="/create" className="text-primary hover:underline">Create Secret</a> page.</li>
              <li>
                <strong>Enter your secret:</strong> You can type or paste any sensitive text, such as passwords,
                private keys, confidential messages, or any other textual information.
              </li>
              <li>
                <strong>(Optional) Attach a File:</strong> You can also securely attach a file. CipherOnce encrypts the file
                client-side before uploading, ensuring its content remains private.
              </li>
              <li>
                <strong>Set Expiration:</strong> Choose when your secret should expire (e.g., after 1 hour, 1 day, or a custom date).
                Once expired, the secret becomes inaccessible.
              </li>
              <li>
                <strong>Set View Limit:</strong> Determine how many times the secret can be viewed. For true one-time viewing,
                set this to "1".
              </li>
              <li>
                <strong>(Optional) Add a Passphrase:</strong> For an extra layer of security, you can add a passphrase.
                The recipient will need this passphrase to decrypt and view the secret.
              </li>
              <li>
                Click the &quot;Create Secret&quot; button.
              </li>
            </ol>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-medium text-foreground">2. Sharing Your Secret Link</h3>
            <ol className="list-decimal list-inside text-lg text-muted-foreground space-y-2">
              <li>After creating your secret, you will receive a unique, one-time view link.</li>
              <li>
                <strong>Copy the FULL link:</strong> It is crucial to copy the entire URL, including the part
                after the <code className="bg-muted px-1 rounded">#</code> symbol (e.g., <code className="bg-muted px-1 rounded">/s/abc123#key...</code>).
                This fragment contains the encryption key necessary to decrypt your secret.
                If this part is missing, the secret cannot be viewed.
              </li>
              <li>
                Share this link with your intended recipient using any communication method (email, chat, etc.).
              </li>
              <li>
                <strong>Important:</strong> If you used a passphrase, you must communicate the passphrase
                to the recipient separately and securely (e.g., over a different channel than the link).
              </li>
            </ol>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-medium text-foreground">3. Viewing a Secret</h3>
            <ol className="list-decimal list-inside text-lg text-muted-foreground space-y-2">
              <li>The recipient opens the provided CipherOnce link in their browser.</li>
              <li>
                If a passphrase was set, they will be prompted to enter it.
              </li>
              <li>
                Upon clicking &quot;Reveal Secret&quot;, the content will be decrypted client-side.
              </li>
              <li>
                <strong>Download Attached Files:</strong> If a file was attached, they can click &quot;Download File&quot; to save it.
                On iOS, depending on the file type, it might open in a new browser tab for viewing instead of direct download.
              </li>
              <li>
                <strong>Automatic Destruction:</strong> After the secret is viewed (or the view limit is reached), it is permanently
                deleted from CipherOnce&apos;s servers and can never be accessed again.
              </li>
            </ol>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">What Information Can You Share?</h2>
          <ul className="list-disc list-inside text-lg text-muted-foreground space-y-2">
            <li>
              <strong>Text-based Secrets:</strong> Passwords, API keys, private messages, seed phrases,
              legal documents, code snippets, confidential notes, etc.
            </li>
            <li>
              <strong>File Attachments:</strong> Any type of file (documents, images, videos, archives, etc.)
              can be attached and will be encrypted before upload and decrypted client-side upon viewing.
            </li>
          </ul>
          <p className="text-lg text-muted-foreground">
            Remember, client-side encryption ensures that only the intended recipient with the full link
            (and passphrase, if applicable) can access the content. CipherOnce servers never see your
            data in plaintext.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">Important Considerations</h2>
          <ul className="list-disc list-inside text-lg text-muted-foreground space-y-2">
            <li>
              <strong>Copy the Entire Link:</strong> Always ensure the full URL, including the <code className="bg-muted px-1 rounded">#</code> fragment
              containing the encryption key, is copied and shared. Some applications may strip this part.
            </li>
            <li>
              <strong>Share Passphrases Separately:</strong> If you use a passphrase, convey it to the recipient
              through a different secure channel than the secret link.
            </li>
            <li>
              <strong>One-Time View:</strong> Once viewed, the secret is gone forever. Ensure the recipient is ready
              to consume the information.
            </li>
            <li>
              <strong>Browser Compatibility:</strong> While widely compatible, certain browser behaviors (especially on mobile)
              can affect file downloads. On iOS, downloads might open files in a new tab instead of prompting a save.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
