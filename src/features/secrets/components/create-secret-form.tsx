"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Lock, Shield, Clock, Eye, Users, Globe, Tag, Paperclip, X, Loader2 } from "lucide-react"
import {
  generateKey,
  exportKey,
  encrypt,
  encryptFile,
  generateShortId,
  hashPassphrase,
  generateSalt,
  deriveKeyFromPassphrase,
  base64ToBuffer, // Imported base64ToBuffer
} from "../services/encryption"
import {
  SECRET_EXPIRATION_OPTIONS,
  MAX_VIEW_OPTIONS,
  sanitizeContent,
  validateSecretContent,
  validatePassphrase,
  calculateExpirationDate,
} from "@/features/secrets/domain/secret-utils"
import { createClient } from "@/lib/supabase/client"
import type { SecretMetadata } from "../types"


export function CreateSecretForm() {
  const router = useRouter()
  const [content, setContent] = useState("")
  const [expirationHours, setExpirationHours] = useState(24)
  const [maxViews, setMaxViews] = useState(1)
  const [requirePassphrase, setRequirePassphrase] = useState(false)
  const [passphrase, setPassphrase] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // New states for V2 rules
  const [requireAuth, setRequireAuth] = useState(false);
  const [allowedDomainsInput, setAllowedDomainsInput] = useState('');
  const [customLabelsInput, setCustomLabelsInput] = useState('');

  // New states for file upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploadingFile, setIsUploadingFile] = useState(false);

  const handleCreateSecret = async () => {
    setError(null)
    setIsLoading(true)

    try {
      const contentTrimmed = content.trim();

      // Validate content IF it's provided and no file is selected
      if (contentTrimmed && !selectedFile) {
        const contentValidation = validateSecretContent(contentTrimmed)
        if (!contentValidation.valid) { // Only check for content validation if content is provided
          throw new Error(contentValidation.error)
        }
      }

      // Validate passphrase if required
      if (requirePassphrase) {
        const passphraseValidation = validatePassphrase(passphrase)
        if (!passphraseValidation.valid) {
          throw new Error(passphraseValidation.error)
        }
      }

      // Generate encryption key
      let encryptionKey: CryptoKey;
      let salt: string | null = null;
      if (requirePassphrase) {
        salt = generateSalt();
        encryptionKey = await deriveKeyFromPassphrase(passphrase, salt);
      } else {
        encryptionKey = await generateKey();
      }

      // Encrypt the content (if any)
      let ciphertext: string | undefined;
      let iv: string | undefined;
      if (contentTrimmed) {
        const encryptedText = await encrypt(contentTrimmed, encryptionKey);
        ciphertext = encryptedText.ciphertext;
        iv = encryptedText.iv;
      }
      
      // Handle file upload if a file is selected
      let fileUrl: string | undefined;
      let fileType: string | undefined;
      let fileName: string | undefined;
      let fileSize: number | undefined;
      let fileIv: string | undefined;

      if (selectedFile) {
        setIsUploadingFile(true);
        const fileBuffer = await selectedFile.arrayBuffer();
        const encryptedFileResult = await encryptFile(fileBuffer, encryptionKey);

        const encryptedFileBlob = new Blob([base64ToBuffer(encryptedFileResult.ciphertext)], {
          type: 'application/octet-stream', // Always use octet-stream for encrypted blobs
        });

        const formData = new FormData();
        formData.append('encryptedFile', encryptedFileBlob);
        formData.append('fileName', selectedFile.name);
        formData.append('fileType', selectedFile.type);
        formData.append('fileSize', selectedFile.size.toString());
        formData.append('fileIv', encryptedFileResult.iv);


        const response = await fetch('/api/upload-file', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'File upload failed');
        }

        const result = await response.json();

        fileUrl = result.blobUrl;
        fileType = result.fileType; 
        fileName = result.fileName; 
        fileSize = result.fileSize; 
        fileIv = result.fileIv; 
        setIsUploadingFile(false);
      }
      
      // If neither content nor file, throw an error
      if (!contentTrimmed && !selectedFile) {
        throw new Error("Secret must contain either text content or a file attachment.");
      }

      // Generate short ID for URL
      const shortId = generateShortId()

      // Hash passphrase if provided (for verification, not decryption)
      const passphraseHash = requirePassphrase ? await hashPassphrase(passphrase) : null

      // Calculate expiration date
      const expiresAt = calculateExpirationDate(expirationHours)

      // Get user if authenticated
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      // Parse allowed domains and custom labels
      const allowed_domains = allowedDomainsInput.split(',').map(d => d.trim()).filter(Boolean);
      const custom_labels = customLabelsInput.split(',').map(l => l.trim()).filter(Boolean);

      // Construct metadata object
      const secretMetadata: SecretMetadata = {
        ...(salt && { salt }),
        has_passphrase: requirePassphrase,
        require_auth: requireAuth,
        allowed_domains: allowed_domains.length > 0 ? allowed_domains : undefined,
        custom_labels: custom_labels.length > 0 ? custom_labels : undefined,
      };

      // Store in database
      const { data, error: dbError } = await supabase
        .from("secrets")
        .insert({
          encrypted_content: ciphertext || null,
          encryption_iv: iv || null,
          short_id: shortId,
          passphrase_hash: passphraseHash,
          max_views: maxViews,
          expires_at: expiresAt.toISOString(),
          user_id: user?.id || null,
          metadata: secretMetadata,
          has_file: !!selectedFile,
          file_url: fileUrl || null,
          file_type: fileType || null,
          file_name: fileName || null,
          file_size: fileSize || null,
          file_encryption_iv: fileIv || null,
        })
        .select()
        .single()

      if (dbError) throw dbError

      // Export the encryption key to include in URL
      const keyString = await exportKey(encryptionKey)

      // Navigate to success page with the full URL
      router.push(`/create/success?id=${shortId}&key=${encodeURIComponent(keyString)}`)
    } catch (err) {
      console.error("Error creating secret:", err)
      setError(err instanceof Error ? err.message : "Failed to create secret")
    } finally {
      setIsLoading(false)
      setIsUploadingFile(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container max-w-3xl flex-1 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-balance">Create a Secret</h1>
          <p className="text-muted-foreground">Share sensitive information securely with end-to-end encryption</p>
        </div>

        {/* Main Form */}
        <Card>
          <CardHeader>
            <CardTitle>Secret Content</CardTitle>
            <CardDescription>Enter the information you want to share securely</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Content Input */}
            <div className="space-y-2">
              <Label htmlFor="content">Your Secret Text</Label>
              <Textarea
                id="content"
                placeholder="Enter passwords, API keys, confidential messages, or any sensitive information..."
                className="min-h-[200px] font-mono text-sm"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">{content.length} characters</p>
            </div>

            {/* File Attachment */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Paperclip className="h-4 w-4" />
                Attach File (Optional)
              </Label>
              <Input
                id="file-attachment"
                type="file"
                className="hidden" // Hide the default file input
                onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                // Accept common file types as requested
                accept="image/*,audio/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/plain"
              />
              {!selectedFile ? (
                <Button type="button" variant="outline" onClick={() => document.getElementById('file-attachment')?.click()}>
                  <Paperclip className="mr-2 h-4 w-4" />
                  Choose File
                </Button>
              ) : (
                <div className="flex items-center justify-between rounded-md bg-muted p-2 text-sm">
                  <span className="truncate">{selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)</span>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedFile(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Max file size: 20MB
              </p>
            </div>


            {/* Configuration Options */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Expiration */}
              <div className="space-y-2">
                <Label htmlFor="expiration" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Expiration
                </Label>
                <Select value={expirationHours.toString()} onValueChange={(v) => setExpirationHours(Number(v))}>
                  <SelectTrigger id="expiration">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SECRET_EXPIRATION_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value.toString()}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Secret will be deleted after this time</p>
              </div>

              {/* Max Views */}
              <div className="space-y-2">
                <Label htmlFor="maxViews" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Max Views
                </Label>
                <Select value={maxViews.toString()} onValueChange={(v) => setMaxViews(Number(v))}>
                  <SelectTrigger id="maxViews">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MAX_VIEW_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value.toString()}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Secret will burn after this many views</p>
              </div>
            </div>

            {/* Passphrase Protection */}
            <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="passphrase-toggle" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Require Passphrase
                  </Label>
                  <p className="text-xs text-muted-foreground">Add an extra layer of protection</p>
                </div>
                <Switch id="passphrase-toggle" checked={requirePassphrase} onCheckedChange={setRequirePassphrase} />
              </div>

              {requirePassphrase && (
                <div className="space-y-2">
                  <Label htmlFor="passphrase">Passphrase</Label>
                  <Input
                    id="passphrase"
                    type="password"
                    placeholder="Enter a passphrase (min. 4 characters)"
                    value={passphrase}
                    onChange={(e) => setPassphrase(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Recipients will need this passphrase to view the secret
                  </p>
                </div>
              )}
            </div>

            {/* New: Access Rules (Metadata-based) */}
            <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
              <h3 className="font-semibold text-base mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Access Rules (Optional)
              </h3>

              {/* Require Authentication */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="require-auth-toggle" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Require Authentication
                  </Label>
                  <p className="text-xs text-muted-foreground">Only logged-in users can view this secret.</p>
                </div>
                <Switch id="require-auth-toggle" checked={requireAuth} onCheckedChange={setRequireAuth} />
              </div>

              {/* Allowed Domains */}
              <div className="space-y-2">
                <Label htmlFor="allowed-domains" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Allowed Domains
                </Label>
                <Input
                  id="allowed-domains"
                  type="text"
                  placeholder="e.g., example.com, secure.example.org"
                  value={allowedDomainsInput}
                  onChange={(e) => setAllowedDomainsInput(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Comma-separated list of domains that can access this secret. Leave empty for any domain.
                </p>
              </div>

              {/* Custom Labels */}
              <div className="space-y-2">
                <Label htmlFor="custom-labels" className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Custom Labels
                </Label>
                <Input
                  id="custom-labels"
                  type="text"
                  placeholder="e.g., project-x, client-a"
                  value={customLabelsInput}
                  onChange={(e) => setCustomLabelsInput(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Comma-separated labels for organizing your secrets (e.g., Project X, Client A).
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button onClick={handleCreateSecret} disabled={isLoading || isUploadingFile || (!content.trim() && !selectedFile)} className="w-full" size="lg">
              {isLoading || isUploadingFile ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isUploadingFile ? "Uploading File..." : "Creating Secure Link..."}
                </>
              ) : (
                "Create Secret Link"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 rounded-lg border bg-blue-500/5 p-4 border-blue-500/20">
          <div className="flex gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
            <div className="space-y-1 text-sm">
              <p className="font-medium text-blue-600">End-to-End Encrypted</p>
              <p className="text-muted-foreground">
                Your secret is encrypted in your browser before being sent to our servers. We never see your unencrypted
                data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}