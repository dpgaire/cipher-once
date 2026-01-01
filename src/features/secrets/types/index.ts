export interface Secret {
  id: string
  short_id: string
  created_at: string
  expires_at: string
  view_count: number
  max_views: number
  is_burned: boolean
  passphrase_hash: string | null
  encrypted_content: string | null;
  encryption_iv: string | null;
  metadata: SecretMetadata;
  has_file: boolean;
  file_url: string | null;
  file_type: string | null;
  file_name: string | null;
  file_size: number | null;
  file_encryption_iv: string | null;
}

export interface SecretMetadata {
  salt?: string;
  has_passphrase?: boolean;
  require_auth?: boolean;
  allow_download?:boolean;
  allowed_domains?: string[];
  custom_labels?: string[];
}

export interface ConvertResult {
  file: File;
  converted: boolean;
}