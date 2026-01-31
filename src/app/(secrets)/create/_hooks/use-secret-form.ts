import { useState, useEffect, useCallback } from "react";

interface UseSecretFormReturn {
  content: string;
  setContent: (content: string) => void;
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
  watermarkText: string;
  setWatermarkText: (text: string) => void;
  requireAuth: boolean;
  setRequireAuth: (require: boolean) => void;
  allowedDomainsInput: string;
  setAllowedDomainsInput: (domains: string) => void;
  customLabelsInput: string;
  setCustomLabelsInput: (labels: string) => void;
  openAccordionItems: string[];
  setOpenAccordionItems: (items: string[] | ((prev: string[]) => string[])) => void;
}

/**
 * Custom hook to manage secret form state
 * Separates state management from UI logic for better testability
 */
export function useSecretForm(): UseSecretFormReturn {
  const [content, setContent] = useState("");
  const [expirationHours, setExpirationHours] = useState(24);
  const [maxViews, setMaxViews] = useState(1);
  const [requirePassphrase, setRequirePassphrase] = useState(false);
  const [passphrase, setPassphrase] = useState("");
  const [allowFileDownload, setAllowFileDownload] = useState(false);
  const [watermarkText, setWatermarkText] = useState("cipheronce.com");
  const [requireAuth, setRequireAuth] = useState(false);
  const [allowedDomainsInput, setAllowedDomainsInput] = useState("");
  const [customLabelsInput, setCustomLabelsInput] = useState("");
  const [openAccordionItems, setOpenAccordionItems] = useState<string[]>([]);

  return {
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
  };
}