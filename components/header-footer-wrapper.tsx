"use client"

import { usePathname } from 'next/navigation';
import { ClientHeader } from "@/components/client-header";
import { Footer } from "@/components/footer";
import { ReactNode } from 'react';

export function HeaderFooterWrapper({ children, isAuthenticated }: { children: ReactNode, isAuthenticated: boolean }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <ClientHeader isAuthenticated={isAuthenticated} />}
      <main className="flex-1">{children}</main>
      {!isAdminRoute && <Footer />}
    </>
  );
}
