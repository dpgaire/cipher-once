"use client";

import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthSession } from "@/app/(auth)/_hooks/use-auth-session";
import { UserProfileDropdown } from "@/app/(auth)/_components/user-profile-dropdown";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@supabase/supabase-js";

export function Header() {
  const { isAuthenticated, loading, user } = useAuthSession();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const baseNavItems = [
    { label: "Features", href: "/#features" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Security", href: "/#security" },
  ];

  const authNavItems = isAuthenticated
    ? [{ label: "Dashboard", href: "/dashboard" }]
    : [];

  const navItems = [...baseNavItems, ...authNavItems];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/5 bg-[#0a0a0f]/95 backdrop-blur-xl shadow-[0_1px_0_rgba(201,168,76,0.06)]"
          : "border-b border-transparent bg-[#0a0a0f]/80 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[#C9A84C]/30 bg-[#C9A84C]/10 shadow-[0_0_16px_rgba(201,168,76,0.15)] transition-all duration-300 group-hover:border-[#C9A84C]/50 group-hover:shadow-[0_0_24px_rgba(201,168,76,0.25)]">
            <img src="/icon-512.png" className="h-5 w-5 rounded-sm" alt="CipherOnce" />
          </div>
          <span
            className="text-base font-bold tracking-tight text-white transition-colors group-hover:text-[#C9A84C]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            CipherOnce
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative text-sm font-medium text-[#8a8a9a] transition-colors duration-200 hover:text-white after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-[#C9A84C] after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-3 md:flex">
          {loading ? (
            <Skeleton className="h-8 w-20 rounded-md bg-white/5" />
          ) : isAuthenticated ? (
            <UserProfileDropdown user={user as User} />
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-[#8a8a9a] transition-colors hover:text-white px-3 py-1.5"
              >
                Sign in
              </Link>
              <Link href="/sign-up">
                <button className="group flex items-center gap-2 rounded-lg border border-[#C9A84C]/30 bg-[#C9A84C]/10 px-4 py-2 text-sm font-semibold text-[#C9A84C] transition-all duration-200 hover:border-[#C9A84C]/50 hover:bg-[#C9A84C]/15 hover:shadow-[0_0_20px_rgba(201,168,76,0.15)]">
                  Get Started
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-all hover:border-[#C9A84C]/30 hover:bg-[#C9A84C]/10 hover:text-[#C9A84C] md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[85vw] overflow-y-auto border-l border-white/5 bg-[#0d0d14] p-0 sm:w-[360px]"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

            <div className="flex h-full flex-col px-6 pb-10 pt-6">
              {/* Mobile logo */}
              <div className="mb-10 flex items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center gap-3"
                  onClick={() => setOpen(false)}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#C9A84C]/30 bg-[#C9A84C]/10">
                    <img src="/icon-512.png" className="h-5 w-5 rounded-sm" alt="CipherOnce" />
                  </div>
                  <span
                    className="text-base font-bold text-white"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    CipherOnce
                  </span>
                </Link>
                <SheetClose asChild>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#6a6a7a] hover:text-white">
                    <X className="h-4 w-4" />
                  </button>
                </SheetClose>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-[#8a8a9a] transition-all duration-200 hover:bg-white/5 hover:text-white"
                    >
                      {item.label}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 text-[#C9A84C]" />
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              {/* Divider */}
              <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Mobile Auth */}
              <div className="mt-auto space-y-3">
                {loading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-11 w-full rounded-lg bg-white/5" />
                    <Skeleton className="h-11 w-full rounded-lg bg-white/5" />
                  </div>
                ) : isAuthenticated ? (
                  <div className="flex justify-center">
                    <UserProfileDropdown user={user as User} />
                  </div>
                ) : (
                  <>
                    <SheetClose asChild>
                      <Link href="/login" className="block">
                        <button className="w-full rounded-lg border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white transition-all hover:border-white/20 hover:bg-white/10">
                          Sign in
                        </button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/sign-up" className="block">
                        <button className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#C9A84C] py-3 text-sm font-bold text-[#0a0a0f] transition-all hover:shadow-[0_0_24px_rgba(201,168,76,0.35)]">
                          Get Started Free
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </Link>
                    </SheetClose>
                  </>
                )}

                <p className="pt-2 text-center text-[10px] font-medium uppercase tracking-widest text-[#4a4a5a]">
                  No signup required · Free forever
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}