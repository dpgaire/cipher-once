import {  Repeat } from "lucide-react";
import { Metadata } from "next";

import { ContentPage,Section, Prose, BulletList, Callout, CtaButton } from "@/components/content-page-layout"


export const metadata: Metadata = {
  title: "One-Time Secret Alternative (Zero-Knowledge & Secure) | CipherOnce",
  description: "Looking for a safer OneTimeSecret alternative? CipherOnce uses true client-side encryption so even our servers can’t read your secrets.",
};

export const oneTimeSecretAlternativeMetadata: Metadata = {
  title: "One-Time Secret Alternative (Zero-Knowledge & Secure) | CipherOnce",
  description: "Looking for a safer OneTimeSecret alternative? CipherOnce uses true client-side encryption so even our servers can't read your secrets.",
}
 
export default function OneTimeSecretAlternativePage() {
  return (
    <ContentPage
      badge="vs. OneTimeSecret"
      icon={<Repeat className="h-7 w-7" />}
      iconColor="text-[#C9A84C]"
      iconBorder="border-[#C9A84C]/30"
      iconBg="bg-[#C9A84C]/10"
      iconGlow="shadow-[0_0_40px_rgba(201,168,76,0.15)]"
      title="A Safer One-Time Secret Alternative"
      lead="One-time secret sharing is a great idea. But most implementations leave a critical gap: your secret exists in plaintext on the provider's server, even briefly. CipherOnce closes that gap entirely through true zero-knowledge architecture."
    >
      <Section title="The Gap in Traditional One-Time Secret Services" borderColor="border-red-500/10">
        <Prose>
          <p>
            Services like OneTimeSecret popularized the concept of ephemeral sharing — send a secret, it's gone after viewing. For its time, this was a significant improvement over email. But it has a fundamental architectural limitation that many users don't realize.
          </p>
          <p>
            In most traditional implementations, you submit your plaintext to the service. The service then encrypts it — server-side, using a key the service controls. This means there is a window, however brief, where your unencrypted secret exists on someone else's infrastructure. And the encryption key is held by the provider.
          </p>
        </Prose>
        <div className="mt-5">
          <Callout color="amber">
            Server-side encryption with provider-held keys is not zero-knowledge. It is trust-based security.
          </Callout>
        </div>
      </Section>
 
      <Section title="What CipherOnce Does Differently" borderColor="border-[#C9A84C]/10">
        <BulletList items={[
          { label: "Browser-first encryption", desc: "Your secret is encrypted in your browser before submission. Our server receives only ciphertext — never plaintext, not even transiently." },
          { label: "Keys we never see", desc: "The AES-256 decryption key is embedded in the URL fragment (#). Browsers never transmit URL fragments to servers. We are structurally unable to access your key." },
          { label: "Verifiable open source", desc: "You don't have to trust our claims. Our encryption logic is open source — read it, audit it, fork it. Zero-knowledge by code, not by promise." },
          { label: "Breach-proof architecture", desc: "If our servers were compromised, attackers would find encrypted blobs without the keys needed to decrypt them. The data is useless without the URL." },
          { label: "No account required", desc: "Anonymous use is a first-class feature, not an afterthought. Sharing secrets should never require your identity." },
        ]} />
      </Section>
 
      <Section title="Side-by-Side Comparison" borderColor="border-white/5">
        <div className="overflow-hidden rounded-xl border border-white/5">
          <div className="grid grid-cols-3 border-b border-white/5 bg-white/[0.02] px-5 py-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#4a4a5a]">Feature</span>
            <span className="text-center text-[10px] font-bold uppercase tracking-wider text-[#4a4a5a]">Traditional</span>
            <span className="text-center text-[10px] font-bold uppercase tracking-wider text-[#C9A84C]">CipherOnce</span>
          </div>
          {[
            ["Encryption location", "Server-side", "Browser (client-side)"],
            ["Key storage", "Provider holds key", "Never stored server-side"],
            ["Plaintext on server", "Yes (briefly)", "Never"],
            ["Open source", "Usually not", "Yes"],
            ["Breach impact", "Secrets exposed", "Useless ciphertext only"],
            ["Account required", "Sometimes", "Never required"],
          ].map(([feature, traditional, cipher], i) => (
            <div key={feature} className={`grid grid-cols-3 px-5 py-3 ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
              <span className="text-xs text-[#8a8a9a]">{feature}</span>
              <span className="text-center text-xs text-red-400/70">{traditional}</span>
              <span className="text-center text-xs font-semibold text-emerald-400">{cipher}</span>
            </div>
          ))}
        </div>
      </Section>
 
      <CtaButton label="Try the Zero-Knowledge Alternative" />
    </ContentPage>
  )
}