import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Eye } from "lucide-react";
import {
  SECRET_EXPIRATION_OPTIONS,
  MAX_VIEW_OPTIONS,
} from "@/features/secrets/domain/secret-utils";

interface ExpirationLimitsPanelProps {
  expirationHours: number;
  onExpirationChange: (value: string) => void;
  maxViews: number;
  onMaxViewsChange: (value: string) => void;
  disabled?: boolean;
}

/**
 * Panel for configuring expiration and view limits
 */
export function ExpirationLimitsPanel({
  expirationHours,
  onExpirationChange,
  maxViews,
  onMaxViewsChange,
  disabled = false,
}: ExpirationLimitsPanelProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="expiration" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Expiration
        </Label>
        <Select
          value={expirationHours.toString()}
          onValueChange={onExpirationChange}
          disabled={disabled}
        >
          <SelectTrigger id="expiration">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SECRET_EXPIRATION_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Secret will be deleted after this time
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="maxViews" className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          Max Views
        </Label>
        <Select
          value={maxViews.toString()}
          onValueChange={onMaxViewsChange}
          disabled={disabled}
        >
          <SelectTrigger id="maxViews">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MAX_VIEW_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Secret will burn after this many views
        </p>
      </div>
    </div>
  );
}