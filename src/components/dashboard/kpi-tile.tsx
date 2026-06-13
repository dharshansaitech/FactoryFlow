import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { STATUS_STYLES, type StatusKey } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/dashboard/count-up";

interface KPITileProps {
  label: string;
  value: number;
  unit?: string;
  decimals?: number;
  subtext: string;
  icon: LucideIcon;
  tone: StatusKey;
}

export function KPITile({ label, value, unit, decimals = 0, subtext, icon: Icon, tone }: KPITileProps) {
  const style = STATUS_STYLES[tone];

  return (
    <Card className="gap-3 px-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</span>
        <div className={cn("flex size-7 items-center justify-center rounded-md", style.badge)}>
          <Icon className={cn("size-3.5", style.text)} />
        </div>
      </div>
      <div className="flex items-baseline gap-1 font-data">
        <span className="text-2xl font-semibold tabular-nums tracking-tight text-foreground">
          <CountUp value={value} decimals={decimals} />
        </span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
      <p className="text-xs text-muted-foreground">{subtext}</p>
    </Card>
  );
}
