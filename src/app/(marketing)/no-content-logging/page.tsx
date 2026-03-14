import { EyeOff } from "lucide-react"
import { ContentPage,Section, Prose, StepList, BulletList, Callout, CtaButton } from "@/components/content-page-layout"
import { Metadata } from "next"

 
export const noContentLoggingMetadata: Metadata = {
  title: "No Content Logging Policy | CipherOnce",
  description: "Your privacy is paramount. CipherOnce operates on a strict no-content-logging policy, ensuring your shared secrets are never stored or seen by us.",
}
 
export default function NoContentLoggingPage() {
  return (
    <ContentPage
      badge="Privacy Policy"
      icon={<EyeOff className="h-7 w-7" />}
      iconColor="text-purple-400"
      iconBorder="border-purple-500/30"
      iconBg="bg-purple-500/10"
      iconGlow="shadow-[0_0_40px_rgba(168,85,247,0.12)]"
      glowColor="#a855f7"
      title="We Cannot See Your Secrets"
      lead="Most services say they protect your privacy. CipherOnce is built so that protecting your privacy isn't a choice we make — it's a constraint we can't override. Here's exactly what we log, what we don't, and why that matters."
    >
      <Section title="What 'No Content Logging' Actually Means" borderColor="border-purple-500/10">
        <Prose>
          <p>
            "We don't log your data" is a promise that requires trust. Our approach is different: we have designed our system so that logging your secret content is technically impossible, not merely against policy.
          </p>
          <p>
            By the time your secret reaches our servers, it has already been encrypted by your browser. We receive a string of bytes that looks like random data. We don't have the decryption key. We cannot log what we cannot read.
          </p>
        </Prose>
        <div className="mt-5">
          <Callout color="gold">
            We don't choose not to log your secrets. We architecturally cannot.
          </Callout>
        </div>
      </Section>
 
      <Section title="What We Store vs. What We Don't" borderColor="border-white/5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-emerald-400">We store (encrypted only)</p>
            <ul className="space-y-2 text-xs text-[#8a8a9a]">
              {["Encrypted ciphertext blob", "Random initialization vector", "Expiry timestamp", "View counter (integer)", "Optional: file MIME type"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <div className="h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-red-500/15 bg-red-500/[0.04] p-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-red-400">We never store</p>
            <ul className="space-y-2 text-xs text-[#8a8a9a]">
              {["Decryption keys (ever)", "Plaintext secret content", "Your identity (no account required)", "Analytics tied to content", "Backups of deleted secrets"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <div className="h-1 w-1 shrink-0 rounded-full bg-red-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
 
      <Section title="Why This Protects You in the Real World" borderColor="border-white/5">
        <BulletList items={[
          { label: "Data breach immunity", desc: "Attackers who compromise our database find only AES-256 ciphertext. Without the keys — which we don't store — it is cryptographically worthless." },
          { label: "Legal request resistance", desc: "We cannot be compelled to produce content we do not possess. A subpoena or court order requesting 'the plaintext of secret X' simply cannot be fulfilled." },
          { label: "No advertising surface", desc: "We have zero insight into what you are sharing. We could not build an advertising profile of your usage if we tried." },
          { label: "Ephemeral by default", desc: "All secrets have a hard expiry. After that point, even the encrypted record is permanently deleted — not soft-deleted, not archived." },
        ]} />
      </Section>
 
      <CtaButton label="Create a Private Secret" />
    </ContentPage>
  )
}
 