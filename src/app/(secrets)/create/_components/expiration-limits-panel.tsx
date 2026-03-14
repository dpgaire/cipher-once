import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Clock, Eye } from "lucide-react";
import { SECRET_EXPIRATION_OPTIONS, MAX_VIEW_OPTIONS } from "@/lib/utils";

interface ExpirationLimitsPanelProps {
  expirationHours: number;
  onExpirationChange: (value: string) => void;
  maxViews: number;
  onMaxViewsChange: (value: string) => void;
  disabled?: boolean;
}

const selectTriggerClass =
  "rounded-lg border border-white/5 bg-white/[0.03] text-sm text-white h-11 focus:border-[#C9A84C]/40 focus:ring-0 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)] data-[placeholder]:text-[#4a4a5a] [&_svg]:text-[#6a6a7a]";

export function ExpirationLimitsPanel({
  expirationHours, onExpirationChange, maxViews, onMaxViewsChange, disabled = false,
}: ExpirationLimitsPanelProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="space-y-1.5">
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">
          <Clock className="h-3.5 w-3.5" />
          Expiration
        </label>
        <Select value={expirationHours.toString()} onValueChange={onExpirationChange} disabled={disabled}>
          <SelectTrigger id="expiration" className={selectTriggerClass}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-white/5 bg-[#0d0d14] text-white">
            {SECRET_EXPIRATION_OPTIONS.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value.toString()}
                className="text-[#8a8a9a] focus:bg-[#C9A84C]/10 focus:text-white"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-[10px] text-[#4a4a5a]">Secret deleted after this time</p>
      </div>

      <div className="space-y-1.5">
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">
          <Eye className="h-3.5 w-3.5" />
          Max views
        </label>
        <Select value={maxViews.toString()} onValueChange={onMaxViewsChange} disabled={disabled}>
          <SelectTrigger id="maxViews" className={selectTriggerClass}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-white/5 bg-[#0d0d14] text-white">
            {MAX_VIEW_OPTIONS.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value.toString()}
                className="text-[#8a8a9a] focus:bg-[#C9A84C]/10 focus:text-white"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-[10px] text-[#4a4a5a]">Secret burns after this many views</p>
      </div>
    </div>
  );
}