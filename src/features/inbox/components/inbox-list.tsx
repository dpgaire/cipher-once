"use client";

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
import { ClickableMessage } from "./ClickableMessage";
import type { Message } from "../types";

type InboxListProps = {
  messages: Message[];
  currentUserId: string | null;
  handleDeleteMessage: (messageId: string) => void;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function InboxList({ messages, currentUserId, handleDeleteMessage, setIsDialogOpen }: InboxListProps) {

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

            <CardContent className="pt-2 space-y-3 grow">
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
