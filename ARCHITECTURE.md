# CipherOnce Architecture Documentation

This document provides a detailed overview of the **CipherOnce** system architecture, explaining how secrets are encrypted, shared, and destroyed, along with the folder structure, technology stack, and key components.

---

## 1. Overview

CipherOnce is a **secure, ephemeral, zero-knowledge secret sharing platform**. It allows users to:

- Share **passwords, API keys, files, and confidential messages**.
- Ensure secrets are **encrypted in the browser**, **never stored in plaintext**, and **self-destruct after viewing or expiration**.
- Generate **one-time links** or **QR codes** for secure, device-first sharing.
- Optionally authenticate with **passwordless login, passkeys, or GitHub OAuth**.

The system is designed to be **privacy-first**, **compliant with security best practices**, and **fully decentralized in encryption handling**.

---

## 2. Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL + Auth)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Encryption:** [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) (AES-256-GCM)
- **Deployment:** [Vercel](https://vercel.com/)
- **Analytics & SEO:** Vercel Analytics, Open Graph, Twitter Cards

---

## 3. System Architecture

CipherOnce follows a **feature-based modular architecture**:

```

app/          -> Next.js pages & routes
features/     -> Feature modules (auth, secrets, dashboard, home, core)
lib/          -> Utilities & supabase client
public/       -> Static assets
scripts/      -> Database setup SQL
styles/       -> Global styles

```

Each **feature module** contains:

- **components/** → UI components specific to the feature
- **hooks/** → React hooks for business logic
- **services/** → API calls, Supabase services, encryption helpers
- **types/** → TypeScript types for the feature

---

### 3.1 Zero-Knowledge Encryption Flow

1. User enters a secret on `/create`.
2. Browser generates a **random AES-256-GCM key** (or derives it from a passphrase).
3. The secret is **encrypted client-side** using Web Crypto API.
4. Encrypted content is **sent to Supabase**, **encryption key never leaves the client**.
5. Server stores the encrypted blob and returns a **unique `short_id`**.
6. Browser constructs a **shareable URL** containing the `short_id` and encryption key as a **URL fragment**:
```

[https://cipheronce.com/s/short_id#encryption_key](https://cipheronce.com/s/short_id#encryption_key)

````
7. Recipient opens the URL, browser fetches encrypted content, and **decrypts using the key in the fragment**.
8. Secret is **automatically destroyed** after viewing or expiration.

---

### 3.2 Secret Lifecycle

| Stage               | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| **Creation**        | User encrypts secret and uploads encrypted blob to Supabase.              |
| **Sharing**         | User shares the one-time link or QR code.                                  |
| **Access**          | Recipient fetches encrypted blob and decrypts locally.                     |
| **Self-Destruction**| Secret is deleted after first view or expiration time.                     |
| **No Recovery**     | No backups, no logs; even admins cannot access the secret.                 |

---

### 3.3 Database Schema

#### `secrets` Table

Stores encrypted content and metadata.

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
````

#### `profiles` Table

Stores user profile data.

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

---

### 3.4 Feature-Based Folder Architecture

```
features/
├── auth/
│   ├── components/    # login-form, signup, GitHub auth buttons
│   ├── hooks/         # useLogin, useSignup
│   ├── services/      # Supabase auth calls
│   └── types/
├── secrets/
│   ├── components/    # create secret, QR code, secret card
│   ├── hooks/         # useCreateSecret, useFetchSecret
│   ├── services/      # secret-service, encryption-service
│   └── types/
├── dashboard/
│   ├── components/    # secret list, stats, delete modal
│   ├── hooks/
│   ├── services/
│   └── types/
├── home/
│   ├── components/    # hero, features, use-cases, FAQ, CTA
│   └── types/
└── core/
    ├── components/    # root-layout, theme-provider, modals
    ├── hooks/         # global hooks (useTheme, etc.)
    ├── services/      # notifications, global utils
    └── types/
```

---

### 3.5 Security Architecture

* **End-to-End Encryption:** AES-256-GCM, client-side.
* **Zero-Knowledge Storage:** Server only stores encrypted blobs.
* **Guaranteed Destruction:** Secrets deleted immediately after view or expiration.
* **Privacy-First:** No IP logging, no tracking, no analytics scripts.
* **Controlled Access:** One-time links, optional passphrase, time-limited expiry.

---

### 3.6 Pages & Routes

| Route                          | Purpose                                                       |
| ------------------------------ | ------------------------------------------------------------- |
| `/`                            | Landing page / Home                                           |
| `/create`                      | Secret creation page                                          |
| `/create/success`              | Success page showing shareable link                           |
| `/s/[shortId]`                 | Secret viewing page (decrypts client-side using URL fragment) |
| `/login` & `/sign-up`          | Authentication pages                                          |
| `/dashboard`                   | User secret management                                        |
| `/callback`                    | OAuth callback for providers                                  |
| `/about`, `/privacy`, `/terms` | Static content pages                                          |

---

### 3.7 Social & Sharing Integration

* **Shareable Links** → Include encrypted key in URL fragment.
* **QR Code Sharing** → Scan and access securely on mobile devices.
* **Social Platforms Supported:**

  * Facebook, LinkedIn, WhatsApp, Telegram, Email.
* **Meta Tags** → Open Graph, Twitter Cards for rich previews.

---

### 3.8 Encryption Helpers (Services)

* `encryption-service.ts` handles:

  * AES-256-GCM key generation
  * Encryption / decryption functions
  * Optional passphrase derivation
* `secret-service.ts` handles:

  * Upload encrypted secret to Supabase
  * Fetch encrypted secret by `short_id`
  * Update view counts and deletion

---

### 3.9 Hooks & Reusable Logic

| Hook              | Feature   | Purpose                                |
| ----------------- | --------- | -------------------------------------- |
| `useCreateSecret` | secrets   | Handles secret creation and API calls  |
| `useFetchSecret`  | secrets   | Fetches encrypted content for viewing  |
| `useLogin`        | auth      | Handles user login with email/password |
| `useSignup`       | auth      | Handles user registration              |
| `useDashboard`    | dashboard | Fetches user secrets, analytics stats  |

---

### 3.10 Deployment Architecture

* Hosted on **Vercel** with **serverless functions**.
* Supabase handles:

  * PostgreSQL database
  * Auth & OAuth providers
  * Storage for encrypted blobs
* All **encryption and decryption happen in the browser**, reducing server trust.
* Designed for **scalability** with minimal server-side state.

---

**CipherOnce is built to provide maximum security, privacy, and simplicity for sharing sensitive information.**


