"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/layout/status-badge";
import { lineStatusToStatusKey } from "@/lib/design-tokens";
import { workOrders } from "@/lib/mock-data";
import { useCommandCenterStore } from "@/store/command-center-store";
import { MachineTile } from "@/components/command-center/machine-tile";
import { cn } from "@/lib/utils";
import type { ProductionLine } from "@/lib/types";

/** Briefly highlights when `value` changes, so live updates are visible. */
function useFlash(value: number) {
  const [flash, setFlash] = useState(false);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current !== value) {
      prev.current = value;
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 700);
      return () => clearTimeout(t);
    }
  }, [value]);
  return flash;
}

export function LineCard({ line }: { line: ProductionLine }) {
  const liveLine = useCommandCenterStore((state) => state.lines.find((l) => l.id === line.id)) ?? line;
  const allMachines = useCommandCenterStore((state) => state.machines);
  const machines = useMemo(
    () => allMachines.filter((m) => m.lineId === line.id).sort((a, b) => a.sequence - b.sequence),
    [allMachines, line.id]
  );

  const activeOrder = workOrders.find((wo) => wo.id === liveLine.activeWorkOrderId);
  const progressPct = activeOrder
    ? Math.round((activeOrder.quantityCompleted / activeOrder.quantityPlanned) * 100)
    : 0;
  const throughputPct = Math.round((liveLine.currentThroughput / liveLine.targetThroughput) * 100);
  const throughputFlash = useFlash(liveLine.currentThroughput);

  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between">
        <div>
          <CardTitle>{liveLine.name}</CardTitle>
          <p className="text-xs text-muted-foreground">{liveLine.code}</p>
        </div>
        <StatusBadge status={lineStatusToStatusKey(liveLine.status)} glow />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {activeOrder ? (
          <div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="truncate">
                {activeOrder.orderNumber} — {activeOrder.productName}
              </span>
              <span className="font-data tabular-nums">
                {activeOrder.quantityCompleted.toLocaleString("en-IN")} / {activeOrder.quantityPlanned.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">No active work order.</p>
        )}

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-md border border-border bg-secondary/40 p-2.5">
            <p className="text-[11px] text-muted-foreground uppercase">Throughput</p>
            <p
              className={cn(
                "mt-0.5 font-data text-sm tabular-nums transition-colors duration-700",
                throughputFlash ? "text-status-running" : "text-foreground"
              )}
            >
              {liveLine.currentThroughput} / {liveLine.targetThroughput}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{throughputPct}% of target</p>
          </div>
          <div className="rounded-md border border-border bg-secondary/40 p-2.5">
            <p className="text-[11px] text-muted-foreground uppercase">OEE</p>
            <p className="mt-0.5 font-data text-sm tabular-nums text-foreground">{liveLine.oee.toFixed(1)}%</p>
          </div>
          <div className="rounded-md border border-border bg-secondary/40 p-2.5">
            <p className="text-[11px] text-muted-foreground uppercase">Yield</p>
            <p className="mt-0.5 font-data text-sm tabular-nums text-foreground">{liveLine.yieldPct.toFixed(1)}%</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {machines.map((machine) => (
            <MachineTile key={machine.id} machine={machine} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
