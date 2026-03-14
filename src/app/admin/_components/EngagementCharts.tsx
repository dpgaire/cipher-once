import { getEngagementOverTimeStats } from "../_services/analytics";
import { EngagementChartsClient } from "./EngagementChartsClient";

export async function EngagementCharts() {
    let engagementStats;
    try {
        engagementStats = await getEngagementOverTimeStats();
    } catch (error) {
        return (
          <div className="flex h-24 items-center justify-center rounded-2xl border border-red-500/15 bg-red-500/[0.03]"><p className="text-sm text-red-400">Could not load engagement stats.</p></div>
        );
    }

    if (!engagementStats) {
        return (
            <div className="flex h-24 items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02]"><p className="text-sm text-[#6a6a7a]">No engagement stats available.</p></div>
        )
    }

    return <EngagementChartsClient engagementStats={engagementStats} />;
}
