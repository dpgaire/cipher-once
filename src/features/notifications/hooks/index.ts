"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

let audio: HTMLAudioElement | null = null

function playNotificationSound() {
  if (!audio) {
    audio = new Audio("/notification.mp3")
  }

  audio.currentTime = 0
  audio.play().catch(() => {
    // Browser blocked autoplay — ignore
  })
}

function showBrowserNotification(title: string, body: string, icon: string = "/icon.png") {
    if (Notification.permission === 'granted') {
        new Notification(title, { body, icon });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification(title, { body, icon });
            }
        });
    }
}


export function useNotifications() {
  const supabase = createClient()

  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    let channel: any

    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      // Load initial notifications
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10)

      setNotifications(data || [])
      setUnreadCount((data || []).filter(n => !n.is_read).length)

      // 🔴 Realtime subscription
      channel = supabase
        .channel("notifications-realtime")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            const newNotification = payload.new

            setNotifications(prev => [newNotification, ...prev])
            setUnreadCount(prev => prev + 1)

            // 🔊 Play sound
            playNotificationSound()

            // 🖥️ Show system notification
            showBrowserNotification("CipherOnce", "You received a new message")
          }
        )
        .subscribe()
    }

    init()

    return () => {
      if (channel) supabase.removeChannel(channel)
    }
  }, [supabase])

  const handleMarkAsRead = async (id: string) => {
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id)

    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, is_read: true } : n
      )
    )
    setUnreadCount(prev => Math.max(prev - 1, 0))
  }

  return {
    notifications,
    unreadCount,
    handleMarkAsRead,
  }
}