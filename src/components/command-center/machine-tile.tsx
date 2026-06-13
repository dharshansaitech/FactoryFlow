import { Camera, Component, Flame, Printer, ScanLine, type LucideIcon } from "lucide-react";
import type { Machine, MachineType } from "@/lib/types";
import { STATUS_STYLES, machineStatusToStatusKey, type StatusKey } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

const MACHINE_ICONS: Record<MachineType, LucideIcon> = {
  PRINTER: Printer,
  SPI: ScanLine,
  PLACEMENT: Component,
  REFLOW: Flame,
  AOI: Camera,
  ICT: ScanLine,
  FCT: ScanLine,
  DEPANEL: Component,
};

const TILE_BORDER_CLASSES: Record<StatusKey, string> = {
  running: "border-border",
  completed: "border-border",
  warning: "border-status-warning/30",
  hold: "border-status-hold/30",
  critical: "border-status-critical/30",
  offline: "border-status-offline/30",
};

export function MachineTile({ machine }: { machine: Machine }) {
  const Icon = MACHINE_ICONS[machine.type];
  const tone = machineStatusToStatusKey(machine.status);
  const style = STATUS_STYLES[tone];
  const metrics = Object.entries(machine.metrics ?? {}).slice(0, 2);

  return (
    <div
      className={cn("flex flex-col gap-2 rounded-md border bg-secondary/40 p-2.5", TILE_BORDER_CLASSES[tone])}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-hidden">
          <Icon className={cn("size-3.5 shrink-0", style.text)} />
          <span className="truncate text-xs font-medium text-foreground">{machine.name}</span>
        </div>
        <span className={cn("size-1.5 shrink-0 rounded-full", style.dot, style.glow)} />
      </div>
      <dl className="space-y-0.5 font-data text-[11px] text-muted-foreground">
        {metrics.map(([key, value]) => (
          <div key={key} className="flex items-center justify-between gap-2">
            <dt className="truncate capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</dt>
            <dd className="tabular-nums text-foreground">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
