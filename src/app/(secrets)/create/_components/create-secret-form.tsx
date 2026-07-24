"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Shield, Lock, ArrowRight, Sparkles } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { SecretContentSection } from "../_components/secret-content-section";
import { FileUploadSection } from "../_components/file-upload-section";
import { SecretOptionsAccordion } from "../_components/secret-options-accordion";
import { ErrorAlert } from "../_components/error-alert";
import { SecurityNotice } from "../_components/security-notice";
import { LimitReachedDialog } from "../_components/limit-reached-dialog";
import { EncryptionProgress } from "../_components/encryption-progress";
import { SecretTemplates } from "../_components/secret-templates";
import type { SecretTemplate } from "../_components/secret-templates";
import { SecretAnalyzer } from "../_components/secret-analyzer";
import { LivePreview } from "../_components/live-preview";
import { SecretJourneyBanner } from "../../_components/secret-journey-banner";

import { useSecretForm } from "../_hooks/use-secret-form";
import { useDefaultSettings } from "../_hooks/use-default-settings";
import { useFileUpload } from "../_hooks/use-file-upload";
import { createSecretService } from "../_services/create-secret-service";
import { SECRET_EXPIRATION_OPTIONS } from "@/lib/utils";

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

  const expirationLabel = useMemo(() => {
    const opt = SECRET_EXPIRATION_OPTIONS.find((o) => o.value === expirationHours);
    return opt ? opt.label : `${expirationHours}h`;
  }, [expirationHours]);

  const handleUseDefaultSettingsChange = useCallback((checked: boolean) => {
    setUseDefaultSettings(checked);
    if (checked) applyDefaultSettings();
  }, [setUseDefaultSettings, applyDefaultSettings]);

  const handleTemplateSelect = useCallback((template: SecretTemplate) => {
    setContent(template.exampleContent);
    setExpirationHours(template.suggestedExpiration);
    setMaxViews(template.suggestedViews);
    setRequirePassphrase(template.suggestPassphrase);
    setRequireAuth(template.suggestAuth);
    setOpenAccordionItems(["limits", "passphrase"]);
  }, [setContent, setExpirationHours, setMaxViews, setRequirePassphrase, setRequireAuth, setOpenAccordionItems]);

  const handleAnalyzerSuggestion = useCallback((suggestion: {
    maxViews: number; requirePassphrase: boolean; expirationHours: number; requireAuth: boolean;
  }) => {
    setMaxViews(suggestion.maxViews);
    setRequirePassphrase(suggestion.requirePassphrase);
    setExpirationHours(suggestion.expirationHours);
    setRequireAuth(suggestion.requireAuth);
    setOpenAccordionItems(["limits", "passphrase"]);
  }, [setMaxViews, setRequirePassphrase, setExpirationHours, setRequireAuth, setOpenAccordionItems]);

  const handleCreateSecret = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const result = await createSecretService({
        content: content.trim(), expirationHours, maxViews, requirePassphrase,
        passphrase, allowFileDownload, watermarkText, requireAuth,
        allowedDomainsInput, customLabelsInput, selectedFile, setIsUploadingFile,
      });
      const params = new URLSearchParams({
        id: result.shortId,
        key: encodeURIComponent(result.keyString),
        expires: `${expirationHours}h`,
        views: String(maxViews),
        hasPassword: String(requirePassphrase),
        requireAuth: String(requireAuth),
      });
      router.push(`/create/success?${params.toString()}`);
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
    <div className="relative min-h-dvh bg-[#0a0a0f]">
      <div className="pointer-events-none fixed left-1/2 top-0 h-[600px] w-[700px] -translate-x-1/2 rounded-full bg-[#C9A84C]/5 blur-[120px]" />

      <LimitReachedDialog isOpen={isLimitReached} onOpenChange={setIsLimitReached} onSignUp={() => router.push("/sign-up")} />

      <div className="relative mx-auto flex min-h-dvh max-w-6xl flex-col px-4 py-8 lg:py-10">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-[#C9A84C]/20 bg-gradient-to-b from-[#C9A84C]/8 to-transparent">
            <Shield className="h-5 w-5 text-[#C9A84C]" />
          </div>
          <h1 className="mb-1 text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Create a Secret
          </h1>
          <p className="text-sm text-[#6a6a7a]">
            Encrypted in your browser — we never see what you share
          </p>
        </div>

        {/* Journey Banner */}
        <div className="mx-auto mb-6 w-full max-w-xl">
          <div className="rounded-lg border border-white/[0.04] bg-white/[0.02] px-4 py-2">
            <SecretJourneyBanner currentStep="create" compact />
          </div>
        </div>

        {/* Split layout */}
        <div className="flex flex-1 flex-col gap-6 lg:flex-row lg:items-start">
          {/* Left: Form */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <div className="rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-5">
              <div className="space-y-5">
                <SecretTemplates onSelect={handleTemplateSelect} />

                {defaultSettings && (
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2.5 transition-all hover:bg-white/[0.04]">
                    <Checkbox
                      id="use-defaults"
                      checked={isUsingDefaultSettings}
                      onCheckedChange={handleUseDefaultSettingsChange}
                      className="border-white/10 bg-white/5 data-[state=checked]:border-[#C9A84C]/40 data-[state=checked]:bg-[#C9A84C]/20"
                    />
                    <div>
                      <p className="text-sm font-medium text-white">Use my default settings</p>
                      <p className="text-xs text-[#4a4a5a]">Apply saved configuration</p>
                    </div>
                  </label>
                )}

                <SecretContentSection content={content} onContentChange={setContent} />
                <FileUploadSection selectedFile={selectedFile} onFileChange={setSelectedFile} />

                <SecretAnalyzer content={content} onApplySuggestion={handleAnalyzerSuggestion} />

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

                {isLoading || isUploadingFile ? (
                  <EncryptionProgress isActive={true} />
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={handleCreateSecret}
                      disabled={isSubmitDisabled}
                      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#C9A84C] py-3 text-sm font-bold text-[#0a0a0f] shadow-[0_0_20px_rgba(201,168,76,0.12)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.25)] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <span>Create Secret Link</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      <div className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0 skew-x-12" />
                    </button>
                    <p className="text-center text-xs text-[#4a4a5a]">
                      Your secret is encrypted locally. We never see the content.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <SecurityNotice />
          </div>

          {/* Right: Live Preview */}
          <div className="hidden lg:block w-[340px] xl:w-[360px] shrink-0">
            <LivePreview
              content={content}
              selectedFile={selectedFile}
              expirationLabel={expirationLabel}
              maxViews={maxViews}
              requirePassphrase={requirePassphrase}
              requireAuth={requireAuth}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
