"use client";

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";
import { encrypt, exportKey, generateKey } from "@/app/(secrets)/s/[shortId]/_services/encryption";

type SendMessageDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function SendMessageDialog({ isOpen, onOpenChange }: SendMessageDialogProps) {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const supabase = createClient();

  const handleSend = async () => {
    if (!recipientEmail) { toast.error("Please enter a recipient email."); return; }
    if (!message) { toast.error("Please enter a message."); return; }
    setIsSending(true);
    try {
      const { data: { user: senderUser }, error: senderError } = await supabase.auth.getUser();
      if (senderError || !senderUser) throw new Error("You must be logged in to send a message.");
      const { data: senderProfile, error: senderProfileError } = await supabase.from("profiles").select("id").eq("id", senderUser.id).single();
      if (senderProfileError || !senderProfile) throw new Error("Your user profile is not set up correctly.");
      const { data: recipientId, error: recipientError } = await supabase.rpc("get_user_id_by_email", { p_email: recipientEmail });
      if (recipientError || !recipientId) throw new Error("User with that email address not found.");
      const messageKey = await generateKey();
      const { ciphertext: encryptedMessage, iv: messageIv } = await encrypt(message, messageKey);
      const exportedKey = await exportKey(messageKey);
      const { error: insertError } = await supabase.from("inbox_messages").insert({
        sender_id: senderUser.id, recipient_id: recipientId,
        message: encryptedMessage, message_encryption_iv: messageIv, link: exportedKey,
      });
      if (insertError) throw new Error("Failed to send message.");
      toast.success("Message sent successfully!");
      onOpenChange(false);
      setRecipientEmail(""); setMessage("");
    } catch (error: any) {
      toast.error(error.message);
    } finally { setIsSending(false); }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/5 bg-[#0d0d14] text-white sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-[#C9A84C]/20 bg-[#C9A84C]/10">
            <Send className="h-5 w-5 text-[#C9A84C]" />
          </div>
          <DialogTitle className="text-center text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Send a Secure Message
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">
              Recipient email
            </label>
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-[#4a4a5a] outline-none transition-all focus:border-[#C9A84C]/40 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)]"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your secure message or link..."
              rows={4}
              className="w-full resize-none rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-[#4a4a5a] outline-none transition-all focus:border-[#C9A84C]/40 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)]"
            />
          </div>
        </div>

        <DialogFooter className="mt-2 flex gap-3">
          <DialogClose asChild>
            <button className="flex-1 rounded-lg border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10">
              Cancel
            </button>
          </DialogClose>
          <button
            onClick={handleSend}
            disabled={isSending}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#C9A84C] py-2.5 text-sm font-bold text-[#0a0a0f] transition-all hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] disabled:opacity-50"
          >
            {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {isSending ? "Sending..." : "Send Securely"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}