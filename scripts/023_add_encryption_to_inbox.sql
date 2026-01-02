
-- Add encryption IV to inbox messages
ALTER TABLE inbox_messages
  ADD COLUMN message_encryption_iv TEXT;
