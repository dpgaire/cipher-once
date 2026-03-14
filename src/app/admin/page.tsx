import { PageViewAnalytics } from "@/app/admin/_components/PageViewAnalytics";
import { GlobalStats } from "@/app/admin/_components/GlobalStats";
import { DeviceAnalytics } from "@/app/admin/_components/DeviceAnalytics";
import { EngagementCharts } from "@/app/admin/_components/EngagementCharts"; // Import EngagementCharts
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashbaord() {
  return (
   <div className="h-[calc(100vh-4rem)] overflow-y-auto space-y-8">
      <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
        Dashboard
      </h1>

      <Suspense fallback={<GlobalStatsSkeleton />}>
        <GlobalStats />
      </Suspense>

      <Suspense fallback={<ChartGridSkeleton />}>
        <EngagementCharts />
      </Suspense>

      <Suspense fallback={<div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6"><Skeleton className="h-96 w-full rounded-xl bg-white/5" /></div>}>
        <PageViewAnalytics />
      </Suspense>

      <Suspense fallback={<ChartGridSkeleton />}>
        <DeviceAnalytics />
      </Suspense>
    </div>
  );
}

function GlobalStatsSkeleton() {
  return (
     <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-xl bg-white/5" />
            <div className="space-y-1.5">
              <Skeleton className="h-6 w-14 rounded bg-white/5" />
              <Skeleton className="h-3 w-24 rounded bg-white/5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


function ChartGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 space-y-4">
          <Skeleton className="h-5 w-36 rounded bg-white/5" />
          <Skeleton className="h-3 w-48 rounded bg-white/5" />
          <Skeleton className="h-48 w-full rounded-xl bg-white/5" />
        </div>
      ))}
    </div>
  )
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
