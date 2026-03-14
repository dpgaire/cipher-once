import { ShieldCheck } from "lucide-react";
import { Metadata } from "next";
import { ContentPage,Section, Prose, BulletList,Callout, CtaButton } from "@/components/content-page-layout"


export const zeroKnowledgeMetadata: Metadata = {
  title: "Zero-Knowledge Secret Sharing | CipherOnce",
  description: "Learn about CipherOnce's true zero-knowledge secret sharing for ultimate privacy and security. Our servers never see your sensitive data.",
}
 
export default function ZeroKnowledgeSecretSharingPage() {
  return (
    <ContentPage
      badge="Architecture · Deep Dive"
      icon={<ShieldCheck className="h-7 w-7" />}
      iconColor="text-emerald-400"
      iconBorder="border-emerald-500/25"
      iconBg="bg-emerald-500/10"
      iconGlow="shadow-[0_0_40px_rgba(16,185,129,0.12)]"
      glowColor="#10b981"
      title="True Zero-Knowledge Architecture"
      lead="Zero-knowledge is the gold standard of privacy architecture. It means a service provider can process and store your data without ever being able to read it. Here's exactly how CipherOnce achieves this — and how you can verify it."
    >
      <Section title="Zero-Knowledge: Definition and Common Misconceptions" borderColor="border-emerald-500/10">
        <Prose>
          <p>
            The term "zero-knowledge" is frequently misused in marketing. A service that encrypts your data on their server using their own keys is not zero-knowledge — it's standard encryption with a trusted intermediary. True zero-knowledge means the service has no mathematical capability to decrypt your data, regardless of intent.
          </p>
          <p>
            CipherOnce achieves this through a simple but powerful architectural principle: the encryption key is never transmitted to our servers. It is generated client-side, used client-side, and shared exclusively via the URL fragment — a component of URLs that browsers exclude from HTTP requests by specification.
          </p>
        </Prose>
        <div className="mt-5">
          <Callout color="emerald">
            Zero-knowledge is not a feature. It is an architectural constraint that makes reading your data impossible, not just against policy.
          </Callout>
        </div>
      </Section>
 
      <Section title="The Technical Architecture" borderColor="border-white/5">
        <div className="space-y-3">
          {[
            { step: "01", label: "Key Generation", desc: "window.crypto.subtle.generateKey() produces a 256-bit AES-GCM key. This operation is local, hardware-accelerated, and produces cryptographically random output." },
            { step: "02", label: "Encryption", desc: "window.crypto.subtle.encrypt() transforms your plaintext into ciphertext using the generated key and a random IV. The operation is performed entirely within the browser sandbox." },
            { step: "03", label: "Key Export & URL Embedding", desc: "The key is exported as a base64 string and appended to the share URL as the fragment (#key). The fragment is never included in HTTP requests to our servers — this is RFC 3986 specification behavior, not a feature we implement." },
            { step: "04", label: "Server Storage", desc: "Our server stores: (a) the ciphertext, (b) the IV, (c) the expiry, (d) the view counter. No key. No plaintext. No user identity required." },
            { step: "05", label: "Decryption", desc: "The recipient's browser parses the URL fragment, fetches the ciphertext from our API, and calls window.crypto.subtle.decrypt(). The server processes a fetch request and returns encrypted bytes — it has no visibility into the key or plaintext." },
          ].map(({ step, label, desc }) => (
            <div key={step} className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 font-mono text-xs font-bold text-emerald-400">{step}</span>
              <div>
                <p className="mb-1 text-xs font-bold text-white">{label}</p>
                <p className="text-xs leading-relaxed text-[#6a6a7a]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
 
      <Section title="What This Means in Practice" borderColor="border-white/5">
        <BulletList items={[
          { label: "We cannot be compelled", desc: "Law enforcement requests, court orders, and government demands for your secret content cannot be fulfilled — because we do not possess decryptable data. This is structural, not a policy we can be pressured to override." },
          { label: "Breaches become near-worthless", desc: "A successful database breach yields ciphertext encrypted with keys we don't have. The stolen data has no value to an attacker without the URLs, which were shared privately between sender and recipient." },
          { label: "Insider threats are neutralized", desc: "No CipherOnce employee, engineer, or DBA can access your secrets. The data we store is mathematically indecipherable without keys we never possessed." },
          { label: "Verifiable, not trustable", desc: "Our encryption implementation is open source. You can read the exact code that runs in your browser, confirm that keys are generated locally, and verify that only ciphertext is transmitted. Trust through transparency." },
        ]} />
      </Section>
 
      <Section title="Verify It Yourself" borderColor="border-white/5">
        <Prose>
          <p>
            Open your browser's developer tools and navigate to the Network tab. Create a secret on CipherOnce. Examine every network request made during the creation process. You will observe that the request payload contains an encrypted blob — not your plaintext. You will observe that the URL fragment is never transmitted. You will find no outbound request containing your decryption key.
          </p>
          <p>
            This is the difference between a privacy promise and privacy architecture: one requires trust, the other requires only verification.
          </p>
        </Prose>
        <div className="mt-5">
          <div className="rounded-xl border border-white/5 bg-[#0d0d14] p-4">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#4a4a5a]">What you'll see in DevTools network tab</p>
            <pre className="overflow-x-auto text-xs text-[#C9A84C]">{`POST /api/secrets
Body: { "ciphertext": "U2FsdGVkX1...", "iv": "aGVsbG8...", "expires_at": "..." }
# ← Key never appears in any request`}</pre>
          </div>
        </div>
      </Section>
 
      <CtaButton label="Create a Zero-Knowledge Secret" />
    </ContentPage>
  )
}
