# CipherOnce: Secure, Ephemeral, Zero-Knowledge Secret Sharing

CipherOnce is a secure platform for sharing sensitive information like passwords, API keys, and personal notes with end-to-end encryption. It's built on a "zero-knowledge" architecture, ensuring that the server has no knowledge of the unencrypted secret content. All encryption and decryption happen client-side in the user's browser.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-github/cipher-once-mvp_v2)

**Live Demo:** [https://www.cipheronce.com](https://www.cipheronce.com)

## Core Features

*   **End-to-End Encryption:** Secrets are encrypted in your browser using the Web Crypto API (AES-256-GCM) before being sent to the server.
*   **Zero-Knowledge:** The server only stores encrypted data. The encryption key is never stored, only shared via a URL fragment.
*   **Self-Destructing Secrets:** Secrets are automatically deleted after a configurable number of views or an expiration time.
*   **One-Time Links:** Generate secure, one-time-use links for sharing secrets.
*   **File Attachments:** Securely attach and share files.
*   **User Accounts:** Optional user accounts to manage and track created secrets.
*   **Admin Dashboard:** An admin interface to manage users and view site analytics.

## Technology Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL + Auth)
*   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Encryption:** [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
*   **Deployment:** [Vercel](https://vercel.com/)

## Getting Started

Follow these instructions to set up the project for local development.

### Prerequisites

*   [Node.js](https://nodejs.org/en/) (v18 or later)
*   [pnpm](https://pnpm.io/)
*   A [Supabase](https://supabase.com/) account

### 1. Clone the Repository

```bash
git clone https://github.com/your-github/cipher-once-mvp_v2.git
cd cipher-once-mvp_v2
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables. You can get these from your Supabase project's API settings.

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Set Up the Database

The SQL scripts for creating the database schema are located in the `/scripts` directory. You can run these scripts in your Supabase SQL editor to set up the necessary tables and policies. The scripts are numbered and should be run in order.

### 5. Run the Development Server

```bash
pnpm dev
```

The application should now be running at [http://localhost:3000](http://localhost:3000).

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/). Simply connect your Git repository to Vercel and it will automatically build and deploy the application. Make sure to set the environment variables in the Vercel project settings.

## Available Scripts

*   `pnpm dev`: Starts the development server.
*   `pnpm build`: Creates a production build of the application.
*   `pnpm start`: Starts the production server.
*   `pnpm lint`: Lints the codebase using ESLint.
