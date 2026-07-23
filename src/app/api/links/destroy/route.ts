import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { secret_id } = await req.json()

  if (!secret_id) {
    return NextResponse.json({ error: 'Secret ID is required' }, { status: 400 })
  }

  const { data: secret, error: fetchError } = await supabase
    .from('secrets')
    .select('id, is_burned, user_id')
    .eq('id', secret_id)
    .single()

  if (fetchError || !secret) {
    return NextResponse.json({ error: 'Secret not found' }, { status: 404 })
  }

  if (secret.is_burned) {
    return NextResponse.json({ error: 'Secret already burned' }, { status: 400 })
  }

  if (secret.user_id && user && secret.user_id !== user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const { error: burnError } = await supabase.rpc('update_secret_view_and_burn', {
    p_secret_id: secret_id,
  })

  if (burnError) {
    console.error('Error burning secret:', burnError)
    return NextResponse.json({ error: 'Failed to destroy secret' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
