"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AlertCircle } from "lucide-react"
import { EmptyState } from "@/components/ui/empty"
import { TableSkeleton } from "@/features/core/components"

interface SecretAccessLog {
  id: string
  secret_id: string
  accessed_at: string
  ip_address: string | null
  user_agent: string | null
  status: string // 'attempt', 'success', 'failure', 'burn'
  error_message: string | null
  accessed_by_user_id: string | null
  metadata: Record<string, any> | null
}

interface SecretAccessLogsProps {
  // secretId: string; // No longer needed for fetching all logs
}

export function SecretAccessLogs({ /* secretId */ }: SecretAccessLogsProps) {
  const [logs, setLogs] = useState<SecretAccessLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`/api/admin/logs`) // Call the new API endpoint
        console.log("SecretAccessLogs: API Response Status:", response.status, "OK:", response.ok);
        console.log("SecretAccessLogs: API Response Content-Type:", response.headers.get('content-type'));

        if (!response.ok) {
          let errorMessage = "Failed to fetch access logs";
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } else {
            // If not JSON, try to read as text to get any error message
            errorMessage = await response.text();
          }
          throw new Error(errorMessage);
        }

        console.log('response',response)
        
        // Check if response is empty before parsing as JSON
        const responseText = await response.text();
        console.log('responseText',responseText)
        if (!responseText) {
            throw new Error("API returned an empty response.");
        }
        const data: SecretAccessLog[] = JSON.parse(responseText);
        
        setLogs(data);
      } catch (err) {
        console.error("SecretAccessLogs: Error fetching secret access logs:", err);
        setError(err instanceof Error ? err.message : "Failed to load logs.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []); // Empty dependency array means it runs once on mount

  if (isLoading) {
    return (
      <div className="max-h-[60vh] overflow-y-auto">
        <TableSkeleton rows={10} cols={7} /> {/* Adjust cols for new data */}
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={AlertCircle}
        title="Error loading logs"
        description={error}
      />
    );
  }

  if (logs.length === 0) {
    return (
      <EmptyState
        icon={AlertCircle}
        title="No access logs found"
        description="No access logs were recorded."
      />
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-500">Success</Badge>;
      case "failure":
        return <Badge variant="destructive">Failure</Badge>;
      case "burn":
        return <Badge variant="default" className="bg-red-500 hover:bg-red-500">Burned</Badge>;
      case "attempt":
        return <Badge variant="secondary">Attempt</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="max-h-[60vh] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Log ID</TableHead> {/* Display Log ID */}
            <TableHead>Secret ID</TableHead> {/* Display Secret ID */}
            <TableHead>Status</TableHead>
            <TableHead>Accessed At</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>User Agent</TableHead>
            <TableHead>User ID</TableHead> {/* Display accessed_by_user_id */}
            <TableHead>Error Message</TableHead>
            <TableHead>Metadata</TableHead> {/* Display metadata */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-mono text-xs">{log.id.substring(0, 8)}...</TableCell>
              <TableCell className="font-mono text-xs">{log.secret_id.substring(0, 8)}...</TableCell>
              <TableCell>{getStatusBadge(log.status)}</TableCell>
              <TableCell>{format(new Date(log.accessed_at), "MMM d, yyyy HH:mm:ss")}</TableCell>
              <TableCell className="font-mono text-xs">{log.ip_address || "N/A"}</TableCell>
              <TableCell className="font-mono text-xs max-w-[200px] truncate">{log.user_agent || "N/A"}</TableCell>
              <TableCell className="font-mono text-xs">{log.accessed_by_user_id ? log.accessed_by_user_id.substring(0, 8) + '...' : "N/A"}</TableCell>
              <TableCell className="text-destructive max-w-[150px] truncate">{log.error_message || "—"}</TableCell>
              <TableCell className="font-mono text-xs max-w-[150px] truncate">{log.metadata ? JSON.stringify(log.metadata) : "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
