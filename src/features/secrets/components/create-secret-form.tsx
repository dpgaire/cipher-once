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
import { Lock, Shield, Clock, Eye, Users, Globe, Tag } from "lucide-react" // Added Users, Globe, Tag icons
import {
  generateKey,
  exportKey,
  encrypt,
  generateShortId,
  hashPassphrase,
  generateSalt,
  deriveKeyFromPassphrase,
} from "../services/encryption"
import {
  calculateExpirationDate,
  SECRET_EXPIRATION_OPTIONS,
  MAX_VIEW_OPTIONS,
  validateSecretContent,
  validatePassphrase,
} from "../../../lib/secret-utils" // Corrected path to shared lib
import { createClient } from "@/lib/supabase/client"
import type { SecretMetadata } from "../types" // Import SecretMetadata from feature types


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
  const [allowedDomainsInput, setAllowedDomainsInput] = useState(''); // Comma-separated string
  const [customLabelsInput, setCustomLabelsInput] = useState(''); // Comma-separated string

  const handleCreateSecret = async () => {
    setError(null)
    setIsLoading(true)

    try {
      // Validate content
      const contentValidation = validateSecretContent(content)
      if (!contentValidation.valid) {
        throw new Error(contentValidation.error)
      }

      // Validate passphrase if required
      if (requirePassphrase) {
        const passphraseValidation = validatePassphrase(passphrase)
        if (!passphraseValidation.valid) {
          throw new Error(passphraseValidation.error)
        }
      }

      // Generate encryption key
      let encryptionKey
      let salt = null
      if (requirePassphrase) {
        // Derive key from passphrase
        salt = generateSalt()
        encryptionKey = await deriveKeyFromPassphrase(passphrase, salt)
      } else {
        // Generate random key
        encryptionKey = await generateKey()
      }

      // Encrypt the content
      const { ciphertext, iv } = await encrypt(content, encryptionKey)

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
        ...(salt && { salt }), // Conditionally add salt
        has_passphrase: requirePassphrase,
        require_auth: requireAuth,
        allowed_domains: allowed_domains.length > 0 ? allowed_domains : undefined,
        custom_labels: custom_labels.length > 0 ? custom_labels : undefined,
      };

      // Store in database
      const { data, error: dbError } = await supabase
        .from("secrets")
        .insert({
          encrypted_content: ciphertext,
          encryption_iv: iv,
          short_id: shortId,
          passphrase_hash: passphraseHash,
          max_views: maxViews,
          expires_at: expiresAt.toISOString(),
          user_id: user?.id || null,
          metadata: secretMetadata, // Use the constructed metadata
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
              <Label htmlFor="content">Your Secret</Label>
              <Textarea
                id="content"
                placeholder="Enter passwords, API keys, confidential messages, or any sensitive information..."
                className="min-h-[200px] font-mono text-sm"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">{content.length} characters</p>
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
            <Button onClick={handleCreateSecret} disabled={isLoading || !content.trim()} className="w-full" size="lg">
              {isLoading ? "Creating Secure Link..." : "Create Secret Link"}
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
