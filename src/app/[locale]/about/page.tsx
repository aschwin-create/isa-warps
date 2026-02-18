import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { ClubBadge } from "@/components/sections/about/ClubBadge";
import { BiographySection } from "@/components/sections/about/BiographySection";
import { CareerTimeline } from "@/components/sections/about/CareerTimeline";
import { PersonalInfo } from "@/components/sections/about/PersonalInfo";
import { PhotoGallery } from "@/components/sections/about/PhotoGallery";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.about" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "About.hero" });

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        eyebrow="About"
        backgroundImage="/images/hero/Isa-Warps-Oma-mobiel.jpg"
        height="large"
      >
        <ClubBadge />
      </PageHero>
      <PersonalInfo />
      <BiographySection />
      <CareerTimeline />
      <PhotoGallery />
    </>
  );
}
