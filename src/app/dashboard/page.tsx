import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardPage } from "@/features/secrets/components/dashboard-page"
import type { Secret } from "@/features/secrets/types"
import { Suspense } from "react"
import { DashboardSkeleton } from "@/features/secrets/components/dashboard-skeleton"

export default async function DashboardPageWrapper({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: secrets } = await supabase
    .from("secrets")
    .select(
      "id, short_id, created_at, expires_at, view_count, max_views, is_burned, passphrase_hash"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })


  const { data: profile } = await supabase
    .from('profiles')
    .select('total_secrets_created, total_secrets_viewed, total_secrets_burned')
    .eq('id', user?.id)
    .single();


  return (
    <>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardPage secrets={(secrets as Secret[]) || []} searchParams={searchParams} stats={profile} />
      </Suspense>
      {/* <Suspense fallback={null}>
        <DashboardMobileNavWrapper />
      </Suspense> */}
    </>
  )
}
