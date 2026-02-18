"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  className?: string;
}

export function AnimatedCounter({
  target,
  duration = 2,
  suffix = "",
  prefix = "",
  label,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated && numberRef.current) {
      setHasAnimated(true);

      animate(0, target, {
        duration,
        ease: [0.4, 0, 0.2, 1],
        onUpdate(value) {
          if (numberRef.current) {
            numberRef.current.textContent = `${prefix}${Math.round(value)}${suffix}`;
          }
        },
      });
    }
  }, [isInView, hasAnimated, target, duration, prefix, suffix]);

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <span
        ref={numberRef}
        className="font-heading font-bold text-4xl md:text-5xl text-accent-red block"
      >
        {prefix}0{suffix}
      </span>
      <span className="text-sm uppercase tracking-wider text-text-light mt-2 block font-medium">
        {label}
      </span>
    </div>
  );
}
