"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { kpiTrends } from "@/lib/mock-data";
import { CHART_COLORS } from "@/lib/design-tokens";
import { ChartCard } from "@/components/dashboard/chart-card";
import { ChartTooltip } from "@/components/dashboard/chart-tooltip";

export function ThroughputChart() {
  return (
    <ChartCard title="Throughput Trend" description="Plant-wide boards/hour, last 7 days" className="xl:col-span-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={kpiTrends.throughput} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="throughputFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CHART_COLORS.throughput} stopOpacity={0.35} />
              <stop offset="100%" stopColor={CHART_COLORS.throughput} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} width={56} />
          <Tooltip content={<ChartTooltip valueLabel="Throughput" unit=" b/hr" />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={CHART_COLORS.throughput}
            strokeWidth={2}
            fill="url(#throughputFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
