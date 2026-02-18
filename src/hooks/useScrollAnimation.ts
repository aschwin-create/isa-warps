"use client";

import { useRef } from "react";
import { useInView } from "motion/react";

export function useScrollAnimation(options?: {
  once?: boolean;
  amount?: number;
  margin?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    amount: options?.amount ?? 0.2,
    margin: options?.margin as `${number}px ${number}px ${number}px ${number}px` | undefined,
  });

  return { ref, isInView };
}
