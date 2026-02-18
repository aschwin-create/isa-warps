"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { staggerContainer, staggerItem } from "@/animations/variants";
import { getUpcomingMatches } from "@/data/matches";
import { format, type Locale } from "date-fns";
import { nl, enUS, id, de, fr } from "date-fns/locale";
import { ArrowRight } from "lucide-react";

const dateLocales: Record<string, Locale> = { nl, en: enUS, id, de, fr };

export function UpcomingMatches() {
  const t = useTranslations("Home.matches");
  const tMatch = useTranslations("Matches");
  const locale = useLocale();
  const upcomingMatches = getUpcomingMatches(3);

  return (
    <section className="bg-primary text-text-inverse">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 py-24 md:py-32">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] font-heading font-bold uppercase tracking-[0.3em] text-text-inverse/40 mb-4">
              Schedule
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight">
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
              href="/matches"
              className="group inline-flex items-center gap-3 text-sm font-heading font-bold uppercase tracking-[0.1em] text-text-inverse/60 hover:text-text-inverse transition-colors"
            >
              {t("viewAll")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* Match Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-[1px] bg-white/10"
        >
          {upcomingMatches.map((match, index) => (
            <motion.div
              key={match.id}
              variants={staggerItem}
              className="bg-primary hover:bg-primary-light transition-colors duration-300 group"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0 p-6 md:p-8">
                {/* Index */}
                <span className="text-xs font-heading font-medium text-text-inverse/20 tabular-nums md:w-12">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Date */}
                <div className="md:w-48">
                  <p className="text-sm font-heading font-bold uppercase tracking-wide">
                    {format(new Date(match.date), "d MMM yyyy", {
                      locale: dateLocales[locale] || enUS,
                    })}
                  </p>
                  <p className="text-xs text-text-inverse/40 mt-1">{match.time}</p>
                </div>

                {/* Teams */}
                <div className="flex-1 flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={match.homeTeam.logo}
                      alt={match.homeTeam.name}
                      width={32}
                      height={32}
                      className={match.homeTeam.logo.includes('Logo-Vfr_warbeyen') ? 'brightness-0 invert' : ''}
                    />
                    <span className="text-sm font-heading font-bold uppercase tracking-wide">
                      {match.homeTeam.name}
                    </span>
                  </div>

                  <span className="text-xs text-text-inverse/30 font-heading uppercase">
                    {tMatch("vs")}
                  </span>

                  <div className="flex items-center gap-3">
                    <Image
                      src={match.awayTeam.logo}
                      alt={match.awayTeam.name}
                      width={32}
                      height={32}
                      className={match.awayTeam.logo.includes('Logo-Vfr_warbeyen') ? 'brightness-0 invert' : ''}
                    />
                    <span className="text-sm font-heading font-bold uppercase tracking-wide">
                      {match.awayTeam.name}
                    </span>
                  </div>
                </div>

                {/* Competition & Venue */}
                <div className="md:text-right">
                  <p className="text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-accent-red">
                    {match.competition}
                  </p>
                  <p className="text-xs text-text-inverse/40 mt-1">
                    {match.venue.city}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowRight className="hidden md:block w-4 h-4 text-text-inverse/20 group-hover:text-accent-red group-hover:translate-x-1 transition-all duration-300 ml-6" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
