"use client";

import { useSettings } from "../hooks/use-settings";
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
import {
  MAX_VIEW_OPTIONS,
  SECRET_EXPIRATION_OPTIONS,
} from "@/features/secrets/domain/secret-utils";
import { CardSkeleton } from "@/features/core/components";

function SettingsSkeleton() {
  return (
    <div className="container max-w-7xl mx-auto py-8">
      <div className="h-8 w-48 bg-muted rounded animate-pulse mb-6" />
      <CardSkeleton lines={5} />
    </div>
  );
}

export function SettingsForm() {
  const { loading, saving, settings, handleSave, handleInputChange } =
    useSettings();

  if (loading) {
    return <SettingsSkeleton />;
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
          {!settings.defaultAllowDownload && (
            <div className="space-y-2">
              <Label>Default Watermark Text</Label>
              <Input
                value={settings.watermarkText || ""}
                onChange={(e) =>
                  handleInputChange("watermarkText", e.target.value)
                }
                placeholder="e.g. cipheronce.com"
              />
              <p className="text-xs text-muted-foreground">
                This watermark will be embedded into image & PDF previews when
                downloads are disabled.
              </p>
            </div>
          )}
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
              value={String(settings.defaultExpiration)}
              onValueChange={(value) =>
                handleInputChange("defaultExpiration", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select expiration" />
              </SelectTrigger>
              <SelectContent>
                {SECRET_EXPIRATION_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={String(opt.value)}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Default View Limit</Label>
            <Select
              value={String(settings.defaultViewLimit)}
              onValueChange={(value) =>
                handleInputChange("defaultViewLimit", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select expiration" />
              </SelectTrigger>
              <SelectContent>
                {MAX_VIEW_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={String(opt.value)}>
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
