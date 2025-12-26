"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SecretCard } from "../components/secret-card" // Import from within the feature
import { EmptyState } from "@/components/ui/empty" // Remains a general component
import { Shield, Loader2, FileText, Activity, Flame } from "lucide-react"

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

export function DashboardPage() {
  const [secrets, setSecrets] = useState<Secret[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("active")

  useEffect(() => {
    const loadSecrets = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
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
      }
      setIsLoading(false)
    }

    loadSecrets()
  }, [])

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
      <div className="flex flex-1 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="container max-w-7xl flex-1 py-8">
      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
  )
}
