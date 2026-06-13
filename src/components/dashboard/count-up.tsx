"use client";

import { useEffect } from "react";
import { animate, useMotionValue, useTransform, motion } from "framer-motion";

interface CountUpProps {
  value: number;
  decimals?: number;
  duration?: number;
}

export function CountUp({ value, decimals = 0, duration = 1.1 }: CountUpProps) {
  const motionValue = useMotionValue(0);
  const formatted = useTransform(motionValue, (latest) =>
    latest.toLocaleString("en-IN", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );

  useEffect(() => {
    const controls = animate(motionValue, value, { duration, ease: "easeOut" });
    return controls.stop;
  }, [value, duration, motionValue]);

  return <motion.span>{formatted}</motion.span>;
}
