// lib/types/secrets.ts

export interface SecretMetadata {
  salt?: string;
  has_passphrase?: boolean;
  // New V2 Rules
  require_auth?: boolean; // If true, only authenticated users can view
  allowed_domains?: string[]; // Array of domains from which secret can be viewed
  custom_labels?: string[]; // Arbitrary labels for categorization
}

export interface Secret {
  id: string;
  encrypted_content: string;
  encryption_iv: string;
  short_id: string;
  passphrase_hash: string | null;
  max_views: number;
  view_count: number;
  expires_at: string;
  created_at: string;
  user_id: string | null;
  is_burned: boolean;
  metadata: SecretMetadata; // Use the new metadata interface

  // New file attachment properties
  has_file?: boolean;
  file_url?: string;
  file_type?: string;
  file_name?: string;
  file_size?: number;
  file_encryption_iv?: string; // for file content encryption
}
