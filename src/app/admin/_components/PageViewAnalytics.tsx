// SERVER COMPONENT

import { getPageViewStats } from "@/app/admin/_services/analytics"
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
     <div className="flex h-24 items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02]">
        <p className="text-sm text-[#6a6a7a]">No page view data available yet.</p>
      </div>
    )
  }

  return <PageViewAnalyticsClient stats={stats} />
}
