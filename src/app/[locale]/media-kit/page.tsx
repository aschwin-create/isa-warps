import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { MediaKitContent } from "@/components/sections/media-kit/MediaKitContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.mediaKit" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function MediaKitPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "MediaKit.hero" });

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        backgroundImage="/images/Isa-Warps-FC-Eindhoven.jpg"
        height="medium"
      />
      <MediaKitContent />
    </>
  );
}
