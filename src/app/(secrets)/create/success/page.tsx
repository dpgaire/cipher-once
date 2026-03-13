"use client";

import { useEffect, useState, Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  CheckCircle2, AlertTriangle, Share2, Send, Copy,
  Check, QrCode, ArrowRight, LayoutDashboard, Plus, Shield,
} from "lucide-react";
import { CopyButton } from "../../s/[shortId]/_components/copy-button";
import { QRCodeDisplay } from "@/app/dashboard/_components/qr-code-display";
import { encrypt, exportKey, generateKey } from "../../s/[shortId]/_services/encryption";
import { SocialShareButtons } from "@/app/dashboard/_components/social-share-buttons";

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
  const [showQrCode, setShowQrCode] = useState(false);
  const supabase = createClient();

  useEffect(() => { setOrigin(window.location.origin); }, []);
  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => { setUser(data.user); setLoading(false); });
  }, []);

  const secretUrl = useMemo(() => {
    if (!origin || !shortId || !key) return "";
    return `${origin}/s/${shortId}#${key}`;
  }, [origin, shortId, key]);

  const handleGoToDashboard = () => { router.refresh(); router.push("/dashboard"); };

  const handleSendToInbox = async () => {
    if (!recipientEmail) { toast.error("Please enter a recipient's email address."); return; }
    setIsSending(true);
    const { data: { user: senderUser } } = await supabase.auth.getUser();
    if (!senderUser) { toast.error("You must be logged in to send a message to an inbox."); setIsSending(false); return; }
    try {
      const { data: recipientId, error: rpcError } = await supabase.rpc("get_user_id_by_email", { p_email: recipientEmail });
      if (rpcError || !recipientId) { toast.error("User with that email not found. You can only send secrets to registered users."); return; }
      const messageContent = `Someone has shared a secret with you. Open it before it's gone: ${secretUrl}`;
      const inboxMessageKey = await generateKey();
      const { ciphertext, iv } = await encrypt(messageContent, inboxMessageKey);
      const exportedKey = await exportKey(inboxMessageKey);
      const { error: insertError } = await supabase.from("inbox_messages").insert({
        sender_id: senderUser.id, recipient_id: recipientId,
        message: ciphertext, message_encryption_iv: iv, link: exportedKey,
      });
      if (insertError) throw insertError;
      toast.success("Secret sent to the user's inbox!");
      setRecipientEmail("");
    } catch (error: any) {
      toast.error("Failed to send secret. Please try again.");
    } finally { setIsSending(false); }
  };

  if (!shortId || !key) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] p-6">
        <div className="w-full max-w-md rounded-2xl border border-red-500/15 bg-white/[0.02] p-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
            <AlertTriangle className="h-6 w-6 text-red-400" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Invalid Link</h2>
          <p className="mb-6 text-sm text-[#6a6a7a]">The secret link could not be generated. Please try again.</p>
          <Link href="/create">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#C9A84C] py-3 text-sm font-bold text-[#0a0a0f]">
              Try Again <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (!secretUrl) return null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0f]">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="container relative mx-auto max-w-2xl px-4 py-16">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-xl" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
              <CheckCircle2 className="h-7 w-7 text-emerald-400" />
            </div>
          </div>
          <h1 className="mb-2 text-4xl font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Secret Created
          </h1>
          <p className="text-sm text-[#6a6a7a]">Encrypted and ready to share — handle with care</p>
        </div>

        {/* Secret Link card */}
        <div className="mb-4 rounded-2xl border border-white/5 bg-white/[0.02] p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#C9A84C]/20 bg-[#C9A84C]/10">
              <Share2 className="h-4 w-4 text-[#C9A84C]" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Your Secret Link</p>
              <p className="text-xs text-[#4a4a5a]">Share this link — it can only be used once</p>
            </div>
          </div>

          {/* URL display */}
          <div className="mb-4 rounded-lg border border-white/5 bg-[#0d0d14] px-4 py-3">
            <code className="break-all font-mono text-xs text-[#8a8a9a]">{secretUrl}</code>
          </div>

          <CopyButton text={secretUrl} label="Copy Secret Link" className="w-full" />

          {/* QR Code */}
          <div className="mt-4 space-y-3">
            <button
              onClick={() => setShowQrCode(!showQrCode)}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] py-2.5 text-xs font-semibold text-[#6a6a7a] transition-all hover:border-white/10 hover:text-white"
            >
              <QrCode className="h-3.5 w-3.5" />
              {showQrCode ? "Hide QR Code" : "Show QR Code"}
            </button>
            {showQrCode && (
              <div className="flex justify-center rounded-xl border border-white/5 bg-white p-4">
                <QRCodeDisplay value={secretUrl} size={180} />
              </div>
            )}
          </div>

          {/* Send to inbox */}
          {user && (
            <div className="mt-6 space-y-2 border-t border-white/5 pt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#6a6a7a]">Send to App Inbox</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Registered user's email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  disabled={isSending}
                  className="flex-1 rounded-lg border border-white/5 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-[#4a4a5a] outline-none transition-all focus:border-[#C9A84C]/40 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)]"
                />
                <button
                  onClick={handleSendToInbox}
                  disabled={isSending || !recipientEmail}
                  className="flex items-center gap-2 rounded-lg bg-[#C9A84C] px-4 py-2.5 text-sm font-bold text-[#0a0a0f] transition-all hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] disabled:opacity-40"
                >
                  <Send className="h-3.5 w-3.5" />
                  {isSending ? "..." : "Send"}
                </button>
              </div>
              <p className="text-[10px] text-[#4a4a5a]">The secret will be sent if they are registered.</p>
            </div>
          )}

          {/* Social share */}
          <div className="mt-6 border-t border-white/5 pt-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#6a6a7a]">Share externally</p>
            <SocialShareButtons
              secretUrl={secretUrl}
              title="CipherOnce - One-Time Secret"
              text="I'm sharing a self-destructing secret with you via CipherOnce. View it before it's gone!"
            />
          </div>
        </div>

        {/* Warning */}
        <div className="mb-6 flex items-start gap-4 rounded-xl border border-amber-500/15 bg-amber-500/[0.04] px-5 py-4">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
          <div className="space-y-1 text-xs text-[#8a8a9a]">
            <p className="font-bold text-amber-400">Save this link now — you won't see it again</p>
            <p>The secret is permanently deleted after viewing or expiration.</p>
            <p>The encryption key is in the URL fragment and never sent to our servers.</p>
          </div>
        </div>

        {/* Actions */}
        {!loading && (
          <div className="flex flex-col gap-3 sm:flex-row">
            {user ? (
              <button onClick={handleGoToDashboard} className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white transition-all hover:border-white/20 hover:bg-white/10">
                <LayoutDashboard className="h-4 w-4" />
                View Dashboard
              </button>
            ) : (
              <Link href="/" className="flex-1">
                <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white transition-all hover:border-white/20 hover:bg-white/10">
                  Back to Home
                </button>
              </Link>
            )}
            <Link href="/create" className="flex-1">
              <button className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#C9A84C] py-3 text-sm font-bold text-[#0a0a0f] transition-all hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]">
                <Plus className="h-4 w-4" />
                Create Another Secret
              </button>
            </Link>
          </div>
        )}
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