"use client";

import { Send } from "lucide-react";
import { SendMessageDialog } from "./send-message-dialog";

type SendMessageButtonProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function SendMessageButton({ isDialogOpen, setIsDialogOpen }: SendMessageButtonProps) {
  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="group relative flex items-center gap-2 overflow-hidden rounded-lg bg-[#C9A84C] px-4 py-2.5 text-sm font-bold text-[#0a0a0f] transition-all hover:shadow-[0_0_24px_rgba(201,168,76,0.3)]"
      >
        <Send className="h-4 w-4" />
        Send New Message
        <div className="absolute inset-0 -translate-x-full skew-x-12 bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
      </button>
      <SendMessageDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}
