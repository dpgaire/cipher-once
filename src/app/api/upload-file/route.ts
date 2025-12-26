import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Check for required environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env var: NEXT_PUBLIC_SUPABASE_URL')
}
if (!process.env.SUPABASE_SERVICE_KEY) {
  throw new Error('Missing env var: SUPABASE_SERVICE_KEY')
}

// The name of your Supabase storage bucket
const BUCKET_NAME = 'file-storage'

// Set the maximum file size to 20MB
const MAX_FILE_SIZE_MB = 20
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

// Initialize the Supabase admin client
// This will use the service role key to bypass RLS for file uploads
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData()
    const encryptedFile = formData.get('encryptedFile') as Blob | null
    const fileName = formData.get('fileName') as string
    const fileType = formData.get('fileType') as string
    const fileIv = formData.get('fileIv') as string
    const fileSize = parseInt(formData.get('fileSize') as string, 10)

    if (!encryptedFile || !fileName || !fileType || !fileIv || isNaN(fileSize)) {
      return NextResponse.json({ error: 'Missing required file data.' }, { status: 400 })
    }

    // Check if the file size exceeds the 20MB limit
    if (encryptedFile.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ error: `File size exceeds the ${MAX_FILE_SIZE_MB}MB limit.` }, { status: 413 }) // 413 Payload Too Large
    }

    // Use a unique filename for Supabase Storage
    const fileExtension = fileName.split('.').pop()
    const uniqueFileName = `${crypto.randomUUID()}.${fileExtension || 'bin'}`

    // Upload the file to Supabase Storage using the admin client
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(uniqueFileName, encryptedFile)

    if (uploadError) {
      console.error('Error uploading file to Supabase:', uploadError)
      return NextResponse.json(
        { error: `Failed to upload file to Supabase: ${uploadError.message}` },
        { status: 500 }
      )
    }

    // Get the public URL of the uploaded file
    //
    // IMPORTANT: This requires the `files` bucket to be created in your Supabase project
    // with public access enabled. You can do this in your Supabase dashboard under
    // Storage -> Buckets -> Create Bucket.
    const { data: publicUrlData } = supabaseAdmin.storage.from(BUCKET_NAME).getPublicUrl(uploadData.path)

    if (!publicUrlData) {
      console.error('Error getting public URL from Supabase')
      return NextResponse.json(
        { error: 'Failed to get public URL for the file from Supabase.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        blobUrl: publicUrlData.publicUrl,
        fileName,
        fileType,
        fileIv,
        fileSize,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing file upload:', error)
    return NextResponse.json(
      { error: `Failed to process file upload: ${(error as Error).message}` },
      { status: 500 }
    )
  }
}