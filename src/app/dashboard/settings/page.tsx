"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  MAX_VIEW_OPTIONS,
  SECRET_EXPIRATION_OPTIONS,
} from "@/features/secrets/domain/secret-utils";
import type { User } from "@supabase/supabase-js";

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    theme: "system",
    defaultExpiration: 1,
    defaultViewLimit: 5,
    defaultAllowDownload: false,
    defaultPassword: "",
  });
  const { setTheme } = useTheme();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUserSettings = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data: profile } = await supabase
          .from("profiles")
          .select("default_settings")
          .eq("id", user.id)
          .single();

        if (profile && profile.default_settings) {
          setSettings((s) => ({ ...s, ...profile.default_settings }));
        }
      } else {
        router.push("/auth/login");
      }
      setLoading(false);
    };
    fetchUserSettings();
  }, [supabase, router]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ default_settings: settings })
      .eq("id", user.id);

    if (error) {
      toast({
        title: "Error saving settings",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Settings saved successfully" });
      setTheme(settings.theme);
    }
    setSaving(false);
  };

  const handleInputChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Default Secret Settings</CardTitle>
          <CardDescription>
            Configure your default options when creating a new secret.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Allow file download by default</Label>
              <p className="text-xs text-muted-foreground">
                If disabled, recipients can preview files but cannot download
                them unless explicitly allowed.
              </p>
            </div>
            <Switch
              checked={settings.defaultAllowDownload}
              onCheckedChange={(checked) =>
                handleInputChange("defaultAllowDownload", checked)
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Theme</Label>
            <Select
              value={settings.theme}
              onValueChange={(value) => handleInputChange("theme", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Default Expiration</Label>
            <Select
              value={settings.defaultExpiration.toString()}
              onValueChange={(value) =>
                handleInputChange("defaultExpiration", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select expiration" />
              </SelectTrigger>
              <SelectContent>
                {SECRET_EXPIRATION_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value.toString()}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Default View Limit</Label>
            <Select
              value={settings.defaultViewLimit.toString()}
              onValueChange={(value) =>
                handleInputChange("defaultViewLimit", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select expiration" />
              </SelectTrigger>
              <SelectContent>
                {MAX_VIEW_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value.toString()}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Default Password</Label>
            <Input
              type="password"
              value={settings.defaultPassword}
              onChange={(e) =>
                handleInputChange("defaultPassword", e.target.value)
              }
              placeholder="Leave blank for no password"
            />
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
