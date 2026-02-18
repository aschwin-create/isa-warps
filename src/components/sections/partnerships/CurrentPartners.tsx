"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { getSponsorsByTier } from "@/data/sponsors";
import { staggerContainer, staggerItem } from "@/animations/variants";
import type { SponsorTier } from "@/types/sponsor";

const tierConfig: {
  tier: SponsorTier;
  variant: "gold" | "blue" | "red";
}[] = [
  { tier: "premium", variant: "gold" },
  { tier: "official", variant: "blue" },
  { tier: "supporting", variant: "red" },
];

export function CurrentPartners() {
  const t = useTranslations("Partnerships");
  const tTiers = useTranslations("Partnerships.tiers");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-20 bg-surface">
      <Container>
        <SectionHeading title={t("currentPartners.title")} />

        <div ref={ref} className="space-y-12">
          {tierConfig.map(({ tier, variant }) => {
            const tierSponsors = getSponsorsByTier(tier);
            if (tierSponsors.length === 0) return null;

            return (
              <motion.div
                key={tier}
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {/* Tier label */}
                <div className="flex justify-center mb-6">
                  <Badge variant={variant} size="md">
                    {tTiers(`${tier}.name`)}
                  </Badge>
                </div>

                {/* Sponsor logos */}
                <motion.div
                  variants={staggerContainer}
                  className="flex flex-wrap items-center justify-center gap-6"
                >
                  {tierSponsors.map((sponsor) => (
                    <motion.a
                      key={sponsor.id}
                      variants={staggerItem}
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center p-6 bg-surface-alt rounded-xl border border-border hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 w-[180px] h-[100px]"
                    >
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={120}
                        height={48}
                        className="opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300 object-contain"
                      />
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
