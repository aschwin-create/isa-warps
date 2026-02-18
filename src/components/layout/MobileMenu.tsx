"use client";

import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { mainNavItems } from "@/data/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 bg-primary z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 h-16">
            <LanguageSwitcher className="text-text-inverse" />
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-text-inverse"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav links - oversized editorial */}
          <nav className="flex-1 flex flex-col justify-center px-6 md:px-12">
            {mainNavItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "group flex items-baseline gap-4 py-3 border-b border-white/10 transition-colors",
                    pathname === item.href
                      ? "text-text-inverse"
                      : "text-text-inverse/40 hover:text-text-inverse"
                  )}
                >
                  <span className="text-xs font-heading font-medium tracking-wider text-text-inverse/30 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight">
                    {t(item.translationKey)}
                  </span>
                  {pathname === item.href && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-accent-red" />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Bottom social bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="px-6 py-6 border-t border-white/10"
          >
            <div className="flex items-center gap-6">
              {Object.entries(SOCIAL_LINKS).map(([name, href]) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-text-inverse/40 hover:text-text-inverse transition-colors"
                >
                  {name}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
