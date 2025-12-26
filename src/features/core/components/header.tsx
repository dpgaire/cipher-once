"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Lock, Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useAuthSession } from "@/features/auth/hooks/use-auth-session"
import { UserProfileDropdown } from "@/features/auth/components/user-profile-dropdown"
import { Skeleton } from "@/components/ui/skeleton"
import { User } from "@supabase/supabase-js"
import { ThemeToggle } from "./ThemeToggle"

export function Header() {
  const pathname = usePathname()
  const { isAuthenticated, loading, user } = useAuthSession()
  const [open, setOpen] = useState(false)

  const baseNavItems = [
    { label: "Features", href: "/#features" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "About", href: "/about" },
    { label: "Create Secret", href: "/create" },
  ]

  const authNavItems = isAuthenticated
    ? [{ label: "Dashboard", href: "/dashboard" }]
    : []

  const navItems = [...baseNavItems, ...authNavItems]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-muted/30 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 font-bold transition-opacity hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
            <Lock className="h-5 w-5" />
          </div>
          <span className="text-lg md:text-xl tracking-tight">CipherOnce</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
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

        {/* Desktop Auth Buttons / User Profile */}
        <div className="hidden md:flex items-center gap-4">
          {loading ? (
            <Skeleton className="h-9 w-20 rounded-md" />
          ) : isAuthenticated ? (
            <UserProfileDropdown user={user as User} />
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/sign-up">Get Started</Link>
              </Button>
            </>
          )}
          <ThemeToggle />
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[85vw] sm:w-[400px] bg-background/95 backdrop-blur-md">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

            <div className="flex flex-col items-center pt-8 pb-12 px-6 h-full">
              {/* Logo at top */}
              <div className="flex items-center gap-3 mb-12">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                  <Lock className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold tracking-tight">
                  CipherOnce
                </span>
              </div>

              {/* Centered Navigation Links */}
              <nav className="flex w-full max-w-xs flex-col gap-6">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-center text-lg font-medium text-foreground/80 transition-all hover:text-foreground py-2"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-auto w-full max-w-xs space-y-4">
                {/* Auth Buttons (if needed) */}
                {loading ? (
                  <div className="flex justify-center flex-col gap-4">
                    <Skeleton className="h-12 w-full rounded-md" />
                    <Skeleton className="h-12 w-full rounded-md" />
                  </div>
                ) : isAuthenticated ? (
                  <div className="flex justify-center items-center">

                    <UserProfileDropdown user={user as User} />
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <SheetClose asChild>
                      <Button
                        variant="outline"
                        size="lg"
                        asChild
                        className="w-full"
                      >
                        <Link href="/auth/login">Sign in</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button size="lg" asChild className="w-full">
                        <Link href="/auth/sign-up">Get Started</Link>
                      </Button>
                    </SheetClose>
                  </div>
                )}
                <div className="flex justify-center pt-4">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}