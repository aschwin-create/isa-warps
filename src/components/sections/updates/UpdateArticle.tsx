"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { fadeInUp, staggerContainer, staggerItem } from "@/animations/variants";
import { format } from "date-fns";
import { nl, enUS, id, de, fr } from "date-fns/locale";
import { ArrowLeft, Calendar, Tag, Share2, ArrowRight } from "lucide-react";
import type { Update, UpdateCategory } from "@/types/update";

const dateLocales: Record<string, typeof nl> = { nl, en: enUS, id, de, fr };

const categoryBadgeVariants: Record<UpdateCategory, "red" | "blue" | "success" | "gold"> = {
  matches: "red",
  training: "blue",
  personal: "gold",
  media: "success",
};

interface UpdateArticleProps {
  update: Update;
  relatedUpdates: Update[];
}

export function UpdateArticle({ update, relatedUpdates }: UpdateArticleProps) {
  const t = useTranslations("Updates");
  const tCat = useTranslations("Updates.categories");
  const locale = useLocale();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const title = update.title[locale] || update.title.en;
  const content = update.content[locale] || update.content.en;
  const excerpt = update.excerpt[locale] || update.excerpt.en;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt,
          url: window.location.href,
        });
      } catch {
        // User cancelled sharing
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      {/* Hero with background image */}
      <section
        ref={heroRef}
        className="relative h-[calc(50vh+100px)] md:h-[calc(60vh+100px)] overflow-hidden flex items-end"
      >
        <motion.div
          className="absolute inset-0"
          style={{ y: heroY }}
        >
          <Image
            src={update.heroImage || update.thumbnail}
            alt={title}
            fill
            className="object-cover object-top"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        <motion.div
          className="relative z-10 w-full pb-12"
          style={{ opacity: heroOpacity }}
        >
          <Container size="sm">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <Badge
                variant={categoryBadgeVariants[update.category]}
                className="mb-4"
              >
                {tCat(update.category)}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                {title}
              </h1>
              <div className="flex items-center gap-4 text-white/70">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={update.publishedAt}>
                    {format(new Date(update.publishedAt), "d MMMM yyyy", {
                      locale: dateLocales[locale] || enUS,
                    })}
                  </time>
                </div>
              </div>
            </motion.div>
          </Container>
        </motion.div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <Container size="sm">
          <motion.article
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Share button */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
              <div className="flex items-center gap-2 text-text-muted">
                <Tag className="w-4 h-4" />
                <span className="text-sm">{tCat(update.category)}</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-text-muted hover:text-accent-red transition-colors"
                aria-label="Share article"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Share</span>
              </button>
            </div>

            {/* Article body */}
            <div className="prose prose-lg max-w-none">
              {content.split('\n\n').map((paragraph, index) => {
                // Check if this is a heading (starts with ##)
                if (paragraph.startsWith('## ')) {
                  const headingText = paragraph.replace('## ', '');
                  return (
                    <h2
                      key={index}
                      className="text-2xl md:text-3xl font-heading font-bold text-primary mt-12 mb-6 first:mt-0"
                    >
                      {headingText}
                    </h2>
                  );
                }
                // Check if this is an image (markdown syntax ![alt](path))
                const imageMatch = paragraph.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
                if (imageMatch) {
                  const [, alt, src] = imageMatch;
                  return (
                    <div key={index} className="my-8 rounded-lg overflow-hidden">
                      <Image
                        src={src}
                        alt={alt}
                        width={1200}
                        height={800}
                        className="w-full h-auto"
                      />
                    </div>
                  );
                }
                // Regular paragraph
                if (paragraph.trim()) {
                  return (
                    <p
                      key={index}
                      className="text-lg md:text-xl text-text-light leading-relaxed mb-6"
                    >
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>

            {/* Back to updates */}
            <div className="mt-12 pt-8 border-t border-border">
              <Link
                href="/updates"
                className="inline-flex items-center gap-2 text-accent-red font-heading font-semibold hover:gap-3 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                {t("backToUpdates")}
              </Link>
            </div>
          </motion.article>
        </Container>
      </section>

      {/* Related Posts */}
      {relatedUpdates.length > 0 && (
        <section className="py-20 bg-surface-alt">
          <Container>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                {t("relatedPosts")}
              </h2>
              <div className="w-16 h-1 bg-accent-red mx-auto" />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {relatedUpdates.map((related) => (
                <motion.div
                  key={related.id}
                  variants={staggerItem}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <Link
                    href={`/updates/${related.slug}`}
                    className="group block bg-surface rounded-xl overflow-hidden border border-border-light shadow-card hover:shadow-card-hover transition-all duration-300"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={related.thumbnail}
                        alt={related.title[locale] || related.title.en}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge
                          variant={categoryBadgeVariants[related.category]}
                          size="sm"
                        >
                          {tCat(related.category)}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-text-muted mb-3">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={related.publishedAt}>
                          {format(new Date(related.publishedAt), "d MMMM yyyy", {
                            locale: dateLocales[locale] || enUS,
                          })}
                        </time>
                      </div>

                      <h3 className="text-lg font-heading font-bold text-primary mb-2 group-hover:text-accent-red transition-colors line-clamp-2">
                        {related.title[locale] || related.title.en}
                      </h3>

                      <p className="text-text-light text-sm line-clamp-2">
                        {related.excerpt[locale] || related.excerpt.en}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
      )}
    </>
  );
}
