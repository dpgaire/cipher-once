import { createClient } from "@/lib/supabase/server"
import { UsersTable, UserForAdmin } from "@/features/admin/components/users-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

async function getUsers(): Promise<UserForAdmin[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.rpc("get_all_users")
  if (error) {
    console.error("Error fetching users:", JSON.stringify(error, null, 2))
    return []
  }
  return data
}

export default async function AdminUsersPage() {
  const users = await getUsers()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <UsersTable users={users} />
      </CardContent>
    </Card>
  )
}
