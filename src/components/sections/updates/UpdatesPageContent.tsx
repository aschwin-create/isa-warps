"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { staggerContainer, staggerItem, fadeInUp } from "@/animations/variants";
import { getRecentUpdates } from "@/data/updates";
import { format } from "date-fns";
import { nl, enUS, id, de, fr } from "date-fns/locale";
import { Calendar, ArrowRight, Send } from "lucide-react";
import type { UpdateCategory } from "@/types/update";

const dateLocales: Record<string, typeof nl> = { nl, en: enUS, id, de, fr };

const categories: Array<"all" | UpdateCategory> = [
  "all",
  "matches",
  "training",
  "personal",
  "media",
];

const categoryBadgeVariants: Record<UpdateCategory, "red" | "blue" | "success" | "gold"> = {
  matches: "red",
  training: "blue",
  personal: "gold",
  media: "success",
};

export function UpdatesPageContent() {
  const t = useTranslations("Updates");
  const locale = useLocale();
  const allUpdates = getRecentUpdates();

  const [activeCategory, setActiveCategory] = useState<"all" | UpdateCategory>("all");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const filteredUpdates =
    activeCategory === "all"
      ? allUpdates
      : allUpdates.filter((u) => u.category === activeCategory);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setNewsletterEmail("");
    }
  };

  return (
    <>
      {/* Filter + Grid Section */}
      <section className="py-20">
        <Container>
          {/* Category Filters */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 justify-center mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-full font-heading font-semibold text-sm transition-all duration-200",
                  activeCategory === cat
                    ? "bg-accent-red text-white shadow-md"
                    : "bg-surface-alt text-text-light hover:bg-surface-dark hover:text-text"
                )}
              >
                {t(`categories.${cat}`)}
              </button>
            ))}
          </motion.div>

          {/* Updates Grid */}
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredUpdates.map((update) => (
              <motion.div
                key={update.id}
                variants={staggerItem}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <Link
                  href={`/updates/${update.slug}`}
                  className="group block bg-surface rounded-xl overflow-hidden border border-border-light shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={update.thumbnail}
                      alt={update.title[locale] || update.title.en}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant={categoryBadgeVariants[update.category]}
                        size="sm"
                        className="backdrop-blur-sm bg-opacity-90"
                      >
                        {t(`categories.${update.category}`)}
                      </Badge>
                    </div>
                    {update.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-0.5 bg-accent-red text-white text-xs font-bold rounded-full">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-text-muted mb-3">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={update.publishedAt}>
                        {format(new Date(update.publishedAt), "d MMMM yyyy", {
                          locale: dateLocales[locale] || enUS,
                        })}
                      </time>
                    </div>

                    <h3 className="text-lg font-heading font-bold text-primary mb-2 group-hover:text-accent-red transition-colors line-clamp-2">
                      {update.title[locale] || update.title.en}
                    </h3>

                    <p className="text-text-light text-sm line-clamp-3 mb-4">
                      {update.excerpt[locale] || update.excerpt.en}
                    </p>

                    <span className="inline-flex items-center gap-1.5 text-accent-red font-heading font-semibold text-sm group-hover:gap-3 transition-all">
                      {t("readMore")}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty state */}
          {filteredUpdates.length === 0 && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-center py-16"
            >
              <p className="text-text-muted text-lg">
                No updates found in this category.
              </p>
            </motion.div>
          )}
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary">
        <Container size="md">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              {t("newsletter.title")}
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              {t("newsletter.description")}
            </p>

            {newsletterSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-success/20 text-success rounded-xl p-6 max-w-md mx-auto"
              >
                <p className="font-heading font-semibold text-lg">
                  {t("newsletter.success")}
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder={t("newsletter.placeholder")}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-accent-red focus:border-accent-red"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  {t("newsletter.button")}
                </Button>
              </form>
            )}

            <p className="text-white/40 text-xs mt-4">
              {t("newsletter.gdpr")}
            </p>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
