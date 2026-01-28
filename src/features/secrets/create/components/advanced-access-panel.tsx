import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tag, Users } from "lucide-react";

interface AdvancedAccessPanelProps {
  requireAuth: boolean;
  onRequireAuthChange: (require: boolean) => void;
  customLabelsInput: string;
  onCustomLabelsInputChange: (labels: string) => void;
}

/**
 * Panel for configuring advanced access rules
 */
export function AdvancedAccessPanel({
  requireAuth,
  onRequireAuthChange,
  customLabelsInput,
  onCustomLabelsInputChange,
}: AdvancedAccessPanelProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="require-auth-toggle" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Require Authentication
          </Label>
          <p className="text-xs text-muted-foreground">
            Only logged-in users can view this secret.
          </p>
        </div>
        <Switch
          id="require-auth-toggle"
          checked={requireAuth}
          onCheckedChange={onRequireAuthChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="custom-labels" className="flex items-center gap-2">
          <Tag className="h-4 w-4" />
          Custom Labels
        </Label>
        <Input
          id="custom-labels"
          type="text"
          placeholder="e.g., project-x, client-a"
          value={customLabelsInput}
          onChange={(e) => onCustomLabelsInputChange(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Comma-separated labels for organizing your secrets.
        </p>
      </div>
    </>
  );
}