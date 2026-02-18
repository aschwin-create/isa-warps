"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { staggerContainer, staggerItem } from "@/animations/variants";
import type { Sponsor } from "@/types";

interface SponsorGridProps {
  sponsors: Sponsor[];
  className?: string;
}

export function SponsorGrid({ sponsors, className }: SponsorGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center",
        className
      )}
    >
      {sponsors.map((sponsor) => (
        <motion.a
          key={sponsor.id}
          variants={staggerItem}
          href={sponsor.website}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center p-6 rounded-xl bg-surface border border-border-light hover:shadow-card transition-all duration-300"
        >
          <div className="relative h-16 w-full grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
            <Image
              src={sponsor.logo}
              alt={sponsor.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
}
