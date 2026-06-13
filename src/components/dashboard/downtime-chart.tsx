"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { downtimeByReason } from "@/lib/mock-data";
import { CHART_COLORS } from "@/lib/design-tokens";
import { ChartCard } from "@/components/dashboard/chart-card";
import { ChartTooltip } from "@/components/dashboard/chart-tooltip";

export function DowntimeChart() {
  return (
    <ChartCard title="Downtime Analysis" description="Minutes lost by reason, last 7 days">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={downtimeByReason} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="reason" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} width={40} />
          <Tooltip content={<ChartTooltip valueLabel="Downtime" unit=" min" />} />
          <Bar dataKey="minutes" fill={CHART_COLORS.rework} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
