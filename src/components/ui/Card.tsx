"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { cardHover } from "@/animations/variants";

type CardVariant = "default" | "elevated" | "dark";
type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: CardVariant;
  hover?: boolean;
  padding?: CardPadding;
}

const variantStyles: Record<CardVariant, string> = {
  default: "bg-surface shadow-card border border-border-light",
  elevated: "bg-surface shadow-card-hover",
  dark: "bg-primary text-white",
};

const paddingStyles: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  children,
  className,
  variant = "default",
  hover = true,
  padding = "md",
}: CardProps) {
  return (
    <motion.div
      variants={hover ? cardHover : undefined}
      initial={hover ? "rest" : undefined}
      whileHover={hover ? "hover" : undefined}
      className={cn(
        "rounded-xl overflow-hidden",
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
