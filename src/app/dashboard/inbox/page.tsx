"use client";

import { useState } from "react";
import { useInbox } from "@/features/inbox/hooks/use-inbox";
import { InboxList } from "@/features/inbox/components/inbox-list";
import { SendMessageButton } from "@/features/inbox/components/send-message-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CardSkeleton } from "@/features/core/components";

function InboxSkeleton() {
  return (
    <Card className="container mx-auto max-w-7xl my-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="h-8 w-24 bg-muted rounded animate-pulse" />
        <div className="h-10 w-40 bg-muted rounded animate-pulse" />
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} header={true} lines={3} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function InboxPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user, loading, messages, handleDeleteMessage } = useInbox();

  if (loading) {
    return <InboxSkeleton />;
  }

  return (
      <Card className="container mx-auto max-w-7xl my-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-2xl font-bold">Inbox</CardTitle>
          <SendMessageButton isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
        </CardHeader>

        <CardContent className="p-4">
          <InboxList 
            messages={messages}
            currentUserId={user?.id || null}
            handleDeleteMessage={handleDeleteMessage}
            setIsDialogOpen={setIsDialogOpen} 
          />
        </CardContent>
      </Card>
  );
}
