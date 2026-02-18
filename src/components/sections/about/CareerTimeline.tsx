"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { careerTimeline } from "@/data/career";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function CareerTimeline() {
  const t = useTranslations("About.timeline");
  const locale = useLocale();

  return (
    <section className="bg-primary text-text-inverse">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 py-24 md:py-32">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-[10px] font-heading font-bold uppercase tracking-[0.3em] text-text-inverse/40 mb-4">
            Career Path
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight">
            {t("title")}
          </h2>
        </motion.div>

        {/* Timeline - row-based like Nike match list */}
        <div className="space-y-[1px] bg-white/10">
          {careerTimeline.map((entry, index) => {
            const description =
              entry.description[locale] || entry.description["en"] || "";
            const achievements =
              entry.achievements?.[locale] ||
              entry.achievements?.["en"] ||
              [];

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                className={cn(
                  "bg-primary hover:bg-primary-light transition-colors duration-300 group",
                  entry.isNationalTeam && "bg-accent-red/10 hover:bg-accent-red/15"
                )}
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-0 p-6 md:p-8">
                  {/* Index number */}
                  <span className="text-xs font-heading font-medium text-text-inverse/20 tabular-nums lg:w-12 lg:pt-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Year + Club logo */}
                  <div className="flex items-center gap-4 lg:w-64">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white/10">
                      <Image
                        src={entry.clubLogo}
                        alt={entry.club}
                        width={36}
                        height={36}
                        className={cn(
                          "object-contain",
                          entry.clubLogo.includes('Logo-Vfr_warbeyen') && 'brightness-0 invert'
                        )}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-heading font-bold uppercase tracking-wide">
                        {entry.club}
                      </p>
                      <p className="text-xs text-text-inverse/40 mt-0.5">
                        {entry.year}
                      </p>
                    </div>
                  </div>

                  {/* League & Country */}
                  <div className="lg:w-48">
                    <p className={cn(
                      "text-[10px] font-heading font-bold uppercase tracking-[0.2em]",
                      entry.isNationalTeam ? "text-accent-red-light" : "text-accent-red"
                    )}>
                      {entry.league}
                    </p>
                    <p className="text-xs text-text-inverse/40 mt-1">
                      {entry.country}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="flex-1 lg:px-6">
                    <p className="text-sm text-text-inverse/60 leading-relaxed">
                      {description}
                    </p>
                    {achievements.length > 0 && (
                      <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3">
                        {achievements.map((achievement, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-heading font-semibold uppercase tracking-[0.15em] text-text-inverse/30"
                          >
                            {achievement}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Status badges */}
                  <div className="flex items-center gap-3 lg:w-auto">
                    {entry.isCurrent && (
                      <span className={cn(
                        "text-[10px] font-heading font-bold uppercase tracking-[0.2em] px-3 py-1",
                        entry.isNationalTeam
                          ? "bg-accent-red text-text-inverse"
                          : "border border-text-inverse/20 text-text-inverse/60"
                      )}>
                        {entry.isNationalTeam ? "International" : "Current"}
                      </span>
                    )}
                    <ArrowRight className="hidden lg:block w-4 h-4 text-text-inverse/20 group-hover:text-accent-red group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
