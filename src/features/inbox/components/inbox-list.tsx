"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Send, Trash2 } from "lucide-react";
import {
  decrypt,
  importKey,
} from "@/features/secrets/services/encryption";
import { ClickableMessage } from "./ClickableMessage";

type Profile = {
  full_name: string | null;
} | null;

type Message = {
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

type InboxListProps = {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/* ---------- Skeleton ---------- */
function InboxCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-24 bg-muted rounded animate-pulse" />
            <div className="h-2 w-16 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="h-3 w-full bg-muted rounded animate-pulse" />
        <div className="h-3 w-5/6 bg-muted rounded animate-pulse" />
        <div className="h-3 w-1/2 bg-muted rounded animate-pulse" />
      </CardContent>
    </Card>
  );
}

export function InboxList({ setIsDialogOpen }: InboxListProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const supabase = createClient();

  const fetchMessages = useCallback(
    async (user: any) => {
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
        .eq("recipient_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to load inbox");
        console.error(error);
        return;
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

      setMessages(formattedData as Message[]);
    },
    [supabase]
  );

  useEffect(() => {
    const setup = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
        await fetchMessages(user);
      }
      setLoading(false);
    };

    setup();
  }, [supabase, fetchMessages]);

  const handleDeleteMessage = async (messageId: string) => {
    // Optimistically remove from UI
    setMessages(messages.filter((msg) => msg.id !== messageId));

    // First, mark as read
    await supabase
      .from("inbox_messages")
      .update({ is_read: true })
      .eq("id", messageId);
      
    // Immediately delete after marking as read
    const { error: deleteError } = await supabase
      .from("inbox_messages")
      .delete()
      .eq("id", messageId);

    if (deleteError) {
      toast.error("Failed to delete message from server.");
      console.error(deleteError);
      // Re-fetch to get consistent state
      const { data: { user } } = await supabase.auth.getUser();
      if(user) fetchMessages(user);
    } else {
      toast.success("Message deleted.");
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <InboxCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="py-10 flex flex-col items-center gap-3 text-center text-sm text-muted-foreground">
        <span className="max-w-xs">
          Your inbox is empty. All communications are secure and ephemeral.
        </span>
        <Button className="cursor-pointer" onClick={() => setIsDialogOpen(true)}>
          <Send className="h-4 w-4 mr-2 " />
          New Secure Message
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {messages.map((msg) => {
        const isSender = msg.sender_id === currentUserId;
        const otherUser = isSender ? msg.recipient_profile : msg.sender_profile;
        const name = otherUser?.full_name ?? "Anonymous";
        const initials = name
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();

        const time = new Date(msg.created_at).toLocaleString(undefined, {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <Card
            key={msg.id}
            className={cn(
              "relative transition-all hover:shadow-sm flex flex-col",
              !msg.is_read && "border-l-2 border-l-primary"
            )}
          >
            {!msg.is_read && (
              <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary" />
            )}

            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="text-xs font-medium">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <CardTitle className="text-sm font-medium leading-none">
                    {isSender ? `To: ${name}` : `From: ${name}`}
                  </CardTitle>
                  <CardDescription className="text-xs">{time}</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-2 space-y-3 flex-grow">
              {msg.decryptedMessage && <ClickableMessage text={msg.decryptedMessage} />}
            </CardContent>
            
            <div className="p-4 pt-0">
               <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleDeleteMessage(msg.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Mark as Read & Delete
                </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
