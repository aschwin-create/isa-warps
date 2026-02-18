import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { StatsSection } from "@/components/sections/home/StatsSection";
import { AboutPreview } from "@/components/sections/home/AboutPreview";
import { SponsorShowcase } from "@/components/sections/home/SponsorShowcase";
import { UpcomingMatches } from "@/components/sections/home/UpcomingMatches";
import { RecentUpdates } from "@/components/sections/home/RecentUpdates";
import { CTASection } from "@/components/sections/home/CTASection";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutPreview />
      <SponsorShowcase />
      <UpcomingMatches />
      <RecentUpdates />
      <CTASection />
    </>
  );
}
