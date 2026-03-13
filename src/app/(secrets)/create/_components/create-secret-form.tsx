"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Shield, Lock, ArrowRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { SecretContentSection } from "../_components/secret-content-section";
import { FileUploadSection } from "../_components/file-upload-section";
import { SecretOptionsAccordion } from "../_components/secret-options-accordion";
import { ErrorAlert } from "../_components/error-alert";
import { SecurityNotice } from "../_components/security-notice";
import { LimitReachedDialog } from "../_components/limit-reached-dialog";

import { useSecretForm } from "../_hooks/use-secret-form";
import { useDefaultSettings } from "../_hooks/use-default-settings";
import { useFileUpload } from "../_hooks/use-file-upload";
import { createSecretService } from "../_services/create-secret-service";

export function CreateSecretForm() {
  const router = useRouter();

  const {
    content, setContent,
    expirationHours, setExpirationHours,
    maxViews, setMaxViews,
    requirePassphrase, setRequirePassphrase,
    passphrase, setPassphrase,
    allowFileDownload, setAllowFileDownload,
    watermarkText, setWatermarkText,
    requireAuth, setRequireAuth,
    allowedDomainsInput, setAllowedDomainsInput,
    customLabelsInput, setCustomLabelsInput,
    openAccordionItems, setOpenAccordionItems,
  } = useSecretForm();

  const {
    useDefaultSettings: isUsingDefaultSettings,
    setUseDefaultSettings,
    defaultSettings,
    applyDefaultSettings,
  } = useDefaultSettings({
    setExpirationHours, setMaxViews, setAllowFileDownload,
    setWatermarkText, setRequirePassphrase, setPassphrase, setOpenAccordionItems,
  });

  const { selectedFile, setSelectedFile, isUploadingFile, setIsUploadingFile } = useFileUpload();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLimitReached, setIsLimitReached] = useState(false);

  const handleUseDefaultSettingsChange = useCallback((checked: boolean) => {
    setUseDefaultSettings(checked);
    if (checked) applyDefaultSettings();
  }, [setUseDefaultSettings, applyDefaultSettings]);

  const handleCreateSecret = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const result = await createSecretService({
        content: content.trim(), expirationHours, maxViews, requirePassphrase,
        passphrase, allowFileDownload, watermarkText, requireAuth,
        allowedDomainsInput, customLabelsInput, selectedFile, setIsUploadingFile,
      });
      router.push(`/create/success?id=${result.shortId}&key=${encodeURIComponent(result.keyString)}`);
    } catch (err) {
      if (err instanceof Error && err.message === "LIMIT_REACHED") {
        setIsLimitReached(true);
      } else {
        setError(err instanceof Error ? err.message : "Failed to create secret");
      }
    } finally {
      setIsLoading(false);
      setIsUploadingFile(false);
    }
  }, [content, expirationHours, maxViews, requirePassphrase, passphrase, allowFileDownload,
    watermarkText, requireAuth, allowedDomainsInput, customLabelsInput, selectedFile, router, setIsUploadingFile]);

  const isSubmitDisabled = isLoading || isUploadingFile || (!content.trim() && !selectedFile);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0f]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[700px] -translate-x-1/2 rounded-full bg-[#C9A84C]/5 blur-[120px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)", backgroundSize: "60px 60px" }}
      />

      <LimitReachedDialog isOpen={isLimitReached} onOpenChange={setIsLimitReached} onSignUp={() => router.push("/sign-up")} />

      <div className="container relative mx-auto max-w-2xl px-4 py-16">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C9A84C]/30 bg-[#C9A84C]/10 shadow-[0_0_30px_rgba(201,168,76,0.15)]">
            <Shield className="h-7 w-7 text-[#C9A84C]" />
          </div>
          <h1
            className="mb-2 text-4xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Create a Secret
          </h1>
          <p className="text-sm text-[#6a6a7a]">
            Share sensitive information securely with end-to-end encryption
          </p>
        </div>

        {/* Main card */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm">
          {/* Card header */}
          <div className="mb-6 border-b border-white/5 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#C9A84C]/20 bg-[#C9A84C]/10">
                <Lock className="h-4 w-4 text-[#C9A84C]" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Secret Content</p>
                <p className="text-xs text-[#4a4a5a]">Enter the information you want to share securely</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Default settings toggle */}
            {defaultSettings && (
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 transition-colors hover:bg-white/[0.04]">
                <Checkbox
                  id="use-defaults"
                  checked={isUsingDefaultSettings}
                  onCheckedChange={handleUseDefaultSettingsChange}
                  className="border-white/10 bg-white/5 data-[state=checked]:border-[#C9A84C]/50 data-[state=checked]:bg-[#C9A84C]/20"
                />
                <div>
                  <p className="text-sm font-medium text-white">Use my default settings</p>
                  <p className="text-xs text-[#4a4a5a]">Apply your saved configuration preferences</p>
                </div>
              </label>
            )}

            <SecretContentSection content={content} onContentChange={setContent} />
            <FileUploadSection selectedFile={selectedFile} onFileChange={setSelectedFile} />
            <SecretOptionsAccordion
              selectedFile={selectedFile}
              expirationHours={expirationHours} setExpirationHours={setExpirationHours}
              maxViews={maxViews} setMaxViews={setMaxViews}
              requirePassphrase={requirePassphrase} setRequirePassphrase={setRequirePassphrase}
              passphrase={passphrase} setPassphrase={setPassphrase}
              allowFileDownload={allowFileDownload} setAllowFileDownload={setAllowFileDownload}
              requireAuth={requireAuth} setRequireAuth={setRequireAuth}
              customLabelsInput={customLabelsInput} setCustomLabelsInput={setCustomLabelsInput}
              useDefaultSettings={isUsingDefaultSettings}
              openAccordionItems={openAccordionItems} setOpenAccordionItems={setOpenAccordionItems}
            />
            <ErrorAlert error={error} />

            {/* Submit */}
            <button
              onClick={handleCreateSecret}
              disabled={isSubmitDisabled}
              className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-lg bg-[#C9A84C] py-4 text-sm font-bold text-[#0a0a0f] shadow-[0_0_30px_rgba(201,168,76,0.2)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(201,168,76,0.4)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLoading || isUploadingFile ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {isUploadingFile ? "Uploading file..." : "Creating secure link..."}
                </span>
              ) : (
                <>
                  <span>Create Secret Link</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  <div className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0 skew-x-12" />
                </>
              )}
            </button>
          </div>
        </div>

        <SecurityNotice />
      </div>
    </div>
  );
}