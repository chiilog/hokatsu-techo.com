"use client";

import { useCallback, useEffect, useState } from "react";
import { STORAGE_KEYS } from "@/services/storageService";

type ConsentStatus = "undecided" | "accepted" | "declined";

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentStatus>("undecided");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.cookieConsent);
    if (stored === "accepted" || stored === "declined") {
      setConsent(stored);
    }
  }, []);

  const accept = useCallback(() => {
    localStorage.setItem(STORAGE_KEYS.cookieConsent, "accepted");
    setConsent("accepted");
  }, []);

  const decline = useCallback(() => {
    localStorage.setItem(STORAGE_KEYS.cookieConsent, "declined");
    setConsent("declined");
  }, []);

  return {
    consent,
    isUndecided: consent === "undecided",
    isAccepted: consent === "accepted",
    accept,
    decline,
  };
}
