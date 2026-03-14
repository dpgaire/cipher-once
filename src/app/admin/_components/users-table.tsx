"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal } from "lucide-react"
import { blockUser, unblockUser, deleteUser } from "../_services/actions"
import { useTransition } from "react"
import { toast } from "sonner"

export type UserForAdmin = {
  id: string
  email: string | null
  full_name: string | null
  is_admin: boolean | null
  is_blocked: boolean | null
  created_at: string | null
  total_secrets_created: number | null
  total_secrets_viewed: number | null
  total_secrets_burned: number | null
}

interface UsersTableProps {
  users: UserForAdmin[]
}

export function UsersTable({ users }: UsersTableProps) {
  const [isPending, startTransition] = useTransition()

  const handleBlock = (id: string) => {
    startTransition(async () => {
      try { await blockUser(id); toast.success("User blocked") }
      catch (error) { toast.error(error instanceof Error ? error.message : "Failed to block user") }
    })
  }
  const handleUnblock = (id: string) => {
    startTransition(async () => {
      try { await unblockUser(id); toast.success("User unblocked") }
      catch (error) { toast.error(error instanceof Error ? error.message : "Failed to unblock user") }
    })
  }
  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this user? This action is irreversible.")) return
    startTransition(async () => {
      try { await deleteUser(id); toast.success("User deleted") }
      catch (error) { toast.error(error instanceof Error ? error.message : "Failed to delete user") }
    })
  }

  const headers = ["Email", "Full Name", "Status", "Role", "Created", "Created", "Viewed", "Burned", ""]

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02]">
      {/* Card header */}
      <div className="border-b border-white/5 px-6 py-4">
        <p className="text-sm font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Users</p>
        <p className="text-xs text-[#4a4a5a]">{users.length} registered user{users.length !== 1 ? "s" : ""}</p>
      </div>

      {/* Responsive scroll wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-sm">
          <thead>
            <tr className="border-b border-white/5">
              {["Email", "Full Name", "Status", "Role", "Created", "Secrets ↑", "Viewed", "Burned", ""].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#4a4a5a]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user.id} className={`border-b border-white/[0.03] transition-colors hover:bg-white/[0.02] ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                <td className="px-5 py-3 text-xs text-[#8a8a9a]">{user.email ?? "—"}</td>
                <td className="px-5 py-3 text-xs font-medium text-white">{user.full_name ?? "—"}</td>

                <td className="px-5 py-3">
                  {user.is_blocked
                    ? <span className="inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-400">Blocked</span>
                    : <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">Active</span>
                  }
                </td>

                <td className="px-5 py-3">
                  {user.is_admin
                    ? <span className="inline-flex items-center rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#C9A84C]">Admin</span>
                    : <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#6a6a7a]">User</span>
                  }
                </td>

                <td className="px-5 py-3 text-xs text-[#6a6a7a]">
                  {user.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}
                </td>

                <td className="px-5 py-3 text-center text-xs font-semibold text-white">{user.total_secrets_created ?? 0}</td>
                <td className="px-5 py-3 text-center text-xs font-semibold text-white">{user.total_secrets_viewed ?? 0}</td>
                <td className="px-5 py-3 text-center text-xs font-semibold text-white">{user.total_secrets_burned ?? 0}</td>

                <td className="px-5 py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        disabled={isPending}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-[#4a4a5a] transition-all hover:border-white/10 hover:text-white disabled:opacity-30"
                      >
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-36 rounded-xl border border-white/5 bg-[#0d0d14] p-1 text-white shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
                    >
                      {user.is_blocked
                        ? <DropdownMenuItem onSelect={() => handleUnblock(user.id)} className="rounded-lg px-3 py-2 text-sm text-[#8a8a9a] focus:bg-white/5 focus:text-white cursor-pointer">Unblock</DropdownMenuItem>
                        : <DropdownMenuItem onSelect={() => handleBlock(user.id)} className="rounded-lg px-3 py-2 text-sm text-[#8a8a9a] focus:bg-white/5 focus:text-white cursor-pointer">Block</DropdownMenuItem>
                      }
                      <DropdownMenuItem onSelect={() => handleDelete(user.id)} className="rounded-lg px-3 py-2 text-sm text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
