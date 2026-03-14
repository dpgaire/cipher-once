import { Switch } from "@/components/ui/switch";

interface FileOptionsPanelProps {
  allowFileDownload: boolean;
  onAllowFileDownloadChange: (allow: boolean) => void;
}

export function FileOptionsPanel({ allowFileDownload, onAllowFileDownloadChange }: FileOptionsPanelProps) {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="mb-1 text-sm font-semibold text-white">Allow file download</p>
          <p className="text-xs text-[#4a4a5a]">
            If disabled, recipients can preview but cannot download.
          </p>
        </div>
        <Switch
          checked={allowFileDownload}
          onCheckedChange={onAllowFileDownloadChange}
          className="data-[state=checked]:bg-[#C9A84C]"
        />
      </div>

      {!allowFileDownload && (
        <div className="flex items-center gap-3 rounded-lg border border-amber-500/15 bg-amber-500/5 px-4 py-3">
          <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
          <p className="text-xs text-amber-400/80">
            Download disabled. The file can only be viewed inside CipherOnce.
          </p>
        </div>
      )}
    </>
  );
}