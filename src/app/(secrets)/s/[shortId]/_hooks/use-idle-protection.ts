"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface UseIdleProtectionOptions {
  enabled?: boolean;
  idleTimeout?: number;
  onIdle?: () => void;
  onActive?: () => void;
}

export function useIdleProtection({
  enabled = true,
  idleTimeout = 60000,
  onIdle,
  onActive,
}: UseIdleProtectionOptions = {}) {
  const [isIdle, setIsIdle] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetIdleTimer = useCallback(() => {
    if (!enabled) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (isIdle) {
      setIsIdle(false);
      onActive?.();
    }
    timeoutRef.current = setTimeout(() => {
      setIsIdle(true);
      onIdle?.();
    }, idleTimeout);
  }, [enabled, idleTimeout, isIdle, onIdle, onActive]);

  useEffect(() => {
    if (!enabled) return;
    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll", "click"];
    events.forEach((event) => window.addEventListener(event, resetIdleTimer));
    resetIdleTimer();
    return () => {
      events.forEach((event) => window.removeEventListener(event, resetIdleTimer));
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, resetIdleTimer]);

  return { isIdle, setIsIdle };
}
