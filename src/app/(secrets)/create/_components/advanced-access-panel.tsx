import { Switch } from "@/components/ui/switch";
import { Tag, Users } from "lucide-react";

interface AdvancedAccessPanelProps {
  requireAuth: boolean;
  onRequireAuthChange: (require: boolean) => void;
  customLabelsInput: string;
  onCustomLabelsInputChange: (labels: string) => void;
}

export function AdvancedAccessPanel({
  requireAuth, onRequireAuthChange, customLabelsInput, onCustomLabelsInputChange,
}: AdvancedAccessPanelProps) {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-[#C9A84C]" />
            <p className="text-sm font-semibold text-white">Require authentication</p>
          </div>
          <p className="text-xs text-[#4a4a5a]">Only logged-in users can view this secret.</p>
        </div>
        <Switch
          id="require-auth-toggle"
          checked={requireAuth}
          onCheckedChange={onRequireAuthChange}
          className="data-[state=checked]:bg-[#C9A84C]"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="custom-labels"
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]"
        >
          <Tag className="h-3.5 w-3.5" />
          Custom labels
        </label>
        <input
          id="custom-labels"
          type="text"
          placeholder="e.g., project-x, client-a"
          value={customLabelsInput}
          onChange={(e) => onCustomLabelsInputChange(e.target.value)}
          className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-[#4a4a5a] outline-none transition-all duration-200 focus:border-[#C9A84C]/40 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)]"
        />
        <p className="text-[10px] text-[#4a4a5a]">Comma-separated labels for organizing your secrets</p>
      </div>
    </>
  );
}