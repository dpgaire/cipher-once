"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getMessages, deleteMessage } from "../_services";
import type { User } from "@supabase/supabase-js";
import { Message } from "../_types";
import { getUser } from "../../profile/_services";

export function useInbox() {
    const [user, setUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchUserAndMessages = useCallback(async () => {
        const currentUser = await getUser();
        if (!currentUser) {
            router.push("/login");
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
