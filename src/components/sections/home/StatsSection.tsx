"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "motion/react";
import { useTranslations } from "next-intl";
import { stats } from "@/data/stats";

function AnimatedCounter({
  target,
  suffix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (value) => setCount(Math.round(value)),
    });
    return () => controls.stop();
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const t = useTranslations("Home.stats");

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 py-24 md:py-32">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[10px] font-heading font-bold uppercase tracking-[0.3em] text-text-muted">
            Stats & Achievements
          </p>
          <div className="mt-4 w-12 h-[2px] bg-accent-red" />
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-surface p-8 md:p-12 group hover:bg-surface-alt transition-colors duration-500"
            >
              <div className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-primary leading-none">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                />
              </div>
              <p className="mt-4 text-[10px] font-heading font-semibold uppercase tracking-[0.25em] text-text-muted">
                {t(stat.translationKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
