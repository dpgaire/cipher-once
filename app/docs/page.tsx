import { Book, Layers, Database, FileText, Code } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Project Documentation - CipherOnce",
  description:
    "Technical documentation for the CipherOnce project, covering the technology stack, architecture, database schema, and page structure.",
}

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre className="rounded-lg bg-muted p-4 text-sm text-muted-foreground overflow-x-auto">
    <code>{children}</code>
  </pre>
)

export default function DocsPage() {
  return (
    <div className="bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto max-w-4xl py-12 px-6 md:py-20">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Book className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-balance md:text-5xl">Project Documentation</h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            A technical overview of the CipherOnce application.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {/* Technology Stack */}
          <section>
            <h2 className="flex items-center gap-3 text-2xl font-semibold mb-6 border-b pb-3">
              <Layers className="h-6 w-6" />
              Technology Stack
            </h2>
            <ul className="list-disc space-y-3 pl-5 text-muted-foreground">
              <li>
                <strong>Framework:</strong> <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Next.js</a> (App Router) - For full-stack React development with server components and API routes.
              </li>
              <li>
                <strong>Language:</strong> <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">TypeScript</a> - For static typing and improved developer experience.
              </li>
              <li>
                <strong>Backend & Database:</strong> <a href="https://supabase.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Supabase</a> - Used for PostgreSQL database hosting, authentication (including GitHub OAuth), and auto-generated APIs.
              </li>
              <li>
                <strong>UI Components:</strong> <a href="https://ui.shadcn.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">shadcn/ui</a> - A collection of beautifully designed, accessible, and composable components.
              </li>
              <li>
                <strong>Styling:</strong> <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Tailwind CSS</a> - For utility-first CSS styling.
              </li>
              <li>
                <strong>Encryption:</strong> <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Web Crypto API</a> - Browser-native API for all cryptographic operations (AES-GCM).
              </li>
            </ul>
          </section>

          {/* Architecture */}
          <section>
            <h2 className="flex items-center gap-3 text-2xl font-semibold mb-6 border-b pb-3">
              <Code className="h-6 w-6" />
              Architecture
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                CipherOnce is built on a "zero-knowledge" architecture, meaning the server has no knowledge of the unencrypted secret content. All encryption and decryption happen client-side in the user's browser.
              </p>
              <h3 className="text-lg font-medium text-foreground pt-4">The Encryption Flow:</h3>
              <ol className="list-decimal space-y-2 pl-5">
                <li>A user enters a secret on the <code className="text-xs">/create</code> page.</li>
                <li>The browser generates a random encryption key (<code className="text-xs">CryptoKey</code>) or derives one from a passphrase.</li>
                <li>The secret is encrypted in the browser using AES-256-GCM via the Web Crypto API.</li>
                <li>The <span className="font-semibold">encrypted content</span> is sent to the Supabase server for storage. The <span className="font-semibold">encryption key</span> is <span className="font-semibold text-destructive">NEVER</span> sent to the server.</li>
                <li>The server stores the encrypted data and returns a unique <code className="text-xs">short_id</code>.</li>
                <li>The browser constructs a shareable URL containing the <code className="text-xs">short_id</code> and the encryption key (as a URL fragment, e.g., <code className="text-xs">/s/short_id#key</code>).</li>
                <li>When a recipient opens the URL, the browser fetches the encrypted content using the <code className="text-xs">short_id</code>, then uses the key from the URL fragment to decrypt and display the secret.</li>
              </ol>
            </div>
          </section>

          {/* Database Schema */}
          <section>
            <h2 className="flex items-center gap-3 text-2xl font-semibold mb-6 border-b pb-3">
              <Database className="h-6 w-6" />
              Database Schema
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">`secrets` Table</h3>
                <p className="text-sm text-muted-foreground mb-4">Stores the encrypted secret content and its metadata.</p>
                <CodeBlock>{`
CREATE TABLE IF NOT EXISTS secrets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  encrypted_content TEXT NOT NULL,
  encryption_iv TEXT NOT NULL,
  short_id VARCHAR(12) UNIQUE NOT NULL,
  passphrase_hash TEXT,
  max_views INTEGER DEFAULT 1,
  view_count INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_burned BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}'::jsonb
);
                `}</CodeBlock>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">`profiles` Table</h3>
                <p className="text-sm text-muted-foreground mb-4">Stores user-specific data linked to the `auth.users` table.</p>
                <CodeBlock>{`
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  terms_accepted_at TIMESTAMPTZ
);
                `}</CodeBlock>
              </div>
            </div>
          </section>

          {/* Pages */}
          <section>
            <h2 className="flex items-center gap-3 text-2xl font-semibold mb-6 border-b pb-3">
              <FileText className="h-6 w-6" />
              Pages & Routes
            </h2>
            <ul className="space-y-4 text-muted-foreground">
              <li><strong className="text-foreground">/</strong> - The main landing page.</li>
              <li><strong className="text-foreground">/create</strong> - The page where users can create a new encrypted secret.</li>
              <li><strong className="text-foreground">/create/success</strong> - Displayed after a secret is successfully created, showing the one-time shareable link.</li>
              <li><strong className="text-foreground">/s/[shortId]</strong> - The page where a recipient views a secret. It reads the key from the URL fragment to decrypt the content.</li>
              <li><strong className="text-foreground">/dashboard</strong> - A protected route where authenticated users can view and manage their created secrets.</li>
              <li><strong className="text-foreground">/auth/login</strong> & <strong className="text-foreground">/auth/sign-up</strong> - User authentication pages.</li>
              <li><strong className="text-foreground">/auth/callback</strong> - Server-side route to handle the OAuth callback from providers like GitHub.</li>
              <li><strong className="text-foreground">/about</strong>, <strong className="text-foreground">/privacy</strong>, <strong className="text-foreground">/terms</strong>, <strong className="text-foreground">/docs</strong> - Static content and documentation pages.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
