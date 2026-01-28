import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Info } from "lucide-react";
import { PasswordPatternModal } from "@/features/settings/components/password-pattern-modal";

interface PassphrasePanelProps {
  requirePassphrase: boolean;
  onRequirePassphraseChange: (require: boolean) => void;
  passphrase: string;
  onPassphraseChange: (passphrase: string) => void;
  disabled?: boolean;
}

/**
 * Panel for configuring password protection
 */
export function PassphrasePanel({
  requirePassphrase,
  onRequirePassphraseChange,
  passphrase,
  onPassphraseChange,
  disabled = false,
}: PassphrasePanelProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Label htmlFor="passphrase-toggle">Require password</Label>
            <Info
              className="h-4 w-4 text-muted-foreground cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Add an extra layer of protection
          </p>
        </div>
        <Switch
          id="passphrase-toggle"
          checked={requirePassphrase}
          onCheckedChange={onRequirePassphraseChange}
          disabled={disabled}
        />
      </div>

      {requirePassphrase && (
        <div className="space-y-2">
          <Label htmlFor="passphrase">Password</Label>
          <Input
            id="passphrase"
            type="password"
            placeholder="Enter a password or pin (min. 4 characters)"
            value={passphrase}
            onChange={(e) => onPassphraseChange(e.target.value)}
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            Recipients will need this passphrase to view the secret
          </p>
        </div>
      )}

      <PasswordPatternModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}