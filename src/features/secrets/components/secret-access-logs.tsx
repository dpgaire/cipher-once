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
import { Loader2, XCircle, CheckCircle2, AlertCircle } from "lucide-react"
import { EmptyState } from "@/components/ui/empty"

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
  secretId: string
}

export function SecretAccessLogs({ secretId }: SecretAccessLogsProps) {
  const [logs, setLogs] = useState<SecretAccessLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!secretId) {
      setError("No secret ID provided.")
      setIsLoading(false)
      return
    }

    const fetchLogs = async () => {
      try {
        const response = await fetch(`/api/secret-access-logs/${secretId}`)
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to fetch access logs")
        }
        const data: SecretAccessLog[] = await response.json()
        setLogs(data)
      } catch (err) {
        console.error("Error fetching secret access logs:", err)
        setError(err instanceof Error ? err.message : "Failed to load logs.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchLogs()
  }, [secretId])

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <EmptyState
        icon={AlertCircle}
        title="Error loading logs"
        description={error}
      />
    )
  }

  if (logs.length === 0) {
    return (
      <EmptyState
        icon={CheckCircle2}
        title="No access logs found"
        description="This secret has not been accessed yet, or no logs were recorded."
      />
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-500">Success</Badge>
      case "failure":
        return <Badge variant="destructive">Failure</Badge>
      case "burn":
        return <Badge variant="default" className="bg-red-500 hover:bg-red-500">Burned</Badge>
      case "attempt":
        return <Badge variant="secondary">Attempt</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="max-h-[60vh] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Accessed At</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>User Agent</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{getStatusBadge(log.status)}</TableCell>
              <TableCell>{format(new Date(log.accessed_at), "MMM d, yyyy HH:mm:ss")}</TableCell>
              <TableCell className="font-mono text-xs">{log.ip_address || "N/A"}</TableCell>
              <TableCell className="font-mono text-xs max-w-[200px] truncate">{log.user_agent || "N/A"}</TableCell>
              <TableCell className="text-destructive max-w-[150px] truncate">{log.error_message || "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
