import { Flame } from "lucide-react";
import { Metadata } from "next";
import { ContentPage,Section, Prose, BulletList,Callout, CtaButton } from "@/components/content-page-layout"


export const selfDestructingMessagesMetadata: Metadata = {
  title: "Self-Destructing Messages (Zero-Knowledge) | CipherOnce",
  description: "Send self-destructing messages with CipherOnce's zero-knowledge encryption. Ensure your sensitive communications vanish after being read.",
}
 
export default function SelfDestructingMessagesPage() {
  return (
    <ContentPage
      badge="Use Case · Ephemeral Messaging"
      icon={<Flame className="h-7 w-7" />}
      iconColor="text-red-400"
      iconBorder="border-red-500/25"
      iconBg="bg-red-500/10"
      iconGlow="shadow-[0_0_40px_rgba(239,68,68,0.12)]"
      glowColor="#ef4444"
      title="Self-Destructing Messages with Real Privacy"
      lead="Disappearing messages are only as good as the architecture behind them. Many apps offer a 'disappearing' toggle — but the messages pass through servers unencrypted before they're 'deleted.' CipherOnce's approach is fundamentally different."
    >
      <Section title="What Makes a Message Truly Self-Destruct?" borderColor="border-red-500/10">
        <Prose>
          <p>
            Most disappearing message features work like this: the message is sent to a server, delivered to the recipient, and then the server deletes the record after the set time. The problem? That message existed in plaintext on the server. Deletion is administrative — not cryptographic.
          </p>
          <p>
            True self-destruction means the content was never accessible to the platform in the first place. When CipherOnce "deletes" a secret, we're removing encrypted ciphertext that we could never decrypt anyway. The meaningful deletion happened conceptually when the key was embedded in the URL instead of stored on our server.
          </p>
        </Prose>
        <div className="mt-5">
          <Callout color="red">
            "Deleting" a message we could read is a favor. Deleting a message we never could read is a guarantee.
          </Callout>
        </div>
      </Section>
 
      <Section title="How CipherOnce Achieves True Ephemerality" borderColor="border-white/5">
        <BulletList items={[
          { label: "Encrypted before transmission", desc: "Your message is locked in your browser using AES-256-GCM. The server receives ciphertext — data that looks like random noise without the key." },
          { label: "Key never stored", desc: "The decryption key is only in the URL fragment. It's in your recipient's browser when they open the link. It has never been on our server." },
          { label: "Burned on access", desc: "The moment the view limit is reached, the encrypted record is permanently deleted from our database with no soft-delete, no archive, and no recovery." },
          { label: "Time-bound expiry", desc: "Even if the link is never opened, the secret expires on schedule. No secret persists indefinitely." },
          { label: "Configurable destruction", desc: "You control whether destruction triggers after 1 view, 5 views, 1 hour, or 30 days. The destruction logic is deterministic and enforced server-side." },
        ]} />
      </Section>
 
      <Section title="Self-Destructing Messages in Practice" borderColor="border-white/5">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { title: "Legal & compliance teams", desc: "Share privileged information that must not persist in email archives or discovery processes." },
            { title: "Temporary access codes", desc: "Share 2FA backup codes, one-time PINs, or session tokens that should expire immediately after use." },
            { title: "Sensitive HR communications", desc: "Share performance feedback, compensation details, or personal information without creating a paper trail in chat apps." },
            { title: "Security incident response", desc: "Coordinate incident response credentials and access information with a guaranteed expiry, limiting exposure windows." },
          ].map(({ title, desc }) => (
            <div key={title} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <p className="mb-1.5 text-xs font-bold text-white">{title}</p>
              <p className="text-xs leading-relaxed text-[#6a6a7a]">{desc}</p>
            </div>
          ))}
        </div>
      </Section>
 
      <Section title="The Limits of Self-Destruction (Honest Disclosure)" borderColor="border-amber-500/10">
        <Prose>
          <p>
            We believe in honest security. Self-destructing messages cannot prevent a recipient from copying text or taking a screenshot before the view window closes. What we can do — and do — is minimize the exposure window dramatically, ensure the content never persists on our infrastructure, and make the link useless the moment the view limit is reached.
          </p>
          <p>
            The goal is to reduce your attack surface. You cannot control what a recipient does with information they have received — but you can ensure the information doesn't linger in systems you don't control after delivery is complete.
          </p>
        </Prose>
      </Section>
 
      <CtaButton label="Create a Self-Destructing Message" />
    </ContentPage>
  )
}
