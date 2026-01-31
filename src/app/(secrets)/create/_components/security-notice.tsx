import { Shield } from "lucide-react";

/**
 * Component to display security information
 */
export function SecurityNotice() {
  return (
    <div className="mt-6 rounded-lg border bg-blue-500/5 p-4 border-blue-500/20">
      <div className="flex gap-3">
        <Shield className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
        <div className="space-y-1 text-sm">
          <p className="font-medium text-blue-600">End-to-End Encrypted</p>
          <p className="text-muted-foreground">
            Your secret is encrypted in your browser before being sent to our
            servers. We never see your unencrypted data.
          </p>
        </div>
      </div>
    </div>
  );
}