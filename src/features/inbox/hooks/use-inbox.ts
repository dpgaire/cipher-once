"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/features/profile/services";
import { getMessages, deleteMessage } from "../services";
import type { User } from "@supabase/supabase-js";
import type { Message } from "../types";

export function useInbox() {
    const [user, setUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchUserAndMessages = useCallback(async () => {
        const currentUser = await getUser();
        if (!currentUser) {
            router.push("/auth/login");
        } else {
            setUser(currentUser);
            const inboxMessages = await getMessages(currentUser.id);
            setMessages(inboxMessages);
            setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        fetchUserAndMessages();
    }, [fetchUserAndMessages]);

    const handleDeleteMessage = useCallback(async (messageId: string) => {
        setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId));
        const success = await deleteMessage(messageId);
        if (!success) {
            // Re-fetch messages if deletion failed to get consistent state
            fetchUserAndMessages();
        }
    }, [fetchUserAndMessages]);

    return { user, loading, messages, handleDeleteMessage };
}
