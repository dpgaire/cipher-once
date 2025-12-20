"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Lock, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"

interface HeaderProps {
  isAuthenticated?: boolean
}

export function Header({ isAuthenticated }: HeaderProps) {
  const pathname = usePathname()
  const isAuthPage = pathname?.startsWith("/auth")

  const baseNavItems = [
    { label: "Features", href: "/#features" },
    { label: "How it works", href: "/#howItworks" },
    { label: "About", href: "/about" },
  ];

  const authNavItems = isAuthenticated
    ? [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Create Secret", href: "/create" },
      ]
    : [];

  const navItems = [...baseNavItems, ...authNavItems];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-bold transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Lock className="h-4.5 w-4.5" />
          </div>
          <span className="text-xl">CipherOnce</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {!isAuthenticated && !isAuthPage && (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/sign-up">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="mt-8 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2">
                {!isAuthenticated && !isAuthPage && (
                  <>
                    <Button variant="outline" asChild className="w-full bg-transparent">
                      <Link href="/auth/login">Sign in</Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link href="/auth/sign-up">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
