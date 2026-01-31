import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

interface DefaultSettings {
  defaultExpiration?: number;
  defaultViewLimit?: number;
  defaultPassword?: string;
  watermarkText?: string;
  defaultAllowDownload?: boolean;
}

interface UseDefaultSettingsProps {
  setExpirationHours: (hours: number) => void;
  setMaxViews: (views: number) => void;
  setAllowFileDownload: (allow: boolean) => void;
  setWatermarkText: (text: string) => void;
  setRequirePassphrase: (require: boolean) => void;
  setPassphrase: (passphrase: string) => void;
  setOpenAccordionItems: (items: string[]) => void;
}

/**
 * Custom hook to manage user's default settings
 * Fetches and applies default settings from the database
 */
export function useDefaultSettings({
  setExpirationHours,
  setMaxViews,
  setAllowFileDownload,
  setWatermarkText,
  setRequirePassphrase,
  setPassphrase,
  setOpenAccordionItems,
}: UseDefaultSettingsProps) {
  const [useDefaultSettings, setUseDefaultSettings] = useState(false);
  const [defaultSettings, setDefaultSettings] = useState<DefaultSettings | null>(null);

  // Fetch default settings on mount
  useEffect(() => {
    const fetchDefaultSettings = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("default_settings")
        .eq("id", user.id)
        .single();

      if (profile?.default_settings) {
        setDefaultSettings(profile.default_settings);
      }
    };

    fetchDefaultSettings();
  }, []);

  // Apply default settings when enabled
  const applyDefaultSettings = useCallback(() => {
    if (!defaultSettings) return;

    setOpenAccordionItems([]);
    
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
    setWatermarkText(hasWatermarkText ? defaultSettings.watermarkText! : "cipheronce.com");
    setRequirePassphrase(hasDefaultPassword);
    setPassphrase(hasDefaultPassword ? defaultSettings.defaultPassword! : "");
  }, [
    defaultSettings,
    setExpirationHours,
    setMaxViews,
    setAllowFileDownload,
    setWatermarkText,
    setRequirePassphrase,
    setPassphrase,
    setOpenAccordionItems,
  ]);

  return {
    useDefaultSettings,
    setUseDefaultSettings,
    defaultSettings,
    applyDefaultSettings,
  };
}