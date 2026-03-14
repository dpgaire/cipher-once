"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { EmptyState } from "@/components/ui/empty";
import { TableSkeleton } from "@/components/core";

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

const statusConfig: Record<string, { label: string; cls: string }> = {
  success: { label: "Success", cls: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" },
  view:    { label: "View",    cls: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" },
  failure: { label: "Failure", cls: "border-red-500/20 bg-red-500/10 text-red-400" },
  burn:    { label: "Burned",  cls: "border-orange-500/20 bg-orange-500/10 text-orange-400" },
  attempt: { label: "Attempt", cls: "border-white/10 bg-white/5 text-[#6a6a7a]" },
}

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] ?? { label: status, cls: "border-white/10 bg-white/5 text-[#6a6a7a]" }
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${cfg.cls}`}>
      {cfg.label}
    </span>
  )
}

export function SecretAccessLogs() {
  const [logs, setLogs] = useState<SecretAccessLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const PAGE_SIZE = 100
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch(`/api/admin/logs?page=${page}&pageSize=${PAGE_SIZE}`)
        if (!response.ok) {
          const ct = response.headers.get("content-type")
          const errorMessage = ct?.includes("application/json")
            ? (await response.json()).error || "Failed to fetch logs"
            : await response.text()
          throw new Error(errorMessage)
        }
        const result = await response.json()
        setLogs(result.data)
        setTotal(result.total)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load logs.")
      } finally { setIsLoading(false) }
    }
    fetchLogs()
  }, [page])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  if (isLoading) return <div className="max-h-[60vh] overflow-y-auto"><TableSkeleton rows={10} cols={9} /></div>
  if (error) return <EmptyState icon={AlertCircle} title="Error loading logs" description={error} />
  if (!logs?.length) return <EmptyState icon={AlertCircle} title="No access logs found" description="No access logs were recorded." />

  const cols = ["Log ID", "Secret", "Status", "Accessed At", "IP", "User Agent", "User", "Error", "Metadata"]

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]">
      {/* Scrollable table */}
      <div className="max-h-[60vh] overflow-auto">
        <table className="w-full min-w-[900px] text-xs">
          <thead className="sticky top-0 z-10 bg-[#0d0d14]">
            <tr className="border-b border-white/5">
              {cols.map((col) => (
                <th key={col} className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#4a4a5a]">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={log.id} className={`border-b border-white/[0.03] transition-colors hover:bg-white/[0.02] ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                <td className="px-4 py-3 font-mono text-[#6a6a7a]">{log.id.slice(0, 8)}…</td>
                <td className="px-4 py-3 font-mono text-[#6a6a7a]">{log.secret_id.slice(0, 8)}…</td>
                <td className="px-4 py-3"><StatusBadge status={log.status} /></td>
                <td className="px-4 py-3 text-[#8a8a9a]">{format(new Date(log.accessed_at), "MMM d, yyyy HH:mm:ss")}</td>
                <td className="px-4 py-3 font-mono text-[#6a6a7a]">{log.ip_address ?? "N/A"}</td>
                <td className="max-w-[200px] truncate px-4 py-3 font-mono text-[#6a6a7a]">{log.user_agent ?? "N/A"}</td>
                <td className="px-4 py-3 font-mono text-[#6a6a7a]">{log.accessed_by_user_id ? `${log.accessed_by_user_id.slice(0, 8)}…` : "N/A"}</td>
                <td className="max-w-[140px] truncate px-4 py-3 text-red-400/70">{log.error_message || "—"}</td>
                <td className="max-w-[140px] truncate px-4 py-3 font-mono text-[#4a4a5a]">{log.metadata ? JSON.stringify(log.metadata) : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      <div className="flex items-center justify-between border-t border-white/5 bg-[#0d0d14] px-5 py-3">
        <span className="text-xs text-[#4a4a5a]">
          Showing <span className="font-semibold text-white">{(page - 1) * PAGE_SIZE + 1}</span>–
          <span className="font-semibold text-white">{Math.min(page * PAGE_SIZE, total)}</span> of{" "}
          <span className="font-semibold text-white">{total}</span> logs
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-[#6a6a7a] transition-all hover:border-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <span className="text-xs text-[#6a6a7a]">
            <span className="font-semibold text-white">{page}</span> / <span className="font-semibold text-white">{totalPages}</span>
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-[#6a6a7a] transition-all hover:border-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
