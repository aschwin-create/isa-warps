import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { StatsSection } from "@/components/sections/home/StatsSection";

const AboutPreview = dynamic(() => import("@/components/sections/home/AboutPreview").then(m => ({ default: m.AboutPreview })));
const SponsorShowcase = dynamic(() => import("@/components/sections/home/SponsorShowcase").then(m => ({ default: m.SponsorShowcase })));
const UpcomingMatches = dynamic(() => import("@/components/sections/home/UpcomingMatches").then(m => ({ default: m.UpcomingMatches })));
const RecentUpdates = dynamic(() => import("@/components/sections/home/RecentUpdates").then(m => ({ default: m.RecentUpdates })));
const CTASection = dynamic(() => import("@/components/sections/home/CTASection").then(m => ({ default: m.CTASection })));

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
