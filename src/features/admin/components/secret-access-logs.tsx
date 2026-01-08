"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { EmptyState } from "@/components/ui/empty";
import { TableSkeleton } from "@/features/core/components";

interface SecretAccessLog {
  id: string;
  secret_id: string;
  accessed_at: string;
  ip_address: string | null;
  user_agent: string | null;
  status: string; // 'attempt', 'success', 'failure', 'burn'
  error_message: string | null;
  accessed_by_user_id: string | null;
  metadata: Record<string, any> | null;
}

interface SecretAccessLogsProps {
  // secretId: string; // No longer needed for fetching all logs
}

export function SecretAccessLogs({}: /* secretId */ SecretAccessLogsProps) {
  const [logs, setLogs] = useState<SecretAccessLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const PAGE_SIZE = 100;

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `/api/admin/logs?page=${page}&pageSize=${PAGE_SIZE}`
        );

        if (!response.ok) {
          const contentType = response.headers.get("content-type");
          let errorMessage = "Failed to fetch access logs";

          if (contentType?.includes("application/json")) {
            const err = await response.json();
            errorMessage = err.error || errorMessage;
          } else {
            errorMessage = await response.text();
          }

          throw new Error(errorMessage);
        }

        const result = await response.json();

        setLogs(result.data);
        setTotal(result.total);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Failed to load logs.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, [page]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (isLoading) {
    return (
      <div className="max-h-[60vh] overflow-y-auto">
        <TableSkeleton rows={10} cols={9} /> {/* Adjust cols for new data */}
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

  if (!logs || logs.length === 0) {
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
        return (
          <Badge
            variant="default"
            className="bg-emerald-500 hover:bg-emerald-500"
          >
            Success
          </Badge>
        );
      case "failure":
        return <Badge variant="destructive">Failure</Badge>;
      case "burn":
        return (
          <Badge variant="default" className="bg-red-500 hover:bg-red-500">
            Burned
          </Badge>
        );
      case "attempt":
        return <Badge variant="secondary">Attempt</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="max-h-[60vh] w-full overflow-y-auto rounded-lg border">
      <Table>
        <TableHeader className="sticky top-0 overflow-y-auto bg-muted z-10">
          <TableRow>
            <TableHead className="text-xs font-semibold">Log ID</TableHead>
            <TableHead className="text-xs font-semibold">Secret</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Accessed</TableHead>
            <TableHead>IP</TableHead>
            <TableHead className="max-w-[220px]">User Agent</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Error</TableHead>
            <TableHead>Metadata</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {logs.map((log) => (
            <TableRow
              key={log.id}
              className="odd:bg-muted/30 hover:bg-muted/60 transition-colors"
            >
              <TableCell className="font-mono text-xs">
                {log.id.slice(0, 8)}…
              </TableCell>

              <TableCell className="font-mono text-xs">
                {log.secret_id.slice(0, 8)}…
              </TableCell>

              <TableCell>{getStatusBadge(log.status)}</TableCell>

              <TableCell className="text-xs">
                {format(new Date(log.accessed_at), "MMM d, yyyy HH:mm:ss")}
              </TableCell>

              <TableCell className="font-mono text-xs">
                {log.ip_address ?? "N/A"}
              </TableCell>

              <TableCell className="font-mono text-xs max-w-[220px] truncate">
                {log.user_agent ?? "N/A"}
              </TableCell>

              <TableCell className="font-mono text-xs">
                {log.accessed_by_user_id
                  ? `${log.accessed_by_user_id.slice(0, 8)}…`
                  : "N/A"}
              </TableCell>

              <TableCell className="text-destructive max-w-[160px] truncate">
                {log.error_message || "—"}
              </TableCell>

              <TableCell className="font-mono text-xs max-w-[160px] truncate">
                {log.metadata ? JSON.stringify(log.metadata) : "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="sticky bottom-0 bg-background border-t">
          <TableRow>
            <TableCell colSpan={9}>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  Showing{" "}
                  <span className="font-medium">
                    {(page - 1) * PAGE_SIZE + 1}
                  </span>
                  –
                  <span className="font-medium">
                    {Math.min(page * PAGE_SIZE, total)}
                  </span>{" "}
                  of <span className="font-medium">{total}</span> logs
                </span>

                <div className="flex items-center gap-2">
                  <button
                    className="rounded-md border px-2 py-1 disabled:opacity-50"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    Previous
                  </button>

                  <span>
                    Page <span className="font-medium">{page}</span> of{" "}
                    <span className="font-medium">{totalPages}</span>
                  </span>

                  <button
                    className="rounded-md border px-2 py-1 disabled:opacity-50"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
