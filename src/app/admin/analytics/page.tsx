import { PageViewAnalytics } from "@/features/admin/components/PageViewAnalytics";
import { GlobalStats } from "@/features/admin/components/GlobalStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>
      
      <Suspense fallback={<GlobalStatsSkeleton />}>
        <GlobalStats />
      </Suspense>
      
      <Suspense fallback={<Card><CardContent><Skeleton className="h-96" /></CardContent></Card>}>
        <PageViewAnalytics />
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
    )
}
