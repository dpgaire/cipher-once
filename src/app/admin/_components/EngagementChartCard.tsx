"use client"

import {
  LineChart as RechartsLineChart, Line as RechartsLine,
  XAxis, YAxis, Tooltip as RechartsTooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts"
import React from "react"

type EngagementChartProps = {
  title: string
  description: string
  icon: React.ReactNode
  data: { date: string; count: number }[]
  dataKey: string
  valueKey: string
  color?: string
}

export function EngagementChartCard({ title, description, icon, data, valueKey }: EngagementChartProps) {
  const chartData = data.map((item) => ({ date: item.date, [valueKey]: item.count }))

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

      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="date" tick={{ fill: "#4a4a5a", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#4a4a5a", fontSize: 10 }} axisLine={false} tickLine={false} />
            <RechartsTooltip
              contentStyle={{
                backgroundColor: "#0d0d14", border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.5)", fontSize: 11, color: "#fff",
              }}
              labelStyle={{ color: "#6a6a7a" }}
              cursor={{ stroke: "rgba(201,168,76,0.3)", strokeDasharray: "3 3" }}
            />
            <RechartsLine
              type="monotone"
              dataKey={valueKey}
              stroke="#C9A84C"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#C9A84C", strokeWidth: 0 }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
