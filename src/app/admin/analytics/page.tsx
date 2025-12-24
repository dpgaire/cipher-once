import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminAnalyticsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">Analytics coming soon...</p>
        </div>
      </CardContent>
    </Card>
  )
}
