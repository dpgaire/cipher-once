import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"

export default async function PrivacyPage() {
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
            <h1 className="mb-2 text-4xl font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Zero-Knowledge Architecture</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  CipherOnce is built on a zero-knowledge architecture. We cannot read your secrets because they are
                  encrypted in your browser before being transmitted to our servers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Collection</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <p>We collect minimal information:</p>
                <ul>
                  <li>Encrypted secret content (we cannot decrypt it)</li>
                  <li>Secret metadata (expiration time, view count)</li>
                  <li>Email address (for authenticated users only)</li>
                  <li>Basic usage analytics (anonymized)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <p>Secrets are automatically deleted when:</p>
                <ul>
                  <li>They are viewed (for one-time secrets)</li>
                  <li>They reach their maximum view count</li>
                  <li>They expire based on the set time limit</li>
                  <li>7 days after expiration</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <p>We use industry-standard security measures:</p>
                <ul>
                  <li>AES-256-GCM encryption for all secrets</li>
                  <li>HTTPS/TLS for all connections</li>
                  <li>Row Level Security (RLS) in our database</li>
                  <li>Regular security audits and updates</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
