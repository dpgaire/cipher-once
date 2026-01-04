import Link from "next/link"
import { Lock } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/30">
      <div className="container py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl  text-primary-foreground shadow-md">
            <img src="/icon-512.png" className="rounded-md" />
          </div>
              <span>CipherOnce</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Built for privacy-conscious users.
               <br />
              Designed with zero-knowledge from day one.
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#how-it-works" className="text-muted-foreground hover:text-foreground">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-muted-foreground hover:text-foreground">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-muted-foreground hover:text-foreground">
                  Create Secret
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CipherOnce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
