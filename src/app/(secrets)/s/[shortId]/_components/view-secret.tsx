"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { CopyButton } from "../_components/copy-button";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  Flame,
  Lock,
  Shield,
  AlertTriangle,
  Loader2,
  Download,
  FileIcon,
  ArrowRight,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/client";
import {
  decrypt,
  decryptFile,
  importKey,
  hashPassphrase,
  deriveKeyFromPassphrase,
  bufferToBase64,
} from "../_services/encryption";
import { formatTimeRemaining } from "@/lib/utils";
import type { Secret } from "../_types";
import { MediaSkeleton } from "@/components/core";
import { getFileCategory } from "@/lib/utils";

const ImageCanvasPreview = dynamic(
  () => import("@/components/core/ImageCanvasPreview"),
  {
    ssr: false,
    loading: () => <MediaSkeleton className="h-40 w-full" />,
  },
);
const PdfCanvasPreview = dynamic(
  () => import("@/components/core/PdfCanvasPreview"),
  {
    ssr: false,
    loading: () => <MediaSkeleton className="h-40 w-full" />,
  },
);

// ─────────────────────────────────────────────────────────────────────────────
// Shared layout shell
// ─────────────────────────────────────────────────────────────────────────────
function PageShell({
  glowColor = "#C9A84C",
  children,
}: {
  glowColor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0f] px-4 py-16">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[600px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: `${glowColor}0D` }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #C9A84C 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="container relative mx-auto max-w-lg">{children}</div>
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
  const [decryptedFileBuffer, setDecryptedFileBuffer] =
    useState<ArrayBuffer | null>(null);
  const [decryptedFileUrl, setDecryptedFileUrl] = useState<string | null>(null);

  const logAccess = async (
    currentSecretId: string,
    status: string,
    errorMessage?: string,
    metadata?: Record<string, any>,
  ) => {
    try {
      await fetch("/api/log-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret_id: currentSecretId,
          status,
          error_message: errorMessage,
          metadata,
        }),
      });
    } catch (err) {
      console.error("Failed to log access:", err);
    }
  };

  useEffect(() => {
    const checkForKey = async () => {
      const hash = window.location.hash.substring(1);
      if (!hash && !secret?.passphrase_hash) {
        setMissingKey(true);
        const errorMessage =
          "Invalid secret link: Encryption key is missing from the URL";
        setError(errorMessage);
        setIsLoading(false);
        await logAccess(shortId, "failure", errorMessage);
        return false;
      }
      return true;
    };
    if (
      !secret ||
      (!secret.passphrase_hash && !window.location.hash.substring(1))
    ) {
      checkForKey();
    }
  }, [secret, shortId]);

  const fetchSecret = async () => {
    try {
      await logAccess(shortId, "attempt");
      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from("secrets")
        .select("*")
        .eq("short_id", shortId)
        .single();
      if (fetchError || !data) {
        const m = "Secret not found or has been deleted";
        setError(m);
        await logAccess(shortId, "failure", m);
        return;
      }
      const secretData: Secret = data as Secret;
      if (new Date(secretData.expires_at) < new Date()) {
        const m = "This secret has expired";
        setError(m);
        await logAccess(secretData.id, "failure", m);
        return;
      }
      if (secretData.is_burned) {
        const m = "This secret has already been viewed and burned";
        setError(m);
        await logAccess(secretData.id, "failure", m);
        return;
      }
      if (
        secretData.max_views !== -1 &&
        secretData.view_count >= secretData.max_views
      ) {
        const m = "This secret has reached its maximum view count";
        setError(m);
        await logAccess(secretData.id, "failure", m);
        return;
      }
      if (secretData.metadata?.require_auth) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          const m =
            "Authentication required to view this secret. Please sign in.";
          setError(m);
          await logAccess(secretData.id, "failure", m);
          setIsLoading(false);
          return;
        }
      }
      // if (secretData.metadata?.allowed_domains?.length > 0) {
      //   const currentHostname = window.location.hostname;
      //   const allowed = secretData.metadata.allowed_domains.some((domain: string) => currentHostname === domain || currentHostname.endsWith(`.${domain}`));
      //   if (!allowed) { const m = `Access restricted. Current domain: ${currentHostname}`; setError(m); await logAccess(secretData.id, "failure", m); setIsLoading(false); return; }
      // }
      setSecret(secretData);
      const newViewCount = secretData.view_count + 1;
      const shouldBurn =
        secretData.max_views !== -1 && newViewCount >= secretData.max_views;
      const { data: rpcSuccess, error: updateError } = await supabase.rpc(
        "update_secret_view_and_burn",
        { p_secret_id: secretData.id },
      );
      if (!updateError && rpcSuccess) {
        setSecret((prev) =>
          prev
            ? { ...prev, view_count: newViewCount, is_burned: shouldBurn }
            : null,
        );
        await logAccess(secretData.id, "view");
      }
    } catch (err) {
      const m = err instanceof Error ? err.message : "Failed to load secret";
      setError(m);
      await logAccess(shortId, "failure", m);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (shortId) fetchSecret();
  }, [shortId]);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (hasViewed) {
      timer = setTimeout(() => window.location.reload(), 60000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [hasViewed]);

  const handleRevealSecret = async () => {
    if (!secret) return;
    setIsDecrypting(true);
    setError(null);
    try {
      const hash = window.location.hash.substring(1);
      let encryptionKey: CryptoKey;
      if (secret.passphrase_hash) {
        if (!passphrase)
          throw new Error("Passphrase is required to view this secret");
        const passphraseHashInput = await hashPassphrase(passphrase);
        if (passphraseHashInput !== secret.passphrase_hash)
          throw new Error("Incorrect password! Reload to try again");
        const salt = secret.metadata?.salt;
        if (!salt)
          throw new Error("Salt missing for passphrase-protected secret");
        encryptionKey = await deriveKeyFromPassphrase(passphrase, salt);
      } else {
        if (!hash)
          throw new Error(
            "The secret link is incomplete. Please copy the entire URL including the # part.",
          );
        encryptionKey = await importKey(decodeURIComponent(hash));
      }
      if (secret.encrypted_content && secret.encryption_iv) {
        const decrypted = await decrypt(
          secret.encrypted_content,
          secret.encryption_iv,
          encryptionKey,
        );
        setDecryptedContent(decrypted);
      }
      if (secret.has_file && secret.file_url && secret.file_encryption_iv) {
        const fileResponse = await fetch(secret.file_url);
        if (!fileResponse.ok) throw new Error(`Failed to fetch encrypted file`);
        const encryptedFileBuffer = await fileResponse.arrayBuffer();
        const decryptedBuffer = await decryptFile(
          bufferToBase64(encryptedFileBuffer),
          secret.file_encryption_iv,
          encryptionKey,
        );
        setDecryptedFileBuffer(decryptedBuffer);
        const fileBlob = new Blob([decryptedBuffer], {
          type: secret.file_type || "application/octet-stream",
        });
        setDecryptedFileUrl(URL.createObjectURL(fileBlob));
      }
      setHasViewed(true);
      if (secret.is_burned && !hasViewed) await logAccess(secret.id, "burn");
    } catch (err) {
      const m = err instanceof Error ? err.message : "Failed to decrypt secret";
      setError(m);
      await logAccess(secret.id, "failure", m);
    } finally {
      setIsDecrypting(false);
    }
  };

  useEffect(() => {
    return () => {
      if (decryptedFileUrl) URL.revokeObjectURL(decryptedFileUrl);
    };
  }, [decryptedFileUrl]);

  // ── Loading skeleton ───────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <PageShell>
        <div className="mb-8 space-y-3 text-center">
          <Skeleton className="mx-auto h-16 w-16 rounded-2xl bg-white/5" />
          <Skeleton className="mx-auto h-8 w-56 rounded-lg bg-white/5" />
          <Skeleton className="mx-auto h-4 w-40 rounded bg-white/5" />
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-7 space-y-4">
          <div className="grid gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 sm:grid-cols-2">
            <Skeleton className="h-10 rounded-lg bg-white/5" />
            <Skeleton className="h-10 rounded-lg bg-white/5" />
          </div>
          <Skeleton className="h-11 w-full rounded-lg bg-white/5" />
          <Skeleton className="h-11 w-full rounded-lg bg-white/5" />
        </div>
        <div className="mt-4 rounded-xl border border-amber-500/10 bg-amber-500/[0.03] p-5 space-y-2">
          <Skeleton className="h-4 w-32 rounded bg-white/5" />
          <Skeleton className="h-3 w-full rounded bg-white/5" />
        </div>
      </PageShell>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (error && !secret) {
    return (
      <PageShell glowColor="#ef4444">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
            <AlertCircle className="h-6 w-6 text-red-400" />
          </div>
          <h1
            className="mb-1 text-2xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Secret Not Available
          </h1>
          <p className="text-sm text-[#6a6a7a]">
            This secret could not be accessed
          </p>
        </div>

        <div className="mb-5 rounded-2xl border border-white/5 bg-white/[0.02] p-6 space-y-4">
          <p className="text-sm leading-relaxed text-[#8a8a9a]">{error}</p>

          {missingKey && (
            <div className="rounded-xl border border-amber-500/15 bg-amber-500/[0.04] p-4 space-y-2">
              <p className="text-xs font-bold text-amber-400">
                What went wrong?
              </p>
              <p className="text-xs leading-relaxed text-[#6a6a7a]">
                Secret links include an encryption key after the{" "}
                <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[#C9A84C]">
                  #
                </code>{" "}
                symbol. Make sure you copied the complete URL.
              </p>
            </div>
          )}
        </div>

        <a href="/create">
          <button className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#C9A84C] py-3.5 text-sm font-bold text-[#0a0a0f] transition-all hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]">
            Create Your Own Secret
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </a>
      </PageShell>
    );
  }

  if (!secret) {
    return (
      <PageShell glowColor="#ef4444">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
            <AlertCircle className="h-6 w-6 text-red-400" />
          </div>
          <h1
            className="mb-2 text-2xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Secret Not Available
          </h1>
          <p className="mb-8 text-sm text-[#6a6a7a]">
            The secret could not be loaded or accessed.
          </p>
          <a href="/create">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#C9A84C] py-3.5 text-sm font-bold text-[#0a0a0f]">
              Create Your Own Secret <ArrowRight className="h-4 w-4" />
            </button>
          </a>
        </div>
      </PageShell>
    );
  }

  // ── Reveal interface ───────────────────────────────────────────────────────
  if (!hasViewed) {
    return (
      <PageShell>
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C9A84C]/30 bg-[#C9A84C]/10 shadow-[0_0_30px_rgba(201,168,76,0.15)]">
            <Lock className="h-7 w-7 text-[#C9A84C]" />
          </div>
          <h1
            className="mb-2 text-4xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Encrypted Secret
          </h1>
          <p className="text-sm text-[#6a6a7a]">
            Someone has shared a secure message with you
          </p>
        </div>

        {/* Info card */}
        <div className="mb-4 rounded-2xl border border-white/5 bg-white/[0.02] p-7 space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#C9A84C]/20 bg-[#C9A84C]/10">
              <Shield className="h-4 w-4 text-[#C9A84C]" />
            </div>
            <p className="text-sm font-bold text-white">Secret Information</p>
          </div>

          <div className="grid gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 shrink-0 text-[#C9A84C]" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#4a4a5a]">
                  Expires in
                </p>
                <p className="text-sm font-semibold text-white">
                  {formatTimeRemaining(secret.expires_at)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Eye className="h-4 w-4 shrink-0 text-[#C9A84C]" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#4a4a5a]">
                  Views remaining
                </p>
                <p className="text-sm font-semibold text-white">
                  {secret.max_views === -1 || secret.max_views === undefined
                    ? "Unlimited"
                    : secret.max_views - secret.view_count}
                </p>
              </div>
            </div>
          </div>

          {/* Passphrase input */}
          {secret.passphrase_hash && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-[#C9A84C]" />
                <p className="text-xs font-bold uppercase tracking-wider text-[#6a6a7a]">
                  Password required
                </p>
              </div>
              <input
                id="passphrase"
                type="password"
                autoComplete="new-password"
                placeholder="Enter the password you received"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRevealSecret();
                }}
                className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-[#4a4a5a] outline-none transition-all focus:border-[#C9A84C]/40 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)]"
              />
            </div>
          )}

          {/* Inline error */}
          {error && (
            <div className="flex items-start gap-3 rounded-lg border border-red-500/15 bg-red-500/5 px-4 py-3">
              <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
              <p className="text-xs leading-relaxed text-red-400">{error}</p>
            </div>
          )}

          {/* Reveal CTA */}
          <button
            onClick={handleRevealSecret}
            disabled={isDecrypting || (!!secret.passphrase_hash && !passphrase)}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#C9A84C] py-4 text-sm font-bold text-[#0a0a0f] shadow-[0_0_30px_rgba(201,168,76,0.2)] transition-all hover:shadow-[0_0_50px_rgba(201,168,76,0.4)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isDecrypting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Decrypting...
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                Reveal Secret
                <div className="absolute inset-0 -translate-x-full skew-x-12 bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
              </>
            )}
          </button>
        </div>

        {/* Warning */}
        <div className="flex items-start gap-4 rounded-xl border border-amber-500/15 bg-amber-500/[0.04] px-5 py-4">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
          <div className="space-y-1">
            <p className="text-xs font-bold text-amber-400">
              Warning: One-Time View
            </p>
            <p className="text-xs text-[#6a6a7a]">
              This secret will be{" "}
              <span className="font-semibold text-white">
                permanently deleted
              </span>{" "}
              after you view it
              {secret.max_views !== undefined &&
                secret.max_views > 1 &&
                ` or after ${secret.max_views} total views`}
              .
            </p>
            <p className="text-xs text-[#6a6a7a]">
              Make sure you're ready to save the information before revealing.
            </p>
          </div>
        </div>
      </PageShell>
    );
  }

  // ── Revealed state ─────────────────────────────────────────────────────────
  return (
    <PageShell glowColor="#10b981">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-xl" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
            <CheckCircle2 className="h-7 w-7 text-emerald-400" />
          </div>
        </div>
        <h1
          className="mb-2 text-4xl font-bold text-white"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Secret Revealed
        </h1>
        <p className="text-sm text-[#6a6a7a]">
          Copy the information below before leaving this page
        </p>
      </div>

      {/* Decrypted text content */}
      {decryptedContent && (
        <div className="mb-4 rounded-2xl border border-white/5 bg-white/[0.02] p-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
                <Shield className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  Decrypted Content
                </p>
                <p className="text-xs text-[#4a4a5a]">
                  This message will self-destruct
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowContent(!showContent)}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-[#6a6a7a] transition-all hover:text-white"
            >
              {showContent ? (
                <>
                  <EyeOff className="h-3 w-3" /> Hide
                </>
              ) : (
                <>
                  <Eye className="h-3 w-3" /> Show
                </>
              )}
            </button>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#0d0d14] p-4">
            <pre
              className={`whitespace-pre-wrap break-all font-mono text-sm text-[#8a8a9a] transition-all duration-200 ${showContent ? "" : "select-none blur-sm"}`}
            >
              {decryptedContent}
            </pre>
          </div>

          <CopyButton
            text={decryptedContent}
            label="Copy to Clipboard"
            className="w-full"
            variant="default"
          />
        </div>
      )}

      {/* Custom labels */}
      {/* {secret?.metadata?.custom_labels?.length > 0 && (
        <div className="mb-4 rounded-2xl border border-white/5 bg-white/[0.02] px-5 py-4">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-[#4a4a5a]">
            Labels
          </p>
          <div className="flex flex-wrap gap-2">
            {secret.metadata.custom_labels.map(
              (label: string, index: number) => (
                <span
                  key={`${label}-${index}`}
                  className="inline-flex items-center rounded-full border border-[#C9A84C]/15 bg-[#C9A84C]/5 px-3 py-1 text-xs font-medium text-[#C9A84C]"
                >
                  {label}
                </span>
              ),
            )}
          </div>
        </div>
      )} */}

      {/* Attached file */}
      {secret.has_file && decryptedFileUrl && (
        <div className="mb-4 rounded-2xl border border-white/5 bg-white/[0.02] p-7 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
              <FileIcon className="h-4 w-4 text-[#C9A84C]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white">Attached File</p>
              <p className="truncate text-xs text-[#4a4a5a]">
                {secret.file_name}
              </p>
            </div>
          </div>

          {(() => {
            const type = getFileCategory(secret.file_type);
            switch (type) {
              case "image":
                return secret.metadata?.allow_download ? (
                  <img
                    src={decryptedFileUrl}
                    alt={secret.file_name || "Image"}
                    className="max-h-[500px] w-full rounded-xl object-contain"
                  />
                ) : (
                  <ImageCanvasPreview
                    url={decryptedFileUrl}
                    watermarkText={
                      secret.metadata?.watermarkText ?? "cipheronce.com"
                    }
                  />
                );
              case "video":
                return (
                  <div className="relative overflow-hidden rounded-xl">
                    <video
                      src={decryptedFileUrl}
                      controls
                      controlsList="nodownload noplaybackrate"
                      disablePictureInPicture
                      className="w-full max-h-[500px]"
                    />
                    {!secret.metadata?.allow_download && (
                      <div className="pointer-events-none absolute bottom-3 right-3 select-none text-[10px] font-medium text-white/50">
                        {secret.metadata?.watermarkText ?? ""}
                      </div>
                    )}
                  </div>
                );
              case "audio":
                return (
                  <audio
                    src={decryptedFileUrl}
                    controls
                    controlsList="nodownload"
                    className="w-full"
                  />
                );
              case "pdf":
                return secret.metadata?.allow_download ? (
                  <iframe
                    src={decryptedFileUrl}
                    className="h-[500px] w-full rounded-xl border border-white/5"
                  />
                ) : (
                  <PdfCanvasPreview
                    url={decryptedFileUrl}
                    watermarkText={
                      secret.metadata?.watermarkText ?? "cipheronce.com"
                    }
                  />
                );
              default:
                return (
                  <p className="py-6 text-center text-sm text-[#6a6a7a]">
                    Preview not available for this file type.
                  </p>
                );
            }
          })()}

          {secret.metadata?.allow_download && (
            <a
              href={decryptedFileUrl}
              download={secret.file_name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#C9A84C] py-3 text-sm font-bold text-[#0a0a0f] transition-all hover:shadow-[0_0_24px_rgba(201,168,76,0.3)]">
                <Download className="h-4 w-4" /> Download File
              </button>
            </a>
          )}

          {!secret.metadata?.allow_download && (
            <div className="flex items-center gap-3 rounded-lg border border-amber-500/15 bg-amber-500/[0.04] px-4 py-3">
              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              <p className="text-xs text-amber-400/80">
                Download disabled — preview only. This file cannot be saved.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Burned notice */}
      <div className="mb-6 flex items-start gap-4 rounded-xl border border-red-500/15 bg-red-500/[0.04] px-5 py-4">
        <Flame className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
        <div className="space-y-1">
          <p className="text-xs font-bold text-red-400">Secret Burned</p>
          <p className="text-xs leading-relaxed text-[#6a6a7a]">
            This secret has been viewed and will be permanently deleted from our
            servers. The link is no longer valid.
          </p>
        </div>
      </div>

      <a href="/create">
        <button className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#C9A84C] py-4 text-sm font-bold text-[#0a0a0f] transition-all hover:shadow-[0_0_40px_rgba(201,168,76,0.35)]">
          Create Your Own Secret
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          <div className="absolute inset-0 -translate-x-full skew-x-12 bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
        </button>
      </a>
    </PageShell>
  );
}
