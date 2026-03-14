"use client";

import { Send, Trash2, Mail } from "lucide-react";
import { ClickableMessage } from "./ClickableMessage";
import type { Message } from "../_types";

type InboxListProps = {
  messages: Message[];
  currentUserId: string | null;
  handleDeleteMessage: (messageId: string) => void;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function InboxList({ messages, currentUserId, handleDeleteMessage, setIsDialogOpen }: InboxListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02]">
          <Mail className="h-6 w-6 text-[#4a4a5a]" />
        </div>
        <div>
          <p className="mb-1 text-sm font-semibold text-white">Inbox is empty</p>
          <p className="text-xs text-[#4a4a5a]">All communications are secure and ephemeral.</p>
        </div>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="group relative flex items-center gap-2 overflow-hidden rounded-lg bg-[#C9A84C] px-5 py-2.5 text-sm font-bold text-[#0a0a0f] transition-all hover:shadow-[0_0_24px_rgba(201,168,76,0.3)]"
        >
          <Send className="h-4 w-4" />
          New Secure Message
          <div className="absolute inset-0 -translate-x-full skew-x-12 bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {messages.map((msg) => {
        const isSender = msg.sender_id === currentUserId;
        const otherUser = isSender ? msg.recipient_profile : msg.sender_profile;
        const name = otherUser?.full_name ?? "Anonymous";
        const initials = name.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase();
        const time = new Date(msg.created_at).toLocaleString(undefined, {
          month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
        });

        return (
          <div
            key={msg.id}
            className={`relative flex flex-col overflow-hidden rounded-2xl border bg-white/[0.02] transition-all duration-200 hover:bg-white/[0.03] ${
              !msg.is_read
                ? "border-l-2 border-l-[#C9A84C] border-t-[#C9A84C]/10 border-r-white/5 border-b-white/5"
                : "border-white/5"
            }`}
          >
            {/* Unread dot */}
            {!msg.is_read && (
              <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,0.5)]" />
            )}

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/5 px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-white/[0.03] text-xs font-bold text-[#6a6a7a]">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {isSender ? `To: ${name}` : `From: ${name}`}
                </p>
                <p className="text-[10px] text-[#4a4a5a]">{time}</p>
              </div>
            </div>

            {/* Message */}
            <div className="grow px-5 py-4">
              {msg.decryptedMessage && <ClickableMessage text={msg.decryptedMessage} />}
            </div>

            {/* Footer action */}
            <div className="border-t border-white/5 px-5 py-3">
              <button
                onClick={() => handleDeleteMessage(msg.id)}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] py-2 text-xs font-semibold text-[#6a6a7a] transition-all hover:border-red-500/20 hover:bg-red-500/5 hover:text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Mark as Read & Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}