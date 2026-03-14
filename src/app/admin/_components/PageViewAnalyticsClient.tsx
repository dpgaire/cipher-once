"use client"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { BarChart, Bar,Tooltip, XAxis, YAxis,ResponsiveContainer } from "recharts"
import { TrendingUp, Globe } from "lucide-react"
import type { PageViewStat } from "./PageViewAnalytics"

// ---------------- helpers ----------------
function processStats(stats: PageViewStat[]) {
  // ✅ remove /admin paths
  const filteredStats = stats.filter(
    (s) => !s.path.startsWith("/admin")
  )

  const pages: Record<string, number> = {}
  const countries: Record<string, number> = {}

  for (const s of filteredStats) {
    pages[s.path] = (pages[s.path] || 0) + s.view_count

    const country = s.country_code ?? "Unknown"
    countries[country] = (countries[country] || 0) + s.view_count
  }

  const topPages = Object.entries(pages)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)

  const topCountries = Object.entries(countries)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)

  return {
    topPages,
    topCountries,
    pageChartData: topPages.slice(0, 10).map((p) => ({
      label: p.path,
      value: p.count,
    })),
    countryChartData: topCountries.slice(0, 10).map((c) => ({
      label: c.country,
      value: c.count,
    })),
  }
}


const tooltipStyle = {
  backgroundColor: "#0d0d14",
  border: "1px solid rgba(255,255,255,0.05)",
  borderRadius: 10,
  fontSize: 11,
  color: "#fff",
}

function AnalyticsPanel({
  title, description, icon, chartData, tableData, tableKey,
}: {
  title: string; description: string; icon: React.ReactNode
  chartData: { label: string; value: number }[]
  tableData: { label: string; value: number }[]
  tableKey: string
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#C9A84C]">
          {icon}
        </div>
        <div>
          <p className="text-sm font-bold text-white">{title}</p>
          <p className="text-xs text-[#4a4a5a]">{description}</p>
        </div>
      </div>

      <div className="mb-5 h-[160px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis dataKey="label" tick={{ fill: "#4a4a5a", fontSize: 9 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(201,168,76,0.05)" }} />
            <Bar dataKey="value" fill="#C9A84C" fillOpacity={0.6} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-white/5">
        <div className="grid grid-cols-2 border-b border-white/5 px-4 py-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#4a4a5a]">{tableKey}</span>
          <span className="text-right text-[10px] font-bold uppercase tracking-wider text-[#4a4a5a]">Views</span>
        </div>
        {tableData.slice(0, 5).map((row, i) => (
          <div key={row.label} className={`grid grid-cols-2 px-4 py-2.5 ${i % 2 === 0 ? "bg-white/[0.01]" : ""}`}>
            <span className="truncate font-mono text-xs text-[#8a8a9a]">{row.label}</span>
            <span className="text-right text-xs font-semibold text-white">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}


// ---------------- component ----------------

export function PageViewAnalyticsClient({
  stats,
}: {
  stats: PageViewStat[]
}) {
  const {
    topPages,
    topCountries,
    pageChartData,
    countryChartData,
  } = processStats(stats)

  const chartConfig = {
    value: { label: "Views", color: "hsl(var(--chart-1))" },
  } satisfies ChartConfig

  return (
     <div className="grid gap-4 md:grid-cols-2">
      <AnalyticsPanel
        title="Top Pages"
        description="Most viewed pages across the application."
        icon={<TrendingUp className="h-4 w-4" />}
        chartData={pageChartData}
        tableData={topPages.map((p) => ({ label: p.path, value: p.count }))}
        tableKey="Page Path"
      />
      <AnalyticsPanel
        title="Top Countries"
        description="Top countries where requests originate."
        icon={<Globe className="h-4 w-4" />}
        chartData={countryChartData}
        tableData={topCountries.map((c) => ({ label: c.country, value: c.count }))}
        tableKey="Country"
      />
    </div>
  )
}
