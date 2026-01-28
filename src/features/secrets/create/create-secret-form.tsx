"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Shield } from "lucide-react";

import { SecretContentSection } from "./components/secret-content-section";
import { FileUploadSection } from "./components/file-upload-section";
import { SecretOptionsAccordion } from "./components/secret-options-accordion";
import { ErrorAlert } from "./components/error-alert";
import { SecurityNotice } from "./components/security-notice";
import { LimitReachedDialog } from "./components/limit-reached-dialog";
import { BackButton } from "@/features/core/components/back-button";

import { useSecretForm } from "./hooks/use-secret-form";
import { useDefaultSettings } from "./hooks/use-default-settings";
import { useFileUpload } from "./hooks/use-file-upload";
import { createSecretService } from "./services/create-secret-service";

export function CreateSecretForm() {
  const router = useRouter();

  // Separate concerns into custom hooks
  const {
    content,
    setContent,
    expirationHours,
    setExpirationHours,
    maxViews,
    setMaxViews,
    requirePassphrase,
    setRequirePassphrase,
    passphrase,
    setPassphrase,
    allowFileDownload,
    setAllowFileDownload,
    watermarkText,
    setWatermarkText,
    requireAuth,
    setRequireAuth,
    allowedDomainsInput,
    setAllowedDomainsInput,
    customLabelsInput,
    setCustomLabelsInput,
    openAccordionItems,
    setOpenAccordionItems,
  } = useSecretForm();

  const {
    useDefaultSettings: isUsingDefaultSettings,
    setUseDefaultSettings,
    defaultSettings,
    applyDefaultSettings,
  } = useDefaultSettings({
    setExpirationHours,
    setMaxViews,
    setAllowFileDownload,
    setWatermarkText,
    setRequirePassphrase,
    setPassphrase,
    setOpenAccordionItems,
  });
  const { selectedFile, setSelectedFile, isUploadingFile, setIsUploadingFile } =
    useFileUpload();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLimitReached, setIsLimitReached] = useState(false);

  // Apply default settings when checkbox changes
  const handleUseDefaultSettingsChange = useCallback(
    (checked: boolean) => {
      setUseDefaultSettings(checked);
      if (checked) {
        applyDefaultSettings();
      }
    },
    [setUseDefaultSettings, applyDefaultSettings]
  );

  // Handle secret creation
  const handleCreateSecret = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const secretData = {
        content: content.trim(),
        expirationHours,
        maxViews,
        requirePassphrase,
        passphrase,
        allowFileDownload,
        watermarkText,
        requireAuth,
        allowedDomainsInput,
        customLabelsInput,
        selectedFile,
      };

      const result = await createSecretService({
        ...secretData,
        setIsUploadingFile,
      });

      // Navigate to success page
      router.push(
        `/create/success?id=${result.shortId}&key=${encodeURIComponent(
          result.keyString
        )}`
      );
    } catch (err) {
      console.error("Error creating secret:", err);

      if (err instanceof Error && err.message === "LIMIT_REACHED") {
        setIsLimitReached(true);
      } else {
        setError(
          err instanceof Error ? err.message : "Failed to create secret"
        );
      }
    } finally {
      setIsLoading(false);
      setIsUploadingFile(false);
    }
  }, [
    content,
    expirationHours,
    maxViews,
    requirePassphrase,
    passphrase,
    allowFileDownload,
    watermarkText,
    requireAuth,
    allowedDomainsInput,
    customLabelsInput,
    selectedFile,
    router,
    setIsUploadingFile,
  ]);

  const isSubmitDisabled =
    isLoading || isUploadingFile || (!content.trim() && !selectedFile);

  return (
    <div className="flex min-h-screen flex-col">
      <LimitReachedDialog
        isOpen={isLimitReached}
        onOpenChange={setIsLimitReached}
        onSignUp={() => router.push("/sign-up")}
      />

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
                  checked={isUsingDefaultSettings}
                  onCheckedChange={handleUseDefaultSettingsChange}
                />
                <label
                  htmlFor="use-defaults"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Use my default settings
                </label>
              </div>
            )}

            <SecretContentSection
              content={content}
              onContentChange={setContent}
            />

            <FileUploadSection
              selectedFile={selectedFile}
              onFileChange={setSelectedFile}
            />

            <SecretOptionsAccordion
              selectedFile={selectedFile}
              expirationHours={expirationHours}
              setExpirationHours={setExpirationHours}
              maxViews={maxViews}
              setMaxViews={setMaxViews}
              requirePassphrase={requirePassphrase}
              setRequirePassphrase={setRequirePassphrase}
              passphrase={passphrase}
              setPassphrase={setPassphrase}
              allowFileDownload={allowFileDownload}
              setAllowFileDownload={setAllowFileDownload}
              requireAuth={requireAuth}
              setRequireAuth={setRequireAuth}
              customLabelsInput={customLabelsInput}
              setCustomLabelsInput={setCustomLabelsInput}
              useDefaultSettings={isUsingDefaultSettings}
              openAccordionItems={openAccordionItems}
              setOpenAccordionItems={setOpenAccordionItems}
            />

            <ErrorAlert error={error} />

            <Button
              onClick={handleCreateSecret}
              disabled={isSubmitDisabled}
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

        <SecurityNotice />
      </div>
    </div>
  );
}
