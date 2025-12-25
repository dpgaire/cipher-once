"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"

export function useAuthSession() {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    const getSession = async () => {
      setLoading(true)
      const {
        data: { user: sessionUser },
      } = await supabase.auth.getUser()

      setUser(sessionUser)
      setIsAuthenticated(!!sessionUser)
      setLoading(false)
    }

    getSession()

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null)
        setIsAuthenticated(!!session?.user)
        setLoading(false)
      }
    )

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [])

  return { user, isAuthenticated, loading }
}
