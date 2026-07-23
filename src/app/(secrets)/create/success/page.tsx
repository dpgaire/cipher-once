"use client";

import { useEffect, useState, Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  CheckCircle2, AlertTriangle, Share2, Send, Copy,
  Check, QrCode, ArrowRight, LayoutDashboard, Plus,
  Clock, Eye, Lock, UserCheck, Code, Shield, Sparkles,
} from "lucide-react";
import { QRCodeDisplay } from "@/app/dashboard/_components/qr-code-display";
import { SocialShareButtons } from "@/app/dashboard/_components/social-share-buttons";
import { encrypt, exportKey, generateKey } from "../../s/[shortId]/_services/encryption";
import { SecretJourneyBanner } from "../../_components/secret-journey-banner";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shortId = searchParams.get("id");
  const key = searchParams.get("key");

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [origin, setOrigin] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const supabase = createClient();

  useEffect(() => { setOrigin(window.location.origin); }, []);
  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => { setUser(data.user); setLoading(false); });
  }, []);

  const secretUrl = useMemo(() => {
    if (!origin || !shortId || !key) return "";
    return `${origin}/s/${shortId}#${key}`;
  }, [origin, shortId, key]);

  const markdownLink = useMemo(() => {
    if (!secretUrl) return "";
    return `[🔐 View encrypted secret](${secretUrl})`;
  }, [secretUrl]);

  const slackLink = useMemo(() => {
    if (!secretUrl) return "";
    return `<${secretUrl}|🔐 Encrypted Secret - CipherOnce>`;
  }, [secretUrl]);

  const discordLink = useMemo(() => {
    if (!secretUrl) return "";
    return `🔐 **Encrypted Secret**\n${secretUrl}`;
  }, [secretUrl]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(secretUrl);
      setCopiedLink(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleCopyFormat = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleGoToDashboard = () => { router.refresh(); router.push("/dashboard"); };

  const handleSendToInbox = async () => {
    if (!recipientEmail) { toast.error("Please enter a recipient's email address."); return; }
    setIsSending(true);
    const { data: { user: senderUser } } = await supabase.auth.getUser();
    if (!senderUser) { toast.error("You must be logged in."); setIsSending(false); return; }
    try {
      const { data: recipientId, error: rpcError } = await supabase.rpc("get_user_id_by_email", { p_email: recipientEmail });
      if (rpcError || !recipientId) { toast.error("User not found."); return; }
      const messageContent = `Someone has shared a secret with you. Open it before it's gone: ${secretUrl}`;
      const inboxMessageKey = await generateKey();
      const { ciphertext, iv } = await encrypt(messageContent, inboxMessageKey);
      const exportedKey = await exportKey(inboxMessageKey);
      const { error: insertError } = await supabase.from("inbox_messages").insert({
        sender_id: senderUser.id, recipient_id: recipientId,
        message: ciphertext, message_encryption_iv: iv, link: exportedKey,
      });
      if (insertError) throw insertError;
      toast.success("Secret sent to inbox!");
      setRecipientEmail("");
    } catch {
      toast.error("Failed to send.");
    } finally { setIsSending(false); }
  };

  if (!shortId || !key) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] p-6">
        <div className="w-full max-w-md rounded-2xl border border-red-500/15 bg-white/[0.02] p-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
            <AlertTriangle className="h-6 w-6 text-red-400" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Link Error
          </h2>
          <p className="mb-6 text-sm text-[#6a6a7a]">Could not generate the secret link. Please try again.</p>
          <Link href="/create">
            <button className="w-full rounded-xl bg-[#C9A84C] py-3 text-sm font-bold text-[#0a0a0f]">
              Try Again <ArrowRight className="inline h-4 w-4 ml-1" />
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (!secretUrl) return null;

  return (
    <div className="relative min-h-dvh bg-[#0a0a0f]">
      <div className="pointer-events-none fixed left-1/2 top-0 h-[600px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[120px]" />

      <div className="relative mx-auto flex min-h-dvh max-w-6xl flex-col px-4 py-8 lg:py-10">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="relative mx-auto mb-3 inline-flex">
            <div className="absolute inset-0 rounded-xl bg-emerald-500/20 blur-xl animate-pulse" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/15 to-transparent">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
          <h1 className="mb-1 text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Secret Created
          </h1>
          <p className="text-sm text-[#6a6a7a]">
            Encrypted in your browser. Ready to share. Deleted after viewing.
          </p>
        </div>

        {/* Journey Banner */}
        <div className="mx-auto mb-6 w-full max-w-xl">
          <div className="rounded-lg border border-white/[0.04] bg-white/[0.02] px-4 py-2">
            <SecretJourneyBanner currentStep="upload" completedSteps={["create", "encrypt"]} compact />
          </div>
        </div>

        {/* Split layout */}
        <div className="flex flex-1 flex-col gap-6 lg:flex-row lg:items-start">
          {/* Left: Details */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Props grid */}
            <div className="rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#4a4a5a]">Expires</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{searchParams.get("expires") || "24 hours"}</p>
                </div>
                <div className="rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#4a4a5a]">Views</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{searchParams.get("views") || "1"}</p>
                </div>
                <div className="rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#4a4a5a]">Password</p>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    {searchParams.get("hasPassword") === "true" ? "Protected" : "None"}
                  </p>
                </div>
                <div className="rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#4a4a5a]">Auth</p>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    {searchParams.get("requireAuth") === "true" ? "Required" : "Optional"}
                  </p>
                </div>
              </div>
            </div>

            {/* Link card */}
            <div className="rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#C9A84C]/15 bg-[#C9A84C]/5">
                  <Share2 className="h-4 w-4 text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Share this link</p>
                  <p className="text-xs text-[#4a4a5a]">Deleted after its first view</p>
                </div>
              </div>

              <div className="mb-4 rounded-lg border border-white/[0.04] bg-[#0d0d14] px-4 py-3">
                <code className="break-all font-mono text-xs text-[#8a8a9a]">{secretUrl}</code>
              </div>

              <button
                onClick={handleCopyLink}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#C9A84C] py-3 text-sm font-bold text-[#0a0a0f] transition-all hover:shadow-[0_0_20px_rgba(201,168,76,0.25)]"
              >
                {copiedLink ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copiedLink ? "Copied!" : "Copy Secret Link"}
              </button>

              <div className="mt-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#4a4a5a]">Copy as formatted link</p>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => handleCopyFormat(markdownLink, "Markdown")}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs font-medium text-[#6a6a7a] transition-all hover:text-white hover:border-white/[0.12]">
                    <Code className="h-3 w-3" /> Markdown
                  </button>
                  <button onClick={() => handleCopyFormat(slackLink, "Slack")}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs font-medium text-[#6a6a7a] transition-all hover:text-white hover:border-white/[0.12]">
                    Slack
                  </button>
                  <button onClick={() => handleCopyFormat(discordLink, "Discord")}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs font-medium text-[#6a6a7a] transition-all hover:text-white hover:border-white/[0.12]">
                    Discord
                  </button>
                </div>
              </div>

              {user && (
                <div className="mt-4 space-y-3 border-t border-white/[0.06] pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#4a4a5a]">Send to app inbox</p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Recipient email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      disabled={isSending}
                      className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-[#4a4a5a] outline-none transition-all focus:border-[#C9A84C]/30"
                    />
                    <button
                      onClick={handleSendToInbox}
                      disabled={isSending || !recipientEmail}
                      className="flex items-center gap-2 rounded-lg bg-[#C9A84C] px-5 py-3 text-sm font-bold text-[#0a0a0f] transition-all hover:shadow-[0_0_20px_rgba(201,168,76,0.25)] disabled:opacity-40"
                    >
                      <Send className="h-4 w-4" />
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>

            {!loading && (
              <div className="flex gap-3">
                {user ? (
                  <button onClick={handleGoToDashboard}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] py-3 text-sm font-semibold text-white transition-all hover:bg-white/[0.04]">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </button>
                ) : (
                  <Link href="/" className="flex-1">
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] py-3 text-sm font-semibold text-white transition-all hover:bg-white/[0.04]">
                      Home
                    </button>
                  </Link>
                )}
                <Link href="/create" className="flex-1">
                  <button className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#C9A84C] py-3 text-sm font-bold text-[#0a0a0f] transition-all hover:shadow-[0_0_20px_rgba(201,168,76,0.25)]">
                    <Plus className="h-4 w-4" />
                    Create Another
                  </button>
                </Link>
              </div>
            )}

            <div className="flex items-start gap-3 rounded-lg border border-amber-500/10 bg-amber-500/[0.03] px-5 py-4">
              <Shield className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <div className="space-y-1 text-xs text-[#8a8a9a]">
                <p className="font-semibold text-amber-400">Save this link now</p>
                <p>The encryption key is in the URL fragment and is never stored on our servers.</p>
                <p>If you lose the link, the secret cannot be recovered.</p>
              </div>
            </div>
          </div>

          {/* Right: QR + Share */}
          <div className="w-full lg:w-[340px] xl:w-[360px] shrink-0 space-y-4">
            <div className="rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#C9A84C]/15 bg-[#C9A84C]/5">
                  <QrCode className="h-4 w-4 text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">QR Code</p>
                  <p className="text-xs text-[#4a4a5a]">Scan to access on any device</p>
                </div>
              </div>
              <div className="flex justify-center rounded-lg border border-white/[0.04] bg-white p-4">
                <QRCodeDisplay value={secretUrl} size={160} />
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-5">
              <SocialShareButtons
                secretUrl={secretUrl}
                title="CipherOnce - One-Time Secret"
                text="I'm sharing a one-time secret with you via CipherOnce."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f]">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-[#C9A84C]" />
          <p className="text-sm text-[#6a6a7a]">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
