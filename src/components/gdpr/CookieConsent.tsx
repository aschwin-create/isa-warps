"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Cookie, Shield, BarChart3, Megaphone } from "lucide-react";

const COOKIE_CONSENT_KEY = "isa-warps-cookie-consent";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

export function CookieConsent() {
  const t = useTranslations("CookieConsent");
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] =
    useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) {
      // Small delay before showing the banner for a nicer UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreferences = useCallback((prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
    setIsVisible(false);
  }, []);

  const handleAcceptAll = () => {
    savePreferences({ essential: true, analytics: true, marketing: true });
  };

  const handleRejectAll = () => {
    savePreferences({ essential: true, analytics: false, marketing: false });
  };

  const handleSaveCustom = () => {
    savePreferences(preferences);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-surface rounded-2xl shadow-hero border border-border overflow-hidden">
            {/* Main banner */}
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-accent-red/10 rounded-xl flex items-center justify-center shrink-0">
                  <Cookie className="w-5 h-5 text-accent-red" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-primary mb-1">
                    {t("title")}
                  </h3>
                  <p className="text-text-light text-sm leading-relaxed">
                    {t("description")}{" "}
                    <Link
                      href="/cookie-policy"
                      className="text-accent-red hover:underline"
                    >
                      Cookie Policy
                    </Link>
                  </p>
                </div>
              </div>

              {/* Customize panel */}
              <AnimatePresence>
                {showCustomize && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 mb-6 pt-4 border-t border-border">
                      {/* Essential */}
                      <div className="flex items-center justify-between p-4 bg-surface-alt rounded-xl">
                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-success" />
                          <div>
                            <p className="font-heading font-semibold text-sm text-primary">
                              {t("essential")}
                            </p>
                            <p className="text-xs text-text-muted">
                              {t("essentialDesc")}
                            </p>
                          </div>
                        </div>
                        <div
                          className={cn(
                            "w-11 h-6 rounded-full relative transition-colors cursor-not-allowed",
                            "bg-success"
                          )}
                        >
                          <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm" />
                        </div>
                      </div>

                      {/* Analytics */}
                      <div className="flex items-center justify-between p-4 bg-surface-alt rounded-xl">
                        <div className="flex items-center gap-3">
                          <BarChart3 className="w-5 h-5 text-accent-blue" />
                          <div>
                            <p className="font-heading font-semibold text-sm text-primary">
                              {t("analytics")}
                            </p>
                            <p className="text-xs text-text-muted">
                              {t("analyticsDesc")}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setPreferences((p) => ({
                              ...p,
                              analytics: !p.analytics,
                            }))
                          }
                          className={cn(
                            "w-11 h-6 rounded-full relative transition-colors",
                            preferences.analytics
                              ? "bg-success"
                              : "bg-surface-dark"
                          )}
                          role="switch"
                          aria-checked={preferences.analytics}
                          aria-label={t("analytics")}
                        >
                          <motion.div
                            animate={{
                              x: preferences.analytics ? 20 : 2,
                            }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
                          />
                        </button>
                      </div>

                      {/* Marketing */}
                      <div className="flex items-center justify-between p-4 bg-surface-alt rounded-xl">
                        <div className="flex items-center gap-3">
                          <Megaphone className="w-5 h-5 text-warning" />
                          <div>
                            <p className="font-heading font-semibold text-sm text-primary">
                              {t("marketing")}
                            </p>
                            <p className="text-xs text-text-muted">
                              {t("marketingDesc")}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setPreferences((p) => ({
                              ...p,
                              marketing: !p.marketing,
                            }))
                          }
                          className={cn(
                            "w-11 h-6 rounded-full relative transition-colors",
                            preferences.marketing
                              ? "bg-success"
                              : "bg-surface-dark"
                          )}
                          role="switch"
                          aria-checked={preferences.marketing}
                          aria-label={t("marketing")}
                        >
                          <motion.div
                            animate={{
                              x: preferences.marketing ? 20 : 2,
                            }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
                          />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2.5 bg-accent-red text-white font-heading font-semibold rounded-lg hover:bg-accent-red-dark transition-colors text-sm"
                >
                  {t("acceptAll")}
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-6 py-2.5 border-2 border-border text-text font-heading font-semibold rounded-lg hover:bg-surface-alt transition-colors text-sm"
                >
                  {t("rejectAll")}
                </button>
                {showCustomize ? (
                  <button
                    onClick={handleSaveCustom}
                    className="px-6 py-2.5 bg-primary text-white font-heading font-semibold rounded-lg hover:bg-primary-light transition-colors text-sm"
                  >
                    {t("save")}
                  </button>
                ) : (
                  <button
                    onClick={() => setShowCustomize(true)}
                    className="px-6 py-2.5 text-text-light font-heading font-semibold rounded-lg hover:text-text hover:bg-surface-alt transition-colors text-sm"
                  >
                    {t("customize")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
