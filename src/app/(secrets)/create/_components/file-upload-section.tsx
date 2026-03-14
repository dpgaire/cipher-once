import { Paperclip, X, FileIcon } from "lucide-react";

interface FileUploadSectionProps {
  selectedFile: File | null;
  onFileChange: (file: File | null) => void;
}

const ACCEPTED_FILE_TYPES = `image/*,audio/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/plain,application/zip,application/x-zip-compressed,.zip`;

export function FileUploadSection({ selectedFile, onFileChange }: FileUploadSectionProps) {
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileChange(e.target.files?.[0] || null);
  };

  const handleChooseFileClick = () => {
    document.getElementById("file-attachment")?.click();
  };

  const handleRemoveFile = () => {
    onFileChange(null);
    const el = document.getElementById("file-attachment") as HTMLInputElement;
    if (el) el.value = "";
  };

  const formatFileSize = (bytes: number) => `${Math.round(bytes / 1024)} KB`;

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">
        <Paperclip className="h-3.5 w-3.5" />
        Attach file (optional)
      </label>

      <input
        id="file-attachment"
        type="file"
        className="hidden"
        onChange={handleFileInputChange}
        accept={ACCEPTED_FILE_TYPES}
      />

      {!selectedFile ? (
        <button
          type="button"
          onClick={handleChooseFileClick}
          className="flex items-center gap-2.5 rounded-lg border border-dashed border-white/10 bg-white/[0.02] px-5 py-3.5 text-sm font-medium text-[#6a6a7a] transition-all duration-200 hover:border-[#C9A84C]/30 hover:bg-white/[0.04] hover:text-white"
        >
          <Paperclip className="h-4 w-4 text-[#C9A84C]" />
          Choose file to attach
        </button>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-[#C9A84C]/15 bg-[#C9A84C]/5 px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#C9A84C]/20 bg-[#C9A84C]/10">
              <FileIcon className="h-3.5 w-3.5 text-[#C9A84C]" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{selectedFile.name}</p>
              <p className="text-[10px] text-[#4a4a5a]">{formatFileSize(selectedFile.size)}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemoveFile}
            className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#6a6a7a] transition-colors hover:bg-white/5 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <p className="text-[10px] text-[#4a4a5a]">Max file size: 20 MB</p>
    </div>
  );
}