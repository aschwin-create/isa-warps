"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { staggerContainer, staggerItem } from "@/animations/variants";

const tiers = [
  {
    key: "premium",
    accent: "gold",
    recommended: true,
  },
  {
    key: "official",
    accent: "blue",
    recommended: false,
  },
  {
    key: "supporting",
    accent: "default",
    recommended: false,
  },
] as const;

export function SponsorshipTiers() {
  const t = useTranslations("Partnerships.tiers");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="py-20 bg-surface-alt">
      <Container>
        <SectionHeading title={t("title")} />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start"
        >
          {tiers.map(({ key, accent, recommended }) => {
            const benefits: string[] = t.raw(`${key}.benefits`) as string[];

            return (
              <motion.div
                key={key}
                variants={staggerItem}
                className={cn(
                  "relative rounded-2xl p-8 border-2 transition-all duration-300",
                  "bg-surface hover:shadow-[var(--shadow-card-hover)]",
                  recommended
                    ? "border-gold shadow-[0_0_30px_-5px_rgba(212,175,55,0.3)] md:-mt-4 md:pb-12"
                    : "border-border"
                )}
              >
                {/* Recommended badge */}
                {recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge variant="gold" size="md">
                      <Star className="w-3.5 h-3.5 mr-1 fill-current" />
                      Aanbevolen
                    </Badge>
                  </div>
                )}

                {/* Tier header */}
                <div className="text-center mb-6 pt-2">
                  <h3
                    className={cn(
                      "text-2xl font-heading font-bold mb-2",
                      recommended ? "text-gold" : "text-primary"
                    )}
                  >
                    {t(`${key}.name`)}
                  </h3>
                  <p className="text-text-muted text-sm uppercase tracking-wider font-medium">
                    {t(`${key}.price`)}
                  </p>
                </div>

                {/* Divider */}
                <div
                  className={cn(
                    "w-full h-px mb-6",
                    recommended ? "bg-gold/30" : "bg-border"
                  )}
                />

                {/* Benefits */}
                <ul className="space-y-3 mb-8">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check
                        className={cn(
                          "w-5 h-5 shrink-0 mt-0.5",
                          recommended
                            ? "text-gold"
                            : accent === "blue"
                              ? "text-accent-blue"
                              : "text-accent-red"
                        )}
                      />
                      <span className="text-text-light text-sm leading-relaxed">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#inquiry-form"
                  className={cn(
                    "block w-full text-center py-3 px-6 rounded-lg font-heading font-semibold transition-all duration-200",
                    recommended
                      ? "bg-gold text-primary hover:bg-gold/90"
                      : "border-2 border-accent-red text-accent-red hover:bg-accent-red hover:text-white"
                  )}
                >
                  {t(`${key}.name`)}
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
