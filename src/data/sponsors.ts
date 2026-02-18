import type { Sponsor, SponsorTier } from "@/types/sponsor";

export const sponsors: Sponsor[] = [
  {
    id: "sponsor-001",
    name: "No Cosmetics",
    logo: "/images/gallery/Logo-No-Cosmetics.png",
    website: "https://www.nocosmetics.nl",
    tier: "premium",
    since: "2024",
  },
  {
    id: "sponsor-002",
    name: "Derbystar",
    logo: "/images/gallery/Derbystar_Logo.png",
    website: "https://www.derbystar.de",
    tier: "premium",
    since: "2024",
  },
  {
    id: "sponsor-003",
    name: "Bank Mandiri",
    logo: "/images/gallery/logo-Bank_Mandiri_logo.png",
    website: "https://www.bankmandiri.co.id",
    tier: "official",
    since: "2023",
  },
  {
    id: "sponsor-004",
    name: "Garuda Indonesia",
    logo: "/images/gallery/logo-garuda-indonesia.png",
    website: "https://www.garuda-indonesia.com",
    tier: "official",
    since: "2023",
  },
];

export function getSponsorsByTier(tier: SponsorTier): Sponsor[] {
  return sponsors.filter((sponsor) => sponsor.tier === tier);
}
