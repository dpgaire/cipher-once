"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/copy-button"
import { CheckCircle2, AlertTriangle, Share2 } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import { QRCodeDisplay } from "@/components/qr-code-display"

function SuccessContent() {
  const searchParams = useSearchParams()
  const shortId = searchParams.get("id")
  const key = searchParams.get("key")

  if (!shortId || !key) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Invalid Link
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              The secret link could not be generated. Please try creating your secret again.
            </p>
            <Button asChild>
              <Link href="/create">Try Again</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const secretUrl = `${window.location.origin}/s/${shortId}#${key}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container py-12">
        <div className="mx-auto max-w-2xl">
          {/* Success Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-balance">Secret Created Successfully</h1>
            <p className="text-muted-foreground">Your secret is encrypted and ready to share</p>
          </div>

          {/* Secret Link Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Your Secret Link
              </CardTitle>
              <CardDescription>Share this link with your recipient. It can only be used once.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <code className="break-all text-sm">{secretUrl}</code>
              </div>
              <CopyButton text={secretUrl} label="Copy Secret Link" className="w-full" variant="default" />
              <QRCodeDisplay value={secretUrl} size={192} />
            </CardContent>
          </Card>

          {/* Important Notice */}
          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-600">
                <AlertTriangle className="h-5 w-5" />
                Important
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>
                <strong>Save this link now.</strong> Once you leave this page, you won&apos;t be able to retrieve it
                again.
              </p>
              <p>
                The secret will be <strong>permanently deleted</strong> after it&apos;s viewed or when it expires.
              </p>
              <p>The encryption key is in the URL fragment (after #) and is never sent to our servers.</p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline" className="flex-1 bg-transparent">
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href="/create">Create Another Secret</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
