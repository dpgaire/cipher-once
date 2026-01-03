# CipherOnce Project Documentation

This document provides a technical overview of the CipherOnce application, covering its technology stack, architecture, database schema, and core pages.

## 1. Technology Stack

-   **Framework:** [Next.js](https://nextjs.org/) (App Router) - For full-stack React development with server components, client components, and API routes.
-   **Language:** [TypeScript](https://www.typescriptlang.org/) - For static typing and improved developer experience.
-   **Backend & Database:** [Supabase](https://supabase.com/) - Used for PostgreSQL database hosting, authentication (including GitHub OAuth), and auto-generated APIs.
-   **UI Components:** [shadcn/ui](https://ui.shadcn.com/) - A collection of beautifully designed, accessible, and composable components built on top of Radix UI and Tailwind CSS.
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) - For utility-first CSS styling.
-   **Encryption:** [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) - Browser-native API for all cryptographic operations (AES-GCM).

## 2. Architecture

CipherOnce is built on a "zero-knowledge" architecture, meaning the server has no knowledge of the unencrypted secret content. All encryption and decryption happen client-side in the user's browser.

### The Encryption Flow:

1.  A user enters a secret on the `/create` page.
2.  The browser generates a random encryption key (`CryptoKey`) or derives one from a passphrase.
3.  The secret is encrypted in the browser using AES-256-GCM via the Web Crypto API.
4.  The **encrypted content** is sent to the Supabase server for storage. The **encryption key is NEVER sent to the server.**
5.  The server stores the encrypted data and returns a unique `short_id`.
6.  The browser constructs a shareable URL containing the `short_id` and the encryption key (as a URL fragment, e.g., `/s/short_id#key`).
7.  When a recipient opens the URL, the browser fetches the encrypted content using the `short_id`, then uses the key from the URL fragment to decrypt and display the secret.

## 3. Database Schema

### `secrets` Table

Stores the encrypted secret content and its metadata.

```sql
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
```

### `profiles` Table

Stores user-specific data linked to the `auth.users` table.

```sql
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  terms_accepted_at TIMESTAMPTZ
);
```

## 4. Pages & Routes

-   **`/`** - The main landing page.
-   **`/create`** - The page where users can create a new encrypted secret.
-   **`/create/success`** - Displayed after a secret is successfully created, showing the one-time shareable link.
-   **`/s/[shortId]`** - The page where a recipient views a secret. It reads the key from the URL fragment to decrypt the content.
-   **`/dashboard`** - A protected route where authenticated users can view and manage their created secrets.
-   **`/login`** & **`/sign-up`** - User authentication pages.
-   **`/callback`** - Server-side route to handle the OAuth callback from providers like GitHub.
-   **`/about`**, **`/privacy`**, **`/terms`** - Static content pages.
-   **`/docs`** - (Removed in favor of `ARCHITECTURE.md`) This document itself.
