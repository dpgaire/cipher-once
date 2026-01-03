export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  total_secrets_created: number;
  total_secrets_viewed: number;
  total_secrets_burned: number;
  default_settings: Record<string, any> | null;
}
