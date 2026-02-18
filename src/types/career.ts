export interface CareerEntry {
  id: string;
  year: string;
  club: string;
  clubLogo: string;
  league: string;
  country: string;
  description: Record<string, string>;
  achievements?: Record<string, string[]>;
  isCurrent?: boolean;
  isNationalTeam?: boolean;
}
