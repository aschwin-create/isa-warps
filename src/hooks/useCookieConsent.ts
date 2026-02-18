"use client";

import { useState, useEffect } from "react";

type CookiePreferences = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
};

export function useCookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(
    null
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    if (stored) {
      setPreferences(JSON.parse(stored));
    }
    setIsLoaded(true);
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));
    setPreferences(prefs);
  };

  const acceptAll = () =>
    savePreferences({ essential: true, analytics: true, marketing: true });

  const rejectAll = () =>
    savePreferences({ essential: true, analytics: false, marketing: false });

  return {
    preferences,
    isLoaded,
    hasConsent: preferences !== null,
    savePreferences,
    acceptAll,
    rejectAll,
  };
}
