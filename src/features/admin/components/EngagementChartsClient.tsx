"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, TrendingUp, Users } from "lucide-react";
import { EngagementStatsResponse } from "@/features/admin/services/analytics";
import React from "react";

const EngagementChartCard = dynamic(
    () => import("./EngagementChartCard").then((mod) => mod.EngagementChartCard),
    {
        ssr: false,
        loading: () => (
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[200px] w-full" />
                </CardContent>
            </Card>
        ),
    }
);

type EngagementChartsClientProps = {
    engagementStats: EngagementStatsResponse;
}

export function EngagementChartsClient({ engagementStats }: EngagementChartsClientProps) {
    const { page_views, secret_creations, new_users } = engagementStats;

    return (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            <EngagementChartCard
                title="Page Views"
                description="Daily page views for the last 30 days."
                icon={<Eye className="h-5 w-5" />}
                data={page_views}
                dataKey="date"
                valueKey="pageViews"
                color="hsl(var(--chart-1))"
            />
            <EngagementChartCard
                title="Secret Creations"
                description="Daily secret creations for the last 30 days."
                icon={<TrendingUp className="h-5 w-5" />}
                data={secret_creations}
                dataKey="date"
                valueKey="creations"
                color="hsl(var(--chart-2))"
            />
            <EngagementChartCard
                title="New Users"
                description="Daily new user registrations for the last 30 days."
                icon={<Users className="h-5 w-5" />}
                data={new_users}
                dataKey="date"
                valueKey="newUsers"
                color="hsl(var(--chart-3))"
            />
        </div>
    );
}
