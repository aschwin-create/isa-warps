"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { mainNavItems } from "@/data/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsScrolled(latest > 50);
    // Hide on scroll down, show on scroll up (Nike-style auto-hide)
    if (latest > 150 && latest > previous) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      <motion.header
        animate={{ y: isHidden ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-30 transition-colors duration-500",
          isScrolled || !isHome
            ? "bg-primary/98 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        {/* Thin accent line at very top */}
        <div className="h-[2px] bg-accent-red" />

        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Brand */}
            <Link
              href="/"
              className="group relative"
            >
              <span className="text-lg md:text-xl font-heading font-black text-text-inverse uppercase tracking-[0.2em]">
                ISA WARPS
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-red group-hover:w-full transition-all duration-300" />
            </Link>

            {/* Desktop Nav - widely spaced, uppercase, clean */}
            <nav className="hidden lg:flex items-center gap-0">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-5 py-2 text-[11px] font-heading font-semibold uppercase tracking-[0.15em] transition-colors duration-200",
                    pathname === item.href
                      ? "text-text-inverse"
                      : "text-text-inverse/50 hover:text-text-inverse"
                  )}
                >
                  {t(item.translationKey)}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-5 right-5 h-[2px] bg-accent-red"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-1">
              <LanguageSwitcher className="text-text-inverse" />

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden relative w-10 h-10 flex items-center justify-center text-text-inverse"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
