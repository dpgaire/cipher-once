import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Paperclip, X } from "lucide-react";

interface FileUploadSectionProps {
  selectedFile: File | null;
  onFileChange: (file: File | null) => void;
}

const ACCEPTED_FILE_TYPES = `
  image/*,
  audio/*,
  video/*,
  application/pdf,
  application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document,
  application/vnd.ms-excel,
  application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
  application/vnd.ms-powerpoint,
  application/vnd.openxmlformats-officedocument.presentationml.presentation,
  text/plain,
  application/zip,
  application/x-zip-compressed,
  .zip
`;

/**
 * Section for file upload
 */
export function FileUploadSection({ selectedFile, onFileChange }: FileUploadSectionProps) {
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileChange(file);
  };

  const handleChooseFileClick = () => {
    document.getElementById("file-attachment")?.click();
  };

  const handleRemoveFile = () => {
    onFileChange(null);
    // Reset file input
    const fileInput = document.getElementById("file-attachment") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    return `${Math.round(bytes / 1024)} KB`;
  };

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        <Paperclip className="h-4 w-4" />
        Attach File (Optional)
      </Label>
      
      <Input
        id="file-attachment"
        type="file"
        className="hidden"
        onChange={handleFileInputChange}
        accept={ACCEPTED_FILE_TYPES}
      />

      {!selectedFile ? (
        <Button
          type="button"
          variant="outline"
          onClick={handleChooseFileClick}
        >
          <Paperclip className="mr-2 h-4 w-4" />
          Choose File
        </Button>
      ) : (
        <div className="flex items-center justify-between rounded-md bg-muted p-3 text-sm">
          <span className="truncate">
            {selectedFile.name} ({formatFileSize(selectedFile.size)})
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemoveFile}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <p className="text-xs text-muted-foreground">
        Max file size: 20MB
      </p>
    </div>
  );
}