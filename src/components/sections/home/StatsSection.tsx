"use client";

import { useRef, useEffect, useState } from "react";
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
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const startTime = performance.now();
        const durationMs = duration * 1000;

        function tick(now: number) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
          setCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

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
        <div className="mb-16 animate-fade-in-up">
          <p className="text-[10px] font-heading font-bold uppercase tracking-[0.3em] text-text-muted">
            Stats & Achievements
          </p>
          <div className="mt-4 w-12 h-[2px] bg-accent-red" />
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border">
          {stats.map((stat, index) => (
            <div
              key={stat.key}
              className="bg-surface p-8 md:p-12 group hover:bg-surface-alt transition-colors duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
