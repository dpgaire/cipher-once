import { getDeviceAnalytics, DeviceAnalytics as DeviceAnalyticsData } from "../_services/analytics";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ChartConfig } from "@/components/ui/chart"
import { Smartphone, Globe, Laptop } from "lucide-react";

const chartConfig = {
    count: {
        label: "Views",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

type AnalyticsCardProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
    data: { name: string; count: number }[];
}

function AnalyticsCard({ title, description, icon, data }: AnalyticsCardProps) {
  const max = Math.max(...data.slice(0, 5).map((d) => d.count), 1)
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

      <div className="space-y-2.5">
        {data.slice(0, 5).map((item) => {
          const pct = Math.round((item.count / max) * 100)
          return (
            <div key={item.name}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="truncate text-[#8a8a9a]">{item.name}</span>
                <span className="ml-2 shrink-0 font-semibold text-white">{item.count}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-[#C9A84C]/60 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
    )
}

export async function DeviceAnalytics() {
    let analyticsData: DeviceAnalyticsData;
    try {
        analyticsData = await getDeviceAnalytics();
    } catch (error) {
        return (
            <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                <p className="text-destructive">Could not load device analytics.</p>
            </div>
        );
    }

    const { devices, browsers, operating_systems } = analyticsData;

    return (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            <AnalyticsCard 
                title="Devices"
                description="Breakdown of views by device type."
                icon={<Smartphone className="h-5 w-5" />}
                data={devices.map(d => ({ name: d.device, count: d.count }))}
            />
            <AnalyticsCard 
                title="Browsers"
                description="Breakdown of views by browser."
                icon={<Globe className="h-5 w-5" />}
                data={browsers.map(b => ({ name: b.browser, count: b.count }))}
            />
            <AnalyticsCard 
                title="Operating Systems"
                description="Breakdown of views by OS."
                icon={<Laptop className="h-5 w-5" />}
                data={operating_systems.map(os => ({ name: os.os, count: os.count }))}
            />
        </div>
    );
}
