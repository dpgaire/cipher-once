"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import {
  AlertCircle, CheckCircle2, Eye, EyeOff, Flame, Lock, Shield,
  AlertTriangle, Loader2, Download, FileIcon, ArrowRight, Maximize2, Minimize2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/client";
import {
  decrypt, decryptFile, importKey, hashPassphrase,
  deriveKeyFromPassphrase, bufferToBase64,
} from "../_services/encryption";
import type { Secret } from "../_types";
import { MediaSkeleton } from "@/components/core";
import { getFileCategory } from "@/lib/utils";
import { SecurityInformationPanel } from "./security-information-panel";
import { SecureCopyButton } from "./secure-copy-button";
import { DestroyConfirmation } from "./destroy-confirmation";
import { useScreenBlur } from "../_hooks/use-screen-blur";
import { useIdleProtection } from "../_hooks/use-idle-protection";
import { SecretJourneyBanner } from "../../../_components/secret-journey-banner";

const ImageCanvasPreview = dynamic(() => import("@/components/core/ImageCanvasPreview"), {
  ssr: false, loading: () => <MediaSkeleton className="h-40 w-full" />,
});
const PdfCanvasPreview = dynamic(() => import("@/components/core/PdfCanvasPreview"), {
  ssr: false, loading: () => <MediaSkeleton className="h-40 w-full" />,
});

function PageShell({ glowColor = "#C9A84C", children }: { glowColor?: string; children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh bg-[#0a0a0f] px-4 py-4 sm:py-6 lg:py-8">
      <div className="pointer-events-none fixed left-1/2 top-0 h-[500px] w-[600px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: `${glowColor}0D` }} />
      <div className="container relative mx-auto max-w-6xl">{children}</div>
    </div>
  );
}

export function ViewSecretPage() {
  const params = useParams();
  const shortId = params.shortId as string;

  const [secret, setSecret] = useState<Secret | null>(null);
  const [decryptedContent, setDecryptedContent] = useState<string | null>(null);
  const [passphrase, setPassphrase] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasViewed, setHasViewed] = useState(false);
  const [missingKey, setMissingKey] = useState(false);
  const [decryptedFileUrl, setDecryptedFileUrl] = useState<string | null>(null);
  const [hasConfirmedDestroy, setHasConfirmedDestroy] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const autoHideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { isBlurred } = useScreenBlur({ enabled: hasViewed, onBlur: () => setShowContent(false) });
  const { isIdle } = useIdleProtection({ enabled: hasViewed, idleTimeout: 60000, onIdle: () => setShowContent(false) });

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const h = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", h);
    return () => document.removeEventListener("fullscreenchange", h);
  }, []);

  useEffect(() => {
    if (showContent && hasViewed) {
      if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);
      autoHideTimerRef.current = setTimeout(() => setShowContent(false), 15000);
    }
    return () => { if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current); };
  }, [showContent, hasViewed]);

  const handleRevealContent = useCallback(() => setShowContent(true), []);

  const logAccess = async (id: string, status: string, msg?: string, meta?: any) => {
    try { await fetch("/api/log-access", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ secret_id: id, status, error_message: msg, metadata: meta }) }); } catch {}
  };

  useEffect(() => {
    const check = async () => {
      if (!window.location.hash.substring(1) && !secret?.passphrase_hash) {
        setMissingKey(true);
        setError("Encryption key is missing from the URL");
        setIsLoading(false);
        await logAccess(shortId, "failure", "Missing encryption key");
      }
    };
    if (!secret || (!secret.passphrase_hash && !window.location.hash.substring(1))) check();
  }, [secret, shortId]);

  const fetchSecret = async () => {
    try {
      await logAccess(shortId, "attempt");
      const supabase = createClient();
      const { data, error: fe } = await supabase.from("secrets").select("*").eq("short_id", shortId).single();
      if (fe || !data) { setError("Secret not found"); await logAccess(shortId, "failure", "Not found"); return; }
      const s: Secret = data as Secret;
      if (new Date(s.expires_at) < new Date()) { setError("This secret has expired"); await logAccess(s.id, "failure", "Expired"); return; }
      if (s.is_burned) { setError("Already viewed and destroyed"); await logAccess(s.id, "failure", "Burned"); return; }
      if (s.max_views !== -1 && s.view_count >= s.max_views) { setError("Maximum views reached"); await logAccess(s.id, "failure", "Max views"); return; }
      if (s.metadata?.require_auth) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setError("Authentication required"); await logAccess(s.id, "failure", "Auth required"); setIsLoading(false); return; }
      }
      setSecret(s);
      const shouldBurn = s.max_views !== -1 && (s.view_count + 1) >= s.max_views;
      const { data: rpcOk } = await supabase.rpc("update_secret_view_and_burn", { p_secret_id: s.id });
      if (rpcOk) {
        setSecret(prev => prev ? { ...prev, view_count: prev.view_count + 1, is_burned: shouldBurn } : null);
        await logAccess(s.id, "view");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load");
      await logAccess(shortId, "failure", err.message);
    } finally { setIsLoading(false); }
  };

  useEffect(() => { if (shortId) fetchSecret(); }, [shortId]);
  useEffect(() => {
    if (hasViewed) {
      const t = setTimeout(() => window.location.reload(), 60000);
      return () => clearTimeout(t);
    }
  }, [hasViewed]);

  const handleRevealSecret = async () => {
    if (!secret) return;
    setIsDecrypting(true);
    setError(null);
    try {
      const hash = window.location.hash.substring(1);
      let key: CryptoKey;
      if (secret.passphrase_hash) {
        if (!passphrase) throw new Error("Passphrase required");
        if ((await hashPassphrase(passphrase)) !== secret.passphrase_hash) throw new Error("Incorrect password");
        if (!secret.metadata?.salt) throw new Error("Missing salt");
        key = await deriveKeyFromPassphrase(passphrase, secret.metadata.salt);
      } else {
        if (!hash) throw new Error("Incomplete link — missing encryption key");
        key = await importKey(decodeURIComponent(hash));
      }
      if (secret.encrypted_content && secret.encryption_iv) {
        setDecryptedContent(await decrypt(secret.encrypted_content, secret.encryption_iv, key));
      }
      if (secret.has_file && secret.file_url && secret.file_encryption_iv) {
        const resp = await fetch(secret.file_url);
        if (!resp.ok) throw new Error("Failed to fetch file");
        const buf = await resp.arrayBuffer();
        const dec = await decryptFile(bufferToBase64(buf), secret.file_encryption_iv, key);
        setDecryptedFileUrl(URL.createObjectURL(new Blob([dec], { type: secret.file_type || "application/octet-stream" })));
      }
      setHasViewed(true);
      setShowContent(false);
      if (secret.is_burned) await logAccess(secret.id, "burn");
    } catch (err: any) {
      setError(err.message || "Decryption failed");
      await logAccess(secret.id, "failure", err.message);
    } finally { setIsDecrypting(false); }
  };

  const handleDestroySecret = async () => {
    if (!secret || secret.is_burned) { setHasConfirmedDestroy(true); return; }
    try {
      await fetch("/api/links/destroy", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ secret_id: secret.id }) });
      setHasConfirmedDestroy(true);
      await logAccess(secret.id, "destroyed");
    } catch { setHasConfirmedDestroy(true); }
  };

  useEffect(() => { return () => { if (decryptedFileUrl) URL.revokeObjectURL(decryptedFileUrl); }; }, [decryptedFileUrl]);

  const shouldBlur = isBlurred || isIdle;

  if (isLoading) {
    return (
      <PageShell>
        <div className="mx-auto max-w-lg text-center space-y-6">
          <Skeleton className="mx-auto h-16 w-16 rounded-2xl bg-white/5" />
          <Skeleton className="mx-auto h-8 w-56 rounded-lg bg-white/5" />
          <Skeleton className="mx-auto h-4 w-40 rounded bg-white/5" />
          <Skeleton className="h-12 w-full rounded-xl bg-white/5" />
        </div>
      </PageShell>
    );
  }

  if (error && !secret) {
    return (
      <PageShell glowColor="#ef4444">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/15 bg-red-500/5">
            <AlertCircle className="h-6 w-6 text-red-400" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Not Available
          </h1>
          <p className="mb-4 text-sm text-[#6a6a7a]">{error}</p>
          {missingKey && (
            <div className="mb-5 rounded-xl border border-amber-500/10 bg-amber-500/[0.03] p-4 text-left space-y-1">
              <p className="text-xs font-semibold text-amber-400">What happened?</p>
              <p className="text-xs text-[#6a6a7a]">
                Secret links contain an encryption key after the <code className="rounded bg-white/5 px-1 py-0.5 font-mono text-[#C9A84C]">#</code>.
                Make sure you copied the full URL.
              </p>
            </div>
          )}
          <a href="/create">
            <button className="w-full rounded-xl bg-[#C9A84C] py-3.5 text-sm font-bold text-[#0a0a0f]">
              Create a Secret <ArrowRight className="inline h-4 w-4 ml-1" />
            </button>
          </a>
        </div>
      </PageShell>
    );
  }

  if (!secret) return null;

  return (
    <PageShell>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Left: Security + Journey */}
        <div className="w-full lg:w-[380px] xl:w-[400px] shrink-0 space-y-4">
          <SecurityInformationPanel secret={secret} />
        </div>

        {/* Right: Content */}
        <div className="flex-1 min-w-0">
          {/* Journey Banner */}
          <div className="mb-5 rounded-lg border border-white/[0.04] bg-white/[0.02] px-4 py-2">
            <SecretJourneyBanner
              currentStep={hasViewed ? "view" : "deliver"}
              completedSteps={hasViewed ? ["create", "encrypt", "upload", "deliver"] : ["create", "encrypt", "upload"]}
              compact
            />
          </div>

          {!hasViewed ? (
            /* ── Pre-reveal ────────────────────────────────── */
            <div className="space-y-4">
              <div className="text-center">
                <div className="relative mx-auto mb-3 flex h-12 w-12 items-center justify-center">
                  <div className="absolute inset-0 rounded-xl bg-[#C9A84C]/10 blur-2xl" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-[#C9A84C]/20 bg-gradient-to-b from-[#C9A84C]/8 to-transparent">
                    <Lock className="h-5 w-5 text-[#C9A84C]" />
                  </div>
                </div>
                <h1 className="mb-1 text-xl sm:text-2xl font-bold tracking-tight text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Encrypted Secret
                </h1>
                <p className="text-sm text-[#6a6a7a]">Someone has shared information with you securely</p>
              </div>

              {secret.passphrase_hash && (
                <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-5 space-y-3">
                  <p className="text-xs font-semibold text-white">This secret is password-protected</p>
                  <input
                    type="password" autoComplete="new-password"
                    placeholder="Enter the password you received"
                    value={passphrase}
                    onChange={(e) => setPassphrase(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-[#4a4a5a] outline-none transition-all focus:border-[#C9A84C]/30"
                  />
                </div>
              )}

              <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-5 space-y-4">
                <p className="text-xs font-semibold text-white">Before you reveal</p>
                {[
                  "You are in a private location",
                  "You are the correct recipient",
                  "You are ready to save the information",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A84C]" />
                    <p className="text-sm text-[#c0c0d0]">{item}</p>
                  </div>
                ))}

                <button
                  onClick={handleRevealSecret}
                  disabled={isDecrypting || (!!secret.passphrase_hash && !passphrase)}
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#C9A84C] py-3.5 text-sm font-bold text-[#0a0a0f] shadow-[0_0_30px_rgba(201,168,76,0.15)] transition-all hover:shadow-[0_0_50px_rgba(201,168,76,0.3)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isDecrypting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Decrypting in your browser...</>
                  ) : (
                    <>
                      <Eye className="h-4 w-4" />
                      Reveal Secret
                      <div className="absolute inset-0 -translate-x-full skew-x-12 bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
                    </>
                  )}
                </button>
              </div>

              {error && (
                <div className="flex items-start gap-3 rounded-xl border border-red-500/10 bg-red-500/[0.03] px-4 py-3">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                  <p className="text-xs text-red-400/80">{error}</p>
                </div>
              )}

              <div className="rounded-xl border border-amber-500/10 bg-amber-500/[0.03] px-5 py-4">
                <p className="text-xs font-semibold text-amber-400">One-Time View</p>
                <p className="text-xs text-[#6a6a7a] mt-1">
                  This secret will be permanently deleted after you view it.
                </p>
              </div>
            </div>
          ) : (
            /* ── Post-reveal ──────────────────────────────── */
            <div className="space-y-3">
              <div className="text-center">
                <div className="relative mx-auto mb-3 flex h-12 w-12 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-emerald-500/15 blur-2xl" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/25 bg-gradient-to-b from-emerald-500/10 to-transparent">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  </div>
                </div>
                <h1 className="mb-1 text-xl sm:text-2xl font-bold tracking-tight text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Secret Revealed
                </h1>
                <p className="text-sm text-[#6a6a7a]">The content is decrypted in your browser</p>
              </div>

              {decryptedContent && (
                <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-500/15 bg-emerald-500/5">
                        <Shield className="h-4 w-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Content</p>
                        <p className="text-xs text-[#4a4a5a]">Auto-hides in 15 seconds</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={toggleFullscreen}
                        className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2 text-[#6a6a7a] transition-all hover:text-white">
                        {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                      </button>
                      <button onClick={() => setShowContent(!showContent)}
                        className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2 text-[#6a6a7a] transition-all hover:text-white">
                        {showContent ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/[0.04] bg-[#0d0d14] p-4">
                    <pre className={`whitespace-pre-wrap break-all font-mono text-sm text-[#8a8a9a] transition-all duration-200 ${showContent && !shouldBlur ? "" : "select-none blur-sm"}`}>
                      {decryptedContent}
                    </pre>
                  </div>

                  {!showContent && (
                    <button onClick={handleRevealContent}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C9A84C] py-3 text-sm font-bold text-[#0a0a0f] transition-all hover:shadow-[0_0_24px_rgba(201,168,76,0.25)]">
                      <Eye className="h-4 w-4" />
                      Reveal Secret
                    </button>
                  )}

                  {showContent && !shouldBlur && <SecureCopyButton text={decryptedContent} />}
                </div>
              )}

              {secret.has_file && decryptedFileUrl && (
                <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <FileIcon className="h-4 w-4 text-[#C9A84C]" />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white">Attached File</p>
                      <p className="truncate text-xs text-[#4a4a5a]">{secret.file_name}</p>
                    </div>
                  </div>
                  <div className={`transition-all duration-200 ${shouldBlur ? "select-none blur-sm" : ""}`}>
                    {(() => {
                      const t = getFileCategory(secret.file_type);
                      switch (t) {
                        case "image": return secret.metadata?.allow_download
                          ? <img src={decryptedFileUrl} alt="" className="max-h-[500px] w-full rounded-xl object-contain" />
                          : <ImageCanvasPreview url={decryptedFileUrl} watermarkText={secret.metadata?.watermarkText ?? "cipheronce.com"} />;
                        case "video": return <video src={decryptedFileUrl} controls controlsList="nodownload noplaybackrate" disablePictureInPicture className="w-full max-h-[500px] rounded-xl" />;
                        case "audio": return <audio src={decryptedFileUrl} controls controlsList="nodownload" className="w-full" />;
                        case "pdf": return secret.metadata?.allow_download
                          ? <iframe src={decryptedFileUrl} className="h-[500px] w-full rounded-xl border border-white/[0.04]" />
                          : <PdfCanvasPreview url={decryptedFileUrl} watermarkText={secret.metadata?.watermarkText ?? "cipheronce.com"} />;
                        default: return <p className="py-6 text-center text-sm text-[#6a6a7a]">Preview not available.</p>;
                      }
                    })()}
                  </div>
                  {secret.metadata?.allow_download && (
                    <a href={decryptedFileUrl} download={secret.file_name} target="_blank" rel="noopener noreferrer">
                      <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C9A84C] py-3 text-sm font-bold text-[#0a0a0f]">
                        <Download className="h-4 w-4" /> Download
                      </button>
                    </a>
                  )}
                </div>
              )}

              {!hasConfirmedDestroy && <DestroyConfirmation onDestroy={handleDestroySecret} isBurned={secret.is_burned} />}
              {hasConfirmedDestroy && (
                <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.04] p-5">
                  <div className="flex items-start gap-3">
                    <Shield className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                    <div>
                      <p className="text-sm font-bold text-emerald-400">Destroyed</p>
                      <p className="text-xs text-[#6a6a7a] mt-0.5">Permanently deleted from our servers.</p>
                    </div>
                  </div>
                </div>
              )}

              <a href="/create">
                <button className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#C9A84C] py-4 text-sm font-bold text-[#0a0a0f] transition-all hover:shadow-[0_0_40px_rgba(201,168,76,0.3)]">
                  Create Your Own Secret
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  <div className="absolute inset-0 -translate-x-full skew-x-12 bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
