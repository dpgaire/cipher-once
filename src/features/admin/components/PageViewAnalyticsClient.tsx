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
import { BarChart, Bar, XAxis, YAxis } from "recharts"
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
    <div className="grid gap-6 md:grid-cols-2">
      {/* ---------- TOP PAGES ---------- */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Top Pages
          </CardTitle>
          <CardDescription>
            Most viewed pages across the application.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <ChartContainer config={chartConfig} className="h-[200px]">
            <BarChart data={pageChartData}>
              <XAxis dataKey="label"  />
              <YAxis hide />
              <Bar
                dataKey="value"
                radius={4}
                fill="var(--color-value)"
              />
              <ChartTooltip content={<ChartTooltipContent  />} />
            </BarChart>
          </ChartContainer>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page Path</TableHead>
                <TableHead className="text-right">Views</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPages.slice(0, 5).map((page) => (
                <TableRow key={page.path}>
                  <TableCell className="font-mono">
                    {page.path}
                  </TableCell>
                  <TableCell className="text-right">
                    {page.count}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ---------- TOP COUNTRIES ---------- */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Top Countries
          </CardTitle>
          <CardDescription>
            Top countries where requests are originating from.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <ChartContainer config={chartConfig} className="h-[200px]">
            <BarChart data={countryChartData}>
              <XAxis dataKey="label" />
              <YAxis hide />
              <Bar
                dataKey="value"
                radius={4}
                fill="var(--color-value)"
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            </BarChart>
          </ChartContainer>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Country</TableHead>
                <TableHead className="text-right">Views</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCountries.slice(0, 5).map((country) => (
                <TableRow key={country.country}>
                  <TableCell>{country.country}</TableCell>
                  <TableCell className="text-right">
                    {country.count}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
