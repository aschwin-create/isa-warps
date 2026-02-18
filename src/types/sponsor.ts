export type SponsorTier = "premium" | "official" | "supporting";

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  logoLight?: string;
  website: string;
  tier: SponsorTier;
  since: string;
}
