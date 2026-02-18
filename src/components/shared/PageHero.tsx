"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type HeroHeight = "full" | "large" | "medium";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  backgroundImage: string;
  height?: HeroHeight;
  className?: string;
  children?: React.ReactNode;
}

const heightStyles: Record<HeroHeight, string> = {
  full: "h-screen",
  large: "h-[80vh]",
  medium: "h-[60vh]",
};

export function PageHero({
  title,
  subtitle,
  eyebrow,
  backgroundImage,
  height = "medium",
  className,
  children,
}: PageHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-primary",
        heightStyles[height],
        className
      )}
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-transparent" />
      </motion.div>

      {/* Content - left aligned, bottom positioned like Nike */}
      <motion.div
        className="relative z-10 h-full flex items-end pb-16 md:pb-24"
        style={{ opacity }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            {eyebrow && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-[10px] font-heading font-bold uppercase tracking-[0.3em] text-text-inverse/40 mb-6"
              >
                {eyebrow}
              </motion.p>
            )}

            {/* Title - massive Nike typography */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-black text-text-inverse uppercase leading-[0.9] tracking-tight"
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-6 text-base md:text-lg text-text-inverse/50 max-w-lg leading-relaxed"
              >
                {subtitle}
              </motion.p>
            )}

            {/* Extra content (badges, CTAs, etc.) */}
            {children && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-8"
              >
                {children}
              </motion.div>
            )}

            {/* Red accent line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: children ? 0.8 : 0.6, duration: 0.8, ease: "easeOut" }}
              className="mt-8 h-[2px] bg-accent-red"
            />
          </div>
        </div>
      </motion.div>

      {/* Scroll line indicator */}
      <div className="absolute bottom-0 left-6 sm:left-8 lg:left-12 z-10">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 60 }}
          transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          className="w-[1px] bg-text-inverse/20"
        />
      </div>
    </section>
  );
}
