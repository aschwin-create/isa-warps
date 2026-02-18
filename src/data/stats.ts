export interface StatItem {
  key: string;
  value: number;
  suffix?: string;
  translationKey: string;
}

export const stats: StatItem[] = [
  { key: "caps", value: 12, suffix: "", translationKey: "internationalCaps" },
  { key: "goals", value: 2, suffix: "", translationKey: "goals" },
  { key: "reach", value: 50, suffix: "K+", translationKey: "socialReach" },
  { key: "clubs", value: 6, suffix: "", translationKey: "careerClubs" },
];
