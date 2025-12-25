"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyButton } from "../components/copy-button" // Relative import within feature
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
  Download, // Added Download icon
  FileText, // Added FileText icon for generic files
  Image, // Added Image icon
  Music, // Added Music icon
  Video, // Added Video icon
  File, // Generic file icon
} from "lucide-react"
import { createClient } from "@/lib/supabase/client" // Stays as shared utility
import { decrypt, decryptFile, importKey, hashPassphrase, deriveKeyFromPassphrase, bufferToBase64 } from "../services/encryption" // Added decryptFile, bufferToBase64
import {
  formatTimeRemaining,
  SECRET_EXPIRATION_OPTIONS,
} from "@/features/secrets/domain/secret-utils"
import type { Secret } from "../types" // Import Secret from feature types file
import type { User } from "@supabase/supabase-js" // Import User type

export function ViewSecretPage() {
  const params = useParams()
  const shortId = params.shortId as string
  const [secret, setSecret] = useState<Secret | null>(null)
  const [decryptedContent, setDecryptedContent] = useState<string | null>(null)
  const [passphrase, setPassphrase] = useState("")
  const [showContent, setShowContent] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isDecrypting, setIsDecrypting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasViewed, setHasViewed] = useState(false)
  const [missingKey, setMissingKey] = useState(false)

  // New states for decrypted file
  const [decryptedFileBuffer, setDecryptedFileBuffer] = useState<ArrayBuffer | null>(null);
  const [decryptedFileUrl, setDecryptedFileUrl] = useState<string | null>(null);

  // Helper function to log access attempts
  const logAccess = async (currentSecretId: string, status: string, errorMessage?: string, metadata?: Record<string, any>) => {
    try {
      await fetch('/api/log-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret_id: currentSecretId,
          status,
          error_message: errorMessage,
          metadata,
        }),
      });
    } catch (err) {
      console.error('Failed to log access:', err);
    }
  };

  useEffect(() => {
    const checkForKey = async () => {
      const hash = window.location.hash.substring(1)
      if (!hash && !secret?.passphrase_hash) {
        console.log("[v0] No encryption key found in URL hash")
        setMissingKey(true)
        const errorMessage = "Invalid secret link: Encryption key is missing from the URL";
        setError(errorMessage)
        setIsLoading(false)
        await logAccess(shortId, 'failure', errorMessage);
        return false
      }
      return true
    }

    // Only run checkForKey if secret is not yet loaded, or if secret is loaded but passphrase is null and hash is missing
    if (!secret || (!secret.passphrase_hash && !window.location.hash.substring(1))) {
      checkForKey();
    }
  }, [secret, shortId])

  // Fetch secret metadata
  useEffect(() => {
    if (!shortId) return

    const fetchSecret = async () => {
      try {
        await logAccess(shortId, 'attempt');
        const supabase = createClient()
        const { data, error: fetchError } = await supabase.from("secrets").select("*").eq("short_id", shortId).single()

        if (fetchError || !data) {
          const errorMessage = "Secret not found or has been deleted";
          setError(errorMessage)
          await logAccess(shortId, 'failure', errorMessage);
          return
        }

        const secretData: Secret = data as Secret; // Cast to new Secret interface

        // Check if expired
        if (new Date(secretData.expires_at) < new Date()) {
          const errorMessage = "This secret has expired";
          setError(errorMessage)
          await logAccess(secretData.id, 'failure', errorMessage);
          return
        }

        // Check if already burned
        if (secretData.is_burned) {
          const errorMessage = "This secret has already been viewed and burned";
          setError(errorMessage)
          await logAccess(secretData.id, 'failure', errorMessage);
          return
        }

        // Check if max views reached
        if (secretData.max_views !== -1 && secretData.view_count >= secretData.max_views) {
          const errorMessage = "This secret has reached its maximum view count";
          setError(errorMessage)
          await logAccess(secretData.id, 'failure', errorMessage);
          return
        }

        // NEW V2: METADATA-BASED RULE EVALUATION
        if (secretData.metadata?.require_auth) {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) {
            const errorMessage = "Authentication required to view this secret. Please sign in.";
            setError(errorMessage);
            await logAccess(secretData.id, 'failure', errorMessage);
            setIsLoading(false);
            return;
          }
        }

        if (secretData.metadata?.allowed_domains && secretData.metadata.allowed_domains.length > 0) {
          const currentHostname = window.location.hostname;
          const allowed = secretData.metadata.allowed_domains.some(domain =>
            currentHostname === domain || currentHostname.endsWith(`.${domain}`)
          );
          if (!allowed) {
            const errorMessage = `Access to this secret is restricted to specific domains. Current domain: ${currentHostname}`;
            setError(errorMessage);
            await logAccess(secretData.id, 'failure', errorMessage);
            setIsLoading(false);
            return;
          }
        }
        // END NEW V2: METADATA-BASED RULE EVALUATION

        setSecret(secretData)

        // Increment view count and update burn status immediately on valid access
        const newViewCount = secretData.view_count + 1
        const shouldBurn = secretData.max_views !== -1 && newViewCount >= secretData.max_views

        const { error: updateError } = await supabase.rpc('update_secret_view_and_burn', { p_secret_id: secretData.id });

        if (updateError) {
          console.error("Error calling RPC to update view count:", updateError)
          // Log failure but don't block the user from viewing the secret
          await logAccess(secretData.id, 'failure', `Failed to update view count via RPC: ${updateError.message}`);
        } else {
          // The RPC function updates the database. We need to re-fetch the secret to get the updated values,
          // or we can optimistically update the local state. For simplicity and to reflect the RPC's
          // internal logic, we'll optimistically update based on the original `secretData` and `newViewCount`
          // and `shouldBurn` derived earlier.
          setSecret((prevSecret) => {
            if (!prevSecret) return null;
            return {
              ...prevSecret,
              view_count: newViewCount,
              is_burned: shouldBurn,
            };
          });
          await logAccess(secretData.id, 'view'); // Log a successful view
        }
      } catch (err) {
        console.error("[v0] Error fetching secret:", err)
        const errorMessage = err instanceof Error ? err.message : "Failed to load secret";
        setError(errorMessage)
        await logAccess(shortId, 'failure', errorMessage);
      } finally {
        setIsLoading(false)
      }
    }

    fetchSecret()
  }, [shortId])

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (hasViewed) {
      timer = setTimeout(() => {
        window.location.reload();
      }, 60000); // 60 seconds
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [hasViewed]);

  const handleRevealSecret = async () => {
    if (!secret) return

    setIsDecrypting(true)
    setError(null)

    try {
      // Get encryption key from URL fragment
      const hash = window.location.hash.substring(1)

      let encryptionKey: CryptoKey;

      // Check if passphrase is required
      if (secret.passphrase_hash) {
        if (!passphrase) {
          throw new Error("Passphrase is required to view this secret")
        }

        // Verify passphrase
        const passphraseHashInput = await hashPassphrase(passphrase)
        if (passphraseHashInput !== secret.passphrase_hash) {
          throw new Error("Incorrect passphrase")
        }

        // Derive key from passphrase
        const salt = secret.metadata?.salt // Optional chaining
        if (!salt) {
          throw new Error("Salt missing for passphrase-protected secret")
        }
        encryptionKey = await deriveKeyFromPassphrase(passphrase, salt)
      } else {
        if (!hash) {
          throw new Error(
            "The secret link is incomplete. Please make sure you copied the entire URL, including the part after the # symbol.",
          )
        }
        // Import key from URL fragment
        encryptionKey = await importKey(decodeURIComponent(hash))
      }

      // Decrypt text content if available
      if (secret.encrypted_content && secret.encryption_iv) {
        const decrypted = await decrypt(secret.encrypted_content, secret.encryption_iv, encryptionKey)
        setDecryptedContent(decrypted)
      }

      // Decrypt file content if available
      if (secret.has_file && secret.file_url && secret.file_encryption_iv) {
        // Fetch the encrypted file from Vercel Blob
        const fileResponse = await fetch(secret.file_url);
        if (!fileResponse.ok) {
          throw new Error(`Failed to fetch encrypted file from ${secret.file_url}`);
        }
        const encryptedFileBuffer = await fileResponse.arrayBuffer();

        // Decrypt the file buffer
        const decryptedBuffer = await decryptFile(bufferToBase64(encryptedFileBuffer), secret.file_encryption_iv, encryptionKey);
        setDecryptedFileBuffer(decryptedBuffer);

        // Create an object URL for display/download
        const fileBlob = new Blob([decryptedBuffer], { type: secret.file_type || 'application/octet-stream' });
        setDecryptedFileUrl(URL.createObjectURL(fileBlob));
      }

      setHasViewed(true)

      // If the secret was burned on initial load, log a burn event here if not already done.
      if (secret.is_burned && !hasViewed) { // hasViewed check prevents redundant burn log if already viewed in session
        await logAccess(secret.id, 'burn');
      }

    } catch (err) {
      console.error("[v0] Error decrypting secret:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to decrypt secret";
      setError(errorMessage)
      await logAccess(secret.id, 'failure', errorMessage);
    } finally {
      setIsDecrypting(false)
    }
  }

  // Effect to revoke object URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (decryptedFileUrl) {
        URL.revokeObjectURL(decryptedFileUrl);
      }
    };
  }, [decryptedFileUrl]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-6">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h1 className="mb-2 text-2xl font-bold">Secret Not Available</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-destructive">Error</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{error}</p>

              {missingKey && (
                <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4 space-y-2">
                  <p className="text-sm font-medium text-amber-600">What went wrong?</p>
                  <p className="text-xs text-muted-foreground">
                    Secret links contain an encryption key after the # symbol (e.g.,{" "}
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">/s/abc123#key...</code>). This key is
                    required to decrypt the secret.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Make sure you copied the complete URL provided when the secret was created.
                  </p>
                </div>
              )}

              <Button asChild className="w-full">
                <a href="/create">Create Your Own Secret</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // If secret is null even after loading, show a generic error (should ideally not happen if fetchSecret handles all errors)
  if (!secret) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-6">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h1 className="mb-2 text-2xl font-bold">Secret Not Available</h1>
            <p className="text-muted-foreground">The secret could not be loaded or accessed.</p>
          </div>
          <Button asChild className="w-full">
            <a href="/create">Create Your Own Secret</a>
          </Button>
        </div>
      </div>
    );
  }

  // Secret found - show reveal interface
  if (!hasViewed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
        <div className="container py-12">
          <div className="mx-auto max-w-2xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h1 className="mb-2 text-3xl font-bold text-balance">Encrypted Secret</h1>
              <p className="text-muted-foreground">Someone has shared a secure message with you</p>
            </div>

            {/* Secret Info Card */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Secret Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 rounded-lg bg-muted/50 p-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Expires in</p>
                      <p className="font-medium">{formatTimeRemaining(secret.expires_at)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Eye className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Views remaining</p>
                      <p className="font-medium">
                        {(secret.max_views === -1 || secret.max_views === undefined) ? "Unlimited" : (secret.max_views - secret.view_count)}
                      </p>
                    </div>
                  </div>
                </div>

                {secret.passphrase_hash && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Lock className="h-4 w-4" />
                      Passphrase Required
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passphrase">Enter Passphrase</Label>
                      <Input
                        id="passphrase"
                        type="password"
                        placeholder="Enter the passphrase you received"
                        value={passphrase}
                        onChange={(e) => setPassphrase(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleRevealSecret()
                          }
                        }}
                      />
                    </div>
                  </div>
                )}

                {error && (
                  <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleRevealSecret}
                  disabled={isDecrypting || (!!secret.passphrase_hash && !passphrase)}
                  className="w-full"
                  size="lg"
                >
                  {isDecrypting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Decrypting...
                    </>
                  ) : (
                    <>
                      <Eye className="mr-2 h-4 w-4" />
                      Reveal Secret
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Warning Card */}
            <Card className="border-amber-500/20 bg-amber-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-600">
                  <AlertTriangle className="h-5 w-5" />
                  Warning: One-Time View
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  This secret will be <strong>permanently deleted</strong> after you view it
                  {secret.max_views !== undefined && secret.max_views > 1 && ` or after ${secret.max_views} total views`}.
                </p>
                <p>Make sure you&apos;re ready to save or copy the information before revealing it.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Secret revealed - show content
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="container py-12">
        <div className="mx-auto max-w-2xl">
          {/* Success Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h1 className="mb-2 text-3xl font-bold">Secret Revealed</h1>
            <p className="text-muted-foreground">Copy the information below before leaving this page</p>
          </div>

          {/* Content Card */}
          {decryptedContent && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Decrypted Content
              </CardTitle>
              <CardDescription>This message will self-destruct</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Decrypted Text Content */}
              
                <div className="relative rounded-lg bg-muted p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowContent(!showContent)}
                      className="h-auto p-0 text-xs hover:bg-transparent"
                    >
                      {showContent ? (
                        <>
                          <Eye className="mr-1 h-3 w-3" />
                          Visible
                        </>
                      ) : (
                        <>
                          <EyeOff className="mr-1 h-3 w-3" />
                          Hidden
                        </>
                      )}
                    </Button>
                  </div>
                  <pre
                    className={`whitespace-pre-wrap break-words font-mono text-sm ${showContent ? "" : "blur-sm select-none"}`}
                  >
                    {decryptedContent}
                  </pre>
                </div>
              

              
                <CopyButton
                  text={decryptedContent || ""}
                  label="Copy to Clipboard"
                  className="w-full"
                  variant="default"
                />
              
            </CardContent>
          </Card>)}

          {/* Attached File Card */}
          {secret.has_file && decryptedFileUrl && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <File className="h-5 w-5" />
                  Attached File
                </CardTitle>
                <CardDescription>{secret.file_name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {secret.file_type?.startsWith("image/") && (
                  <div className="p-4 border rounded-lg flex justify-center">
                    <img
                      src={decryptedFileUrl}
                      alt={secret.file_name || "Decrypted image"}
                      className="max-w-full h-auto rounded-md"
                      style={{ maxHeight: "500px" }}
                    />
                  </div>
                )}
                <Button asChild className="w-full">
                  <a href={decryptedFileUrl} download={secret.file_name}>
                    <Download className="mr-2 h-4 w-4" />
                    Download File
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Burn Notice */}
          <Card className="border-red-500/20 bg-red-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Flame className="h-5 w-5" />
                Secret Burned
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>This secret has been viewed and will be permanently deleted from our servers.</p>
              <p>The link is no longer valid and cannot be used again.</p>
            </CardContent>
          </Card>

          {/* Action */}
          <div className="mt-8">
            <Button asChild className="w-full" size="lg">
              <a href="/create">Create Your Own Secret</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
