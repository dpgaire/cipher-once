/**
 * Type definitions for secret creation
 */

export interface SecretMetadata {
  salt?: string;
  has_passphrase: boolean;
  require_auth: boolean;
  allow_download: boolean;
  watermarkText: string;
  allowed_domains?: string[];
  custom_labels?: string[];
}

export interface CreateSecretPayload {
  expires_at: string;
  max_views: number;
  passphrase_hash: string | null;
  encrypted_content?: string;
  encryption_iv?: string;
  metadata: SecretMetadata;
  has_file: boolean;
  file_url?: string;
  file_type?: string;
  file_name?: string;
  file_size?: number;
  file_encryption_iv?: string;
}

export interface DefaultSettings {
  defaultExpiration?: number;
  defaultViewLimit?: number;
  defaultPassword?: string;
  watermarkText?: string;
  defaultAllowDownload?: boolean;
}

export interface FileUploadResult {
  blobUrl: string;
  fileType: string;
  fileName: string;
  fileSize: number;
  fileIv: string;
}

export interface EncryptionResult {
  ciphertext: string;
  iv: string;
}