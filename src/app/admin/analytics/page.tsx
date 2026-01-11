import { PageViewAnalytics } from "@/features/admin/components/PageViewAnalytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminAnalyticsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <PageViewAnalytics />
      </CardContent>
    </Card>
  );
}
