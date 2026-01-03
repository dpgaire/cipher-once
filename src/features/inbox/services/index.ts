import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  decrypt,
  importKey,
} from "@/features/secrets/services/encryption";
import type { Message } from "../types";

const supabase = createClient();

export async function getMessages(userId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from("inbox_messages")
    .select(
      `
      id,
      sender_id,
      recipient_id,
      message,
      message_encryption_iv,
      link,
      created_at,
      is_read,
      sender_profile:profiles!inbox_messages_sender_id_fkey(full_name),
      recipient_profile:profiles!inbox_messages_recipient_id_fkey(full_name)
    `
    )
    .eq("recipient_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    toast.error("Failed to load inbox");
    console.error(error);
    return [];
  }

  // Decrypt messages
  const decryptedMessages = await Promise.all(
    data.map(async (msg) => {
      let decryptedMessage = "[Message could not be decrypted]";
      if (msg.message && msg.message_encryption_iv && msg.link) {
        try {
          const key = await importKey(msg.link);
          decryptedMessage = await decrypt(
            msg.message,
            msg.message_encryption_iv,
            key
          );
        } catch (e) {
          console.error("Decryption failed for message", msg.id, e);
        }
      }
      return { ...msg, decryptedMessage };
    })
  );

  const formattedData = decryptedMessages.map((msg) => ({
    ...msg,
    sender_profile:
      Array.isArray(msg.sender_profile) && msg.sender_profile.length > 0
        ? msg.sender_profile[0]
        : null,
    recipient_profile:
      Array.isArray(msg.recipient_profile) &&
      msg.recipient_profile.length > 0
        ? msg.recipient_profile[0]
        : null,
  }));

  return formattedData as Message[];
}

export async function deleteMessage(messageId: string): Promise<boolean> {
    // First, mark as read
    await supabase
      .from("inbox_messages")
      .update({ is_read: true })
      .eq("id", messageId);
      
    // Immediately delete after marking as read
    const { error } = await supabase
      .from("inbox_messages")
      .delete()
      .eq("id", messageId);

    if (error) {
      toast.error("Failed to delete message from server.");
      console.error(error);
      return false;
    } else {
      toast.success("Message deleted.");
      return true;
    }
}

// I need to search for where the encryption service is.
// I suspect it's in `src/features/secrets/services/encryption.ts`
// I will search for a file named `encryption.ts`
