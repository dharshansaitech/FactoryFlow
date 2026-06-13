"use client";

import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useCommandCenterStore } from "@/store/command-center-store";
import { useLiveTick } from "@/store/use-live-tick";
import { cn } from "@/lib/utils";

export function LiveIndicator() {
  useLiveTick(2000);

  const isLive = useCommandCenterStore((state) => state.isLive);
  const lastTick = useCommandCenterStore((state) => state.lastTick);
  const setLive = useCommandCenterStore((state) => state.setLive);

  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSecondsAgo(Math.floor((Date.now() - lastTick) / 1000)), 1000);
    return () => clearInterval(id);
  }, [lastTick]);

  return (
    <div className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-1.5">
      <span className="relative flex size-2.5">
        {isLive && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-status-running opacity-75" />
        )}
        <span
          className={cn("relative inline-flex size-2.5 rounded-full", isLive ? "bg-status-running" : "bg-status-offline")}
        />
      </span>
      <span className="text-xs font-medium tracking-wide text-foreground uppercase">{isLive ? "Live" : "Paused"}</span>
      <span className="font-data text-xs text-muted-foreground">
        {secondsAgo <= 1 ? "updated just now" : `updated ${secondsAgo}s ago`}
      </span>
      <button
        type="button"
        onClick={() => setLive(!isLive)}
        className="ml-1 flex size-6 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label={isLive ? "Pause live simulation" : "Resume live simulation"}
      >
        {isLive ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
      </button>
    </div>
  );
}
