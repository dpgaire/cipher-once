"use client";

import { useEffect, useState, useCallback } from "react";

interface UseScreenBlurOptions {
  enabled?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
}

export function useScreenBlur({
  enabled = true,
  onBlur,
  onFocus,
}: UseScreenBlurOptions = {}) {
  const [isBlurred, setIsBlurred] = useState(false);

  const handleBlur = useCallback(() => {
    if (!enabled) return;
    setIsBlurred(true);
    onBlur?.();
  }, [enabled, onBlur]);

  const handleFocus = useCallback(() => {
    if (!enabled) return;
    setIsBlurred(false);
    onFocus?.();
  }, [enabled, onFocus]);

  useEffect(() => {
    if (!enabled) return;
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        handleBlur();
      } else {
        handleFocus();
      }
    });
    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleBlur);
    };
  }, [enabled, handleBlur, handleFocus]);

  return { isBlurred, setIsBlurred };
}
