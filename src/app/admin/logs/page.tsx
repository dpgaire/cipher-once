"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // CardDescription no longer needed
import { SecretAccessLogs } from "@/features/admin/components/secret-access-logs";

export default function AdminLogsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>All Secret Access Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <SecretAccessLogs /> 
        </CardContent>
      </Card>
    </div>
  );
}
