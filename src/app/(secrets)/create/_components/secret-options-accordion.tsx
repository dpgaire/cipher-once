import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, Lock, Paperclip, Shield } from "lucide-react";

import { FileOptionsPanel } from "./file-options-panel";
import { ExpirationLimitsPanel } from "./expiration-limits-panel";
import { PassphrasePanel } from "./passphrase-panel";
import { AdvancedAccessPanel } from "./advanced-access-panel";

interface SecretOptionsAccordionProps {
  selectedFile: File | null;
  expirationHours: number;
  setExpirationHours: (hours: number) => void;
  maxViews: number;
  setMaxViews: (views: number) => void;
  requirePassphrase: boolean;
  setRequirePassphrase: (require: boolean) => void;
  passphrase: string;
  setPassphrase: (passphrase: string) => void;
  allowFileDownload: boolean;
  setAllowFileDownload: (allow: boolean) => void;
  requireAuth: boolean;
  setRequireAuth: (require: boolean) => void;
  customLabelsInput: string;
  setCustomLabelsInput: (labels: string) => void;
  useDefaultSettings: boolean;
  openAccordionItems: string[];
  setOpenAccordionItems: (items: string[] | ((prev: string[]) => string[])) => void;
}

/**
 * Accordion component containing all secret configuration options
 */
export function SecretOptionsAccordion({
  selectedFile,
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
  requireAuth,
  setRequireAuth,
  customLabelsInput,
  setCustomLabelsInput,
  useDefaultSettings,
  openAccordionItems,
  setOpenAccordionItems,
}: SecretOptionsAccordionProps) {
  const handleExpirationChange = (value: string) => {
    setExpirationHours(Number(value));
    if (!useDefaultSettings) {
      setOpenAccordionItems((prev) =>
        prev.includes("passphrase") ? prev : [...prev, "passphrase"]
      );
    }
  };

  const handleMaxViewsChange = (value: string) => {
    setMaxViews(Number(value));
    if (!useDefaultSettings) {
      setOpenAccordionItems((prev) =>
        prev.includes("passphrase") ? prev : [...prev, "passphrase"]
      );
    }
  };

  return (
    <Accordion
      type="multiple"
      className="space-y-4"
      value={openAccordionItems}
      onValueChange={setOpenAccordionItems}
    >
      {selectedFile && (
        <AccordionItem value="file-options">
          <AccordionTrigger className="text-base font-medium">
            <div className="flex items-center gap-2">
              <Paperclip className="h-5 w-5" />
              File Options
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-6 pt-4">
            <FileOptionsPanel
              allowFileDownload={allowFileDownload}
              onAllowFileDownloadChange={setAllowFileDownload}
            />
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
          <ExpirationLimitsPanel
            expirationHours={expirationHours}
            onExpirationChange={handleExpirationChange}
            maxViews={maxViews}
            onMaxViewsChange={handleMaxViewsChange}
            disabled={useDefaultSettings}
          />
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
          <PassphrasePanel
            requirePassphrase={requirePassphrase}
            onRequirePassphraseChange={setRequirePassphrase}
            passphrase={passphrase}
            onPassphraseChange={setPassphrase}
            disabled={useDefaultSettings}
          />
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
          <AdvancedAccessPanel
            requireAuth={requireAuth}
            onRequireAuthChange={setRequireAuth}
            customLabelsInput={customLabelsInput}
            onCustomLabelsInputChange={setCustomLabelsInput}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}