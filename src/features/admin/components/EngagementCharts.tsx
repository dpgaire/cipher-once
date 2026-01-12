import { getEngagementOverTimeStats } from "@/features/admin/services/analytics";
import { EngagementChartsClient } from "./EngagementChartsClient";

export async function EngagementCharts() {
    let engagementStats;
    try {
        engagementStats = await getEngagementOverTimeStats();
    } catch (error) {
        return (
            <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                <p className="text-destructive">Could not load engagement stats.</p>
            </div>
        );
    }

    if (!engagementStats) {
        return (
             <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                <p>No engagement stats available.</p>
            </div>
        )
    }

    return <EngagementChartsClient engagementStats={engagementStats} />;
}
