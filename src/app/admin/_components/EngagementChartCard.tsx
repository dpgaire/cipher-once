"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    LineChart as RechartsLineChart,
    Line as RechartsLine,
    XAxis,
    YAxis,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import React from "react";

type EngagementChartProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
    data: { date: string; count: number }[];
    dataKey: string;
    valueKey: string;
    color?:string;
};

export function EngagementChartCard({
    title,
    description,
    icon,
    data,
    valueKey,
}: EngagementChartProps) {
    const chartData = data.map((item) => ({
        date: item.date,
        [valueKey]: item.count,
    }));

    return (
        <Card className="border-neutral-200">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-neutral-900">
                    {icon} {title}
                </CardTitle>
                <CardDescription className="text-neutral-500">
                    {description}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="min-h-[200px] w-full">
                    <ResponsiveContainer width="100%" height={200}>
                        <RechartsLineChart data={chartData}>
                            {/* Subtle grid */}
                            <CartesianGrid
                                stroke="#e5e5e5"
                                strokeDasharray="4 4"
                                vertical={false}
                            />

                            {/* X Axis */}
                            <XAxis
                                dataKey="date"
                                tick={{ fill: "#737373", fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />

                            {/* Y Axis */}
                            <YAxis
                                tick={{ fill: "#737373", fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />

                            {/* Minimal tooltip */}
                            <RechartsTooltip
                                contentStyle={{
                                    backgroundColor: "#ffffff",
                                    border: "1px solid #000",
                                    borderRadius: 6,
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                    fontSize: "12px",
                                }}
                                labelStyle={{ color: "#000" }}
                                cursor={{ stroke: "#000", strokeDasharray: "3 3" }}
                            />

                            {/* Premium line */}
                            <RechartsLine
                                type="monotone"
                                dataKey={valueKey}
                                stroke="#000000"
                                strokeWidth={2.5}
                                dot={false}
                                activeDot={{ r: 4, fill: "#000" }}
                            />
                        </RechartsLineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
