import { PageViewAnalytics } from "@/features/admin/components/PageViewAnalytics";
import { GlobalStats } from "@/features/admin/components/GlobalStats";
import { DeviceAnalytics } from "@/features/admin/components/DeviceAnalytics";
import { EngagementCharts } from "@/features/admin/components/EngagementCharts"; // Import EngagementCharts
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminAnalyticsPage() {
  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>

      <Suspense fallback={<GlobalStatsSkeleton />}>
        <GlobalStats />
      </Suspense>

      {/* Add EngagementCharts here */}
      <Suspense fallback={<EngagementChartsSkeleton />}>
        <EngagementCharts />
      </Suspense>

      <Suspense
        fallback={
          <Card>
            <CardContent>
              <Skeleton className="h-96" />
            </CardContent>
          </Card>
        }
      >
        <PageViewAnalytics />
      </Suspense>

      <Suspense fallback={<DeviceAnalyticsSkeleton />}>
        <DeviceAnalytics />
      </Suspense>
    </div>
  );
}

function GlobalStatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function DeviceAnalyticsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48 mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Skeleton for EngagementCharts
function EngagementChartsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
            <Card key={i}>
                <CardHeader>
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-full mt-2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-48 w-full" />
                </CardContent>
            </Card>
        ))}
    </div>
  );
}
