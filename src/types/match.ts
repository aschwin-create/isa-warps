export type MatchTeam = "timnas" | "warbeyen";
export type MatchStatus = "upcoming" | "past" | "live";
export type Competition = "Friendly" | "2. Bundesliga" | "AFC Qualifiers" | "AFF Championship" | "Asian Games" | "Other";

export interface Match {
  id: string;
  date: string;
  time: string;
  team: MatchTeam;
  homeTeam: { name: string; logo: string };
  awayTeam: { name: string; logo: string };
  isHome: boolean;
  venue: { stadium: string; city: string; country: string };
  competition: Competition;
  status: MatchStatus;
  result?: { homeScore: number; awayScore: number };
  highlights?: string;
  stats?: { minutesPlayed?: number; goals?: number; assists?: number };
}
