"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getRecentUpdates } from "@/data/updates";
import { format, type Locale } from "date-fns";
import { nl, enUS, id, de, fr } from "date-fns/locale";
import { ArrowRight } from "lucide-react";

const dateLocales: Record<string, Locale> = { nl, en: enUS, id, de, fr };

export function RecentUpdates() {
  const t = useTranslations("Home.updates");
  const tCat = useTranslations("Updates.categories");
  const locale = useLocale();
  const recentUpdates = getRecentUpdates(3);
  const [featured, ...rest] = recentUpdates;

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 py-24 md:py-32">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] font-heading font-bold uppercase tracking-[0.3em] text-text-muted mb-4">
              News
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
              href="/updates"
              className="group inline-flex items-center gap-3 text-sm font-heading font-bold uppercase tracking-[0.1em] text-primary hover:text-accent-red transition-colors"
            >
              {t("viewAll")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* Editorial grid - featured + 2 smaller */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1px] bg-border">
          {/* Featured article */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-surface lg:row-span-2"
            >
              <Link href={`/updates/${featured.slug}`} className="group block h-full">
                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden">
                  <Image
                    src={featured.thumbnail}
                    alt={featured.title[locale] || featured.title.en}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <p className="text-[10px] font-heading font-bold uppercase tracking-[0.25em] text-accent-red mb-3">
                      {tCat(featured.category)}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-heading font-black text-text-inverse uppercase leading-tight tracking-tight">
                      {featured.title[locale] || featured.title.en}
                    </h3>
                    <p className="mt-3 text-sm text-text-inverse/60 line-clamp-2">
                      {featured.excerpt[locale] || featured.excerpt.en}
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-xs text-text-inverse/40">
                        {format(new Date(featured.publishedAt), "d MMM yyyy", {
                          locale: dateLocales[locale] || enUS,
                        })}
                      </span>
                      <ArrowRight className="w-4 h-4 text-text-inverse/40 group-hover:text-accent-red group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Smaller articles stacked */}
          <div className="grid grid-rows-2 gap-[1px] bg-border">
            {rest.map((update, index) => (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                className="bg-surface"
              >
                <Link
                  href={`/updates/${update.slug}`}
                  className="group flex flex-col sm:flex-row h-full"
                >
                  <div className="relative aspect-video sm:aspect-square sm:w-48 md:w-64 shrink-0 overflow-hidden">
                    <Image
                      src={update.thumbnail}
                      alt={update.title[locale] || update.title.en}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <p className="text-[10px] font-heading font-bold uppercase tracking-[0.25em] text-accent-red mb-2">
                      {tCat(update.category)}
                    </p>
                    <h3 className="text-lg font-heading font-bold text-primary uppercase tracking-tight group-hover:text-accent-red transition-colors line-clamp-2">
                      {update.title[locale] || update.title.en}
                    </h3>
                    <p className="mt-2 text-xs text-text-muted">
                      {format(new Date(update.publishedAt), "d MMM yyyy", {
                        locale: dateLocales[locale] || enUS,
                      })}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
