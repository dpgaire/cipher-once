# CipherOnce — Secure, Ephemeral, Human-Centric Secret Sharing

CipherOnce is a **privacy-first, zero-knowledge secret sharing platform** designed for sharing sensitive information such as passwords, API keys, confidential messages, and files — **securely and temporarily**.

Unlike traditional secret sharing tools, CipherOnce introduces **human-decodable patterns**, allowing secrets to be shared in a way that only the intended recipient can mentally reconstruct.

All encryption and decryption happen **client-side**. The server never sees your plaintext data.

**Live Demo:** https://www.cipheronce.com

---

## Core Features

- **End-to-End Encryption**
  - Secrets are encrypted in the browser using the Web Crypto API (AES-256-GCM).
  - Encryption keys never leave the client device.

- **Zero-Knowledge Architecture**
  - Servers only store encrypted data.
  - CipherOnce cannot read or recover secrets.

- **Self-Destructing Secrets**
  - Secrets automatically delete after a defined number of views or expiration time.

- **One-Time Links & QR Sharing**
  - Share secrets via secure links or QR codes for in-person or cross-device use.

- **Password Pattern Decoding (Signature Feature)**
  - Secrets can be shared using **pattern numbers**.
  - The receiver decodes the password using predefined mental rules.
  - The stored password alone is incomplete without knowing the pattern.
  - No formulas or decoding logic are stored on the server.

- **Time & Access Controls**
  - Set expiration times from minutes to days.
  - Restrict access by number of views.

- **Secure File Sharing**
  - Share files and documents with the same encryption and auto-deletion guarantees.

- **Privacy-First by Design**
  - No content logging.
  - No tracking or analytics scripts.
  - Minimal metadata retention.

---

## Use Cases

CipherOnce is ideal for:

- **Developers & Engineers**
  - Sharing API keys, tokens, credentials, and internal access data.

- **Teams & Organizations**
  - Temporarily sharing credentials with clients, vendors, or partners.

- **Security-Conscious Users**
  - Sending sensitive information without storing passwords anywhere.

- **Mobile & In-Person Sharing**
  - QR-based sharing without exposing secrets in chats or emails.

- **Pattern-Based Sharing**
  - Situations where passwords must be remembered, not stored.

---

## Technology Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Backend & Database:** Supabase (PostgreSQL + Auth)
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS
- **Encryption:** Web Crypto API
- **Deployment:** Vercel

---

## Getting Started

### Prerequisites

- Node.js v18+
- pnpm
- Supabase account

### 1. Clone the Repository


git clone https://github.com/dpgaire/cipher-once.git
cd cipher-once

2. Install Dependencies

pnpm install

3. Environment Variables

Create a .env.local file:

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

4. Database Setup

Run the SQL scripts inside /scripts using the Supabase SQL editor.

5. Run the Development Server

pnpm dev

Visit: http://localhost:3000


---

Deployment

CipherOnce is optimized for Vercel:

1. Connect the GitHub repository to Vercel.


2. Add the same environment variables.


3. Deploy — Vercel handles the rest.




---

Available Scripts

pnpm dev — Start development server

pnpm build — Production build

pnpm start — Start production server

pnpm lint — Lint codebase



---

Security & Privacy

CipherOnce is built with a strict security mindset:

Client-side encryption only

Automatic secret destruction

No logs of secret content

Zero-knowledge data handling

Designed to minimize trust requirements



---

Roadmap (High-Level)

Pattern vaults (user-defined mental patterns)

Context-based secret access

Advanced access controls

Passwordless authentication improvements

More human-centric security mechanisms



---

Contributing

Contributions are welcome:

1. Fork the repository


2. Create a feature branch


3. Commit your changes


4. Open a Pull Requests 
