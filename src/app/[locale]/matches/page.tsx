import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { MatchesContent } from "@/components/sections/matches/MatchesContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.matches" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function MatchesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Matches.hero" });

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        backgroundImage="/images/Isa-Warps-FC-Eindhoven.jpg"
        height="medium"
      />
      <MatchesContent />
    </>
  );
}
