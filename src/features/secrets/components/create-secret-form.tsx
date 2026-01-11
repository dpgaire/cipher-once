"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Lock,
  Shield,
  Clock,
  Eye,
  Users,
  Globe,
  Tag,
  Paperclip,
  X,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import {
  generateKey,
  exportKey,
  encrypt,
  encryptFile,
  hashPassphrase,
  generateSalt,
  deriveKeyFromPassphrase,
  base64ToBuffer,
} from "../services/encryption";
import {
  SECRET_EXPIRATION_OPTIONS,
  MAX_VIEW_OPTIONS,
  validateSecretContent,
  validatePassphrase,
  calculateExpirationDate,
} from "@/features/secrets/domain/secret-utils";
import { createClient } from "@/lib/supabase/client";
import type { SecretMetadata } from "../types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useHeicToJpeg } from "../hooks/useHeicToJpeg";
import { BackButton } from "@/features/core/components/back-button";

export function CreateSecretForm() {
  const router = useRouter();
  const { convertIfNeeded } = useHeicToJpeg();
  const [content, setContent] = useState("");
  const [expirationHours, setExpirationHours] = useState(24);
  const [maxViews, setMaxViews] = useState(1);
  const [requirePassphrase, setRequirePassphrase] = useState(false);
  const [passphrase, setPassphrase] = useState("");
  const [allowFileDownload, setAllowFileDownload] = useState(false);
  const [watermarkText, setWaterMarkText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLimitReached, setIsLimitReached] = useState(false);

  // New states for V2 rules
  const [requireAuth, setRequireAuth] = useState(false);
  const [allowedDomainsInput, setAllowedDomainsInput] = useState("");
  const [customLabelsInput, setCustomLabelsInput] = useState("");

  // New states for file upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploadingFile, setIsUploadingFile] = useState(false);

  // Default settings
  const [useDefaultSettings, setUseDefaultSettings] = useState(false);
  const [defaultSettings, setDefaultSettings] = useState<any>(null);

  const fetchDefaultSettings = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("default_settings")
        .eq("id", user.id)
        .single();
      if (profile && profile.default_settings) {
        setDefaultSettings(profile.default_settings);
      }
    }
  };

  useEffect(() => {
    fetchDefaultSettings();
  }, []);

  useEffect(() => {
    if (useDefaultSettings && defaultSettings) {
      setExpirationHours(
        defaultSettings.defaultExpiration !== undefined
          ? Number(defaultSettings.defaultExpiration)
          : 24
      );
      setMaxViews(
        defaultSettings.defaultViewLimit !== undefined
          ? Number(defaultSettings.defaultViewLimit)
          : 1
      );
      const hasDefaultPassword =
        typeof defaultSettings.defaultPassword === "string" &&
        defaultSettings.defaultPassword.length > 0;
      const hasWatermarkText =
        typeof defaultSettings.watermarkText === "string" &&
        defaultSettings.watermarkText.length > 0;
      setAllowFileDownload(defaultSettings.defaultAllowDownload ?? false);
      setWaterMarkText(
        hasWatermarkText ? defaultSettings.watermarkText : "cipheronce.com"
      );
      setRequirePassphrase(hasDefaultPassword);
      setPassphrase(hasDefaultPassword ? defaultSettings.defaultPassword : "");
    }
  }, [useDefaultSettings, defaultSettings]);

  const handleCreateSecret = async () => {
    setError(null);
    setIsLoading(true);

    let encryptionKey: CryptoKey;

    try {
      const contentTrimmed = content.trim();

      if (!contentTrimmed && !selectedFile) {
        throw new Error(
          "Secret must contain either text content or a file attachment."
        );
      }

      if (requirePassphrase) {
        const passphraseValidation = validatePassphrase(passphrase);
        if (!passphraseValidation.valid) {
          throw new Error(passphraseValidation.error);
        }
      }

      let salt: string | null = null;
      if (requirePassphrase) {
        salt = generateSalt();
        encryptionKey = await deriveKeyFromPassphrase(passphrase, salt);
      } else {
        encryptionKey = await generateKey();
      }

      let ciphertext: string | undefined;
      let iv: string | undefined;
      if (contentTrimmed) {
        const encryptedText = await encrypt(contentTrimmed, encryptionKey);
        ciphertext = encryptedText.ciphertext;
        iv = encryptedText.iv;
      }

      let fileUrl: string | undefined;
      let fileType: string | undefined;
      let fileName: string | undefined;
      let fileSize: number | undefined;
      let fileIv: string | undefined;

      if (selectedFile) {
        setIsUploadingFile(true);
        const { file: fileToProcess } = await convertIfNeeded(selectedFile);
        const MAX_CLIENT_FILE_SIZE = 20 * 1024 * 1024;
        if (fileToProcess.size > MAX_CLIENT_FILE_SIZE) {
          throw new Error("File too large. Please choose a smaller image.");
        }
        const fileBuffer = await fileToProcess.arrayBuffer();
        const encryptedFileResult = await encryptFile(
          fileBuffer,
          encryptionKey
        );
        const encryptedFileBlob = new Blob(
          [base64ToBuffer(encryptedFileResult.ciphertext)],
          { type: "application/octet-stream" }
        );
        const formData = new FormData();
        formData.append("encryptedFile", encryptedFileBlob);
        formData.append("fileName", fileToProcess.name);
        formData.append("fileType", fileToProcess.type);
        formData.append("fileSize", fileToProcess.size.toString());
        formData.append("fileIv", encryptedFileResult.iv);

        const fileUploadResponse = await fetch("/api/upload-file", {
          method: "POST",
          body: formData,
        });

        if (!fileUploadResponse.ok) {
          const text = await fileUploadResponse.text();
          throw new Error(text || "File upload failed");
        }

        const result = await fileUploadResponse.json();
        fileUrl = result.blobUrl;
        fileType = result.fileType;
        fileName = result.fileName;
        fileSize = result.fileSize;
        fileIv = result.fileIv;

        setIsUploadingFile(false);
      }

      const passphraseHash = requirePassphrase
        ? await hashPassphrase(passphrase)
        : null;

      const expiresAt = calculateExpirationDate(expirationHours);

      const allowed_domains = allowedDomainsInput
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean);
      const custom_labels = customLabelsInput
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean);

      const secretMetadata: SecretMetadata = {
        ...(salt && { salt }),
        has_passphrase: requirePassphrase,
        require_auth: requireAuth,
        allow_download: allowFileDownload,
        watermarkText: watermarkText,
        allowed_domains:
          allowed_domains.length > 0 ? allowed_domains : undefined,
        custom_labels: custom_labels.length > 0 ? custom_labels : undefined,
      };

      const payload = {
        expires_at: expiresAt.toISOString(),
        max_views: maxViews,
        passphrase_hash: passphraseHash,
        encrypted_content: ciphertext,
        encryption_iv: iv,
        metadata: secretMetadata,
        has_file: !!selectedFile,
        file_url: fileUrl,
        file_type: fileType,
        file_name: fileName,
        file_size: fileSize,
        file_encryption_iv: fileIv,
      };

      const createResponse = await fetch("/api/links/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!createResponse.ok) {
        if (createResponse.status === 429) {
          setIsLimitReached(true);
          return;
        }
        const errorData = await createResponse.json();
        throw new Error(errorData.error || "Failed to create secret.");
      }

      const { short_id } = await createResponse.json();

      // The rest of the logic remains the same: navigate to success page
      const keyString = await exportKey(encryptionKey);
      router.push(
        `/create/success?id=${short_id}&key=${encodeURIComponent(keyString)}`
      );
    } catch (err) {
      console.error("Error creating secret:", err);
      setError(err instanceof Error ? err.message : "Failed to create secret");
    } finally {
      setIsLoading(false);
      setIsUploadingFile(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <AlertDialog open={isLimitReached} onOpenChange={setIsLimitReached}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Secure link limit reached</AlertDialogTitle>
            <AlertDialogDescription>
              For security reasons, free users can create up to 3 encrypted
              links. Create an account to continue with unlimited access.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => router.push("/sign-up")}>
              Sign Up
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="container max-w-3xl flex-1 py-12">
        <BackButton />
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-balance">
            Create a Secret
          </h1>
          <p className="text-muted-foreground">
            Share sensitive information securely with end-to-end encryption
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Secret Content</CardTitle>
            <CardDescription>
              Enter the information you want to share securely
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {defaultSettings && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="use-defaults"
                  checked={useDefaultSettings}
                  onCheckedChange={(checked) =>
                    setUseDefaultSettings(!!checked)
                  }
                />
                <label
                  htmlFor="use-defaults"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Use my default settings
                </label>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="content">Your Secret Text</Label>
              <Textarea
                id="content"
                placeholder="Enter passwords, API keys, confidential messages, or any sensitive information..."
                className="max-h-[100px] md:h-[150px] text-sm overflow-y-scroll"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                {content.length} characters
              </p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Paperclip className="h-4 w-4" />
                Attach File (Optional)
              </Label>
              <Input
                id="file-attachment"
                type="file"
                className="hidden"
                onChange={(e) =>
                  setSelectedFile(e.target.files ? e.target.files[0] : null)
                }
                accept="image/*,audio/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/plain"
              />
              {!selectedFile ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("file-attachment")?.click()
                  }
                >
                  <Paperclip className="mr-2 h-4 w-4" />
                  Choose File
                </Button>
              ) : (
                <div className="flex items-center justify-between rounded-md bg-muted p-3 text-sm">
                  <span className="truncate">
                    {selectedFile.name} ({Math.round(selectedFile.size / 1024)}{" "}
                    KB)
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Max file size: 20MB
              </p>
            </div>

            <Accordion type="multiple" className="space-y-4">
              {selectedFile && (
                <AccordionItem value="file-options">
                  <AccordionTrigger className="text-base font-medium">
                    <div className="flex items-center gap-2">
                      <Paperclip className="h-5 w-5" />
                      File Options
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="space-y-6 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="flex items-center gap-2">
                          Allow file download
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          If disabled, recipients can preview the file but
                          cannot download it.
                        </p>
                      </div>

                      <Switch
                        checked={allowFileDownload}
                        onCheckedChange={setAllowFileDownload}
                      />
                    </div>

                    {!allowFileDownload && (
                      <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-muted-foreground">
                        🔒 Download is disabled. The file can only be viewed
                        inside CipherOnce.
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              )}
              <AccordionItem value="limits">
                <AccordionTrigger className="text-base font-medium">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Expiration & View Limits
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="expiration"
                        className="flex items-center gap-2"
                      >
                        <Clock className="h-4 w-4" />
                        Expiration
                      </Label>
                      <Select
                        value={expirationHours.toString()}
                        onValueChange={(v) => setExpirationHours(Number(v))}
                        disabled={useDefaultSettings}
                      >
                        <SelectTrigger id="expiration">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SECRET_EXPIRATION_OPTIONS.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value.toString()}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Secret will be deleted after this time
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="maxViews"
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        Max Views
                      </Label>
                      <Select
                        value={maxViews.toString()}
                        onValueChange={(v) => setMaxViews(Number(v))}
                        disabled={useDefaultSettings}
                      >
                        <SelectTrigger id="maxViews">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {MAX_VIEW_OPTIONS.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value.toString()}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Secret will burn after this many views
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="passphrase">
                <AccordionTrigger className="text-base font-medium">
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Password Protection (Optional)
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="passphrase-toggle">
                        Require password
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Add an extra layer of protection
                      </p>
                    </div>
                    <Switch
                      id="passphrase-toggle"
                      checked={requirePassphrase}
                      onCheckedChange={setRequirePassphrase}
                      disabled={useDefaultSettings}
                    />
                  </div>

                  {requirePassphrase && (
                    <div className="space-y-2">
                      <Label htmlFor="passphrase">Password</Label>
                      <Input
                        id="passphrase"
                        type="password"
                        placeholder="Enter a password or pin (min. 4 characters)"
                        value={passphrase}
                        onChange={(e) => setPassphrase(e.target.value)}
                        disabled={useDefaultSettings}
                      />
                      <p className="text-xs text-muted-foreground">
                        Recipients will need this passphrase to view the secret
                      </p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="access">
                <AccordionTrigger className="text-base font-medium">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Advanced Access Rules (Optional)
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label
                        htmlFor="require-auth-toggle"
                        className="flex items-center gap-2"
                      >
                        <Users className="h-4 w-4" />
                        Require Authentication
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Only logged-in users can view this secret.
                      </p>
                    </div>
                    <Switch
                      id="require-auth-toggle"
                      checked={requireAuth}
                      onCheckedChange={setRequireAuth}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="custom-labels"
                      className="flex items-center gap-2"
                    >
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
                      Comma-separated labels for organizing your secrets.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20">
                {error}
              </div>
            )}

            <Button
              onClick={handleCreateSecret}
              disabled={
                isLoading ||
                isUploadingFile ||
                (!content.trim() && !selectedFile)
              }
              className="w-full"
              size="lg"
            >
              {isLoading || isUploadingFile ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isUploadingFile
                    ? "Uploading File..."
                    : "Creating Secure Link..."}
                </>
              ) : (
                "Create Secret Link"
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="mt-6 rounded-lg border bg-blue-500/5 p-4 border-blue-500/20">
          <div className="flex gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
            <div className="space-y-1 text-sm">
              <p className="font-medium text-blue-600">End-to-End Encrypted</p>
              <p className="text-muted-foreground">
                Your secret is encrypted in your browser before being sent to
                our servers. We never see your unencrypted data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
