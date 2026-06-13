"use client";

interface ChartTooltipProps {
  active?: boolean;
  label?: string;
  payload?: { value: number | string }[];
  valueLabel: string;
  unit?: string;
}

export function ChartTooltip({ active, label, payload, valueLabel, unit = "" }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-md border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="font-medium text-foreground">{label}</p>
      <p className="mt-0.5 text-muted-foreground">
        {valueLabel}: <span className="font-data text-foreground">{payload[0].value}{unit}</span>
      </p>
    </div>
  );
}
