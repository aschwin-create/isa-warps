"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function BiographySection() {
  const t = useTranslations("About.biography");

  return (
    <section className="bg-surface overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        {/* Image - full bleed left, no rounded corners */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative min-h-[50vh] lg:min-h-full"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/images/Isa-Warps-FC-Eindhoven.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/10 lg:to-surface/5" />

          {/* Red accent corner */}
          <div className="absolute top-0 left-0 z-10">
            <div className="w-16 h-[2px] bg-accent-red" />
            <div className="w-[2px] h-16 bg-accent-red" />
          </div>
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

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-primary uppercase leading-[1.05] tracking-tight">
              Het verhaal
            </h2>

            <div className="mt-6 w-12 h-[2px] bg-accent-red" />

            <div
              className="mt-6 text-text-light text-base leading-relaxed"
              style={{ whiteSpace: "pre-line" }}
            >
              {t("content")}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
