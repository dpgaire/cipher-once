import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface FileOptionsPanelProps {
  allowFileDownload: boolean;
  onAllowFileDownloadChange: (allow: boolean) => void;
}

/**
 * Panel for configuring file download options
 */
export function FileOptionsPanel({
  allowFileDownload,
  onAllowFileDownloadChange,
}: FileOptionsPanelProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="flex items-center gap-2">Allow file download</Label>
          <p className="text-xs text-muted-foreground">
            If disabled, recipients can preview the file but cannot download it.
          </p>
        </div>
        <Switch
          checked={allowFileDownload}
          onCheckedChange={onAllowFileDownloadChange}
        />
      </div>

      {!allowFileDownload && (
        <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-muted-foreground">
          🔒 Download is disabled. The file can only be viewed inside CipherOnce.
        </div>
      )}
    </>
  );
}