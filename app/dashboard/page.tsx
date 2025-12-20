"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SecretCard } from "@/components/secret-card"
import { EmptyState } from "@/components/empty-state"
import { Plus, Shield, LogOut, Loader2, FileText, Activity, Flame } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Secret {
  id: string
  short_id: string
  created_at: string
  expires_at: string
  view_count: number
  max_views: number
  is_burned: boolean
  passphrase_hash: string | null
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [secrets, setSecrets] = useState<Secret[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("active")

  useEffect(() => {
    const loadUserAndSecrets = async () => {
      const supabase = createClient()

      // Get user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      setUser(user)

      // Get user's secrets
      const { data, error } = await supabase
        .from("secrets")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error loading secrets:", error)
      } else {
        setSecrets(data || [])
      }

      setIsLoading(false)
    }

    loadUserAndSecrets()
  }, [router])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const handleDeleteSecret = async (secretId: string) => {
    if (!confirm("Are you sure you want to delete this secret?")) return

    const supabase = createClient()
    const { error } = await supabase.from("secrets").delete().eq("id", secretId)

    if (error) {
      console.error("Error deleting secret:", error)
      alert("Failed to delete secret")
    } else {
      setSecrets(secrets.filter((s) => s.id !== secretId))
    }
  }

  // Filter secrets by status
  const activeSecrets = secrets.filter((s) => !s.is_burned && new Date(s.expires_at) > new Date())
  const expiredSecrets = secrets.filter((s) => !s.is_burned && new Date(s.expires_at) <= new Date())
  const burnedSecrets = secrets.filter((s) => s.is_burned)

  // Stats
  const stats = [
    {
      label: "Active Secrets",
      value: activeSecrets.length,
      icon: Shield,
      color: "text-emerald-600",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Total Created",
      value: secrets.length,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Total Views",
      value: secrets.reduce((acc, s) => acc + s.view_count, 0),
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-500/10",
    },
    {
      label: "Burned",
      value: burnedSecrets.length,
      icon: Flame,
      color: "text-red-600",
      bgColor: "bg-red-500/10",
    },
  ]

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container max-w-7xl flex-1 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.user_metadata?.full_name || user?.email?.split("@")[0]}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSignOut} className="bg-transparent">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
            <Button asChild>
              <Link href="/create">
                <Plus className="mr-2 h-4 w-4" />
                New Secret
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Secrets List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Secrets</CardTitle>
            <CardDescription>Manage and track all your shared secrets</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="active">Active ({activeSecrets.length})</TabsTrigger>
                <TabsTrigger value="expired">Expired ({expiredSecrets.length})</TabsTrigger>
                <TabsTrigger value="burned">Burned ({burnedSecrets.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="mt-6">
                {activeSecrets.length === 0 ? (
                  <EmptyState
                    icon={Shield}
                    title="No active secrets"
                    description="Create your first secret to share sensitive information securely."
                    actionLabel="Create Secret"
                    actionHref="/create"
                  />
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {activeSecrets.map((secret) => (
                      <SecretCard key={secret.id} secret={secret} onDelete={handleDeleteSecret} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="expired" className="mt-6">
                {expiredSecrets.length === 0 ? (
                  <EmptyState
                    icon={Shield}
                    title="No expired secrets"
                    description="Secrets that pass their expiration date will appear here."
                  />
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {expiredSecrets.map((secret) => (
                      <SecretCard key={secret.id} secret={secret} onDelete={handleDeleteSecret} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="burned" className="mt-6">
                {burnedSecrets.length === 0 ? (
                  <EmptyState
                    icon={Flame}
                    title="No burned secrets"
                    description="Secrets that have been viewed and destroyed will appear here."
                  />
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {burnedSecrets.map((secret) => (
                      <SecretCard key={secret.id} secret={secret} onDelete={handleDeleteSecret} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
