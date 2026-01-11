"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function TrackPageView() {
  const pathname = usePathname();

  useEffect(() => {
    // We don't want to track API routes or internal Next.js paths
    if (pathname.startsWith('/api/') || pathname.startsWith('/_next/')) {
      return;
    }
    
    // Fire-and-forget the request
    fetch('/api/track-view', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path: pathname }),
      keepalive: true, // Ensures the request is sent even if the user navigates away
    });
  }, [pathname]);

  return null; // This component does not render anything
}
