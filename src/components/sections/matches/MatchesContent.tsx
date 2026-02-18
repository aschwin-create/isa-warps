"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "@/animations/variants";
import { matches } from "@/data/matches";
import { cn } from "@/lib/utils";
import { format, type Locale as DateLocale } from "date-fns";
import { nl, enUS, id, de, fr } from "date-fns/locale";
import { Calendar, MapPin, Trophy, Filter } from "lucide-react";
import type { MatchTeam, MatchStatus } from "@/types";

const dateLocales: Record<string, DateLocale> = { nl, en: enUS, id, de, fr };

type TeamFilter = "all" | MatchTeam;
type StatusFilter = "all" | "upcoming" | "past";

export function MatchesContent() {
  const t = useTranslations("Matches");
  const locale = useLocale();

  const [teamFilter, setTeamFilter] = useState<TeamFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  // Filter matches
  const filteredMatches = useMemo(() => {
    let result = [...matches];

    if (teamFilter !== "all") {
      result = result.filter((m) => m.team === teamFilter);
    }

    if (statusFilter !== "all") {
      result = result.filter((m) => m.status === statusFilter);
    }

    // Sort: upcoming first (ascending by date), then past (descending by date)
    result.sort((a, b) => {
      if (a.status === "upcoming" && b.status === "past") return -1;
      if (a.status === "past" && b.status === "upcoming") return 1;
      if (a.status === "upcoming" && b.status === "upcoming") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return result;
  }, [teamFilter, statusFilter]);

  // Group matches by month
  const groupedMatches = useMemo(() => {
    const groups: Record<string, typeof filteredMatches> = {};

    filteredMatches.forEach((match) => {
      const monthKey = format(new Date(match.date), "MMMM yyyy", {
        locale: dateLocales[locale] || enUS,
      });
      if (!groups[monthKey]) {
        groups[monthKey] = [];
      }
      groups[monthKey].push(match);
    });

    return groups;
  }, [filteredMatches, locale]);

  const teamFilters: { key: TeamFilter; label: string }[] = [
    { key: "all", label: t("filter.all") },
    { key: "timnas", label: t("filter.timnas") },
    { key: "warbeyen", label: t("filter.warbeyen") },
  ];

  const statusFilters: { key: StatusFilter; label: string }[] = [
    { key: "all", label: t("filter.all") },
    { key: "upcoming", label: t("status.upcoming") },
    { key: "past", label: t("status.past") },
  ];

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <Container>
        {/* Filters */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10 space-y-6"
        >
          {/* Team filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-text-muted mr-1" />
            {teamFilters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setTeamFilter(filter.key)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-heading font-bold transition-all duration-300",
                  teamFilter === filter.key
                    ? "bg-primary text-text-inverse shadow-lg"
                    : "bg-surface-alt text-text-muted hover:text-text hover:bg-surface-dark"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Status filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Calendar className="w-4 h-4 text-text-muted mr-1" />
            {statusFilters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setStatusFilter(filter.key)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-heading font-bold transition-all duration-300",
                  statusFilter === filter.key
                    ? "bg-accent-red text-text-inverse shadow-lg"
                    : "bg-surface-alt text-text-muted hover:text-text hover:bg-surface-dark"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Match List */}
        <AnimatePresence mode="wait">
          {filteredMatches.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-alt mb-4">
                <Filter className="w-8 h-8 text-text-muted" />
              </div>
              <p className="text-lg font-heading font-bold text-text-muted">
                {t("noMatches")}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={`${teamFilter}-${statusFilter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              {Object.entries(groupedMatches).map(
                ([monthLabel, monthMatches]) => (
                  <div key={monthLabel}>
                    {/* Month header */}
                    <h3 className="text-lg font-heading font-bold text-primary mb-4 capitalize flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-accent-red" />
                      {monthLabel}
                    </h3>

                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.1 }}
                      className="space-y-4"
                    >
                      {monthMatches.map((match) => (
                        <motion.div
                          key={match.id}
                          variants={staggerItem}
                          whileHover={{
                            y: -2,
                            transition: { duration: 0.2 },
                          }}
                          className="bg-surface rounded-xl border border-border overflow-hidden hover:shadow-[var(--shadow-card-hover)] transition-shadow"
                        >
                          <div className="flex">
                            {/* Team color stripe */}
                            <div
                              className={cn(
                                "w-1.5 flex-shrink-0",
                                match.team === "timnas"
                                  ? "bg-accent-red"
                                  : "bg-primary"
                              )}
                            />

                            <div className="flex-1 p-5 lg:p-6">
                              {/* Top row: competition badge + status */}
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                  <Trophy className="w-4 h-4 text-text-muted" />
                                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-text-muted">
                                    {match.competition}
                                  </span>
                                </div>
                                <Badge
                                  variant={
                                    match.status === "upcoming"
                                      ? "blue"
                                      : match.status === "live"
                                        ? "red"
                                        : "default"
                                  }
                                  size="sm"
                                >
                                  {t(`status.${match.status}`)}
                                </Badge>
                              </div>

                              {/* Teams row */}
                              <div className="flex items-center gap-4 lg:gap-8">
                                {/* Home Team */}
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  <Image
                                    src={match.homeTeam.logo}
                                    alt={match.homeTeam.name}
                                    width={44}
                                    height={44}
                                    className="flex-shrink-0"
                                  />
                                  <span
                                    className={cn(
                                      "font-heading font-bold text-sm lg:text-base truncate",
                                      match.isHome
                                        ? "text-primary"
                                        : "text-text"
                                    )}
                                  >
                                    {match.homeTeam.name}
                                  </span>
                                </div>

                                {/* Score or VS */}
                                <div className="flex-shrink-0 text-center min-w-[80px]">
                                  {match.result ? (
                                    <div className="flex items-center justify-center gap-2">
                                      <span className="text-2xl lg:text-3xl font-heading font-bold text-primary">
                                        {match.result.homeScore}
                                      </span>
                                      <span className="text-sm text-text-muted font-medium">
                                        -
                                      </span>
                                      <span className="text-2xl lg:text-3xl font-heading font-bold text-primary">
                                        {match.result.awayScore}
                                      </span>
                                    </div>
                                  ) : (
                                    <span className="text-lg font-heading font-bold text-text-muted">
                                      {t("vs")}
                                    </span>
                                  )}
                                </div>

                                {/* Away Team */}
                                <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
                                  <span
                                    className={cn(
                                      "font-heading font-bold text-sm lg:text-base truncate text-right",
                                      !match.isHome
                                        ? "text-primary"
                                        : "text-text"
                                    )}
                                  >
                                    {match.awayTeam.name}
                                  </span>
                                  <Image
                                    src={match.awayTeam.logo}
                                    alt={match.awayTeam.name}
                                    width={44}
                                    height={44}
                                    className="flex-shrink-0"
                                  />
                                </div>
                              </div>

                              {/* Bottom row: date, venue, stats */}
                              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm text-text-light">
                                <div className="flex items-center gap-1.5">
                                  <Calendar className="w-4 h-4 text-accent-red" />
                                  <span>
                                    {format(
                                      new Date(match.date),
                                      "d MMMM yyyy",
                                      {
                                        locale:
                                          dateLocales[locale] || enUS,
                                      }
                                    )}{" "}
                                    - {match.time}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="w-4 h-4 text-accent-red" />
                                  <span>
                                    {match.venue.stadium}, {match.venue.city}
                                  </span>
                                </div>

                                {/* Isa's stats for past matches */}
                                {match.stats && (
                                  <div className="flex items-center gap-3">
                                    {match.stats.minutesPlayed !==
                                      undefined && (
                                      <span className="text-text-muted">
                                        {match.stats.minutesPlayed}&apos;
                                      </span>
                                    )}
                                    {match.stats.goals !== undefined &&
                                      match.stats.goals > 0 && (
                                        <div className="flex items-center gap-1">
                                          <Trophy className="w-4 h-4 text-gold" />
                                          <span className="font-bold text-primary">
                                            {match.stats.goals}{" "}
                                            {match.stats.goals === 1
                                              ? "goal"
                                              : "goals"}
                                          </span>
                                        </div>
                                      )}
                                    {match.stats.assists !== undefined &&
                                      match.stats.assists > 0 && (
                                        <span className="text-text-muted">
                                          {match.stats.assists}{" "}
                                          {match.stats.assists === 1
                                            ? "assist"
                                            : "assists"}
                                        </span>
                                      )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
