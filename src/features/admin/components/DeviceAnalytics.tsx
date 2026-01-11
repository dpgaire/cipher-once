import { getDeviceAnalytics, DeviceAnalytics as DeviceAnalyticsData } from "@/features/admin/services/analytics";
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
    const chartData = data.slice(0, 10).map(item => ({ item: item.name, count: item.count }));

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {icon} {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{title}</TableHead>
                            <TableHead className="text-right">Views</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.slice(0, 5).map((item) => (
                            <TableRow key={item.name}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell className="text-right">{item.count}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
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
