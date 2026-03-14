import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
  return (
    <div className="container max-w-7xl flex-1 py-8">
      {/* Stats Grid Skeleton */}
      <div className="mb-8 grid gap-4 grid-cols-2 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-xl bg-white/5" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-10 rounded bg-white/5" />
                <Skeleton className="h-3 w-20 rounded bg-white/5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Secrets card Skeleton */}
      <div className="rounded-2xl border border-white/5 bg-white/[0.02]">
        <div className="border-b border-white/5 px-7 pt-6 pb-5 space-y-4">
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-36 rounded bg-white/5" />
            <Skeleton className="h-3 w-64 rounded bg-white/5" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-24 rounded-lg bg-white/5" />
            <Skeleton className="h-8 w-24 rounded-lg bg-white/5" />
            <Skeleton className="h-8 w-24 rounded-lg bg-white/5" />
          </div>
        </div>
        <div className="p-7">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-3/5 rounded bg-white/5" />
                  <Skeleton className="h-3 w-4/5 rounded bg-white/5" />
                </div>
                <Skeleton className="h-16 w-full rounded-xl bg-white/5" />
                <Skeleton className="h-9 w-full rounded-lg bg-white/5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}