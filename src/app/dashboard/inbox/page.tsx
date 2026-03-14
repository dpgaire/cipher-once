"use client";

import { useState } from "react";
import { useInbox } from "@/app/dashboard/inbox/_hooks/use-inbox";
import { InboxList } from "@/app/dashboard/inbox/_components/inbox-list";
import { SendMessageButton } from "@/app/dashboard/inbox/_components/send-message-button";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail } from "lucide-react";

function InboxSkeleton() {
  return (
    <div className="container mx-auto max-w-7xl py-8">
      <div className="rounded-2xl border border-white/5 bg-white/[0.02]">
        <div className="flex items-center justify-between border-b border-white/5 px-7 py-5">
          <Skeleton className="h-7 w-24 rounded-lg bg-white/5" />
          <Skeleton className="h-10 w-40 rounded-lg bg-white/5" />
        </div>
        <div className="grid grid-cols-1 gap-4 p-7 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-xl bg-white/5" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-32 rounded bg-white/5" />
                  <Skeleton className="h-3 w-20 rounded bg-white/5" />
                </div>
              </div>
              <Skeleton className="h-16 w-full rounded-xl bg-white/5" />
              <Skeleton className="h-9 w-full rounded-lg bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function InboxPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user, loading, messages, handleDeleteMessage } = useInbox();

  if (loading) return <InboxSkeleton />;

  return (
    <div className="container mx-auto max-w-7xl py-8">
      <div className="rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 px-7 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#C9A84C]/20 bg-[#C9A84C]/10">
              <Mail className="h-4 w-4 text-[#C9A84C]" />
            </div>
            <h1 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Inbox
            </h1>
          </div>
          <SendMessageButton isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
        </div>

        {/* Content */}
        <div className="p-7">
          <InboxList
            messages={messages}
            currentUserId={user?.id || null}
            handleDeleteMessage={handleDeleteMessage}
            setIsDialogOpen={setIsDialogOpen}
          />
        </div>
      </div>
    </div>
  );
}