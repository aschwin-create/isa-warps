"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("Home.hero");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden bg-primary">
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage:
              "url('/images/hero/54850393411_1bebc69b53_o.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
      </motion.div>

      {/* Content - left aligned editorial style */}
      <motion.div
        style={{ opacity, y: textY }}
        className="relative z-10 h-full flex items-end pb-24 md:pb-32"
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-[11px] font-heading font-semibold uppercase tracking-[0.3em] text-text-inverse/50 mb-6"
            >
              Professional Footballer
            </motion.p>

            {/* Name - massive typography */}
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-heading font-black uppercase leading-[0.85] tracking-tight"
            >
              <span className="block text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] text-text-inverse">
                ISA
              </span>
              <span className="block text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] text-text-inverse/20">
                WARPS
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-8 text-sm md:text-base text-text-inverse/60 max-w-lg leading-relaxed"
            >
              {t("tagline")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-10 flex items-center gap-8"
            >
              <Link
                href="/media-kit"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-accent-red text-text-inverse text-sm font-heading font-bold uppercase tracking-[0.1em] hover:bg-accent-red-dark transition-all duration-300"
              >
                {t("ctaMediaKit")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/partnerships"
                className="group inline-flex items-center gap-2 text-text-inverse/60 text-sm font-heading font-semibold uppercase tracking-[0.1em] hover:text-text-inverse transition-colors"
              >
                {t("ctaSponsor")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll line indicator */}
      <div className="absolute bottom-0 left-6 sm:left-8 lg:left-12 z-10">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 80 }}
          transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
          className="w-[1px] bg-text-inverse/30"
        />
      </div>
    </section>
  );
}
