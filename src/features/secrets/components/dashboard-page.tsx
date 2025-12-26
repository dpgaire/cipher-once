"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SecretCard } from "../components/secret-card"
import { EmptyState } from "@/components/ui/empty"
import { Shield, Loader2, FileText, Activity, Flame, Clock } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

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

function DashboardPageComponent() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "active"
  
  const [secrets, setSecrets] = useState<Secret[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadSecrets = async () => {
      setIsLoading(true)
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
    if (!confirm("Are you sure you want to delete this secret? This action is irreversible.")) return

    const supabase = createClient()
    const { error } = await supabase.from("secrets").delete().eq("id", secretId)

    if (error) {
      console.error("Error deleting secret:", error)
      alert("Failed to delete secret")
    } else {
      setSecrets(secrets.filter((s) => s.id !== secretId))
    }
  }

  const activeSecrets = secrets.filter((s) => !s.is_burned && new Date(s.expires_at) > new Date())
  const expiredSecrets = secrets.filter((s) => !s.is_burned && new Date(s.expires_at) <= new Date())
  const burnedSecrets = secrets.filter((s) => s.is_burned)

  const stats = [
    { label: "Active", value: activeSecrets.length, icon: Shield, color: "text-emerald-600", bgColor: "bg-emerald-500/10" },
    { label: "Total Created", value: secrets.length, icon: FileText, color: "text-blue-600", bgColor: "bg-blue-500/10" },
    { label: "Total Views", value: secrets.reduce((acc, s) => acc + s.view_count, 0), icon: Activity, color: "text-purple-600", bgColor: "bg-purple-500/10" },
    { label: "Burned", value: burnedSecrets.length, icon: Flame, color: "text-red-600", bgColor: "bg-red-500/10" },
  ]
  
  const navItems = [
    { name: "Active", value: "active", count: activeSecrets.length, icon: Shield },
    { name: "Expired", value: "expired", count: expiredSecrets.length, icon: Clock },
    { name: "Burned", value: "burned", count: burnedSecrets.length, icon: Flame },
  ]

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center pt-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )
    }
    
    switch (activeTab) {
      case "active":
        return activeSecrets.length === 0 ? (
          <EmptyState icon={Shield} title="No active secrets" description="Create your first secret to share sensitive information securely." actionLabel="Create Secret" actionHref="/create" />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeSecrets.map((secret) => <SecretCard key={secret.id} secret={secret} onDelete={handleDeleteSecret} />)}
          </div>
        )
      case "expired":
        return expiredSecrets.length === 0 ? (
          <EmptyState icon={Clock} title="No expired secrets" description="Secrets that pass their expiration date will appear here." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {expiredSecrets.map((secret) => <SecretCard key={secret.id} secret={secret} onDelete={handleDeleteSecret} />)}
          </div>
        )
      case "burned":
        return burnedSecrets.length === 0 ? (
          <EmptyState icon={Flame} title="No burned secrets" description="Secrets that have been viewed and destroyed will appear here." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {burnedSecrets.map((secret) => <SecretCard key={secret.id} secret={secret} onDelete={handleDeleteSecret} />)}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container max-w-7xl flex-1 py-8">
      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 grid-cols-2 md:grid-cols-4">
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
          <CardDescription>Manage and track all your shared secrets. Select a category to view.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Desktop Tabs */}
          <div className="hidden md:block border-b mb-6">
            <nav className="-mb-px flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={`/dashboard?tab=${item.value}`}
                  className={cn(
                    "whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors",
                    activeTab === item.value
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  )}
                >
                  {item.name} ({item.count})
                </Link>
              ))}
            </nav>
          </div>
          
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  )
}

// Wrap the component in Suspense to use useSearchParams
export function DashboardPage() {
  return (
    <Suspense fallback={<div className="flex flex-1 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>}>
      <DashboardPageComponent />
    </Suspense>
  )
}
