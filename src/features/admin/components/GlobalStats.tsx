import { getGlobalStats } from "@/features/admin/services/analytics"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Lock, Eye, Flame } from "lucide-react"
import { GlobalStatsResponse } from "@/lib/types/analytics"

export async function GlobalStats() {
  let stats: GlobalStatsResponse | null = null

  try {
    stats = await getGlobalStats()
  } catch {
    return (
      <div className="flex h-24 items-center justify-center border-2 border-dashed rounded-lg">
        <p className="text-destructive">Could not load global stats.</p>
      </div>
    )
  }

  // ✅ Guard against empty / invalid data
  if (!stats) {
    return (
      <div className="flex h-24 items-center justify-center border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground">No global stats available.</p>
      </div>
    )
  }

  const statsList = [
    {
      title: "Total Users",
      value: stats.total_users,
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Secrets Created",
      value: stats.total_secrets_created,
      icon: <Lock className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Secrets Viewed",
      value: stats.total_secrets_viewed,
      icon: <Eye className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Secrets Burned",
      value: stats.total_secrets_burned,
      icon: <Flame className="h-4 w-4 text-muted-foreground" />,
    },
  ]

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsList.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stat.value.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
