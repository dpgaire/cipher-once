import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SecretContentSectionProps {
  content: string;
  onContentChange: (content: string) => void;
}

/**
 * Section for entering secret text content
 */
export function SecretContentSection({ content, onContentChange }: SecretContentSectionProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="content">Your Secret Message</Label>
      <Textarea
        id="content"
        placeholder="Enter passwords, API keys, confidential messages, or any sensitive information..."
        className="max-h-[100px] md:h-[150px] text-sm overflow-y-scroll"
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
      />
      <p className="text-xs text-muted-foreground">
        {content.length} characters
      </p>
    </div>
  );
}