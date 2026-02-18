"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import {
  Download,
  FileText,
  Image as ImageIcon,
  Package,
  Users,
  TrendingUp,
  Heart,
  Star,
  Mail,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "@/animations/variants";

const previewItems = [
  { key: "bio", Icon: FileText },
  { key: "stats", Icon: TrendingUp },
  { key: "social", Icon: Heart },
  { key: "demographics", Icon: Users },
  { key: "packages", Icon: Star },
  { key: "photos", Icon: ImageIcon },
  { key: "contact", Icon: Mail },
] as const;

const extraDownloads = [
  {
    titleKey: "photos",
    descKey: "photosDesc",
    Icon: ImageIcon,
    href: "/downloads/isa-warps-photos.zip",
    size: "48 MB",
  },
  {
    titleKey: "logos",
    descKey: "logosDesc",
    Icon: Package,
    href: "/downloads/isa-warps-logo-pack.zip",
    size: "8 MB",
  },
  {
    titleKey: "factSheet",
    descKey: "factSheetDesc",
    Icon: FileText,
    href: "/downloads/isa-warps-fact-sheet.pdf",
    size: "1.2 MB",
  },
] as const;

export function MediaKitContent() {
  const t = useTranslations("MediaKit");
  const locale = useLocale();

  // Map locale to PDF filename
  const getMediaKitPDF = () => {
    const localeMap: Record<string, string> = {
      nl: "NL",
      en: "EN",
      de: "DE",
      fr: "FR",
      id: "ID",
    };
    const langCode = localeMap[locale] || "EN";
    return `/images/PDF/Isa-Warps-Media-Kit-${langCode}.pdf`;
  };

  const downloadRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const extrasRef = useRef<HTMLDivElement>(null);

  const downloadInView = useInView(downloadRef, { once: true, amount: 0.3 });
  const previewInView = useInView(previewRef, { once: true, amount: 0.2 });
  const extrasInView = useInView(extrasRef, { once: true, amount: 0.2 });

  return (
    <>
      {/* Section 1: Main Download */}
      <section className="py-20 bg-surface">
        <Container size="md">
          <motion.div
            ref={downloadRef}
            variants={fadeInUp}
            initial="hidden"
            animate={downloadInView ? "visible" : "hidden"}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/90 p-10 md:p-14 text-center"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-red/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-blue/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center bg-white/10 p-4 rounded-full mb-6">
                <Download className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                {t("download.title")}
              </h2>

              <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                {t("download.description")}
              </p>

              <a
                href={getMediaKitPDF()}
                download
                className="inline-flex items-center gap-3 bg-accent-red text-white px-8 py-4 rounded-lg font-heading font-bold text-lg hover:bg-accent-red-dark transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Download className="w-5 h-5" />
                {t("download.button")}
              </a>

              <div className="flex items-center justify-center gap-6 mt-6 text-sm text-white/50">
                <span>
                  {t("download.lastUpdated")}: February 2026
                </span>
                <span className="w-1 h-1 bg-white/30 rounded-full" />
                <span>
                  {t("download.fileSize")}: 2.4 MB
                </span>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Section 2: Preview / What's inside */}
      <section className="py-20 bg-surface-alt">
        <Container>
          <SectionHeading title={t("preview.title")} />

          <motion.div
            ref={previewRef}
            variants={staggerContainer}
            initial="hidden"
            animate={previewInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {previewItems.map(({ key, Icon }) => (
              <motion.div
                key={key}
                variants={staggerItem}
                className="flex items-center gap-4 bg-surface rounded-xl p-5 border border-border hover:shadow-[var(--shadow-card-hover)] transition-all duration-300"
              >
                <div className="shrink-0 bg-accent-red/10 p-2.5 rounded-full">
                  <Icon className="w-5 h-5 text-accent-red" />
                </div>
                <span className="text-text font-medium text-sm">
                  {t(`preview.items.${key}`)}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Section 3: Extra Downloads */}
      <section className="py-20 bg-surface">
        <Container>
          <SectionHeading title={t("extras.title")} />

          <motion.div
            ref={extrasRef}
            variants={staggerContainer}
            initial="hidden"
            animate={extrasInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {extraDownloads.map(({ titleKey, descKey, Icon, href, size }) => (
              <motion.div
                key={titleKey}
                variants={staggerItem}
                className="group bg-surface rounded-2xl p-8 border border-border hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 flex flex-col"
              >
                <div className="bg-accent-red/10 p-3.5 rounded-full w-fit mb-5 group-hover:bg-accent-red/20 transition-colors">
                  <Icon className="w-6 h-6 text-accent-red" />
                </div>

                <h3 className="text-xl font-heading font-bold text-primary mb-2">
                  {t(`extras.${titleKey}`)}
                </h3>

                <p className="text-text-light text-sm leading-relaxed mb-6 flex-1">
                  {t(`extras.${descKey}`)}
                </p>

                <div className="flex items-center justify-between">
                  <a
                    href={href}
                    className="inline-flex items-center gap-2 text-accent-red font-heading font-semibold text-sm hover:text-accent-red-dark transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    {t("download.button")}
                  </a>
                  <span className="text-xs text-text-muted">{size}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
    </>
  );
}
