import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { Users, FileText, Eye } from "lucide-react"

async function getStats() {
  const supabase = await createClient()

  const { data:userCount, error } = await supabase.rpc("get_all_users")

  const { count: secretCount } = await supabase
    .from("secrets")
    .select("id", { count: "exact", head: true })

  const { count: viewCount } = await supabase
    .from("secret_access_logs")
    .select("id", { count: "exact", head: true })

  return { userCount, secretCount, viewCount }
}

export default async function AdminDashboardPage() {
  const { userCount, secretCount, viewCount } = await getStats()

  const stats = [
    {
      label: "Total Users",
      value: userCount.length ?? 0,
      icon: Users,
    },
    {
      label: "Total Secrets Created",
      value: secretCount ?? 0,
      icon: FileText,
    },
    {
      label: "Total Secrets Viewed",
      value: viewCount ?? 0,
      icon: Eye,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
