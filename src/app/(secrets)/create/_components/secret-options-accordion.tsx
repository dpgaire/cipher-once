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

const accordionItemClass =
  "rounded-xl border border-white/5 bg-white/[0.02] px-5 transition-all duration-200 data-[state=open]:border-[#C9A84C]/15 data-[state=open]:bg-white/[0.04]";

const triggerIconClass = "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 group-data-[state=open]:border-[#C9A84C]/20 group-data-[state=open]:bg-[#C9A84C]/10";

export function SecretOptionsAccordion({
  selectedFile, expirationHours, setExpirationHours, maxViews, setMaxViews,
  requirePassphrase, setRequirePassphrase, passphrase, setPassphrase,
  allowFileDownload, setAllowFileDownload, requireAuth, setRequireAuth,
  customLabelsInput, setCustomLabelsInput, useDefaultSettings,
  openAccordionItems, setOpenAccordionItems,
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
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">
        Options
      </p>

      <Accordion
        type="multiple"
        className="space-y-2"
        value={openAccordionItems}
        onValueChange={setOpenAccordionItems}
      >
        {selectedFile && (
          <AccordionItem value="file-options" className={accordionItemClass}>
            <AccordionTrigger className="group py-4 text-sm font-semibold text-white hover:no-underline [&>svg]:text-[#6a6a7a] [&[data-state=open]>svg]:text-[#C9A84C]">
              <div className="flex items-center gap-3">
                <span className={triggerIconClass}>
                  <Paperclip className="h-3.5 w-3.5 text-[#6a6a7a] group-data-[state=open]:text-[#C9A84C]" />
                </span>
                File Options
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-5 pb-5 pt-1">
              <FileOptionsPanel allowFileDownload={allowFileDownload} onAllowFileDownloadChange={setAllowFileDownload} />
            </AccordionContent>
          </AccordionItem>
        )}

        <AccordionItem value="limits" className={accordionItemClass}>
          <AccordionTrigger className="group py-4 text-sm font-semibold text-white hover:no-underline [&>svg]:text-[#6a6a7a] [&[data-state=open]>svg]:text-[#C9A84C]">
            <div className="flex items-center gap-3">
              <span className={triggerIconClass}>
                <Clock className="h-3.5 w-3.5 text-[#6a6a7a] group-data-[state=open]:text-[#C9A84C]" />
              </span>
              Expiration & View Limits
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-5 pb-5 pt-1">
            <ExpirationLimitsPanel
              expirationHours={expirationHours} onExpirationChange={handleExpirationChange}
              maxViews={maxViews} onMaxViewsChange={handleMaxViewsChange}
              disabled={useDefaultSettings}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="passphrase" className={accordionItemClass}>
          <AccordionTrigger className="group py-4 text-sm font-semibold text-white hover:no-underline [&>svg]:text-[#6a6a7a] [&[data-state=open]>svg]:text-[#C9A84C]">
            <div className="flex items-center gap-3">
              <span className={triggerIconClass}>
                <Lock className="h-3.5 w-3.5 text-[#6a6a7a] group-data-[state=open]:text-[#C9A84C]" />
              </span>
              Password Protection
              <span className="ml-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#4a4a5a]">
                Optional
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-5 pb-5 pt-1">
            <PassphrasePanel
              requirePassphrase={requirePassphrase} onRequirePassphraseChange={setRequirePassphrase}
              passphrase={passphrase} onPassphraseChange={setPassphrase}
              disabled={useDefaultSettings}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="access" className={accordionItemClass}>
          <AccordionTrigger className="group py-4 text-sm font-semibold text-white hover:no-underline [&>svg]:text-[#6a6a7a] [&[data-state=open]>svg]:text-[#C9A84C]">
            <div className="flex items-center gap-3">
              <span className={triggerIconClass}>
                <Shield className="h-3.5 w-3.5 text-[#6a6a7a] group-data-[state=open]:text-[#C9A84C]" />
              </span>
              Advanced Access Rules
              <span className="ml-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#4a4a5a]">
                Optional
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-5 pb-5 pt-1">
            <AdvancedAccessPanel
              requireAuth={requireAuth} onRequireAuthChange={setRequireAuth}
              customLabelsInput={customLabelsInput} onCustomLabelsInputChange={setCustomLabelsInput}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}