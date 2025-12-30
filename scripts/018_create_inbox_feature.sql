
-- Create the inbox_messages table
CREATE TABLE inbox_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    message TEXT,
    link TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies for inbox_messages
ALTER TABLE inbox_messages ENABLE ROW LEVEL SECURITY;

-- Users can see messages sent to them or by them
DROP POLICY IF EXISTS "Users can view their own inbox messages" ON inbox_messages;
CREATE POLICY "Users can view their own inbox messages"
ON inbox_messages
FOR SELECT
USING (auth.uid() = recipient_id OR auth.uid() = sender_id);

-- Users can send messages
CREATE POLICY "Users can send messages"
ON inbox_messages
FOR INSERT
WITH CHECK (auth.uid() = sender_id);

-- Users can mark their messages as read
CREATE POLICY "Users can mark their messages as read"
ON inbox_messages
FOR UPDATE
USING (auth.uid() = recipient_id)
WITH CHECK (auth.uid() = recipient_id);

-- Allow recipients to delete messages
CREATE POLICY "Users can delete their own received messages"
ON inbox_messages
FOR DELETE
USING (auth.uid() = recipient_id);

-- Add indexes for performance
CREATE INDEX idx_inbox_messages_recipient_id ON inbox_messages(recipient_id);
CREATE INDEX idx_inbox_messages_sender_id ON inbox_messages(sender_id);
