import { useState } from "react";

/**
 * Custom hook to manage file upload state
 * Encapsulates file-related state for better separation of concerns
 */
export function useFileUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploadingFile, setIsUploadingFile] = useState(false);

  return {
    selectedFile,
    setSelectedFile,
    isUploadingFile,
    setIsUploadingFile,
  };
}