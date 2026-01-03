type Profile = {
  full_name: string | null;
} | null;

export type Message = {
  id: string;
  sender_id: string;
  recipient_id: string;
  message: string | null;
  message_encryption_iv: string | null;
  link: string | null; // This now holds the exported key
  created_at: string;
  is_read: boolean;
  sender_profile: Profile;
  recipient_profile: Profile;
  decryptedMessage?: string;
};
