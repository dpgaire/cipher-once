// SERVER COMPONENT

import { getPageViewStats } from "@/features/admin/services/analytics"
import { PageViewAnalyticsClient } from "./PageViewAnalyticsClient"

export type PageViewStat = {
  path: string
  country_code: string | null
  view_count: number
}

export async function PageViewAnalytics() {
  const stats = (await getPageViewStats()) as PageViewStat[]

  if (!stats || stats.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground">
          No page view data available yet.
        </p>
      </div>
    )
  }

  return <PageViewAnalyticsClient stats={stats} />
}
