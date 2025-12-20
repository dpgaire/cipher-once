import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"

export default async function TermsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} />
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  By using CipherOnce, you agree to these terms. If you do not agree, please do not use our service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Description</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  CipherOnce provides a platform for secure, encrypted sharing of sensitive information through
                  self-destructing links. We offer zero-knowledge encryption where secrets are encrypted client-side
                  before transmission.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <p>You agree to:</p>
                <ul>
                  <li>Use the service lawfully and ethically</li>
                  <li>Not share illegal, harmful, or malicious content</li>
                  <li>Keep your account credentials secure</li>
                  <li>Not attempt to break or circumvent security measures</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Limitations of Liability</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  CipherOnce is provided "as is" without warranties. We are not responsible for lost data, unauthorized
                  access, or misuse of the service. Users are responsible for maintaining backups of important
                  information.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Modifications</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  We reserve the right to modify, suspend, or discontinue any part of the service at any time with or
                  without notice.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
