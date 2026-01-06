"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { getSettings, saveSettings } from "../services";
import { getUser } from "@/features/profile/services";
import type { Settings } from "../types";
import type { User } from "@supabase/supabase-js";
import { toast } from "sonner";

const defaultSettings: Settings = {
  theme: "system",
  defaultExpiration: "1",
  defaultViewLimit: "5",
  defaultAllowDownload: false,
  defaultPassword: "",
  watermarkText: "",
};

export function useSettings() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const { setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const fetchUserSettings = async () => {
      const currentUser = await getUser();
      if (currentUser) {
        setUser(currentUser);
        const savedSettings = await getSettings(currentUser.id);
        if (savedSettings) {
          setSettings((s) => ({ ...s, ...savedSettings }));
        }
      } else {
        router.push("/login");
      }
      setLoading(false);
    };
    fetchUserSettings();
  }, [router]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await saveSettings(user.id, settings);

    if (error) {
      toast.error("Failed to save default setting from server ");
    } else {
      toast.success("Default setting update successfully!");

      setTheme(settings.theme);
    }
    setSaving(false);
  };

  const handleInputChange = useCallback((key: keyof Settings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  return { loading, saving, settings, handleSave, handleInputChange };
}
