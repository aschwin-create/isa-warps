import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { WhySponsorIsa } from "@/components/sections/partnerships/WhySponsorIsa";
import { SponsorshipTiers } from "@/components/sections/partnerships/SponsorshipTiers";
import { CurrentPartners } from "@/components/sections/partnerships/CurrentPartners";
import { SponsorInquiryForm } from "@/components/sections/partnerships/SponsorInquiryForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.partnerships" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PartnershipsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Partnerships.hero" });

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        backgroundImage="/images/hero/54850393411_1bebc69b53_o.jpg"
        height="medium"
      />
      <WhySponsorIsa />
      <SponsorshipTiers />
      <CurrentPartners />
      <SponsorInquiryForm />
    </>
  );
}
