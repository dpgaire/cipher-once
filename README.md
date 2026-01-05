# CipherOnce: Secure, Ephemeral, Zero-Knowledge Secret Sharing

CipherOnce is a **secure, ephemeral sharing platform** for sensitive information like passwords, API keys, confidential files, and private messages. It is built on a **zero-knowledge architecture**, meaning the server never sees the unencrypted secret content. All encryption and decryption happen client-side in your browser.  

With CipherOnce, you can create **one-time links**, share **files and secrets**, and ensure **automatic deletion** after access or expiration.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-github/cipher-once)

**Live Demo:** [https://www.cipheronce.com](https://www.cipheronce.com)

---

## Core Features

- **End-to-End Encryption:** Secrets are encrypted in your browser using the Web Crypto API (AES-256-GCM) before reaching our servers.
- **Zero-Knowledge:** The server only stores encrypted blobs. The encryption key never leaves your device.
- **Self-Destructing Secrets:** Secrets automatically delete after a configurable number of views or expiration time.
- **One-Time Links & QR Sharing:** Generate secure, ephemeral links or QR codes for in-person or device-first sharing.
- **Time & Access Controls:** Set expiration times (5 minutes to 7 days) and one-time access restrictions.
- **Secure File Sharing:** Attach documents, images, and files up to 20MB with the same encryption standards.
- **Passwordless & Passkey Login (Upcoming):** Login securely with QR codes or device authentication.
- **Privacy-First:** No logs of content, IPs, or user data. No tracking or analytics scripts.
- **Admin Dashboard:** Manage users, secrets, and view system analytics (for registered admins).
- **Cross-Platform & Social Sharing:** Easily share links via email, WhatsApp, Telegram, LinkedIn, Facebook, or copy the link.

---

## Use Cases

CipherOnce is ideal for:

- **Developers & Engineers:** Share API keys, tokens, SSH keys, database credentials, or CI/CD secrets securely.
- **Business, Legal & Finance:** Share contracts, investor info, payroll, compliance docs, or M&A materials.
- **Teams & Agencies:** Provide temporary access to clients, partners, or vendors for portals, campaigns, or tools.
- **Secure File Sharing:** Share sensitive files without leaving traces; control downloads and expiration.
- **In-Person & Mobile Sharing:** Use QR codes to share secrets directly to phones safely.
- **Privacy-Sensitive Situations:** Send sensitive information anonymously without creating accounts.

---

## Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL + Auth)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Encryption:** [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- **Deployment:** [Vercel](https://vercel.com/)

---

## Getting Started

Follow these instructions to set up the project for local development.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later)
- [pnpm](https://pnpm.io/)
- A [Supabase](https://supabase.com/) account

### 1. Clone the Repository

```bash
git clone https://github.com/dpgaire/cipher-once.git
cd cipher-once
````

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the project root and add:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Set Up the Database

Run the SQL scripts located in `/scripts` in order using your Supabase SQL editor. These will create tables, policies, and necessary indexes.

### 5. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Deployment

Optimized for [Vercel](https://vercel.com/):

1. Connect your GitHub repository to Vercel.
2. Set the same `.env.local` environment variables in Vercel’s dashboard.
3. Vercel will automatically build and deploy your app.

---

## Available Scripts

* `pnpm dev` – Start the development server.
* `pnpm build` – Create a production build.
* `pnpm start` – Start the production server.
* `pnpm lint` – Lint the codebase using ESLint.

---

## Security & Privacy

CipherOnce is designed to **protect your secrets**:

* All encryption is **client-side**; we never see your data.
* Secrets **auto-delete** after viewing or expiration.
* No logs, analytics, or tracking scripts.
* Zero-knowledge architecture ensures only you and recipients can access the content.

---

## Social & Sharing

* Share links or QR codes via:

  * **Email**
  * **WhatsApp**
  * **Telegram**
  * **LinkedIn**
  * **Facebook**

Open Graph and Twitter Cards are configured for rich previews.

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request.

---

## License

MIT © CipherOnce Team

---

**CipherOnce — Share secrets securely, privately, and temporarily.**

```

