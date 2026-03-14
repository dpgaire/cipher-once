// ─── ClientSideEncryptionPage ─────────────────────────────────────────────────
import { ContentPage,Section, Prose, StepList, BulletList, Callout, CtaButton } from "@/components/content-page-layout"
import { Lock } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Client-Side Encryption Explained | CipherOnce",
  description: "Learn how CipherOnce uses client-side encryption to provide zero-knowledge secret sharing. Your data is encrypted in your browser before it ever reaches our servers.",
}

export default function ClientSideEncryptionPage() {
  return (
    <ContentPage
      badge="Security Architecture"
      icon={<Lock className="h-7 w-7" />}
      title="Client-Side Encryption Explained"
      lead="At CipherOnce, encryption isn't a feature we added — it's the foundation we built on. Every secret is locked before it leaves your browser, using the same cryptographic primitives trusted by financial institutions worldwide."
    >
      <Section title="What Client-Side Encryption Actually Means" borderColor="border-[#C9A84C]/10">
        <Prose>
          <p>
            "Encryption" is one of the most overused and misrepresented words in tech. Many services claim to encrypt your data — but what they mean is that your data is encrypted in transit (HTTPS) or at rest on their servers using keys they control. That's not real privacy. If they have the key, they have your secret.
          </p>
          <p>
            Client-side encryption is fundamentally different. It means the encryption operation — turning your plaintext into unintelligible ciphertext — happens on your device, in your browser, before any data is transmitted. By the time your secret touches our network, it is already locked. We receive a ciphertext we cannot read and a storage task we can fulfill without knowing what we are storing.
          </p>
        </Prose>
        <div className="mt-5">
          <Callout color="gold">
            We don't encrypt your secrets — your browser does. We only store the result.
          </Callout>
        </div>
      </Section>

      <Section title="The Encryption Flow, Step by Step" borderColor="border-white/5">
        <StepList items={[
          { label: "You type your secret", desc: "Your plaintext exists only in your browser's memory. It is never logged, never buffered to disk by our code, and never sent anywhere in its readable form." },
          { label: "A unique key is generated", desc: "The browser's built-in Web Crypto API generates a cryptographically random AES-256-GCM key. This key is unique per secret — we never reuse keys." },
          { label: "Your secret is encrypted locally", desc: "Using that key and a random initialization vector (IV), your plaintext is transformed into ciphertext. Without the key and IV, the ciphertext is computationally indistinguishable from random noise." },
          { label: "Only ciphertext goes to our servers", desc: "The encrypted blob and the IV are transmitted to our servers for storage. The key stays in your browser, appended to the shareable link as the URL fragment (#key). Browsers never include the fragment in HTTP requests." },
          { label: "Your recipient opens the link", desc: "Their browser parses the URL fragment, extracts the key, fetches the ciphertext from our API, and decrypts it locally. Our server only sees a request for an encrypted record — never the key, never the plaintext." },
          { label: "After viewing, the record is deleted", desc: "Once the view limit is reached or the expiry passes, the encrypted record is permanently removed from our database. Nothing persists." },
        ]} />
      </Section>

      <Section title="Why This Matters More Than You Think" borderColor="border-white/5">
        <BulletList items={[
          { label: "Server breach resilience", desc: "If our database were stolen, attackers would find only encrypted blobs — useless without the keys, which we never store." },
          { label: "No insider threat", desc: "Our own engineers, DBAs, and infrastructure operators cannot read your secrets. It is architecturally impossible, not just policy-prohibited." },
          { label: "Legal immunity", desc: "Because we hold no decryption keys, no court order or government request can compel us to produce readable content — because we genuinely don't have it." },
          { label: "Trustless by design", desc: "You don't need to trust our promises. You can verify our open-source code and confirm that the encryption happens before data transmission." },
        ]} />
      </Section>

      <Section title="The Standard We Use: AES-256-GCM" borderColor="border-emerald-500/10">
        <Prose>
          <p>
            AES-256-GCM (Advanced Encryption Standard, 256-bit key, Galois/Counter Mode) is the encryption algorithm used by the U.S. government for top-secret classified information. It provides both confidentiality (your data cannot be read) and authenticity (tampered ciphertext is detectable). A 256-bit key has 2²⁵⁶ possible values — more than the number of atoms in the observable universe.
          </p>
          <p>
            We use the browser's native <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-xs text-[#C9A84C]">SubtleCrypto</code> API, which is implemented in hardware-accelerated native code — not JavaScript. This means the encryption is both maximally secure and practically instantaneous.
          </p>
        </Prose>
      </Section>

      <CtaButton label="Create an Encrypted Secret" />
    </ContentPage>
  )
}


