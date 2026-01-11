import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { nanoid } from 'nanoid'

export async function POST(req: NextRequest) {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const ANONYMOUS_LINK_LIMIT = 3

    if (!user) {
        const anonCookie = req.cookies.get('cipheronce_anon_id')

        if (!anonCookie || !anonCookie.value) {
            return NextResponse.json(
                { error: 'Anonymous user session not found. Please enable cookies.' },
                { status: 400 }
            )
        }

        const anonId = anonCookie.value

        // Check current count
        const { data: usage, error: usageError } = await supabase
            .from('anonymous_usage')
            .select('created_count')
            .eq('fingerprint_id', anonId)
            .single()

        if (usage && usage.created_count >= ANONYMOUS_LINK_LIMIT) {
            return NextResponse.json(
                {
                    error: `You have reached the limit of ${ANONYMOUS_LINK_LIMIT} free links. Please create an account to create more.`,
                },
                { status: 429 }
            )
        }
         if (usageError && usageError.code !== 'PGRST116') { // PGRST116: no rows found
            console.error('Error fetching anonymous usage:', usageError)
            return NextResponse.json({ error: 'Could not verify usage limits.' }, { status: 500 })
        }
    }

    // --- Secret Creation Logic ---
    const {
        encrypted_content,
        encryption_iv,
        expires_at,
        passphrase_hash,
        max_views,
        metadata,
        has_file,
        file_url,
        file_type,
        file_name,
        file_size,
        file_encryption_iv
    } = await req.json()

    if (!expires_at || (!encrypted_content && !has_file)) {
        return NextResponse.json({ error: 'Missing required fields: a secret must have an expiration date and either text content or a file.' }, { status: 400 })
    }

    const short_id = nanoid(12)

    const { data: newSecret, error: createError } = await supabase
        .from('secrets')
        .insert({
            short_id,
            user_id: user ? user.id : null,
            expires_at,
            max_views,
            passphrase_hash,
            encrypted_content: encrypted_content || null,
            encryption_iv: encryption_iv || null,
            metadata,
            has_file,
            file_url,
            file_type,
            file_name,
            file_size,
            file_encryption_iv,
        })
        .select('short_id')
        .single()

    if (createError) {
        console.error('Error creating secret:', createError)
        return NextResponse.json({ error: 'Could not create the secret.' }, { status: 500 })
    }
    // --- End of Secret Creation Logic ---

    // If user is anonymous, increment their creation count
    if (!user) {
        const anonId = req.cookies.get('cipheronce_anon_id')?.value
        if (anonId) {
            const { error: rpcError } = await supabase.rpc('increment_anonymous_creations', {
                p_fingerprint_id: anonId,
            })

            if (rpcError) {
                // Not returning an error to the user, but logging it.
                // The secret was created, we should not fail the request for a tracking issue.
                console.error('Error incrementing anonymous count:', rpcError)
            }
        }
    }

    return NextResponse.json({ short_id: newSecret.short_id })
}
