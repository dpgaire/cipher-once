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
import { blockUser, unblockUser, deleteUser } from "@/features/admin/services/actions"
import { useTransition } from "react"
import { toast } from "sonner"

export type UserForAdmin = {
  id: string
  email: string | null
  full_name: string | null
  is_admin: boolean | null
  is_blocked: boolean | null
  created_at: string | null
}

interface UsersTableProps {
  users: UserForAdmin[]
}

export function UsersTable({ users }: UsersTableProps) {
  const [isPending, startTransition] = useTransition()

  const handleBlock = (id: string) => {
    startTransition(async () => {
      try {
        await blockUser(id)
        toast.success("User blocked")
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to block user")
      }
    })
  }

  const handleUnblock = (id: string) => {
    startTransition(async () => {
      try {
        await unblockUser(id)
        toast.success("User unblocked")
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to unblock user")
      }
    })
  }
  
  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this user? This action is irreversible.")) {
      return
    }
    startTransition(async () => {
      try {
        await deleteUser(id)
        toast.success("User deleted")
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to delete user")
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.full_name ?? "-"}</TableCell>
                <TableCell>
                  {user.is_blocked ? (
                    <Badge variant="destructive">Blocked</Badge>
                  ) : (
                    <Badge variant="outline">Active</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {user.is_admin ? (
                    <Badge variant="default">Admin</Badge>
                  ) : (
                    <Badge variant="secondary">User</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {user.created_at ? new Date(user.created_at).toLocaleDateString() : "-"}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {user.is_blocked ? (
                        <DropdownMenuItem onSelect={() => handleUnblock(user.id)}>Unblock</DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onSelect={() => handleBlock(user.id)}>Block</DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-destructive" onSelect={() => handleDelete(user.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
