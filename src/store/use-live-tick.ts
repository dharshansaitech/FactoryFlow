"use client";

import { useEffect } from "react";
import { useCommandCenterStore } from "@/store/command-center-store";

export function useLiveTick(intervalMs = 3000) {
  const tick = useCommandCenterStore((state) => state.tick);
  const isLive = useCommandCenterStore((state) => state.isLive);

  useEffect(() => {
    if (!isLive) return;
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [isLive, tick, intervalMs]);
}
