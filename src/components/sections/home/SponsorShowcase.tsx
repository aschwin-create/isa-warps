"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { staggerContainer, staggerItem } from "@/animations/variants";
import { sponsors } from "@/data/sponsors";
import { ArrowRight } from "lucide-react";

export function SponsorShowcase() {
  const t = useTranslations("Home.sponsors");

  return (
    <section className="bg-surface-alt">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 py-24 md:py-32">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] font-heading font-bold uppercase tracking-[0.3em] text-text-muted mb-4">
              Partners
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-black text-primary uppercase tracking-tight">
              {t("title")}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/partnerships"
              className="group inline-flex items-center gap-3 text-sm font-heading font-bold uppercase tracking-[0.1em] text-primary hover:text-accent-red transition-colors"
            >
              {t("cta")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* Sponsor Grid - clean, separated by lines */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-l border-border"
        >
          {sponsors.map((sponsor) => (
            <motion.a
              key={sponsor.id}
              variants={staggerItem}
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center p-8 md:p-10 border-b border-r border-border hover:bg-surface transition-colors duration-300"
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={100}
                height={40}
                className="opacity-30 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
