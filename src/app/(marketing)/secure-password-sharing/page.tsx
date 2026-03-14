import {  KeyRound } from 'lucide-react';
import { Metadata } from 'next';
import { ContentPage,Section, Prose, StepList, BulletList, CtaButton } from "@/components/content-page-layout"


export const metadata: Metadata = {
  title: "Secure Way to Share Passwords Online | CipherOnce",
  description: "Looking for a secure way to share passwords online? CipherOnce offers end-to-end encrypted, zero-knowledge secret sharing to protect sensitive credentials.",
};

export default function SecurePasswordSharingPage() {
  return (
    <ContentPage
      badge="Use Case · Passwords"
      icon={<KeyRound className="h-7 w-7" />}
      iconColor="text-[#C9A84C]"
      iconBorder="border-[#C9A84C]/30"
      iconBg="bg-[#C9A84C]/10"
      iconGlow="shadow-[0_0_40px_rgba(201,168,76,0.15)]"
      title="Securely Share Passwords Online"
      lead="Sharing passwords is often unavoidable — with a colleague, a freelancer, or a family member. The question is never whether to share, but how. Most methods leave a permanent, readable copy in a chat log, inbox, or server. CipherOnce doesn't."
    >
      <Section title="The Real Risks of How Most People Share Passwords" borderColor="border-red-500/10">
        <Prose>
          <p>
            A 2023 industry report found that over 47% of professionals share credentials via email or messaging apps at least once a week. Every one of those messages is a potential liability — stored indefinitely, indexed by email providers, accessible in chat history archives, and potentially visible to IT administrators.
          </p>
          <p>
            The danger isn't just interception in transit. It's the persistence of the message itself. A password shared in Slack in 2021 is still sitting in that channel today, searchable, readable, and waiting to be discovered if that workspace is ever breached or subpoenaed.
          </p>
        </Prose>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            { method: "Email", risk: "Archived indefinitely. Accessible by IT and email providers. Exposed in breaches." },
            { method: "Slack / Teams", risk: "Logged in workspace history. Admin-visible. Retained by the platform." },
            { method: "SMS", risk: "Carrier-stored. Unencrypted on most networks. Accessible via SIM swap." },
            { method: "Shared docs", risk: "Version-controlled. Shared access means shared exposure. Rarely deleted." },
          ].map(({ method, risk }) => (
            <div key={method} className="rounded-xl border border-red-500/10 bg-red-500/[0.03] p-4">
              <p className="mb-1 text-xs font-bold text-red-400">{method}</p>
              <p className="text-xs leading-relaxed text-[#6a6a7a]">{risk}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="The CipherOnce Approach to Password Sharing" borderColor="border-[#C9A84C]/10">
        <StepList items={[
          { label: "Paste your password", desc: "Type or paste the credential into CipherOnce. It is encrypted immediately in your browser using AES-256-GCM before anything is transmitted." },
          { label: "Configure access rules", desc: "Set a view limit (e.g., 1 view), an expiry (e.g., 1 hour), and optionally add a secondary passphrase that the recipient must know to decrypt." },
          { label: "Share the link", desc: "Copy the generated link and send it through any channel — email, Slack, or SMS. The link contains the decryption key in the URL fragment, which is never logged by our servers." },
          { label: "Recipient views and the secret self-destructs", desc: "The moment the link is opened and the secret viewed, it is permanently deleted from our database. The chat log now contains a dead link, not a live credential." },
        ]} />
      </Section>

      <Section title="Additional Security Features for Credentials" borderColor="border-white/5">
        <BulletList items={[
          { label: "Dual-factor access", desc: "Combine the link (something they have) with a passphrase (something they know) for two-factor access control on a single secret." },
          { label: "View count limits", desc: "Restrict access to exactly one view. The moment your intended recipient opens the link, it is burned. If they haven't opened it yet and the link is accessed, you know it was intercepted." },
          { label: "Expiry enforcement", desc: "Set a maximum window of validity. Credentials shared for temporary access can have a 1-hour or 1-day expiry, ensuring the link becomes worthless after the access window closes." },
          { label: "Authentication walls", desc: "For internal team use, require that the recipient be a registered CipherOnce user — adding an identity layer to the access control." },
        ]} />
      </Section>

      <Section title="Common Password Sharing Scenarios" borderColor="border-white/5">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { title: "Onboarding a contractor", desc: "Share temporary credentials that expire after 24 hours and can only be viewed once. Confirm receipt before expiry." },
            { title: "Wi-Fi guest access", desc: "Share a network password without exposing it in a chat thread that guests or others may see later." },
            { title: "License & activation keys", desc: "Send software keys that self-destruct after delivery — no more keys lingering in email threads." },
            { title: "Emergency access", desc: "Share a master password or recovery code with a trusted person, with a configured expiry and view limit." },
          ].map(({ title, desc }) => (
            <div key={title} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <p className="mb-1.5 text-xs font-bold text-white">{title}</p>
              <p className="text-xs leading-relaxed text-[#6a6a7a]">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaButton label="Share a Password Securely" />
    </ContentPage>
  )
}