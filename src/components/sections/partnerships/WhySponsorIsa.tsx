"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { Globe, TrendingUp, Award, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { staggerContainer, staggerItem } from "@/animations/variants";

const usps = [
  { key: "dualMarket", Icon: Globe },
  { key: "growing", Icon: TrendingUp },
  { key: "professional", Icon: Award },
  { key: "engagement", Icon: Users },
] as const;

export function WhySponsorIsa() {
  const t = useTranslations("Partnerships.whySponsor");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-20 bg-surface">
      <Container>
        <SectionHeading title={t("title")} />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {usps.map(({ key, Icon }) => (
            <motion.div
              key={key}
              variants={staggerItem}
              className="group bg-surface rounded-xl p-8 border border-border hover:shadow-[var(--shadow-card-hover)] transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                <div className="shrink-0 bg-accent-red/10 p-3 rounded-full">
                  <Icon className="w-6 h-6 text-accent-red" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-primary mb-2">
                    {t(`${key}.title`)}
                  </h3>
                  <p className="text-text-light leading-relaxed">
                    {t(`${key}.description`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
