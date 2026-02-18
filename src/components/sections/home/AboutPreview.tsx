"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export function AboutPreview() {
  const t = useTranslations("Home.about");

  return (
    <section className="bg-surface overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        {/* Image - full bleed left */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative min-h-[50vh] lg:min-h-full"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/images/gallery/Isa-Warps-bus-squar.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/20 lg:to-surface/10" />
        </motion.div>

        {/* Text - right side with generous padding */}
        <div className="flex items-center">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="px-6 py-16 sm:px-12 lg:px-16 xl:px-24 max-w-xl"
          >
            <p className="text-[10px] font-heading font-bold uppercase tracking-[0.3em] text-accent-red mb-6">
              {t("title")}
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-primary uppercase leading-[1.1] tracking-tight">
              Van Eindhoven naar het internationale podium
            </h2>

            <div className="mt-6 w-12 h-[2px] bg-accent-red" />

            <p className="mt-6 text-text-light text-base leading-relaxed">
              {t("text")}
            </p>

            <Link
              href="/about"
              className="group inline-flex items-center gap-3 mt-10 text-sm font-heading font-bold uppercase tracking-[0.1em] text-primary hover:text-accent-red transition-colors"
            >
              {t("readMore")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
