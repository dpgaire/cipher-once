import {
  generateKey,
  exportKey,
  encrypt,
  encryptFile,
  hashPassphrase,
  generateSalt,
  deriveKeyFromPassphrase,
  base64ToBuffer,
} from "../../services/encryption";
import {
  validatePassphrase,
  calculateExpirationDate,
} from "@/features/secrets/domain/secret-utils";
import { convertHeicToJpeg } from "../utils/heic-converter";
import { SecretMetadata } from "../../types";

interface CreateSecretParams {
  content: string;
  expirationHours: number;
  maxViews: number;
  requirePassphrase: boolean;
  passphrase: string;
  allowFileDownload: boolean;
  watermarkText: string;
  requireAuth: boolean;
  allowedDomainsInput: string;
  customLabelsInput: string;
  selectedFile: File | null;
  setIsUploadingFile: (uploading: boolean) => void;
}

interface CreateSecretResult {
  shortId: string;
  keyString: string;
}

const MAX_CLIENT_FILE_SIZE = 20 * 1024 * 1024; // 20MB

/**
 * Service to handle secret creation logic
 * Separates business logic from UI components
 */
export async function createSecretService(
  params: CreateSecretParams
): Promise<CreateSecretResult> {
  const {
    content,
    expirationHours,
    maxViews,
    requirePassphrase,
    passphrase,
    allowFileDownload,
    watermarkText,
    requireAuth,
    allowedDomainsInput,
    customLabelsInput,
    selectedFile,
    setIsUploadingFile,
  } = params;

  // Validate content
  if (!content && !selectedFile) {
    throw new Error("Secret must contain either text content or a file attachment.");
  }

  // Validate passphrase if required
  if (requirePassphrase) {
    const passphraseValidation = validatePassphrase(passphrase);
    if (!passphraseValidation.valid) {
      throw new Error(passphraseValidation.error);
    }
  }

  // Generate or derive encryption key
  let salt: string | null = null;
  let encryptionKey: CryptoKey;

  if (requirePassphrase) {
    salt = generateSalt();
    encryptionKey = await deriveKeyFromPassphrase(passphrase, salt);
  } else {
    encryptionKey = await generateKey();
  }

  // Encrypt text content if provided
  let ciphertext: string | undefined;
  let iv: string | undefined;
  
  if (content) {
    const encryptedText = await encrypt(content, encryptionKey);
    ciphertext = encryptedText.ciphertext;
    iv = encryptedText.iv;
  }

  // Handle file upload if provided
  let fileMetadata: FileMetadata | undefined;
  
  if (selectedFile) {
    fileMetadata = await handleFileUpload(selectedFile, encryptionKey, setIsUploadingFile);
  }

  // Create secret metadata
  const secretMetadata = buildSecretMetadata({
    salt,
    requirePassphrase,
    requireAuth,
    allowFileDownload,
    watermarkText,
    allowedDomainsInput,
    customLabelsInput,
  });

  // Prepare payload
  const passphraseHash = requirePassphrase ? await hashPassphrase(passphrase) : null;
  const expiresAt = calculateExpirationDate(expirationHours);

  const payload = {
    expires_at: expiresAt.toISOString(),
    max_views: maxViews,
    passphrase_hash: passphraseHash,
    encrypted_content: ciphertext,
    encryption_iv: iv,
    metadata: secretMetadata,
    has_file: !!selectedFile,
    ...(fileMetadata && fileMetadata),
  };

  // Send request to create secret
  const createResponse = await fetch("/api/links/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!createResponse.ok) {
    if (createResponse.status === 429) {
      throw new Error("LIMIT_REACHED");
    }
    const errorData = await createResponse.json();
    throw new Error(errorData.error || "Failed to create secret.");
  }

  const { short_id } = await createResponse.json();
  const keyString = await exportKey(encryptionKey);

  return {
    shortId: short_id,
    keyString,
  };
}

interface FileMetadata {
  file_url: string;
  file_type: string;
  file_name: string;
  file_size: number;
  file_encryption_iv: string;
}

/**
 * Handle file upload and encryption
 */
async function handleFileUpload(
  file: File,
  encryptionKey: CryptoKey,
  setIsUploadingFile: (uploading: boolean) => void
): Promise<FileMetadata> {
  setIsUploadingFile(true);

  try {
    // Convert HEIC to JPEG if needed
    const { file: fileToProcess } = await convertHeicToJpeg(file);

    // Validate file size
    if (fileToProcess.size > MAX_CLIENT_FILE_SIZE) {
      throw new Error("File too large. Please choose a smaller file (max 20MB).");
    }

    // Encrypt file
    const fileBuffer = await fileToProcess.arrayBuffer();
    const encryptedFileResult = await encryptFile(fileBuffer, encryptionKey);
    
    const encryptedFileBlob = new Blob(
      [base64ToBuffer(encryptedFileResult.ciphertext)],
      { type: "application/octet-stream" }
    );

    // Prepare form data
    const formData = new FormData();
    formData.append("encryptedFile", encryptedFileBlob);
    formData.append("fileName", fileToProcess.name);
    formData.append("fileType", fileToProcess.type);
    formData.append("fileSize", fileToProcess.size.toString());
    formData.append("fileIv", encryptedFileResult.iv);

    // Upload file
    const fileUploadResponse = await fetch("/api/upload-file", {
      method: "POST",
      body: formData,
    });

    if (!fileUploadResponse.ok) {
      const text = await fileUploadResponse.text();
      throw new Error(text || "File upload failed");
    }

    const result = await fileUploadResponse.json();

    return {
      file_url: result.blobUrl,
      file_type: result.fileType,
      file_name: result.fileName,
      file_size: result.fileSize,
      file_encryption_iv: result.fileIv,
    };
  } finally {
    setIsUploadingFile(false);
  }
}

/**
 * Build secret metadata object
 */
function buildSecretMetadata(params: {
  salt: string | null;
  requirePassphrase: boolean;
  requireAuth: boolean;
  allowFileDownload: boolean;
  watermarkText: string;
  allowedDomainsInput: string;
  customLabelsInput: string;
}): SecretMetadata {
  const {
    salt,
    requirePassphrase,
    requireAuth,
    allowFileDownload,
    watermarkText,
    allowedDomainsInput,
    customLabelsInput,
  } = params;

  const allowedDomains = allowedDomainsInput
    .split(",")
    .map((d) => d.trim())
    .filter(Boolean);

  const customLabels = customLabelsInput
    .split(",")
    .map((l) => l.trim())
    .filter(Boolean);

  return {
    ...(salt && { salt }),
    has_passphrase: requirePassphrase,
    require_auth: requireAuth,
    allow_download: allowFileDownload,
    watermarkText,
    ...(allowedDomains.length > 0 && { allowed_domains: allowedDomains }),
    ...(customLabels.length > 0 && { custom_labels: customLabels }),
  };
}